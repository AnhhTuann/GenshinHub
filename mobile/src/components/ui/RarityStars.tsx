import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { RARITY_CONFIG } from '@/constants/design';

interface RarityStarsProps {
  rarity: number;
  size?: number;
}

export function RarityStars({ rarity, size = 14 }: RarityStarsProps) {
  const config = RARITY_CONFIG[rarity] || RARITY_CONFIG[3];
  return (
    <View style={styles.row}>
      {Array.from({ length: rarity }).map((_, i) => (
        <Star key={i} size={size} color="#cfa858" fill="#cfa858" style={{ marginRight: 1 }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
