"""Browser test for an isolated GenshinHub development stack."""
import json
import os
import re
import secrets
from pathlib import Path

from playwright.sync_api import expect, sync_playwright

ROOT = Path(__file__).resolve().parents[2]
ORIGIN = os.environ['PHASE_C_FRONTEND_URL']
API = os.environ['PHASE_C_GRAPHQL_URL']
CHARACTER = 'mitya'
DRAFTS = {
    path: json.loads((ROOT / 'backend/scripts/build-audit/drafts' / f'mitya-{path}.json').read_text())
    for path in ('main-dps', 'support-revised')
}
FIELDS = '''id name isDefault reviewStatus playstyles constellationAssumptions notesEn
  bestWeapons { weaponId nameEn iconUrl }
  bestArtifacts { artifactSetId setNameEn iconUrl mixSets { artifactSetId nameEn iconUrl } }
  sands goblet circlet subStatsPriority talentPriority
  teams { id name description rank reviewStatus members { characterId order role } }'''
QUERY = 'query ($id:String!) {character(id:$id){id defaultBuild{id} builds{' + FIELDS + '}}}'
STAGE = '''mutation ($id:ID!,$owner:String!,$v:Int!,$input:CharacterBuildInput!) {
  updateCharacterBuild(id:$id,characterId:$owner,expectedVersion:$v,input:$input){id version}
}'''
REVIEW = '''mutation ($id:ID!,$owner:String!,$v:Int!) {
  reviewCharacterBuild(id:$id,characterId:$owner,expectedVersion:$v,decision:APPROVE){id version}
}'''
CREATE = '''mutation {
  createCharacterBuild(characterId:"mitya",name:"Phase C browser test",playstyles:[SUPPORT]){id version}
}'''


def graphql(request, endpoint, query, variables=None, *, headers=None, error=None):
    response = request.post(endpoint, data={'query': query, 'variables': variables or {}}, headers=headers)
    body = response.json()
    if error:
        assert re.search(error, body.get('errors', [{}])[0].get('message', ''), re.I), 'Expected a specific GraphQL rejection'
        return None
    assert response.ok and not body.get('errors'), [item.get('message') for item in body.get('errors', [])]
    return body['data']


def validate_approved(builds):
    by_name = {build['name']: build for build in builds}
    for approved in DRAFTS.values():
        build = by_name[approved['playstyle']]
        assert [row['weaponId'] for row in build['bestWeapons']] == [row['id'] for row in approved['weapons']]
        assert [[row['artifactSetId']] if row['artifactSetId'] else [entry['artifactSetId'] for entry in row['mixSets']]
                for row in build['bestArtifacts']] == approved['artifacts']
        for field in ('sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority'):
            assert build[field] == approved[field], field
        for team, expected in zip(build['teams'], approved['teams'], strict=True):
            assert [m['characterId'] for m in team['members']] == [m['characterId'] for m in expected['members']]
            assert [m['order'] for m in team['members']] == list(range(len(expected['members'])))


def open_page(page, path):
    response = page.goto(f'{ORIGIN}{path}', wait_until='domcontentloaded', timeout=90000)
    assert response and response.ok


