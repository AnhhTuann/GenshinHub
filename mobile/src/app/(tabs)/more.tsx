import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Users, Search, ChevronRight, Globe, Layers, Map } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

const menuItems = [
  { href: '/materials', label: 'Materials Database', icon: Box, description: 'Browse all ascension materials and resources.' },
  { href: '/teams', label: 'Meta Teams', icon: Users, description: 'View the most popular and powerful team compositions.' },
  { href: '/showcase', label: 'Player Showcase', icon: Search, description: 'Enter a UID to fetch live player stats and builds.' },
  { href: '/banners', label: 'Banners History', icon: Layers, description: 'View the history of past and current wishes.' },
  { href: '/tcg', label: 'Genius Invokation TCG', icon: Map, description: 'Explore cards and meta decks in Teyvat.' },
];

export default function MoreScreen() {
  const router = useRouter();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050508]">
      <View className="px-4 pt-4 pb-2 border-b border-white/10 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-black text-white text-gradient-gold">MORE</Text>
          <Text className="text-white/50 text-xs mt-1 mb-2">Explore more databases and tools</Text>
        </View>
        <TouchableOpacity onPress={toggleLanguage} className="bg-white/10 px-3 py-2 rounded-lg flex-row items-center gap-2">
          <Globe color="white" size={16} />
          <Text className="text-white font-bold text-xs uppercase">{i18n.language}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="flex-col gap-3">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => router.push(item.href as any)}
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex-row items-center gap-4"
              >
                <View className="w-12 h-12 rounded-full bg-black/50 border border-white/5 items-center justify-center">
                  <Icon color="#cfa858" size={24} />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-base mb-1">{item.label}</Text>
                  <Text className="text-white/50 text-xs leading-tight">{item.description}</Text>
                </View>
                <ChevronRight color="rgba(255,255,255,0.3)" size={20} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
