import { describe, it, expect } from 'vitest';
import { getCharacterAvatar, getCharacterSplash, getCharacterGachaSplash, getWeaponIcon, getItemIcon, getElementIcon } from './assetMap';

describe('assetMap', () => {
  it('should return fallback for empty inputs', () => {
    expect(getCharacterAvatar('')).toBe('/assets/fallback-icon.png');
    expect(getCharacterSplash('')).toBe('/assets/fallback-icon.png');
    expect(getCharacterGachaSplash('')).toBe('/assets/fallback-icon.png');
    expect(getWeaponIcon('')).toBe('/assets/fallback-icon.png');
    expect(getItemIcon('')).toBe('/assets/fallback-icon.png');
    expect(getElementIcon('')).toBe('/assets/fallback-icon.png');
  });

  it('should return correct paths', () => {
    expect(getCharacterAvatar('furina')).toBe('/assets/characters/avatars/furina_avatar.webp');
    expect(getCharacterSplash('furina')).toBe('/assets/characters/splash/furina_splash.webp');
    expect(getCharacterGachaSplash('furina')).toBe('/assets/characters/splash/furina_splash.webp');
    expect(getWeaponIcon('freedom-sworn')).toBe('/assets/weapons/freedom-sworn.webp');
    expect(getItemIcon('gladiator')).toBe('/assets/items/gladiator.webp');
    expect(getElementIcon('pyro')).toBe('/assets/elements/pyro.webp');
  });
});
