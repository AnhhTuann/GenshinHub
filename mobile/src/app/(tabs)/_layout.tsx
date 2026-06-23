import { Tabs } from 'expo-router';
import { Home, Users, Sword, Shield, Menu, Star } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import '../../lib/i18n';

function TabIcon({ Icon, color, focused }: { Icon: any; color: string; focused: boolean }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Icon size={22} color={focused ? '#cfa858' : 'rgba(255,255,255,0.4)'} />
    </View>
  );
}

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#cfa858',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.35)',
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <TabIcon Icon={Home} color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="characters"
        options={{
          title: 'Characters',
          tabBarIcon: ({ color, focused }) => <TabIcon Icon={Users} color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="weapons"
        options={{
          title: 'Weapons',
          tabBarIcon: ({ color, focused }) => <TabIcon Icon={Sword} color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="tierlist"
        options={{
          title: 'Tier List',
          tabBarIcon: ({ color, focused }) => <TabIcon Icon={Star} color={color} focused={focused} />,
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
          title: 'More',
          tabBarIcon: ({ color, focused }) => <TabIcon Icon={Menu} color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0c0c18',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
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
  iconWrapActive: {
    backgroundColor: 'rgba(207,168,88,0.12)',
  },
});
