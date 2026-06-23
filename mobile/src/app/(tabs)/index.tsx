import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import {
  Users,
  Sword,
  Shield,
  Box,
  ChevronRight,
  Sparkles,
  Star,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const quickItems = [
  {
    href: '/tierlist',
    label: 'Tier List',
    sub: 'Meta character rankings',
    icon: Star,
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.15)',
    border: 'rgba(168,85,247,0.35)',
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
    color: '#4db8ff',
    bg: 'rgba(77,184,255,0.15)',
    border: 'rgba(77,184,255,0.35)',
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Header */}
        <View style={styles.hero}>
          <View style={styles.heroGlow} />
          <View style={styles.sparkRow}>
            <Sparkles size={14} color="#cfa858" />
            <Text style={styles.sparkText}>Genshin Impact Guide</Text>
          </View>
          <Text style={styles.heroTitle}>GenshinHub</Text>
          <Text style={styles.heroSub}>Your complete Teyvat companion</Text>
        </View>

        {/* Quick Access Grid */}
        <Text style={styles.sectionLabel}>Quick Access</Text>
        <View style={styles.grid}>
          {quickItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.gridCard, { backgroundColor: item.bg, borderColor: item.border }]}
                onPress={() => router.push(item.href as any)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconCircle, { backgroundColor: item.bg, borderColor: item.border }]}>
                  <Icon size={24} color={item.color} />
                </View>
                <Text style={styles.cardLabel}>{item.label}</Text>
                <Text style={styles.cardSub}>{item.sub}</Text>
                <ChevronRight size={14} color="rgba(255,255,255,0.3)" style={styles.cardArrow} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome, Traveler! 🌏</Text>
          <Text style={styles.welcomeText}>
            Explore in-depth character builds, weapon rankings, artifact sets, and team compositions to master your journey through Teyvat.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const GOLD = '#cfa858';
const GOLD_LIGHT = '#f5d399';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080810' },
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
    backgroundColor: 'rgba(207,168,88,0.08)',
  },
  sparkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    backgroundColor: 'rgba(207,168,88,0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(207,168,88,0.3)',
  },
  sparkText: { color: GOLD, fontSize: 11, fontWeight: '600', letterSpacing: 1 },
  heroTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -1,
    textShadowColor: 'rgba(207,168,88,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  heroSub: { color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 6 },

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
  gridCard: {
    width: (width - 44) / 2,
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
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
  },
  welcomeTitle: { color: '#ffffff', fontWeight: '700', fontSize: 15, marginBottom: 8 },
  welcomeText: { color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 20 },
});