def verify_public(browser, graphql_context, before):
    builds = before['builds']
    assert len(builds) == 2
    validate_approved(builds)
    for width, height in [(1440, 1000), (390, 844)]:
        for theme in ('dark', 'light'):
            page = browser.new_page(viewport={'width': width, 'height': height}, color_scheme=theme,
                                    reduced_motion='reduce', is_mobile=width == 390, has_touch=width == 390)
            hydration = []
            page.on('pageerror', lambda error: hydration.append(str(error)) if
                    re.search(r'hydrat|minified react error #(?:418|423|425)', str(error), re.I) else None)
            open_page(page, '/en/characters/mitya')
            switch = page.get_by_role('group', name='Select build')
            # SSR already renders aria-pressed, so wait for React handlers before clicking.
            page.wait_for_function('''() => {
              const buttons=[...document.querySelectorAll('[role="group"][aria-label="Select build"] button')];
              return buttons.length > 0 && buttons.every(b => Object.keys(b).some(k => k.startsWith('__reactProps$')));
            }''', timeout=30000)
            expect(switch.get_by_role('button', name=builds[0]['name'], exact=True)).to_have_attribute('aria-pressed', 'true')
            for build in (builds[1], builds[0], builds[1]):
                switch.get_by_role('button', name=build['name'], exact=True).click()
                content = page.locator('[data-build-id]')
                expect(content).to_have_attribute('data-build-id', build['id'])
                expect(content.locator('.char-guide-item-title')).to_have_text([row['nameEn'] for row in build['bestWeapons']])
                expect(content.locator('.char-guide-set-name')).to_have_text([
                    name for row in build['bestArtifacts']
                    for name in ([mix['nameEn'] for mix in row['mixSets']] or [row['setNameEn']])])
                expect(content.locator('.char-guide-mainstat-row .char-guide-value')).to_have_text(
                    [' / '.join(build[field]) for field in ('sands', 'goblet', 'circlet')])
                expect(content.locator('.char-guide-priority-list .char-guide-row-label')).to_have_text(build['subStatsPriority'])
                talents = content.locator('section').filter(has=page.locator('.char-guide-section-title', has_text='Talent Priority')).last
                expect(talents.locator('.char-guide-row-label')).to_have_text(build['talentPriority'])
                expect(content.locator('.team-lineup-name')).to_have_text([team['name'] for team in build['teams']])
                for index, team in enumerate(build['teams']):
                    links = content.locator('.team-roster').nth(index).locator('a.team-member-card')
                    assert links.evaluate_all('(nodes)=>nodes.map(e=>e.href.split("/").at(-1))') == [m['characterId'] for m in team['members']]
                expect(content.get_by_text('Best-in-Slot', exact=True)).to_have_count(0)
                for img in content.locator('.char-guide-item img, .team-member-portrait').all():
                    image = img.evaluate('async i => {i.loading="eager";await i.decode();return [new URL(i.currentSrc).pathname,i.naturalWidth]}')
                    assert image[0].startswith('/assets/') and image[0].endswith('.webp') and image[1] > 0
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1')
                assert content.evaluate('(el) => el.scrollWidth <= el.clientWidth + 1')
            page.reload(wait_until='domcontentloaded', timeout=90000)
            expect(switch.get_by_role('button', name=builds[0]['name'], exact=True)).to_have_attribute('aria-pressed', 'true')
            assert not hydration, hydration
            page.close()
            print(f'Public {width}px {theme}: switching, default, team order, assets, hydration and overflow passed', flush=True)
    page = browser.new_page(viewport={'width':390,'height':844}, reduced_motion='reduce')
    for ident, has_build in [('albedo', True), ('alyosha', False)]:
        data = graphql(graphql_context, API, QUERY, {'id': ident})['character']
        assert len(data['builds']) == int(has_build)
        open_page(page, '/en/characters/' + ident)
        expect(page.get_by_role('group', name='Select build')).to_have_count(0)
        expect(page.locator('.char-guide-item-title').first if has_build
               else page.get_by_text('No recommended weapons yet.', exact=True)).to_be_visible()
    page.close()
    print('Public single and empty build regressions passed', flush=True)


