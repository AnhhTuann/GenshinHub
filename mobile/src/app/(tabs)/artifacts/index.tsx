import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { fetchGraphQL, GET_ARTIFACTS } from '@/lib/graphql';

interface Artifact {
  id: string;
  nameEn: string;
  iconUrl: string;
  piece2DescEn: string;
  piece4DescEn: string;
  rarityList?: number[];
}

export default function ArtifactsScreen() {
  const router = useRouter();
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchGraphQL(GET_ARTIFACTS)
      .then(data => {
        if (data.artifacts) {
          const sorted = [...data.artifacts].sort((a, b) => a.nameEn.localeCompare(b.nameEn));
          setArtifacts(sorted);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = artifacts.filter(a =>
    !search || a.nameEn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ARTIFACTS</Text>
        <Text style={styles.headerSub}>All artifact sets</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Search size={14} color="rgba(255,255,255,0.35)" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search artifact set..."
          placeholderTextColor="rgba(255,255,255,0.3)"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#cfa858" />
          <Text style={styles.loaderText}>Loading artifacts...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {filtered.map(a => (
            <TouchableOpacity
              key={a.id}
              style={styles.card}
              onPress={() => router.push(`/artifacts/${a.id}` as any)}
              activeOpacity={0.75}
            >
              {/* Icon */}
              <View style={styles.iconWrap}>
                {a.iconUrl ? (
                  <Image source={{ uri: a.iconUrl }} style={styles.icon} contentFit="contain" />
                ) : (
                  <Text style={styles.noIcon}>🏺</Text>
                )}
              </View>

              {/* Info */}
              <View style={styles.info}>
                <Text style={styles.name}>{a.nameEn}</Text>

                {a.piece2DescEn && (
                  <View style={styles.bonusRow}>
                    <View style={styles.pieceBadge}>
                      <Text style={styles.pieceNum}>2</Text>
                    </View>
                    <Text style={styles.bonusText} numberOfLines={2}>{a.piece2DescEn}</Text>
                  </View>
                )}

                {a.piece4DescEn && (
                  <View style={styles.bonusRow}>
                    <View style={[styles.pieceBadge, styles.pieceBadge4]}>
                      <Text style={styles.pieceNum}>4</Text>
                    </View>
                    <Text style={styles.bonusText} numberOfLines={2}>{a.piece4DescEn}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
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

  scroll: { flex: 1 },
  list: { padding: 16, gap: 12, paddingBottom: 40 },

  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 14,
    gap: 14,
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: 'rgba(207,168,88,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(207,168,88,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: { width: 54, height: 54 },
  noIcon: { fontSize: 28 },

  info: { flex: 1, gap: 8 },
  name: { color: '#ffffff', fontSize: 14, fontWeight: '700' },

  bonusRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  pieceBadge: {
    width: 18,
    height: 18,
    borderRadius: 5,
    backgroundColor: 'rgba(207,168,88,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(207,168,88,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  pieceBadge4: {
    backgroundColor: 'rgba(168,85,247,0.2)',
    borderColor: 'rgba(168,85,247,0.5)',
  },
  pieceNum: { color: '#cfa858', fontSize: 10, fontWeight: '800' },
  bonusText: { color: 'rgba(255,255,255,0.55)', fontSize: 11, lineHeight: 16, flex: 1 },

  loader: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loaderText: { color: 'rgba(255,255,255,0.4)', fontSize: 13 },
});
