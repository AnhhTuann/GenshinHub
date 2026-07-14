import { View, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

const BG = 'rgba(255,255,255,0.06)';
const HIGHLIGHT = 'rgba(255,255,255,0.12)';

function SkeletonBox({ width, height, borderRadius = 8, style }: {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: object;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: BG,
          opacity,
        },
        style,
      ]}
    />
  );
}

/** Skeleton row with icon + two text lines */
export function SkeletonCard() {
  return (
    <View style={styles.card}>
      <SkeletonBox width={48} height={48} borderRadius={14} />
      <View style={styles.textGroup}>
        <SkeletonBox width={140} height={13} borderRadius={6} />
        <SkeletonBox width={90} height={10} borderRadius={6} style={{ marginTop: 7 }} />
      </View>
    </View>
  );
}

/** Square avatar skeleton (characters / weapons grid) */
export function SkeletonAvatar({ size = 58, radius = 14 }: { size?: number; radius?: number }) {
  return <SkeletonBox width={size} height={size} borderRadius={radius} />;
}

/** Full-width banner skeleton */
export function SkeletonBanner() {
  return <SkeletonBox width="100%" height={120} borderRadius={16} />;
}

/** Repeat N skeleton cards */
export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}

/** 2-column avatar grid skeleton */
export function SkeletonAvatarGrid({ count = 12 }: { count?: number }) {
  return (
    <View style={styles.avatarGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.avatarCell}>
          <SkeletonAvatar />
          <SkeletonBox width={45} height={8} borderRadius={4} style={{ marginTop: 5 }} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 14,
    marginBottom: 10,
  },
  textGroup: { flex: 1, gap: 0 },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    gap: 3,
  },
  avatarCell: {
    alignItems: 'center',
    padding: 3,
    width: 64,
  },
});
