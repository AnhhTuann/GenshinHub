import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Box,
  Users,
  Search,
  Layers,
  Map,
  ChevronRight,
  Globe,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

const menuItems = [
  {
    href: '/materials',
    label: 'Materials Database',
    desc: 'Browse all ascension materials',
    icon: Box,
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.15)',
    border: 'rgba(74,222,128,0.3)',
  },
  {
    href: '/teams',
    label: 'Meta Teams',
    desc: 'Most powerful team compositions',
    icon: Users,
    color: '#4db8ff',
    bg: 'rgba(77,184,255,0.15)',
    border: 'rgba(77,184,255,0.3)',
  },
  {
    href: '/showcase',
    label: 'Player Showcase',
    desc: 'Enter UID to fetch live player stats',
    icon: Search,
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.15)',
    border: 'rgba(168,85,247,0.3)',
  },
  {
    href: '/banners',
    label: 'Banners History',
    desc: 'History of past and current wishes',
    icon: Layers,
    color: '#cfa858',
    bg: 'rgba(207,168,88,0.15)',
    border: 'rgba(207,168,88,0.3)',
  },
  {
    href: '/tcg',
    label: 'Genius Invokation TCG',
    desc: 'Explore cards and meta decks',
    icon: Map,
    color: '#f87171',
    bg: 'rgba(248,113,113,0.15)',
    border: 'rgba(248,113,113,0.3)',
  },
];

export default function MoreScreen() {
  const router = useRouter();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>MORE</Text>
          <Text style={styles.headerSub}>Explore tools & databases</Text>
        </View>
        <TouchableOpacity onPress={toggleLanguage} style={styles.langBtn}>
          <Globe size={14} color="#cfa858" />
          <Text style={styles.langText}>{i18n.language.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={idx}
              style={styles.card}
              onPress={() => router.push(item.href as any)}
              activeOpacity={0.75}
            >
              <View style={[styles.iconCircle, { backgroundColor: item.bg, borderColor: item.border }]}>
                <Icon size={22} color={item.color} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardLabel}>{item.label}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
              <ChevronRight size={18} color="rgba(255,255,255,0.2)" />
            </TouchableOpacity>
          );
        })}

        {/* Version info */}
        <View style={styles.versionCard}>
          <Text style={styles.versionTitle}>GenshinHub</Text>
          <Text style={styles.versionText}>Your complete Teyvat companion</Text>
          <Text style={styles.versionNum}>v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080810' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(207,168,88,0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(207,168,88,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  langText: { color: '#cfa858', fontSize: 11, fontWeight: '700' },

  scroll: { flex: 1 },
  list: { padding: 16, gap: 10, paddingBottom: 40 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    padding: 14,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: { flex: 1 },
  cardLabel: { color: '#ffffff', fontSize: 14, fontWeight: '700', marginBottom: 3 },
  cardDesc: { color: 'rgba(255,255,255,0.4)', fontSize: 11, lineHeight: 15 },

  versionCard: {
    marginTop: 8,
    backgroundColor: 'rgba(207,168,88,0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(207,168,88,0.15)',
    padding: 20,
    alignItems: 'center',
    gap: 4,
  },
  versionTitle: { color: '#cfa858', fontSize: 18, fontWeight: '900' },
  versionText: { color: 'rgba(255,255,255,0.4)', fontSize: 12 },
  versionNum: { color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 4 },
});