def verify_admin(browser, anonymous, before):
    graphql(anonymous, API, CREATE, error='Admin access required')
    support, main = before['builds']
    probe = {'id': main['id'], 'owner': CHARACTER, 'v': 1, 'input': {'sands': ['ATK%']}}
    graphql(anonymous, API, STAGE, probe, error='Admin access required')
    account = secrets.token_hex(5)
    regular = graphql(anonymous, API, '''mutation ($input:RegisterInput!) {register(input:$input){token}}''',
        {'input': {'username': 'phasec' + account, 'email': f'phasec-{account}@example.test',
                   'password': f'PhaseC-Test-Aa1!{account}', 'gender': 'male'}})['register']['token']
    graphql(anonymous, API, REVIEW, {key: probe[key] for key in ('id','owner','v')},
            headers={'Authorization': 'Bearer ' + regular}, error='Admin access required')
    print('Anonymous and authenticated normal user denied', flush=True)

    context = browser.new_context(viewport={'width':1440,'height':950}, reduced_motion='reduce')
    page = context.new_page()
    open_page(page, '/en/admin/login')
    try:
        username = page.get_by_label('Admin username')
        password = page.get_by_label('Admin password')
        page.wait_for_function('''() => {
          const input=document.querySelector('#admin-password');
          return input && Object.keys(input).some(k=>k.startsWith('__reactProps$'));
        }''', timeout=30000)
        username.fill('e2e_owner')
        password.press_sequentially(os.environ['ADMIN_TEST_PASSWORD'])
        expect(page.get_by_role('button', name='Enter Admin Panel')).to_be_enabled(timeout=12000)
        password.press('Enter')
        page.wait_for_url('**/en/admin', timeout=60000)
    except Exception:
        # Never expose Playwright arguments, cookies or network headers from the login exchange.
        raise AssertionError('Admin login did not reach the dashboard') from None
    expect(page.get_by_role('heading', name='Dashboard', exact=True)).to_be_visible(timeout=30000)
    assert any(c['name']=='admin_token' and c['httpOnly'] for c in context.cookies())
    page.locator('a[href$="/admin/characters"]').first.click()
    page.get_by_placeholder('Search by name...').fill('Mitya')
    page.get_by_role('link', name='Builds', exact=True).click()
    page.wait_for_url('**/characters/mitya#character-build', timeout=60000)
    page.get_by_role('button', name='Manage character builds').click()
    # Semantic locator: the combobox exposes aria-label="Build". Using its role avoids
    # depending on the wrapping <label>, whose text also contains every option name.
    selector = page.get_by_role('combobox', name='Build', exact=True)
    editor = page.get_by_label('Build section JSON')
    section = page.get_by_label('Edit section')
    expect(selector.locator('option')).to_have_count(2)
    for build in (main, support):
        selector.select_option(build['id'])
        expect(page.get_by_role('button',name='Save for review')).to_be_enabled()
        for name, field in [('Weapons','weapons'),('Artifacts','artifacts'),('Stats and talents','talentPriority'),('Teams','teams')]:
            section.select_option(name)
            expect(editor).to_have_value(re.compile(f'"{field}"'))
            values = json.loads(editor.input_value())
            if field=='weapons':
                assert [entry['weaponId'] for entry in values[field]] == [entry['weaponId'] for entry in build['bestWeapons']]
            if field=='artifacts':
                assert [entry['setIds'] for entry in values[field]] == [[row['artifactSetId']] if row['artifactSetId']
                    else [m['artifactSetId'] for m in row['mixSets']] for row in build['bestArtifacts']]
            if field=='talentPriority':
                for key in ('sands','goblet','circlet','subStatsPriority','talentPriority'):
                    assert values[key]==build[key]
            if field=='teams':
                assert [[m['characterId'] for m in t['members']] for t in values[field]] == [
                    [m['characterId'] for m in t['members']] for t in build['teams']]
    print('Admin login, dashboard navigation and editor isolation passed', flush=True)

    endpoint = ORIGIN + '/api/admin/graphql'
    admin_list = 'query {adminCharacterBuilds(characterId:"mitya"){id name version reviewStatus isDefault}}'
    def find_test():
        return next(b for b in graphql(context.request, endpoint, admin_list)['adminCharacterBuilds']
                    if b['name']=='Phase C browser test')
    page.get_by_role('textbox', name='New build name').fill('Phase C browser test')
    page.get_by_role('checkbox', name='SUPPORT', exact=True).check()
    page.get_by_role('button', name='Create draft').click()
    expect(selector.locator('option')).to_have_count(3)
    draft = find_test()
    expect(selector).to_have_value(draft['id'])
    assert draft['reviewStatus']=='DRAFT'
    graphql(context.request, endpoint, REVIEW, {'id':draft['id'],'owner':CHARACTER,'v':draft['version']}, error='No pending revision')
    graphql(context.request, endpoint, STAGE, {'id':draft['id'],'owner':'albedo','v':draft['version'],'input':{'sands':['ATK%']}},
            error='does not belong')
    section.select_option('Stats and talents')
    editor.fill(json.dumps({'sands':['Elemental Mastery'],'talentPriority':['Skill']}))
    page.get_by_role('button',name='Save for review').click()
    expect(page.get_by_role('button',name='Approve revision')).to_be_visible()
    assert graphql(anonymous, API, QUERY, {'id': CHARACTER})['character']==before
    page.get_by_role('button',name='Approve revision').click()
    expect(page.get_by_role('button',name='Set default')).to_be_visible()
    page.get_by_role('button',name='Set default').click()
    expect(page.get_by_text(re.compile(r'APPROVED · Version \d+ · Default'))).to_be_visible()
    page.reload(wait_until='domcontentloaded')
    expect(page.get_by_role('group',name='Select build').get_by_role('button',name='Phase C browser test')).to_have_attribute('aria-pressed','true')

    draft = find_test()
    variables={'id':draft['id'],'owner':CHARACTER,'v':draft['version'],'input':{'sands':['ATK%']}}
    outcomes=page.evaluate('''async ([query,variables]) => Promise.all([1,2].map(async () => {
      const response=await fetch('/api/admin/graphql',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({query,variables})});
      const payload=await response.json();
      return payload.errors?.[0]?.extensions?.code ?? 'OK';
    }))''', [STAGE, variables])
    assert sorted(outcomes)==['CONFLICT','OK'],outcomes

    page.get_by_role('button',name='Manage character builds').click()
    selector.select_option(draft['id'])
    expect(page.get_by_role('button',name='Reject revision')).to_be_visible()
    page.get_by_role('button',name='Reject revision').click()
    expect(page.get_by_role('button',name='Reject revision')).to_have_count(0)
    selector.select_option(support['id'])
    expect(page.get_by_role('button',name='Set default')).to_be_visible()
    page.get_by_role('button',name='Set default').click()
    expect(page.get_by_text(re.compile(r'APPROVED · Version \d+ · Default'))).to_be_visible()
    selector.select_option(draft['id'])
    page.once('dialog',lambda dialog: dialog.accept())
    page.get_by_role('button',name='Archive build').click()
    expect(page.get_by_text(re.compile(r'REJECTED · Version \d+ · Archived'))).to_be_visible()
    expect(page.get_by_role('button',name='Save for review')).to_be_disabled()
    graphql(context.request, endpoint, STAGE,
            {**variables,'v':find_test()['version']},error='Archived builds are read-only')
    page.get_by_text('Change history',exact=True).click()
    for action in ['CREATED','STAGED','PUBLISHED','REJECTED','DEFAULT_SET','ARCHIVED']:
        expect(page.get_by_text(re.compile(action+r' · v')).first).to_be_visible()
    assert graphql(anonymous, API, QUERY, {'id': CHARACTER})['character']==before
    context.close()
    print('Admin browser create/stage/approve/default/reload/reject/archive/history and concurrency passed', flush=True)


def main():
    with sync_playwright() as p:
        visitor = p.request.new_context()
        before = graphql(visitor, API, QUERY, {'id': CHARACTER})['character']
        browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/google-chrome-stable'),
                                    args=['--no-sandbox'])
        try:
            verify_admin(browser, visitor, before)
            verify_public(browser, visitor, before)
        finally:
            browser.close()


if __name__ == '__main__':
    main()
