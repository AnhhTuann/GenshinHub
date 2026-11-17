import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Sword,
  Shield,
  Box,
  ChevronRight,
  Sparkles,
  Star,
} from 'lucide-react-native';
import { useGraphQL } from '@/hooks/useGraphQL';
import { GET_CHARACTERS } from '@/lib/graphql';
import { SkeletonList } from '@/components/SkeletonLoader';
import { GlassCard } from '@/components/GlassCard';
import { SakuraPalette } from '@/constants/design';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const SAKURA = SakuraPalette;

const quickItems = [
  {
    href: '/tierlist',
    label: 'Tier List',
    sub: 'Meta character rankings',
    icon: Star,
    color: SAKURA.accent,
    bg: 'rgba(244,114,156,0.13)',
    border: 'rgba(244,114,156,0.32)',
  },
  {
    href: '/weapons',
    label: 'Weapons',
    sub: 'All weapons',
    icon: Sword,
    color: '#cfa858',
    bg: 'rgba(207,168,88,0.15)',
    border: 'rgba(207,168,88,0.35)',
  },
  {
    href: '/artifacts',
    label: 'Artifacts',
    sub: 'Best artifact sets',
    icon: Shield,
    color: SAKURA.accentLight,
    bg: 'rgba(255,182,202,0.10)',
    border: 'rgba(255,182,202,0.28)',
  },
  {
    href: '/materials',
    label: 'Materials',
    sub: 'Farm guide',
    icon: Box,
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.15)',
    border: 'rgba(74,222,128,0.35)',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { data, loading, refetch } = useGraphQL<{ characters: any[] }>(
    GET_CHARACTERS,
    {},
    { cache: true }
  );

  const totalChars = data?.characters?.length ?? 0;
  const total5Star = data?.characters?.filter((c: any) => c.rarity === 5).length ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            tintColor={SAKURA.accent}
            colors={[SAKURA.accent]}
          />
        }
      >
        {/* Hero Header */}
        <Animated.View entering={FadeInDown.duration(500).delay(40)} style={styles.hero}>
          <View style={styles.heroGlow} />
          <View style={styles.sparkRow}>
            <Sparkles size={14} color={SAKURA.accentLight} />
            <Text style={styles.sparkText}>Genshin Impact Guide</Text>
          </View>
          <Text style={styles.heroTitle}>GenshinHub</Text>
          <Text style={styles.heroSub}>Your complete Teyvat companion</Text>
        </Animated.View>

        {/* Stats Row */}
        {loading ? (
          <View style={styles.statsRow}>
            {[0, 1].map(i => (
              <GlassCard key={i} style={{ flex: 1 }}>
                <View style={styles.statSkeleton} />
              </GlassCard>
            ))}
          </View>
        ) : totalChars > 0 ? (
          <View style={styles.statsRow}>
            <GlassCard style={styles.statCard}>
              <Text style={styles.statValue}>{totalChars}</Text>
              <Text style={styles.statLabel}>Characters</Text>
            </GlassCard>
            <GlassCard style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#ffd54f' }]}>{total5Star}</Text>
              <Text style={styles.statLabel}>5★ Legends</Text>
            </GlassCard>
          </View>
        ) : null}

        {/* Quick Access Grid */}
        <Text style={styles.sectionLabel}>Quick Access</Text>
        <View style={styles.grid}>
          {quickItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Animated.View
                key={idx}
                entering={FadeInDown.duration(420).delay(100 + idx * 70)}
                style={styles.gridItem}
              >
                <TouchableOpacity
                  style={[styles.gridCard, { backgroundColor: item.bg, borderColor: item.border }]}
                  onPress={() => router.push(item.href as any)}
                  activeOpacity={0.72}
                >
                  <View style={[styles.iconCircle, { backgroundColor: item.bg, borderColor: item.border }]}>
                    <Icon size={24} color={item.color} />
                  </View>
                  <Text style={styles.cardLabel}>{item.label}</Text>
                  <Text style={styles.cardSub}>{item.sub}</Text>
                  <ChevronRight size={14} color="rgba(255,255,255,0.3)" style={styles.cardArrow} />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Welcome Card */}
        <Animated.View entering={FadeInDown.duration(460).delay(380)}>
          <GlassCard style={styles.welcomeCard} intensity={25}>
            <Text style={styles.welcomeTitle}>Welcome, Traveler! 🌏</Text>
            <Text style={styles.welcomeText}>
              Explore in-depth character builds, weapon rankings, artifact sets, and team compositions to master your journey through Teyvat.
            </Text>
          </GlassCard>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const GOLD = '#cfa858';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SAKURA.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 40 },

  hero: {
    paddingVertical: 32,
    alignItems: 'center',
    marginBottom: 8,
  },
  heroGlow: {
    position: 'absolute',
    top: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(244,114,156,0.10)',
  },
  sparkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    backgroundColor: 'rgba(244,114,156,0.10)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(244,114,156,0.28)',
  },
  sparkText: { color: SAKURA.accentLight, fontSize: 11, fontWeight: '600', letterSpacing: 1 },
  heroTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -1,
    textShadowColor: 'rgba(244,114,156,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  heroSub: { color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 6 },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,182,202,0.12)',
    padding: 14,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 26,
    fontWeight: '900',
    color: GOLD,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statSkeleton: {
    width: 60,
    height: 30,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  sectionLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 8,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  gridItem: { width: (width - 44) / 2 },
  gridCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    position: 'relative',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardLabel: { color: '#ffffff', fontSize: 15, fontWeight: '700', marginBottom: 2 },
  cardSub: { color: 'rgba(255,255,255,0.45)', fontSize: 11 },
  cardArrow: { position: 'absolute', top: 16, right: 16 },

  welcomeCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,182,202,0.14)',
    padding: 20,
  },
  welcomeTitle: { color: '#ffffff', fontWeight: '700', fontSize: 15, marginBottom: 8 },
  welcomeText: { color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 20 },
});
