import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchGraphQL, GET_WEAPON_BY_ID } from '@/lib/graphql';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RARITY_CONFIG } from '@/constants/design';
import { RarityStars } from '@/components/ui/RarityStars';

export default function WeaponDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [weapon, setWeapon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchGraphQL(GET_WEAPON_BY_ID, { id })
      .then(data => { if (data.weapon) setWeapon(data.weapon); })
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

  if (!weapon) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Weapon not found</Text>
      </View>
    );
  }

  const cfg = RARITY_CONFIG[weapon.rarity] || RARITY_CONFIG[3];

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft color="white" size={22} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Weapon Details</Text>
        <View style={{ width: 40 }} />
      </SafeAreaView>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Weapon Icon Hero */}
        <View style={[styles.iconHero, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
          <View style={[styles.iconGlow, { backgroundColor: cfg.glow }]} />
          {weapon.iconUrl ? (
            <Image source={{ uri: weapon.iconUrl }} style={styles.weapIcon} contentFit="contain" />
          ) : null}
        </View>

        {/* Name & Rarity */}
        <View style={styles.nameSection}>
          <RarityStars rarity={weapon.rarity} size={16} />
          <Text style={styles.weaponName}>{weapon.nameEn}</Text>
          <Text style={styles.weaponType}>{weapon.type}</Text>
        </View>

        {/* Stats */}
        <View style={[styles.statsCard, { borderColor: cfg.border }]}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Base ATK</Text>
              <Text style={styles.statValue}>{weapon.baseAtk}</Text>
              <Text style={styles.statSub}>(Lv. 90)</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>{weapon.subStat || 'Substat'}</Text>
              <Text style={styles.statValue}>{weapon.subStatValue || 'N/A'}</Text>
              <Text style={styles.statSub}>(Lv. 90)</Text>
            </View>
          </View>
        </View>

        {/* Passive */}
        {weapon.passiveNameEn && (
          <View style={styles.passiveCard}>
            <View style={styles.passiveHeader}>
              <Text style={styles.passiveName}>{weapon.passiveNameEn}</Text>
              {weapon.refinement && (
                <View style={styles.refineBadge}>
                  <Text style={styles.refineText}>R{weapon.refinement}</Text>
                </View>
              )}
            </View>
            <Text style={styles.passiveDesc}>{weapon.passiveDescEn}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#080810' },
  center: { flex: 1, backgroundColor: '#080810', alignItems: 'center', justifyContent: 'center' },
  loaderText: { color: 'rgba(255,255,255,0.4)', marginTop: 12 },
  notFound: { color: '#ffffff', fontSize: 16 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  topTitle: { color: '#ffffff', fontSize: 16, fontWeight: '700' },

  scroll: { flex: 1 },
  content: { padding: 20, gap: 20, paddingBottom: 60 },

  iconHero: {
    height: 200,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.6,
  },
  weapIcon: { width: 150, height: 150 },

  nameSection: { gap: 6 },
  weaponName: { color: '#ffffff', fontSize: 28, fontWeight: '900' },
  weaponType: { color: 'rgba(255,255,255,0.4)', fontSize: 13 },

  statsCard: {
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 16,
  },
  statRow: { flexDirection: 'row', alignItems: 'center' },
  statItem: { flex: 1, alignItems: 'center', gap: 2 },
  statLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600' },
  statValue: { color: '#ffffff', fontSize: 24, fontWeight: '900' },
  statSub: { color: 'rgba(255,255,255,0.3)', fontSize: 10 },
  divider: { width: 1, height: 50, backgroundColor: 'rgba(255,255,255,0.08)' },

  passiveCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(207,168,88,0.25)',
    backgroundColor: 'rgba(207,168,88,0.05)',
    padding: 16,
    gap: 10,
  },
  passiveHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  passiveName: { color: '#cfa858', fontSize: 15, fontWeight: '800', flex: 1 },
  refineBadge: {
    backgroundColor: 'rgba(207,168,88,0.15)',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: 'rgba(207,168,88,0.4)',
  },
  refineText: { color: '#cfa858', fontSize: 10, fontWeight: '700' },
  passiveDesc: { color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 20 },
});
