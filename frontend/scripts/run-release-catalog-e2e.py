"""Read-only release coverage against a running loopback frontend and GraphQL API."""
import concurrent.futures
import json
import os
import re
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from playwright.sync_api import expect, sync_playwright

BASE = os.environ['RELEASE_BROWSER_URL']
API = os.environ['RELEASE_GRAPHQL_URL']
for url in (BASE, API):
    assert urlparse(url).hostname == '127.0.0.1', 'Release smoke requires loopback services'

QUERY = '{ characters { id nameEn nameVi defaultBuild { id } } }'


def launch(playwright):
    return playwright.chromium.launch(
        executable_path=os.environ.get('CHROMIUM_PATH', '/opt/google/chrome/chrome'),
        args=['--no-sandbox'],
    )


def open_route(page, path):
    result = page.goto(BASE + path, wait_until='domcontentloaded', timeout=25000)
    assert result and result.ok, path


def render_roster(cases):
    with sync_playwright() as playwright:
        browser = launch(playwright)
        pages = {
            locale: browser.new_page(viewport={'width': width, 'height': 900})
            for locale, width in [('en', 1440), ('vi', 390)]
        }
        for locale, character in cases:
            page = pages[locale]
            open_route(page, f"/{locale}/characters/{character['id']}")
            expected = character['nameVi'] if locale == 'vi' else character['nameEn']
            expect(page.locator('#character-spotlight-heading')).to_have_text(
                expected or character['nameEn'], timeout=12000)
        browser.close()
    return len(cases)


def interactions(browser, locale, width):
    page = browser.new_page(viewport={'width': width, 'height': 900}, reduced_motion='reduce')
    errors = []
    page.on('pageerror', lambda error: errors.append((page.url, str(error))))
    prefix = '/' + locale
    vi = locale == 'vi'
    open_route(page, prefix + '/characters')
    search = page.get_by_role('textbox', name='Tìm nhân vật' if vi else 'Search characters')
    search.fill('Aino')
    aino = page.get_by_role('link', name='Aino', exact=True)
    expect(aino).to_be_visible()
    hydro = page.get_by_role('button', name='Hydro', exact=True)
    hydro.focus()
    hydro.press('Enter')
    expect(hydro).to_have_attribute('aria-pressed', 'true')
    sword = page.locator('#character-filter-weapon + div').get_by_role('button', name='Sword', exact=True)
    if sword.count() == 0:
        sword = page.get_by_role('group', name='Vũ khí' if vi else 'Weapon').get_by_role('button', name='Sword', exact=True)
    sword.click()
    expect(sword).to_have_attribute('aria-pressed', 'true')
    expect(aino).to_have_count(0)
    sword.click()
    expect(aino).to_be_visible()
    page.get_by_role('button', name='Xóa tìm kiếm' if vi else 'Clear search').click()
    expect(search).to_have_value('')
    aino.click()
    expect(page.locator('#character-spotlight-heading')).to_have_text('Aino')

    for character in ('aino', 'mitya', 'xingqiu', 'bennett', 'alyosha', 'traveler-boy', 'traveler-girl'):
        open_route(page, f'{prefix}/characters/{character}')
        levels = page.get_by_role('group', name='Cấp nhân vật' if vi else 'Character level')
        one = levels.get_by_role('button', name='Lv.1', exact=True)
        ninety = levels.get_by_role('button', name='Lv.90', exact=True)
        stats = page.locator('.character-stats-table table')
        ninety.click()
        maximum = stats.locator('tbody tr').nth(1).locator('td').first.inner_text()
        one.click()
        expect(one).to_have_attribute('aria-pressed', 'true')
        assert stats.locator('tbody tr').nth(1).locator('td').first.inner_text() != maximum, character
        if character == 'mitya':
            group = page.get_by_role('group', name='Chọn build' if vi else 'Select build')
            current = group.locator('button[aria-pressed=true]')
            selected = current.inner_text()
            group.locator('button[aria-pressed=false]').first.click()
            expect(group.get_by_role('button', name=selected, exact=True)).to_have_attribute('aria-pressed', 'false')
    open_route(page, prefix + '/characters/traveler')
    stats = page.locator('.character-stats-guide')
    expect(stats.get_by_role('status')).to_have_text(
        'Chưa có dữ liệu chỉ số theo cấp.' if vi else 'Level stats are unavailable.')
    expect(stats.locator('table')).to_have_count(0)

    open_route(page, prefix + '/weapons')
    if width < 1024:
        toggle = page.get_by_role('button', name=re.compile('Filters'))
        toggle.click()
        expect(toggle).to_have_attribute('aria-expanded', 'true')
    page.locator('#wf-sort').select_option('name')
    first = page.locator('.fantasy-weapon-card').first
    before = first.get_attribute('href')
    page.get_by_role('button', name=re.compile('switch to ascending')).click()
    expect(first).not_to_have_attribute('href', before)
    first.click()
    page.wait_for_url('**/weapons/*')
    expect(page.get_by_role('heading', level=1).first).to_be_visible()

    open_route(page, prefix + '/artifacts')
    artifact = page.locator('main a[href*="/artifacts/"]').first
    artifact.click()
    page.wait_for_url('**/artifacts/*')
    expect(page.get_by_role('heading', level=1).first).to_be_visible()

    open_route(page, prefix + '/materials')
    more = page.get_by_role('button', name=re.compile('Xem thêm' if vi else 'Load more'))
    before = more.inner_text()
    more.click()
    expect(more).not_to_have_text(before)

    open_route(page, prefix + '/tierlist')
    tab = page.get_by_role('tablist').first.get_by_role('tab').nth(1)
    tab.click()
    expect(tab).to_have_attribute('aria-selected', 'true')
    open_route(page, prefix + '/teams')
    expect(page.get_by_role('heading', level=1)).to_be_visible()
    assert not errors, errors[:3]
    page.close()


def main():
    request = Request(API, data=json.dumps({'query': QUERY}).encode(),
                      headers={'Content-Type': 'application/json'})
    with urlopen(request, timeout=15) as response:
        data = json.load(response)['data']
    rows = data['characters']
    assert rows and all(row['defaultBuild'] for row in rows)
    assert next(row for row in rows if row['id'] == 'aino')['defaultBuild']['id'] == 'ref-v72-aino'
    cases = [(locale, row) for locale in ('en', 'vi') for row in rows]
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        counts = list(pool.map(render_roster, [cases[i::3] for i in range(3)]))
    print(f'PASS {sum(counts)} rendered character identities', flush=True)
    with sync_playwright() as playwright:
        browser = launch(playwright)
        for locale, width in [('en', 1440), ('vi', 1440), ('en', 390), ('vi', 390)]:
            interactions(browser, locale, width)
            print(f'PASS {locale} width {width} interactive catalog', flush=True)
        browser.close()


if __name__ == '__main__':
    main()
