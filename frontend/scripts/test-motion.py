"""Run with python + Playwright against the development frontend.

Set GENSHIN_MOTION_URL and, optionally, PLAYWRIGHT_CHROMIUM_EXECUTABLE.
"""

import os

from playwright.sync_api import expect, sync_playwright


base = os.environ.get("GENSHIN_MOTION_URL", "http://127.0.0.1:55441").rstrip("/")
executable = os.environ.get("PLAYWRIGHT_CHROMIUM_EXECUTABLE")
launch_options = {"executable_path": executable} if executable else {}

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(**launch_options)
    try:
        page = browser.new_page(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))

        def check_console(message):
            if message.type == "error" and "hydrat" in message.text.lower():
                errors.append(message.text)

        page.on("console", check_console)

        page.goto(base + "/en/characters")
        page.get_by_role("textbox", name="Search characters").fill("Citlali")
        trigger = page.get_by_role("button", name="Preview Citlali", exact=True)
        trigger.focus()
        page.keyboard.press("Enter")
        preview = page.get_by_role("dialog", name="Citlali")
        close = preview.get_by_role("button", name="Close preview")
        build = preview.get_by_role("link", name="View Full Build")
        expect(close).to_be_focused()
        page.keyboard.press("Shift+Tab")
        expect(build).to_be_focused()
        page.keyboard.press("Tab")
        expect(close).to_be_focused()
        page.keyboard.press("Escape")
        expect(preview).to_be_hidden()
        expect(trigger).to_be_focused()

        page.goto(base + "/en/characters/citlali")
        expect(page.get_by_role("heading", name="Citlali", exact=True)).to_be_visible()
        expect(page.locator(".character-spotlight-facts")).to_contain_text("Natlan")
        artwork = page.locator(".character-spotlight-image")
        for width in (390, 768, 1440):
            page.set_viewport_size({"width": width, "height": 900})
            assert page.evaluate("document.documentElement.scrollWidth === innerWidth"), width
            assert artwork.evaluate("(img) => getComputedStyle(img).objectFit") == "contain"
            assert artwork.evaluate("(img) => getComputedStyle(img).animationName") == "none"

        page.goto(base + "/en")
        featured = page.locator(".home-spotlight-feature")
        expect(featured.get_by_role("heading", level=2)).to_have_text("Citlali")
        featured.get_by_role("button", name="Next character").click()
        expect(featured.get_by_role("heading", level=2)).not_to_have_text("Citlali")
        expect(featured.get_by_role("link", name="View character")).not_to_have_attribute(
            "href", "/en/characters/citlali"
        )
        assert not errors, errors
        print("Preview, keyboard focus, reduced motion, responsive artwork and character switching passed.")
    finally:
        browser.close()
