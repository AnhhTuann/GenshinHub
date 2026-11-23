'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizePlaystyles, CANONICAL } = require('./playstyle.cjs');

test('maps approved Main DPS label without inventing other roles', () => {
  assert.deepEqual(normalizePlaystyles('C0 On-Field Main DPS'), ['MAIN_DPS']);
});

test('maps combined Support / Sub DPS label to both tokens', () => {
  assert.deepEqual(normalizePlaystyles('C0 Off-Field Support / Sub DPS'), ['SUB_DPS', 'SUPPORT']);
});

test('is generic across characters and labels', () => {
  assert.deepEqual(normalizePlaystyles('Main DPS'), ['MAIN_DPS']);
  assert.deepEqual(normalizePlaystyles('Off-field Sub DPS'), ['SUB_DPS']);
  assert.deepEqual(normalizePlaystyles('Pure Support'), ['SUPPORT']);
  assert.deepEqual(normalizePlaystyles('Sustain / Healer'), ['SUPPORT']);
});

test('returns canonical order and no tokens for unknown labels', () => {
  assert.deepEqual(normalizePlaystyles('Support then Main DPS'), ['MAIN_DPS', 'SUPPORT']);
  assert.deepEqual(normalizePlaystyles('Experimental'), []);
  assert.deepEqual(normalizePlaystyles(''), []);
  assert.deepEqual(normalizePlaystyles(null), []);
  assert.deepEqual(CANONICAL, ['MAIN_DPS', 'SUB_DPS', 'SUPPORT']);
});
