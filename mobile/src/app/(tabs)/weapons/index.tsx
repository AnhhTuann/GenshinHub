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
import { Search } from 'lucide-react-native';
import { fetchGraphQL, GET_WEAPONS } from '@/lib/graphql';
import { RARITY_CONFIG } from '@/constants/design';
import { RarityStars } from '@/components/ui/RarityStars';

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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WEAPONS</Text>
        <Text style={styles.headerSub}>All weapon rankings</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Search size={14} color="rgba(255,255,255,0.35)" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search weapon..."
          placeholderTextColor="rgba(255,255,255,0.3)"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Type Filter */}
      <View style={styles.filterRow}>
        <FlashList
          data={WEAPON_TYPES}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={70}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item: type }) => {
            const active = filterType === type;
            return (
              <TouchableOpacity
                onPress={() => setFilterType(type)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text style={styles.filterEmoji}>{WEAPON_EMOJIS[type]}</Text>
                <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>{type}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#cfa858" />
          <Text style={styles.loaderText}>Loading weapons...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        >
          {filtered.map(w => {
            const cfg = RARITY_CONFIG[w.rarity] || RARITY_CONFIG[3];
            return (
              <TouchableOpacity
                key={w.id}
                style={[styles.card, { width: CARD_W, borderColor: cfg.border }]}
                onPress={() => router.push(`/weapons/${w.id}` as any)}
                activeOpacity={0.75}
              >
                <View style={[styles.cardImg, { backgroundColor: cfg.bg }]}>
                  {w.iconUrl ? (
                    <Image source={{ uri: w.iconUrl }} style={styles.weaponImg} contentFit="contain" />
                  ) : (
                    <Text style={styles.noImg}>?</Text>
                  )}
                </View>
                <View style={styles.cardBody}>
                  <RarityStars rarity={w.rarity} size={10} />
                  <Text style={styles.weaponName} numberOfLines={1}>{w.nameEn}</Text>
                  <Text style={styles.weaponType}>{w.type}</Text>
                  <View style={styles.statsRow}>
                    <Text style={styles.statText}>ATK {w.baseAtk}</Text>
                    {w.subStatValue ? <Text style={styles.statText}>{w.subStatValue}</Text> : null}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
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

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: { flex: 1, color: '#ffffff', fontSize: 13 },

  filterRow: { marginBottom: 12 },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  filterChipActive: {
    backgroundColor: 'rgba(207,168,88,0.15)',
    borderColor: 'rgba(207,168,88,0.5)',
  },
  filterEmoji: { fontSize: 12, marginRight: 4 },
  filterLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '600' },
  filterLabelActive: { color: '#cfa858' },

  scroll: { flex: 1 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  cardImg: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weaponImg: { width: 80, height: 80 },
  noImg: { color: 'rgba(255,255,255,0.2)', fontSize: 24 },
  cardBody: { padding: 10, gap: 3 },
  weaponName: { color: '#ffffff', fontSize: 12, fontWeight: '700', marginTop: 2 },
  weaponType: { color: 'rgba(255,255,255,0.4)', fontSize: 10 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingTop: 6,
    marginTop: 4,
  },
  statText: { color: 'rgba(255,255,255,0.5)', fontSize: 10 },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loaderText: { color: 'rgba(255,255,255,0.4)', fontSize: 13 },
});
