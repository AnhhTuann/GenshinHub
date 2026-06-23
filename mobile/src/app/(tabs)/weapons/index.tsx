import { Image } from 'expo-image';
import { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { Search, Sparkles, Swords, Info } from 'lucide-react-native';
import { fetchGraphQL, GET_WEAPONS } from '@/lib/graphql';
import { RARITY_CONFIG } from '@/constants/design';
import { RarityStars } from '@/components/ui/RarityStars';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

interface Weapon {
  id: string;
  nameEn: string;
  rarity: number;
  type: string;
  iconUrl: string;
  baseAtk: number;
  subStat: string;
  subStatValue: string;
  tier?: string;
}

const WEAPON_TYPES = ['All', 'Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'];
const WEAPON_EMOJIS: Record<string, string> = {
  All: '✦', Sword: '🗡️', Claymore: '⚔️', Polearm: '🔱', Bow: '🏹', Catalyst: '📖',
};

const RARITY_GRADIENTS: Record<number, readonly [string, string, ...string[]]> = {
  5: ['#1e1508', '#2a1a06', '#1a1000'],
  4: ['#110b1f', '#1a0e2e', '#0e0917'],
  3: ['#0f172a', '#1e293b', '#0f172a'],
  2: ['#064e3b', '#065f46', '#064e3b'],
  1: ['#374151', '#4b5563', '#374151'],
};

const RARITY_IMG_GRADIENTS: Record<number, readonly [string, string, ...string[]]> = {
  5: ['#d4a06a', '#e5b76b', '#d4a06a'],
  4: ['#9b80b7', '#ba9fd3', '#9b80b7'],
  3: ['#688aab', '#79a6d4', '#688aab'],
  2: ['#74a180', '#88bf96', '#74a180'],
  1: ['#8a99a8', '#a0b0bf', '#8a99a8'],
};

export default function WeaponsScreen() {
  const router = useRouter();
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchGraphQL(GET_WEAPONS)
      .then(data => {
        if (data.weapons) {
          const sorted = [...data.weapons].sort((a, b) => {
            if (a.rarity !== b.rarity) return b.rarity - a.rarity;
            return a.nameEn.localeCompare(b.nameEn);
          });
          setWeapons(sorted);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return weapons.filter(w => {
      const typeOk = filterType === 'All' || w.type === filterType;
      const srchOk = !search || w.nameEn.toLowerCase().includes(search.toLowerCase());
      return typeOk && srchOk;
    });
  }, [weapons, filterType, search]);

  const CARD_W = (width - 44) / 2;

  return (
    <SafeAreaView style={styles.container}>
      {/* Premium Header */}
      <View style={styles.header}>
        <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>
              <Text style={{ color: '#ffb300' }}>ARM</Text>ORY
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Sparkles size={12} color="#ffb300" style={{ marginRight: 6 }} />
              <Text style={styles.headerSub}>Discover the perfect arsenal</Text>
            </View>
          </View>
          <View style={styles.headerIconBg}>
            <Swords size={20} color="#ffb300" />
          </View>
        </View>
      </View>

      {/* Modern Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrap}>
          <Search size={16} color="rgba(255,255,255,0.4)" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for weapons..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={search}
            onChangeText={setSearch}
            selectionColor="#ffb300"
          />
        </View>
      </View>

      {/* Filter Chips */}
      <View style={styles.filterRow}>
        <FlashList
          data={WEAPON_TYPES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item: type }) => {
            const active = filterType === type;
            return (
              <TouchableOpacity
                onPress={() => setFilterType(type)}
                style={[styles.filterChip, active && styles.filterChipActive]}
                activeOpacity={0.7}
              >
                {active && (
                  <LinearGradient
                    colors={['rgba(207,168,88,0.3)', 'rgba(207,168,88,0)']}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                )}
                <Text style={styles.filterEmoji}>{WEAPON_EMOJIS[type]}</Text>
                <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>{type}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#ffb300" />
          <Text style={styles.loaderText}>Forging weapons...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        >
          {filtered.map(w => {
            const cardGrad = RARITY_GRADIENTS[w.rarity] || RARITY_GRADIENTS[3];
            const imgGrad = RARITY_IMG_GRADIENTS[w.rarity] || RARITY_IMG_GRADIENTS[3];
            const borderCol = w.rarity === 5 ? 'rgba(207,168,88,0.6)' : w.rarity === 4 ? 'rgba(168,85,247,0.5)' : 'rgba(255,255,255,0.1)';
            
            return (
              <TouchableOpacity
                key={w.id}
                style={[styles.card, { width: CARD_W, borderColor: borderCol }]}
                onPress={() => router.push(`/weapons/${w.id}` as any)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={cardGrad}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                
                <LinearGradient
                  colors={imgGrad}
                  style={styles.cardImg}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.imgGlow} />
                  {w.iconUrl ? (
                    <Image source={{ uri: w.iconUrl }} style={styles.weaponImg} contentFit="contain" transition={300} />
                  ) : (
                    <Text style={styles.noImg}>?</Text>
                  )}
                  {/* Type Badge */}
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeEmoji}>{WEAPON_EMOJIS[w.type]}</Text>
                  </View>
                </LinearGradient>

                <View style={styles.cardBody}>
                  <RarityStars rarity={w.rarity} size={11} />
                  <Text style={styles.weaponName} numberOfLines={1}>{w.nameEn}</Text>
                  
                  <View style={styles.divider} />
                  
                  <View style={styles.statsRow}>
                    <View style={styles.statCol}>
                      <Text style={styles.statLabel}>ATK</Text>
                      <Text style={styles.statVal}>{w.baseAtk}</Text>
                    </View>
                    {w.subStatValue ? (
                      <View style={[styles.statCol, { alignItems: 'flex-end' }]}>
                        <Text style={styles.statLabel}>{w.subStat || 'Sub'}</Text>
                        <Text style={styles.statValHighlight}>{w.subStatValue}</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          {filtered.length === 0 && (
            <View style={styles.emptyState}>
              <Info size={32} color="rgba(255,255,255,0.2)" style={{ marginBottom: 12 }} />
              <Text style={styles.emptyText}>No weapons found</Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#06060a' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
    textShadowColor: 'rgba(207,168,88,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 15,
  },
  headerSub: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '500' },
  headerIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(207,168,88,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(207,168,88,0.3)',
  },

  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d0d14',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  searchInput: { flex: 1, color: '#ffffff', fontSize: 14, fontWeight: '500' },

  filterRow: { marginBottom: 16, height: 36 },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#0d0d14',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  filterChipActive: {
    borderColor: '#ffb300',
  },
  filterEmoji: { fontSize: 12, marginRight: 6 },
  filterLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  filterLabelActive: { color: '#ffb300', textShadowColor: 'rgba(255,179,0,0.5)', textShadowOffset: {width:0, height:0}, textShadowRadius: 8 },

  scroll: { flex: 1 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  cardImg: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },
  imgGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#fff',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  weaponImg: { width: 90, height: 90, zIndex: 2 },
  noImg: { color: 'rgba(255,255,255,0.3)', fontSize: 32, fontWeight: '900', zIndex: 2 },
  typeBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  typeEmoji: { fontSize: 10 },
  cardBody: { padding: 12, paddingTop: 10 },
  weaponName: { color: '#ffffff', fontSize: 13, fontWeight: '800', marginTop: 4, letterSpacing: 0.3 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 8 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statCol: { gap: 2 },
  statLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  statVal: { color: '#ffffff', fontSize: 12, fontWeight: '800' },
  statValHighlight: { color: '#ffb300', fontSize: 12, fontWeight: '800' },
  
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  loaderText: { color: '#ffb300', fontSize: 14, fontWeight: '600', letterSpacing: 1 },
  
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60, width: '100%' },
  emptyText: { color: 'rgba(255,255,255,0.3)', fontSize: 14, fontWeight: '600' },
});

