import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sword, Star, Trophy, Users, Box, Search, Calendar } from 'lucide-react-native';

const shortcuts = [
  { href: '/characters', label: 'Characters', icon: Sword },
  { href: '/characters', label: 'Tier List', icon: Trophy },
  { href: '/materials', label: 'Materials', icon: Box },
  { href: '/teams', label: 'Teams', icon: Users },
  { href: '/showcase', label: 'Showcase', icon: Search },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#050508]">
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Branding */}
        <View className="mt-8 mb-6">
          <Text className="text-4xl font-black text-white uppercase tracking-tight text-gradient-gold">
            GenshinHub
          </Text>
          <Text className="text-white/60 font-medium text-base mt-1">Your best Teyvat guide!</Text>
        </View>

        {/* Welcome Box */}
        <View className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
          <Text className="text-white/80 leading-relaxed text-sm">
            Welcome, traveler! Here you can find the latest game news and various useful information, including info about characters, weapons, materials, and various other things, including tools for making your journey the best!
          </Text>
        </View>

        {/* Shortcuts */}
        <View>
          <Text className="text-white font-bold text-lg mb-4 text-gradient-gold">Shortcuts</Text>
          <View className="flex-row flex-wrap gap-3">
            {shortcuts.map((s, idx) => {
              const Icon = s.icon;
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => router.push(s.href)}
                  className="flex-row items-center gap-2 bg-white/5 px-4 py-3 rounded-lg border border-white/5"
                >
                  <Icon size={16} color="#cfa858" />
                  <Text className="text-white font-bold text-sm">{s.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
