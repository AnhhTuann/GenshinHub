import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validatedCatalogNames } from './detector';

test('accepts the nonempty v5 catalog index contract', () => {
  assert.deepEqual(validatedCatalogNames('characters', ['Aino']), ['Aino']);
});

test('rejects empty or malformed upstream indexes instead of planning from them', () => {
  for (const payload of [null, {}, [], ['Aino', null], [' ']]) {
    assert.throws(() => validatedCatalogNames('characters', payload), /Invalid genshin-db characters catalog/);
  }
});

test('rejects a package version whose index contract has not been validated', () => {
  assert.throws(() => validatedCatalogNames('weapons', ['Sword'], '6.0.0'), /Unsupported genshin-db/);
});
