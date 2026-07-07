import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

interface GlassCardProps extends ViewProps {
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  children: React.ReactNode;
}

export function GlassCard({ intensity = 15, tint = 'dark', className, style, children, ...props }: GlassCardProps) {
  return (
    <View 
      className={`rounded-2xl overflow-hidden border border-white/10 bg-white/5 ${className}`}
      style={style}
      {...props}
    >
      <BlurView intensity={intensity} tint={tint} style={StyleSheet.absoluteFillObject} />
      <View className="p-4 z-10">
        {children}
      </View>
    </View>
  );
}
