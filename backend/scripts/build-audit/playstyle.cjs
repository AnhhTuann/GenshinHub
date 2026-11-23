'use strict';

/**
 * Generic, character-agnostic mapping from a reviewed free-text playstyle label
 * to the canonical build-scoped tokens used by CharacterBuild.playstyles.
 *
 * This is intentionally NOT Character.role and NOT TierRank. It only describes
 * how one build is meant to be played.
 */
const CANONICAL = Object.freeze(['MAIN_DPS', 'SUB_DPS', 'SUPPORT']);

function normalizePlaystyles(label) {
  if (typeof label !== 'string' || !label.trim()) return [];

  const text = label.toLowerCase().normalize('NFKC');
  const found = new Set();

  if (/\b(main)\b[^/]*\bdps\b|\b(main dps)\b/.test(text)) found.add('MAIN_DPS');
  if (/\b(sub)\b[^/]*\bdps\b|\b(sub dps)\b/.test(text)) found.add('SUB_DPS');
  if (/\bsupport\b|\bsustain\b|\bhealer\b/.test(text)) found.add('SUPPORT');

  return CANONICAL.filter(token => found.has(token));
}

module.exports = { CANONICAL, normalizePlaystyles };
