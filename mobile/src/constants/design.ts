import { View, StyleSheet } from 'react-native';

const ELEMENT_COLORS: Record<string, string[]> = {
  Pyro:     ['#ff6b35', '#ef4723'],
  Hydro:    ['#4db8ff', '#1e90ff'],
  Anemo:    ['#80ffe8', '#33ccb3'],
  Electro:  ['#c084fc', '#a855f7'],
  Dendro:   ['#86efac', '#4ade80'],
  Cryo:     ['#bae6fd', '#7dd3fc'],
  Geo:      ['#fde047', '#eab308'],
  Unranked: ['#9ca3af', '#6b7280'],
};

export function getElementColors(element: string): [string, string] {
  const colors = ELEMENT_COLORS[element] || ELEMENT_COLORS.Unranked;
  return [colors[0], colors[1]];
}

export function getElementBg(element: string): string {
  const map: Record<string, string> = {
    Pyro:     'rgba(239,71,35,0.15)',
    Hydro:    'rgba(30,144,255,0.15)',
    Anemo:    'rgba(51,204,179,0.15)',
    Electro:  'rgba(168,85,247,0.15)',
    Dendro:   'rgba(74,222,128,0.15)',
    Cryo:     'rgba(125,211,252,0.15)',
    Geo:      'rgba(234,179,8,0.15)',
  };
  return map[element] || 'rgba(255,255,255,0.05)';
}

export function getElementBorder(element: string): string {
  const map: Record<string, string> = {
    Pyro:     'rgba(239,71,35,0.4)',
    Hydro:    'rgba(30,144,255,0.4)',
    Anemo:    'rgba(51,204,179,0.4)',
    Electro:  'rgba(168,85,247,0.4)',
    Dendro:   'rgba(74,222,128,0.4)',
    Cryo:     'rgba(125,211,252,0.4)',
    Geo:      'rgba(234,179,8,0.4)',
  };
  return map[element] || 'rgba(255,255,255,0.1)';
}

export const TIER_CONFIG: Record<string, { bg: string; border: string; text: string }> = {
  SS: { bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.5)',  text: '#f87171' },
  S:  { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.5)', text: '#fb923c' },
  A:  { bg: 'rgba(234,179,8,0.15)',  border: 'rgba(234,179,8,0.5)',  text: '#facc15' },
  B:  { bg: 'rgba(74,222,128,0.15)', border: 'rgba(74,222,128,0.5)', text: '#4ade80' },
  C:  { bg: 'rgba(148,163,184,0.15)',border: 'rgba(148,163,184,0.5)',text: '#94a3b8' },
};

export const RARITY_CONFIG: Record<number, { bg: string; border: string; glow: string }> = {
  5: { bg: 'rgba(207,168,88,0.15)',  border: 'rgba(207,168,88,0.5)',  glow: 'rgba(207,168,88,0.3)' },
  4: { bg: 'rgba(168,85,247,0.15)',  border: 'rgba(168,85,247,0.5)',  glow: 'rgba(168,85,247,0.3)' },
  3: { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.5)',  glow: 'rgba(59,130,246,0.3)' },
  2: { bg: 'rgba(74,222,128,0.15)',  border: 'rgba(74,222,128,0.5)',  glow: 'rgba(74,222,128,0.3)' },
  1: { bg: 'rgba(156,163,175,0.15)', border: 'rgba(156,163,175,0.5)', glow: 'rgba(156,163,175,0.3)' },
};
