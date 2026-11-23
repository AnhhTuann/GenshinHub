import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  fetchGraphQL,
  GET_CHARACTERS,
  GET_WEAPONS,
  GET_TIER_RANKS,
  GET_CHARACTER_TIER_RANKINGS,
  GET_WEAPON_TIER_RANKS,
} from '@/lib/graphql';
import TierListClient from './TierListClient';
import type { ApprovedCharacterRanking, ApprovedWeaponRanking, TierCharacter, TierWeapon } from '@/components/tierlist/types';
import type { Metadata } from 'next';

export const revalidate = 3600;
const RANKING_GAME_VERSION = '7.2';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TierList' });
  return {
    title: `${t('title')} — GenshinHub`,
    description: t('description'),
  };
}

/**
 * Public Tier List is bound exclusively to approved rankings. The backend
 * public queries hard-filter APPROVED + INDEPENDENT (+ publishRightsVerified for
 * weapons), so nothing here needs a legacy `Character.tier` / `Weapon.tier`
 * fallback. Rows whose parent entity is missing are dropped rather than
 * fabricated. Test fixtures live only in the test database and are never
 * presented here as real rankings.
 */
export default async function TierListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [charData, weaponData, tierData, charRankData, weaponRankData] = await Promise.all([
    fetchGraphQL(GET_CHARACTERS),
    fetchGraphQL(GET_WEAPONS),
    fetchGraphQL(GET_TIER_RANKS),
    fetchGraphQL(GET_CHARACTER_TIER_RANKINGS, { gameVersion: RANKING_GAME_VERSION }),
    fetchGraphQL(GET_WEAPON_TIER_RANKS, { versionKey: RANKING_GAME_VERSION }),
  ]);

  const characters = charData.characters || [];
  const weapons = weaponData.weapons || [];
  const tierRanks = tierData.tierRanks || [];

  const characterById = new Map<string, any>(characters.map((c: any) => [String(c.id), c]));
  const weaponById = new Map<string, any>(weapons.map((w: any) => [String(w.id), w]));

  const characterRankings: ApprovedCharacterRanking[] = (charRankData.characterTierRankings || [])
    .map((row: any): ApprovedCharacterRanking | null => {
      const c = characterById.get(String(row.characterId));
      if (!c) return null;
      const explanation = typeof row.explanationVi === 'string' && row.explanationVi.trim() ? row.explanationVi.trim() : null;
      return {
        id: String(row.characterId),
        rankingId: String(row.id),
        characterId: String(row.characterId),
        nameEn: c.nameEn || '',
        nameVi: c.nameVi || '',
        avatarUrl: c.avatarUrl || '',
        rarity: Number(c.rarity) || 0,
        element: c.element || '',
        tier: row.tier,
        role: row.role,
        roleEnum: row.role,
        constellation: row.constellation,
        recommendedC: row.constellation,
        gameVersion: row.gameVersion,
        explanationVi: explanation,
        sourceName: row.sourceName || null,
        tierNoteVi: explanation ? [explanation] : [],
        tierNoteEn: [],
      };
    })
    .filter((row: ApprovedCharacterRanking | null): row is ApprovedCharacterRanking => row !== null);

  const weaponRankings: ApprovedWeaponRanking[] = (weaponRankData.weaponTierRanks || [])
    .map((row: any): ApprovedWeaponRanking | null => {
      const w = weaponById.get(String(row.weaponId));
      if (!w) return null;
      const explanation = typeof row.explanationVi === 'string' && row.explanationVi.trim() ? row.explanationVi.trim() : null;
      return {
        id: String(row.weaponId),
        rankingId: String(row.id),
        weaponId: String(row.weaponId),
        nameEn: w.nameEn || '',
        nameVi: w.nameVi || '',
        iconUrl: w.iconUrl || null,
        rarity: Number(w.rarity) || 0,
        type: row.weaponType || w.type || '',
        tier: row.tier,
        role: row.role,
        roleEnum: row.role,
        refinementContext: row.refinementContext,
        gameVersion: row.gameVersion || null,
        explanationVi: explanation,
        confidence: row.confidence || null,
      };
    })
    .filter((row: ApprovedWeaponRanking | null): row is ApprovedWeaponRanking => row !== null);

  return (
    <TierListClient
      locale={locale}
      characters={characters as TierCharacter[]}
      weapons={weapons as TierWeapon[]}
      tierRanks={tierRanks}
      characterRankings={characterRankings}
      weaponRankings={weaponRankings}
    />
  );
}
