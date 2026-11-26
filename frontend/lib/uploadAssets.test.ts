import { describe, expect, it } from 'vitest';
import { catalogAssetKeyFromPublicPath, isUploadAssetKey } from './uploadAssets';

describe('isUploadAssetKey', () => {
  it('accepts only stable Admin upload paths', () => {
    expect(isUploadAssetKey('uploads/2026/11/aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee.webp')).toBe(true);
  });

  it.each([
    '',
    'uploads/../pgdump/backup.dump',
    'uploads/2026/11/..%2fsecret.webp',
    'uploads%2f2026%2f11%2faaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee.webp',
    'pgdump/2026/backup.dump',
    'uploads/2026/11/image.png',
    'uploads//etc/passwd',
    'uploads/2026/11/aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee.webp/../secret.webp',
  ])('rejects %s', (value) => {
    expect(isUploadAssetKey(value)).toBe(false);
  });
});

describe('catalogAssetKeyFromPublicPath', () => {
  it('maps a committed WebP catalog path to its private storage key', () => {
    expect(catalogAssetKeyFromPublicPath('/assets/items/UI_ItemIcon_107016.webp')).toBe(
      'catalog/items/UI_ItemIcon_107016.webp',
    );
  });

  it.each([
    '',
    '/assets/../pgdump/backup.dump',
    '/assets/items/%2e%2e/secret.webp',
    '/assets/items/secret.dump',
    '/assets/catalog/items/UI_ItemIcon_107016.webp',
    '/assets/items//double.webp',
  ])('rejects %s', (value) => {
    expect(catalogAssetKeyFromPublicPath(value)).toBeNull();
  });
});
