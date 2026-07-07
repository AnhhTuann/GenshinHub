import { Tabs } from 'expo-router';
import { Home, Users, Sword, Shield, Menu, Star } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../context/ThemeContext';
import '../../lib/i18n';

// A mapping to get actual HEX color from theme enum since Tailwind classes aren't easily extracted here
const THEME_COLORS: Record<string, string> = {
  default: '#cfa858',
  pyro: '#ef4723',
  hydro: '#1e90ff',
  cryo: '#7dd3fc',
  electro: '#a855f7',
  anemo: '#33ccb3',
  geo: '#eab308',
  dendro: '#4ade80'
};

function TabIcon({ Icon, focused, color }: { Icon: any; focused: boolean; color: string }) {
  return (
    <View style={[styles.iconWrap, focused && { backgroundColor: `${color}20` }]}>
      <Icon size={22} color={focused ? color : 'rgba(255,255,255,0.4)'} />
    </View>
  );
}

export default function TabLayout() {
  const { t } = useTranslation();
  const { elementTheme } = useTheme();
  const activeColor = THEME_COLORS[elementTheme] || THEME_COLORS.default;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
        ),
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.35)',
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('Common.home') || 'Home',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Home} focused={focused} color={activeColor} />,
        }}
      />
      <Tabs.Screen
        name="characters"
        options={{
          title: t('Common.characters') || 'Characters',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Users} focused={focused} color={activeColor} />,
        }}
      />
      <Tabs.Screen
        name="weapons"
        options={{
          title: t('Common.weapons') || 'Weapons',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Sword} focused={focused} color={activeColor} />,
        }}
      />
      <Tabs.Screen
        name="tierlist"
        options={{
          title: t('Common.tierlist') || 'Tier List',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Star} focused={focused} color={activeColor} />,
        }}
      />
      <Tabs.Screen
        name="artifacts"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t('Common.language') || 'More', // Or any string like 'More'
          tabBarIcon: ({ focused }) => <TabIcon Icon={Menu} focused={focused} color={activeColor} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: 'rgba(12,12,24,0.7)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  tabItem: {
    paddingVertical: 2,
  },
  iconWrap: {
    width: 38,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
