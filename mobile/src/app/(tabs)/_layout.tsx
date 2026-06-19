import { Tabs } from 'expo-router';
import { Home, Users, Sword, Shield, Menu } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import '../lib/i18n'; // Ensure i18n is initialized

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0a0a0f',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.1)',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#cfa858',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('Common.home') || 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="characters"
        options={{
          title: t('Common.characters') || 'Characters',
          tabBarIcon: ({ color }) => <Users size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="weapons"
        options={{
          title: 'Weapons',
          tabBarIcon: ({ color, size }) => <Sword color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="artifacts"
        options={{
          title: 'Artifacts',
          tabBarIcon: ({ color, size }) => <Shield color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => <Menu color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
