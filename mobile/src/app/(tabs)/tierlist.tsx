import { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGraphQL } from '@/hooks/useGraphQL';
import { GET_CHARACTERS } from '@/lib/graphql';
import { getElementBg, getElementBorder, TIER_CONFIG } from '@/constants/design';
import { SkeletonList } from '@/components/SkeletonLoader';
import EmptyState from '@/components/EmptyState';
import { GlassCard } from '@/components/GlassCard';

interface Character {
  id: string;
  nameEn: string;
  avatarUrl: string;
  tier: string;
  element: string;
  rarity: number;
}

const TIER_ORDER: Record<string, number> = { SS: 1, S: 2, A: 3, B: 4, C: 5, D: 6, Unranked: 7 };

export default function TierListScreen() {
  const router = useRouter();
  const { data, loading, error, refetch } = useGraphQL<{ characters: Character[] }>(GET_CHARACTERS);
  const { width } = useWindowDimensions();
  const characters = data?.characters ?? [];

  const grouped = useMemo(() => {
    const map: Record<string, Character[]> = {};
    characters.forEach(c => {
      const tier = c.tier && c.tier !== 'Unranked' ? c.tier : 'Unranked';
      if (!map[tier]) map[tier] = [];
      map[tier].push(c);
    });
    return Object.entries(map).sort(([a], [b]) => TIER_ORDER[a] - TIER_ORDER[b]);
  }, [characters]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TIER LIST</Text>
        <Text style={styles.headerSub}>Meta rankings for all characters</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} tintColor="#cfa858" />
        }
      >
        {loading ? (
          <SkeletonList count={5} />
        ) : error ? (
          <EmptyState icon="⚠️" title="Failed to load tier list" description={error} />
        ) : grouped.length === 0 ? (
          <EmptyState icon="🏆" title="No tier data available" description="Tier list data will appear here once characters are ranked." />
        ) : (
          grouped.map(([tier, chars]) => {
            if (tier === 'Unranked') return null;
            const cfg = TIER_CONFIG[tier] || { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#ffffff' };

            return (
              <GlassCard key={tier} style={[styles.tierSection, { borderColor: cfg.border, padding: 0 }]} intensity={15}>
                {/* Tier Badge column */}
                <View style={[styles.tierBadgeWrap, { backgroundColor: cfg.bg }]}>
                  <Text style={[styles.tierLabelText, { color: cfg.text }]}>{tier}</Text>
                </View>

                {/* Characters Grid */}
                <View style={styles.tierCharsWrap}>
                  {chars.map(c => {
                    const elBg = getElementBg(c.element);
                    const elBorder = getElementBorder(c.element);
                    return (
                      <TouchableOpacity
                        key={c.id}
                        style={styles.charItem}
                        onPress={() => router.push(`/characters/${c.id}` as any)}
                      >
                        <View style={[styles.charAvatar, { backgroundColor: elBg, borderColor: elBorder }]}>
                          {c.avatarUrl ? (
                            <Image source={{ uri: c.avatarUrl }} style={styles.charImage} contentFit="cover" />
                          ) : (
                            <Text style={styles.noImg}>?</Text>
                          )}
                        </View>
                        <Text style={styles.charName} numberOfLines={1}>{c.nameEn}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </GlassCard>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080810' },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 1,
    textShadowColor: 'rgba(207,168,88,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerSub: { color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 2 },

  scroll: { flex: 1 },
  content: { padding: 16, gap: 16, paddingBottom: 40 },

  tierSection: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tierBadgeWrap: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.05)',
  },
  tierLabelText: {
    fontSize: 24,
    fontWeight: '900',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tierCharsWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  charItem: {
    alignItems: 'center',
    width: 58,
  },
  charAvatar: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    overflow: 'hidden',
    marginBottom: 4,
  },
  charImage: { width: '100%', height: '100%' },
  noImg: { color: 'rgba(255,255,255,0.3)', fontSize: 18, textAlign: 'center', marginTop: 10 },
  charName: { color: 'rgba(255,255,255,0.8)', fontSize: 9, textAlign: 'center', fontWeight: '600', width: '100%' },
});
