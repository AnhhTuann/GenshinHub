import { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  TextInput,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Search } from 'lucide-react-native';
import { useGraphQL } from '@/hooks/useGraphQL';
import { GET_CHARACTERS } from '@/lib/graphql';
import { getElementBg, getElementBorder } from '@/constants/design';
import { SkeletonAvatarGrid } from '@/components/SkeletonLoader';
import EmptyState from '@/components/EmptyState';

interface Character {
  id: string;
  nameEn: string;
  avatarUrl: string;
  tier: string;
  element: string;
  rarity: number;
}

type ListItem =
  | { type: 'header'; tier: string }
  | { type: 'character'; data: Character };

const ELEMENTS = ['All', 'Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];
const ELEMENT_ICONS: Record<string, string> = {
  All: '✦', Pyro: '🔥', Hydro: '💧', Anemo: '🌀',
  Electro: '⚡', Dendro: '🌿', Cryo: '❄️', Geo: '🪨',
};

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useMemo(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function CharactersScreen() {
  const router = useRouter();
  const [filterEl, setFilterEl] = useState('All');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 200);
  const { width } = useWindowDimensions();
  const numColumns = Math.max(4, Math.floor((width - 32) / 80));

  const { data, loading, refetch } = useGraphQL<{ characters: Character[] }>(GET_CHARACTERS);
  const characters = data?.characters ?? [];

  const filtered = useMemo(() => {
    return characters.filter(c => {
      const elOk = filterEl === 'All' || c.element === filterEl;
      const srchOk = !debouncedSearch || c.nameEn.toLowerCase().includes(debouncedSearch.toLowerCase());
      return elOk && srchOk;
    });
  }, [characters, filterEl, debouncedSearch]);

  const flattenedData = useMemo(() => {
    const items: ListItem[] = [];
    filtered.forEach(c => items.push({ type: 'character', data: c }));
    const remainder = filtered.length % numColumns;
    if (remainder !== 0) {
      for (let i = 0; i < numColumns - remainder; i++) {
        items.push({ type: 'character', data: { id: `empty-${i}`, nameEn: '', avatarUrl: '', tier: '', element: '', rarity: 0 } });
      }
    }
    return items;
  }, [filtered, numColumns]);

  const renderItem = useCallback(({ item }: { item: ListItem }) => {
    if (item.type === 'header') return <View />;
    if (!item.data.nameEn) return <View style={{ flex: 1 }} />;
    const elBg = getElementBg(item.data.element);
    const elBorder = getElementBorder(item.data.element);
    return (
      <View style={styles.charCell}>
        <TouchableOpacity
          style={styles.charTouchable}
          onPress={() => router.push(`/characters/${item.data.id}` as any)}
          activeOpacity={0.75}
        >
          <View style={[styles.charAvatar, { backgroundColor: elBg, borderColor: elBorder }]}>
            {item.data.avatarUrl ? (
              <Image source={{ uri: item.data.avatarUrl }} style={styles.charImage} contentFit="cover" />
            ) : (
              <Text style={styles.noImg}>?</Text>
            )}
          </View>
          <Text style={styles.charName} numberOfLines={1}>{item.data.nameEn}</Text>
        </TouchableOpacity>
      </View>
    );
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>CHARACTERS</Text>
          <Text style={styles.headerSub}>
            {loading ? 'Loading...' : `${characters.length} characters`}
          </Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Search size={14} color="rgba(255,255,255,0.35)" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search character..."
          placeholderTextColor="rgba(255,255,255,0.3)"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {/* Element Filter */}
      <View style={styles.filterRow}>
        {/* @ts-expect-error - FlashList types mismatch in React 19 */}
        <FlashList
          data={ELEMENTS}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={80}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item: el }) => {
            const active = filterEl === el;
            return (
              <TouchableOpacity
                onPress={() => setFilterEl(el)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text style={styles.filterEmoji}>{ELEMENT_ICONS[el]}</Text>
                <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>{el}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {loading ? (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 40 }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} tintColor="#cfa858" />}
        >
          <SkeletonAvatarGrid count={20} />
        </ScrollView>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No characters found"
          description={`No results for "${debouncedSearch || filterEl}". Try a different search.`}
        />
      ) : (
        <View style={styles.listWrap}>
          {/* @ts-expect-error - FlashList types mismatch in React 19 */}
          <FlashList
            data={flattenedData}
            renderItem={renderItem}
            numColumns={numColumns}
            estimatedItemSize={72}
            getItemType={item => item.type === 'header' ? 'header' : 'character'}
            overrideItemLayout={(layout, item) => {
              if (item.type === 'header') {
                layout.span = numColumns;
              }
            }}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={refetch} tintColor="#cfa858" />
            }
          />
        </View>
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

  filterRow: { marginBottom: 8 },
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

  charCell: { flex: 1, padding: 3, alignItems: 'center' },
  charTouchable: { alignItems: 'center', width: '100%', maxWidth: 72 },
  charAvatar: {
    width: 58,
    height: 58,
    borderRadius: 14,
    borderWidth: 1.5,
    overflow: 'hidden',
    marginBottom: 4,
  },
  charImage: { width: '100%', height: '100%' },
  noImg: { color: 'rgba(255,255,255,0.3)', fontSize: 18 },
  charName: { color: 'rgba(255,255,255,0.8)', fontSize: 9, textAlign: 'center', fontWeight: '600' },

  listWrap: { flex: 1, paddingHorizontal: 8 },
});
