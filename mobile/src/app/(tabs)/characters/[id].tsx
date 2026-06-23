import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchGraphQL, GET_CHARACTER_BY_ID } from '@/lib/graphql';
import { ChevronLeft, Star, Sword, Shield, Zap } from 'lucide-react-native';
import { getElementBg, getElementBorder, getElementColors, TIER_CONFIG, RARITY_CONFIG } from '@/constants/design';
import { RarityStars } from '@/components/ui/RarityStars';

const { width } = Dimensions.get('window');

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchGraphQL(GET_CHARACTER_BY_ID, { id })
      .then(data => { if (data.character) setCharacter(data.character); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#cfa858" />
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Character not found</Text>
      </View>
    );
  }

  const elBg = getElementBg(character.element);
  const elBorder = getElementBorder(character.element);
  const [elColor1] = getElementColors(character.element);
  const tierCfg = TIER_CONFIG[character.tier] || { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#fff' };
  const rarCfg = RARITY_CONFIG[character.rarity] || RARITY_CONFIG[3];

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
        {/* Splash Art Header */}
        <View style={styles.splashContainer}>
          {character.splashArtUrl ? (
            <Image source={{ uri: character.splashArtUrl }} style={styles.splashImage} contentFit="cover" />
          ) : (
            <View style={[styles.splashFallback, { backgroundColor: elBg }]} />
          )}
          <View style={styles.splashOverlay} />
          <View style={styles.splashGradient} />

          {/* Back button */}
          <SafeAreaView style={styles.backWrap}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <ChevronLeft color="white" size={22} />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Character Info overlay */}
          <View style={styles.splashInfo}>
            <View style={styles.badgeRow}>
              <View style={[styles.tierBadge, { backgroundColor: tierCfg.bg, borderColor: tierCfg.border }]}>
                <Text style={[styles.tierText, { color: tierCfg.text }]}>{character.tier || '?'}</Text>
              </View>
              <View style={[styles.elBadge, { backgroundColor: elBg, borderColor: elBorder }]}>
                <Text style={[styles.elText, { color: elColor1 }]}>{character.element}</Text>
              </View>
              <View style={styles.weapBadge}>
                <Text style={styles.weapText}>{character.weapon}</Text>
              </View>
            </View>
            <RarityStars rarity={character.rarity} size={14} />
            <Text style={styles.charName}>{character.nameEn}</Text>
            {character.titleEn ? <Text style={styles.charTitle}>{character.titleEn}</Text> : null}
          </View>
        </View>

        <View style={styles.body}>
          {/* Base Stats */}
          <View style={[styles.statsCard, { borderColor: elBorder }]}>
            <Text style={styles.sectionTitle}>Base Stats (Lv. 90)</Text>
            <View style={styles.statsRow}>
              {[
                { label: 'HP', val: Math.round(character.baseHp), icon: '❤️' },
                { label: 'ATK', val: Math.round(character.baseAtk), icon: '⚔️' },
                { label: 'DEF', val: Math.round(character.baseDef), icon: '🛡️' },
              ].map(s => (
                <View key={s.label} style={styles.statItem}>
                  <Text style={styles.statEmoji}>{s.icon}</Text>
                  <Text style={styles.statVal}>{s.val}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Description */}
          {character.descriptionEn ? (
            <View style={styles.card}>
              <Text style={styles.descText}>{character.descriptionEn}</Text>
            </View>
          ) : null}

          {/* Best Weapons */}
          {character.bestWeapons?.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>⚔️ Best Weapons</Text>
              <View style={styles.weaponList}>
                {character.bestWeapons.map((w: any, idx: number) => (
                  <View key={idx} style={[styles.weaponCard, { borderLeftColor: RARITY_CONFIG[w.rarity]?.border || 'rgba(207,168,88,0.4)', borderLeftWidth: 3 }]}>
                    <View style={styles.weapIconWrap}>
                      {w.iconUrl ? (
                        <Image source={{ uri: w.iconUrl }} style={styles.weapIcon} contentFit="contain" />
                      ) : null}
                    </View>
                    <View style={styles.weapInfo}>
                      <View style={styles.weapHeader}>
                        <Text style={styles.weapName}>{w.nameEn}</Text>
                        {w.isF2P && (
                          <View style={styles.f2pBadge}>
                            <Text style={styles.f2pText}>F2P</Text>
                          </View>
                        )}
                      </View>
                      {w.subStat ? <Text style={styles.weapSub}>{w.subStat}</Text> : null}
                      {w.passiveDescEn ? (
                        <Text style={styles.weapPassive} numberOfLines={2}>{w.passiveDescEn}</Text>
                      ) : null}
                    </View>
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankText}>#{idx + 1}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Best Artifacts */}
          {character.bestArtifacts?.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>🏺 Best Artifacts</Text>
              <View style={styles.weaponList}>
                {character.bestArtifacts.map((a: any, idx: number) => (
                  <View key={idx} style={styles.artifactCard}>
                    <View style={styles.artifIconWrap}>
                      {a.iconUrl ? (
                        <Image source={{ uri: a.iconUrl }} style={styles.artifIcon} contentFit="contain" />
                      ) : null}
                    </View>
                    <View style={styles.weapInfo}>
                      <Text style={styles.weapName}>{a.setNameEn}</Text>
                      <Text style={styles.artifPieces}>{a.pieces}-Piece Set</Text>
                      {a.substats ? <Text style={styles.weapPassive} numberOfLines={1}>Substats: {a.substats}</Text> : null}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Recommended Teams */}
          {character.teams?.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>👥 Recommended Teams</Text>
              {character.teams.map((team: any, idx: number) => (
                <View key={idx} style={styles.teamCard}>
                  <View style={styles.teamHeader}>
                    <Text style={styles.teamName}>{team.name}</Text>
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankText}>{team.rank}</Text>
                    </View>
                  </View>
                  {team.description ? (
                    <Text style={styles.teamDesc}>{team.description}</Text>
                  ) : null}
                  <View style={styles.teamMembers}>
                    {team.members?.map((m: any, i: number) => (
                      <View key={i} style={styles.memberChip}>
                        <Text style={styles.memberName} numberOfLines={1}>{m.characterId}</Text>
                        <Text style={styles.memberRole} numberOfLines={1}>{m.role}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#080810' },
  center: { flex: 1, backgroundColor: '#080810', alignItems: 'center', justifyContent: 'center' },
  loaderText: { color: 'rgba(255,255,255,0.4)', marginTop: 12, fontSize: 13 },
  notFound: { color: '#ffffff', fontSize: 16 },
  scroll: { flex: 1 },

  splashContainer: { width, height: 380, position: 'relative' },
  splashImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  splashFallback: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  splashOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(8,8,16,0.3)' },
  splashGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(8,8,16,0.85)',
  },
  backWrap: { position: 'absolute', top: 0, left: 0, right: 0 },
  backBtn: {
    marginTop: 8,
    marginLeft: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashInfo: { position: 'absolute', bottom: 20, left: 16, right: 16 },
  badgeRow: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  tierBadge: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tierText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  elBadge: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  elText: { fontSize: 10, fontWeight: '700' },
  weapBadge: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  weapText: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: '700' },
  charName: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 6,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  charTitle: { color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 2 },

  body: { padding: 16, gap: 20, paddingBottom: 40 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
  },
  statsCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center', gap: 4 },
  statEmoji: { fontSize: 20 },
  statVal: { color: '#ffffff', fontSize: 18, fontWeight: '800' },
  statLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: '600' },
  descText: { color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 20 },

  weaponList: { gap: 10 },
  weaponCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 12,
    alignItems: 'center',
    gap: 12,
  },
  artifactCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(207,168,88,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(207,168,88,0.2)',
    padding: 12,
    alignItems: 'center',
    gap: 12,
  },
  weapIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weapIcon: { width: 46, height: 46 },
  artifIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(207,168,88,0.1)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  artifIcon: { width: 42, height: 42 },
  weapInfo: { flex: 1 },
  weapHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  weapName: { color: '#ffffff', fontSize: 13, fontWeight: '700' },
  weapSub: { color: '#cfa858', fontSize: 11, marginTop: 2 },
  weapPassive: { color: 'rgba(255,255,255,0.45)', fontSize: 10, marginTop: 3, lineHeight: 14 },
  artifPieces: { color: 'rgba(207,168,88,0.8)', fontSize: 11, marginTop: 2 },
  f2pBadge: {
    backgroundColor: 'rgba(74,222,128,0.15)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: 'rgba(74,222,128,0.4)',
  },
  f2pText: { color: '#4ade80', fontSize: 9, fontWeight: '700' },
  rankBadge: {
    backgroundColor: 'rgba(207,168,88,0.1)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: 'rgba(207,168,88,0.3)',
  },
  rankText: { color: '#cfa858', fontSize: 10, fontWeight: '700' },

  teamCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 14,
    marginBottom: 10,
  },
  teamHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  teamName: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
  teamDesc: { color: 'rgba(255,255,255,0.45)', fontSize: 11, lineHeight: 16, marginBottom: 10 },
  teamMembers: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  memberChip: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    minWidth: 70,
    alignItems: 'center',
  },
  memberName: { color: '#ffffff', fontSize: 11, fontWeight: '700' },
  memberRole: { color: 'rgba(207,168,88,0.7)', fontSize: 9, marginTop: 1 },
});
