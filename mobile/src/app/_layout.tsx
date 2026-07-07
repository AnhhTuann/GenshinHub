import '../global.css';
import '../lib/i18n';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { View } from 'react-native';

function RootLayoutNav() {
  const { elementTheme } = useTheme();
  const themeClass = elementTheme === 'default' ? '' : `theme-${elementTheme}`;

  return (
    <View className={`flex-1 bg-dark ${themeClass}`}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
