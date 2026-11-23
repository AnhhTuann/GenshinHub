"""Character build decisions for a fresh disposable restore with a unique fixture Admin."""
import json
import os
import re
from urllib.parse import urlparse

from playwright.sync_api import expect, sync_playwright

BASE = os.environ['RELEASE_REVIEW_URL']
API = os.environ['RELEASE_REVIEW_GRAPHQL_URL']
USERNAME = os.environ['RELEASE_REVIEW_USERNAME']
PASSWORD = os.environ['RELEASE_REVIEW_PASSWORD']
ACTOR = os.environ['RELEASE_REVIEW_ACTOR']
assert urlparse(BASE).hostname == urlparse(API).hostname == '127.0.0.1'
assert re.fullmatch(r'release_[a-f0-9]{10}', USERNAME)
assert len(PASSWORD) >= 32

LIST = '{ adminCharacterBuilds(characterId:"aino") { id name version reviewStatus isDefault } }'
PUBLIC = '{ character(id:"aino"){defaultBuild{id} builds{id}} }'
UPDATE = '''mutation ($id: ID!, $version: Int!) {
  updateCharacterBuild(id:$id,characterId:"aino",expectedVersion:$version,input:{sands:["ATK%"]}){id}
}'''
DEFAULT = '''mutation ($id: ID!, $version: Int!) {
  setDefaultCharacterBuild(id:$id,characterId:"aino",expectedVersion:$version){id}
}'''


def graphql(request, endpoint, query, variables=None):
    return request.post(endpoint, data={'query': query, 'variables': variables or {}}).json()


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        executable_path=os.environ.get('CHROMIUM_PATH', '/opt/google/chrome/chrome'),
        args=['--no-sandbox'],
    )
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, reduced_motion='reduce')
    page = context.new_page()
    anonymous = playwright.request.new_context()
    try:
        assert graphql(anonymous, API, LIST).get('errors')
        before = graphql(anonymous, API, PUBLIC)['data']['character']['defaultBuild']['id']
        page.goto(BASE + '/en/admin/login')
        page.wait_for_load_state('networkidle')
        page.get_by_label('Admin username').fill(USERNAME)
        page.get_by_label('Admin password').fill(PASSWORD)
        page.get_by_role('button', name='Enter Admin Panel').click()
        page.wait_for_url('**/en/admin')
        page.locator('aside').get_by_role('link', name='Characters').click()
        page.get_by_placeholder('Search by name...').fill('Aino')
        page.get_by_role('link', name='Builds', exact=True).click()
        page.wait_for_url('**/characters/aino#character-build')
        page.get_by_role('button', name='Manage character builds').click()
        selector = page.get_by_role('combobox', name='Build', exact=True)
        endpoint = BASE + '/api/admin/graphql'

        def fixture(label):
            result = graphql(context.request, endpoint, LIST)
            assert not result.get('errors'), 'Fixture Admin cannot use GraphQL proxy'
            return next(row for row in result['data']['adminCharacterBuilds'] if row['name'] == label)

        for decision in ('Approve', 'Reject'):
            label = f'{USERNAME} {decision} fixture'
            page.get_by_role('textbox', name='New build name').fill(label)
            page.get_by_role('checkbox', name='SUPPORT', exact=True).check()
            page.get_by_role('button', name='Create draft').click()
            expect(selector.locator('option').filter(has_text=label)).to_have_count(1)
            draft = fixture(label)
            assert draft['reviewStatus'] == 'DRAFT'
            page.get_by_label('Edit section').select_option('Stats and talents')
            page.get_by_label('Build section JSON').fill(json.dumps({
                'sands': ['Elemental Mastery'], 'talentPriority': ['Skill'],
            }))
            page.get_by_role('button', name='Save for review').click()
            button = page.get_by_role('button', name=decision + ' revision')
            expect(button).to_be_visible()
            stale = graphql(context.request, endpoint, UPDATE,
                            {'id': draft['id'], 'version': draft['version']})
            assert 'changed' in stale['errors'][0]['message'].lower()
            button.click()
            resulting = 'APPROVED' if decision == 'Approve' else 'REJECTED'
            expect(selector.locator('option').filter(has_text=label)).to_have_text(
                f'{label} ({resulting})')
            page.get_by_text('Change history', exact=True).click()
            action = 'PUBLISHED' if decision == 'Approve' else 'REJECTED'
            expect(page.get_by_text(re.compile(action + r' · v\d+ · ' + re.escape(ACTOR))).first).to_be_visible()
            page.get_by_text('Change history', exact=True).click()
            if decision == 'Reject':
                denied = graphql(context.request, endpoint, DEFAULT, {
                    'id': draft['id'], 'version': fixture(label)['version'],
                })
                assert denied.get('errors')
                public = graphql(anonymous, API, PUBLIC)['data']['character']
                assert draft['id'] not in {row['id'] for row in public['builds']}
                assert public['defaultBuild']['id'] == before
            print(f'PASS {decision.lower()} workflow, stale guard, and persisted history', flush=True)

        page.goto(BASE + '/en/admin')
        page.get_by_role('button', name='Logout').click()
        page.wait_for_url('**/admin/login')
        assert graphql(context.request, endpoint, LIST).get('errors')
        print('PASS Admin logout and protected proxy', flush=True)
    finally:
        browser.close()
