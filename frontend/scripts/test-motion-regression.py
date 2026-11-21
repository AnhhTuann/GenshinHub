"""Read-only Chromium checks and development measurements for Balanced Fantasy.

Requires Python Playwright. Set GENSHIN_MOTION_URL or PLAYWRIGHT_CHROMIUM_EXECUTABLE
to use existing development infrastructure.
"""
import json
import os
from pathlib import Path

from playwright.sync_api import expect, sync_playwright


BASE = os.environ.get("GENSHIN_MOTION_URL", "http://127.0.0.1:55441").rstrip("/")
OUT = Path(os.environ.get("GENSHIN_MOTION_EVIDENCE", "/tmp/genshin-motion-evidence"))
OUT.mkdir(parents=True, exist_ok=True)
executable = os.environ.get("PLAYWRIGHT_CHROMIUM_EXECUTABLE")
launch = {"executable_path": executable} if executable else {}

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(**launch)
    try:
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.set_default_timeout(18000)
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.on("console", lambda message: errors.append(message.text)
                if message.type == "error" and "hydrat" in message.text.lower() else None)

        def open_path(path):
            response = page.goto(BASE + path, wait_until="load", timeout=90000)
            assert response and response.ok, (path, response.status if response else None)
            page.wait_for_load_state("networkidle")

        def photo(name):
            page.screenshot(path=OUT / f"{name}.png", caret="initial")

        open_path("/en")
        feature = page.locator(".home-spotlight-feature")
        expect(feature.get_by_role("heading", name="Citlali")).to_be_visible()
        photo("home-desktop")
        for _ in range(4):
            feature.get_by_role("button", name="Next character").click()
            name = feature.get_by_role("heading", level=2).inner_text()
            expect(feature.locator(".spotlight-art-current img")).to_have_attribute("alt", name)
            assert feature.locator(".spotlight-art-layer").count() <= 2

        open_path("/en/characters")
        expect(page.get_by_text("Explore 131 characters", exact=False)).to_be_visible()
        page.get_by_role("textbox", name="Search characters").fill("Citlali")
        trigger = page.get_by_role("button", name="Preview Citlali")
        trigger.click()
        dialog = page.get_by_role("dialog", name="Citlali")
        expect(dialog).to_be_visible()
        photo("character-preview")
        close = dialog.get_by_role("button", name="Close preview")
        expect(close).to_be_focused()
        page.keyboard.press("Shift+Tab")
        expect(dialog.get_by_role("link", name="View Full Build")).to_be_focused()
        page.keyboard.press("Escape")
        expect(trigger).to_be_focused()
        expect(dialog).to_be_hidden()

        open_path("/en/weapons")
        photo("weapons")
        weapon_filter = page.get_by_role("button", name="Sword", exact=True)
        weapon_filter.click()
        expect(weapon_filter).to_have_attribute("aria-pressed", "true")
        expect(page.locator(".fantasy-weapon-card").first).to_be_visible()
        open_path("/en/weapons/12516")
        expect(page.locator(".fantasy-detail-art")).to_be_visible()
        expect(page.locator(".fantasy-detail-secondary")).to_be_visible()

        open_path("/en/artifacts")
        photo("artifacts")
        rarity = page.get_by_role("button", name="★★★★★", exact=True)
        rarity.click()
        expect(rarity).to_have_attribute("aria-pressed", "true")
        expect(page.locator(".fantasy-relic-card").first).to_be_visible()
        open_path("/en/artifacts/15048")
        expect(page.locator(".fantasy-detail-secondary")).to_contain_text("4-Piece Set")

        open_path("/en/materials")
        cards = page.locator(".fantasy-material-card")
        cards.first.wait_for()
        expect(cards).to_have_count(48)
        page.get_by_role("button", name="Load more", exact=False).click()
        expect(cards).to_have_count(96)
        page.get_by_placeholder("Search materials...").fill("Tea-Scented Tassel")
        expect(cards).to_have_count(1)
        expect(cards.first).to_contain_text("Tea-Scented Tassel")

        open_path("/en/tierlist")
        photo("tier-list")
        page.get_by_role("button", name="Weapons", exact=True).click()
        expect(page.locator(".fantasy-tier-content [data-motion-row]").first).to_be_visible()

        open_path("/en/banners")
        rows = page.locator(".fantasy-timeline [data-motion-row]")
        rows.first.scroll_into_view_if_needed()
        expect(rows.first).to_have_attribute("data-revealed", "true")
        photo("banner-history")
        rows.nth(2).scroll_into_view_if_needed()
        expect(rows.nth(2)).to_have_attribute("data-revealed", "true")

        open_path("/en/teams")
        accordion = page.locator(".fantasy-team-card button[aria-expanded]").first
        accordion.click()
        expect(accordion).to_have_attribute("aria-expanded", "true")
        expect(page.locator(".fantasy-team-expanded")).to_be_visible()
        accordion.click()
        expect(page.locator(".fantasy-team-expanded")).to_have_count(0)

        for route in ("login", "register"):
            open_path("/en/auth/" + route)
            form = page.locator(".fantasy-auth-form")
            expect(form).to_be_visible()
            expect(form).to_have_attribute("aria-busy", "false")
            email = form.locator('input[type="email"]')
            email.fill("not-an-email")
            assert not form.evaluate("(form) => form.checkValidity()")

        open_path("/en/admin")
        expect(page.locator("main").first).to_be_visible()
        # No admin mutation, account creation or auth POST is issued by these tests.

        open_path("/en")
        day = page.locator(".daily-farming-days").get_by_role("button", name="Tue", exact=False)
        day.click()
        expect(day).to_have_attribute("aria-pressed", "true")
        page.keyboard.press("Control+k")
        expect(page.get_by_placeholder("Search characters, weapons, artifacts...")).to_be_focused()
        page.keyboard.press("Escape")

        # Resize the same hydrated page after verifying its keyboard search shortcut.
        page.set_viewport_size({"width": 390, "height": 844})
        page.evaluate("window.scrollTo(0, 0)")
        photo("home-mobile")
        menu = page.get_by_role("button", name="Toggle menu")
        menu.click()
        expect(menu).to_have_attribute("aria-expanded", "true")
        page.locator("#mobile-site-menu").get_by_role("link", name="Characters", exact=True).click()
        expect(menu).to_have_attribute("aria-expanded", "false")

        page.emulate_media(reduced_motion="reduce", color_scheme="light")
        for width in (390, 768, 1024, 1440):
            page.set_viewport_size({"width": width, "height": 900})
            open_path("/en/characters/citlali")
            art = page.locator(".spotlight-art-current img")
            expect(art).to_be_visible()
            assert page.evaluate("document.documentElement.scrollWidth === innerWidth"), width
            assert art.evaluate("(img) => getComputedStyle(img).animationName") == "none"
            if width in (390, 1440):
                photo(f"spotlight-light-{width}")
        page.emulate_media(color_scheme="dark")
        photo("spotlight-dark-1440")
        locale_button = page.get_by_role("button", name="Select language")
        locale_button.click()
        expect(locale_button).to_have_attribute("aria-expanded", "true")
        page.get_by_role("button", name="Tiếng Việt", exact=True).click()
        page.wait_for_url("**/vi/characters/citlali")
        expect(page.get_by_role("heading", name="Citlali", exact=True)).to_be_visible()
        open_path("/en/characters")
        page.get_by_role("textbox", name="Search characters").fill("Citlali")
        expect(page.get_by_role("button", name="Preview Citlali")).to_be_visible()
        navigation = page.get_by_role("navigation").first
        navigation.get_by_role("link", name="Weapons", exact=True).click(no_wait_after=True)
        navigation.get_by_role("link", name="Artifacts", exact=True).click(no_wait_after=True)
        expect(page).to_have_url(BASE + "/en/artifacts")
        expect(page.locator(".fantasy-relic-card").first).to_be_visible()
        assert not errors, errors
        print("Motion regression: catalogue, Spotlight, teams, auth, admin route and responsive checks passed.", flush=True)

        # Use a fresh page and normal motion. These are lab observations from one
        # Chromium session on development, not production field Core Web Vitals.
        page.close()
        touch = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
        touch.goto(BASE + "/en/characters", wait_until="load", timeout=90000)
        touch.get_by_role("textbox", name="Search characters").fill("Citlali")
        touch.get_by_role("button", name="Preview Citlali").tap()
        expect(touch.get_by_role("dialog", name="Citlali")).to_be_visible()
        touch.get_by_role("button", name="Close preview").tap()
        expect(touch.get_by_role("dialog", name="Citlali")).to_be_hidden()
        touch.close()

        metrics = browser.new_page(viewport={"width": 1440, "height": 900})
        metrics.add_init_script("""
          window.motionMetrics = { lcpMs: null, cls: 0, longTaskMs: [] };
          for (const type of ['largest-contentful-paint', 'layout-shift', 'longtask']) {
            if (!PerformanceObserver.supportedEntryTypes.includes(type)) continue;
            new PerformanceObserver(list => {
              for (const entry of list.getEntries()) {
                if (type === 'largest-contentful-paint') motionMetrics.lcpMs = Math.round(entry.startTime);
                if (type === 'layout-shift' && !entry.hadRecentInput) motionMetrics.cls += entry.value;
                if (type === 'longtask') motionMetrics.longTaskMs.push(Math.round(entry.duration));
              }
            }).observe({ type, buffered: true });
          }
        """)
        metrics.goto(BASE + "/en/characters", wait_until="load", timeout=90000)
        metrics.get_by_role("textbox", name="Search characters").wait_for()
        metrics.wait_for_timeout(800)
        scroll = metrics.evaluate("""() => new Promise(resolve => {
          let start = 0, last = 0;
          const gaps=[];
          function step(now) {
            if (!start) start = now;
            if (last) gaps.push(now - last);
            last = now;
            window.scrollTo(0, (now - start) * .7);
            if (now - start < 1200) requestAnimationFrame(step);
            else resolve({ frames: gaps.length, durationMs: now - start,
              over33Ms: gaps.filter(gap => gap > 33.4).length, largestGapMs: Math.round(Math.max(...gaps)) });
          }
          requestAnimationFrame(step);
        })""")
        metrics.get_by_role("textbox", name="Search characters").fill("Citlali")
        preview_button = metrics.get_by_role("button", name="Preview Citlali")
        preview_button.wait_for()
        measure_preview = """button => new Promise(resolve => {
          const start=performance.now(), gaps=[];
          let last=0;
          function tick(now) {
            if(last) gaps.push(now-last);
            last=now;
            if(now-start<650) requestAnimationFrame(tick);
            else resolve({ frames:gaps.length, durationMs:now-start,
              over33Ms:gaps.filter(gap=>gap>33.4).length, largestGapMs:Math.round(Math.max(...gaps))});
          }
          button.click();
          requestAnimationFrame(tick);
        })"""
        preview = preview_button.evaluate(measure_preview)
        expect(metrics.get_by_role("dialog", name="Citlali")).to_be_visible()
        metrics.keyboard.press("Escape")
        expect(metrics.locator(".character-preview")).to_be_hidden()
        preview_button.hover()
        metrics.wait_for_timeout(150)
        warm_preview = preview_button.evaluate(measure_preview)
        expect(metrics.get_by_role("dialog", name="Citlali")).to_be_visible()
        result = metrics.evaluate("window.motionMetrics")
        for label, sample in (("scroll", scroll), ("previewCold", preview), ("previewWarm", warm_preview)):
            sample["estimatedFps"] = round(sample["frames"] * 1000 / sample["durationMs"], 1)
            result[label] = sample
        (OUT / "performance.json").write_text(json.dumps(result, indent=2) + "\n")
        print(json.dumps(result), flush=True)
    finally:
        browser.close()
