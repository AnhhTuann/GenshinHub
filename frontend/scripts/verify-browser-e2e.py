#!/usr/bin/env python3
"""Real-browser E2E smoke test for a running GenshinHub stack.

Usage:
    E2E_BASE_URL=http://127.0.0.1:3100 \
    PLAYWRIGHT_CHROME=/usr/bin/google-chrome-stable \
    python3 frontend/scripts/verify-browser-e2e.py

The script is read-only: it only navigates public pages and sends unauthenticated
requests. It never creates an Admin account or mutates catalog data.
"""
import json
import os
import sys
from urllib.parse import urlparse

from playwright.sync_api import expect, sync_playwright

BASE_URL = os.environ.get("E2E_BASE_URL", "http://127.0.0.1:3100").rstrip("/")
CHROME = os.environ.get("PLAYWRIGHT_CHROME", "/usr/bin/google-chrome-stable")
results = []
page_errors = []


def check(name, ok, detail=""):
    results.append((name, bool(ok), detail))
    print(("PASS " if ok else "FAIL ") + name + ((" — " + str(detail)) if detail else ""))


def get(page, path, expected=200):
    response = page.goto(BASE_URL + path, wait_until="domcontentloaded", timeout=60000)
    check("GET " + path, response is not None and response.status == expected,
          "status=" + str(response.status if response else "no response"))
    return response


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            headless=True, executable_path=CHROME, args=["--no-sandbox"]
        )
        context = browser.new_context(locale="en")
        page = context.new_page()
        page.on("pageerror", lambda error: page_errors.append(str(error)))

        get(page, "/en")
        try:
            expect(page.locator("h1").first).to_be_visible(timeout=15000)
            hero_visible = True
        except Exception:
            hero_visible = False
        check("home renders hero heading", hero_visible and "Explore" in page.locator("h1").first.inner_text())
        check("document title", "GenshinHub" in page.title(), page.title())
        get(page, "/vi")
        check("Vietnamese locale renders", page.locator("body").is_visible())

        for path in ("/en/characters", "/en/weapons", "/en/artifacts",
                     "/en/materials", "/en/tierlist"):
            get(page, path)

        catalog = page.evaluate(
            """async () => {
                const r = await fetch('/api/graphql', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ query: '{ characters { id } weapons { id } artifacts { id } }' }),
                });
                return { status: r.status, body: await r.json() };
            }"""
        )
        check("same-origin GraphQL proxy returns 200", catalog["status"] == 200,
              "status=" + str(catalog["status"]))
        data = (catalog.get("body") or {}).get("data") or {}
        counts = {key: len(value or []) for key, value in data.items()}
        check("GraphQL proxy serves catalog data",
              all(counts.get(key, 0) > 0 for key in ("characters", "weapons", "artifacts")),
              json.dumps(counts))
        check("GraphQL proxy has no errors", not (catalog.get("body") or {}).get("errors"))

        for key, route in (("characters", "characters"), ("weapons", "weapons"),
                           ("artifacts", "artifacts")):
            items = data.get(key) or []
            if not items:
                check("detail route /" + route, False, "no " + key + " returned")
                continue
            item_id = items[0]["id"]
            get(page, "/en/" + route + "/" + item_id)
            check(route + " detail page shows id", item_id in page.content())

        asset = page.request.get(BASE_URL + "/assets/characters/Aino/avatar.webp")
        check("local WebP asset route", asset.status == 200 and "image/webp" in asset.headers.get("content-type", ""),
              "status=" + str(asset.status))

        get(page, "/en/admin")
        check("unauthenticated Admin route redirects to login",
              "/en/admin/login" in urlparse(page.url).path, page.url)
        get(page, "/en/admin/login")

        admin_probe = page.evaluate(
            """async () => {
                const r = await fetch('/api/admin/graphql', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ query: '{ __typename }' }),
                });
                return { status: r.status, body: await r.json() };
            }"""
        )
        check("Admin GraphQL rejects anonymous requests",
              admin_probe["status"] == 401 and "Admin session required" in json.dumps(admin_probe["body"]),
              "status=" + str(admin_probe["status"]))

        get(page, "/sitemap.xml")
        check("sitemap includes catalog URLs", "characters" in page.content())

        check("no uncaught browser exceptions", not page_errors, "; ".join(page_errors[:3]))
        browser.close()

    passed = sum(1 for _, ok, _ in results if ok)
    print("\nE2E SUMMARY: {}/{} passed".format(passed, len(results)))
    return 0 if passed == len(results) else 1


if __name__ == "__main__":
    sys.exit(main())
