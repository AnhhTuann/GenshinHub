import React from 'react';
import { Pressable, Text, View, StyleSheet, PressableProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PremiumButtonProps extends PressableProps {
  title: string;
  icon?: React.ReactNode;
  themeMain?: string;
  themeLight?: string;
}

export function PremiumButton({ 
  title, 
  icon, 
  themeMain = 'var(--theme-main)', 
  themeLight = 'var(--theme-light)',
  style,
  ...props 
}: PremiumButtonProps) {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const glowStyle = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value,
    };
  });

  const handlePressIn = (e: any) => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
    glowOpacity.value = withTiming(1, { duration: 150 });
    props.onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    glowOpacity.value = withTiming(0, { duration: 300 });
    props.onPressOut?.(e);
  };

  return (
    <AnimatedPressable
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, style]}
      className="relative items-center justify-center rounded-full overflow-hidden"
    >
      {/* Background Gradient */}
      <LinearGradient
        colors={[themeMain as any, themeLight as any]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Press Glow Overlay */}
      <Animated.View style={[StyleSheet.absoluteFillObject, glowStyle]} className="bg-white/30" />

      {/* Content */}
      <View className="flex-row items-center px-6 py-4">
        {icon && <View className="mr-2">{icon}</View>}
        <Text className="text-white text-base font-bold uppercase tracking-widest text-shadow-sm shadow-black">
          {title}
        </Text>
      </View>
    </AnimatedPressable>
  );
}
