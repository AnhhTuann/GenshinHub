#!/usr/bin/env python3
"""Authenticated Admin browser smoke test for a running GenshinHub stack.

Reads ADMIN_E2E_USERNAME and ADMIN_E2E_PASSWORD from environment. The script
only performs read-only navigation and login; it does not create or delete data.
"""
import os
import sys

from playwright.sync_api import expect, sync_playwright

BASE_URL = os.environ.get("E2E_BASE_URL", "http://127.0.0.1:3200").rstrip("/")
CHROME = os.environ.get("PLAYWRIGHT_CHROME", "/usr/bin/google-chrome-stable")
USERNAME = os.environ["ADMIN_E2E_USERNAME"]
PASSWORD = os.environ["ADMIN_E2E_PASSWORD"]
results = []


def check(name, ok, detail=""):
    results.append(bool(ok))
    print(("PASS " if ok else "FAIL ") + name + ((" — " + detail) if detail else ""))


with sync_playwright() as playwright:
    bypass_secret = os.environ.get("VERCEL_AUTOMATION_BYPASS_SECRET", "").strip()
    extra_headers = {"x-vercel-protection-bypass": bypass_secret} if bypass_secret else {}
    browser = playwright.chromium.launch(headless=True, executable_path=CHROME, args=["--no-sandbox"])
    context = browser.new_context(locale="en", extra_http_headers=extra_headers)
    page = context.new_page()
    page.on("pageerror", lambda err: check("pageerror", False, str(err)))

    response = page.goto(BASE_URL + "/en/admin/login", wait_until="domcontentloaded", timeout=60000)
    check("admin login page loads", response is not None and response.status == 200)

    page.get_by_label("Admin username").fill(USERNAME)
    page.get_by_label("Admin password").fill(PASSWORD)
    page.get_by_role("button", name="Enter Admin Panel").click()

    page.wait_for_url("**/en/admin", timeout=60000)
    check("redirected to admin dashboard", page.url.endswith("/en/admin"), page.url)
    expect(page.locator("body")).to_be_visible(timeout=15000)

    # Basic CMS routes: these should be accessible to an authenticated owner.
    for path in [
        "/en/admin/characters",
        "/en/admin/weapons",
        "/en/admin/artifacts",
        "/en/admin/materials",
    ]:
        r = page.goto(BASE_URL + path, wait_until="domcontentloaded", timeout=60000)
        check("admin route " + path, r is not None and r.status == 200, "status=" + str(r.status if r else "no"))

    browser.close()

passed = sum(results)
total = len(results)
print(f"\nADMIN E2E SUMMARY: {passed}/{total} passed")
sys.exit(0 if passed == total else 1)
