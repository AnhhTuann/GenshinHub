import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { fetchGraphQL, GET_WEAPONS } from '@/lib/graphql';

interface Weapon {
  id: string;
  nameEn: string;
  rarity: number;
  type: string;
  iconUrl: string;
  baseAtk: number;
  subStat: string;
  subStatValue: string;
}

export default function WeaponsScreen() {
  const router = useRouter();
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphQL(GET_WEAPONS);
        if (data.weapons) {
          const sorted = [...data.weapons].sort((a, b) => {
            if (a.rarity !== b.rarity) return b.rarity - a.rarity;
            return a.nameEn.localeCompare(b.nameEn);
          });
          setWeapons(sorted);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getRarityColor = (rarity: number) => {
    switch (rarity) {
      case 5: return 'border-yellow-500 bg-yellow-500/20';
      case 4: return 'border-purple-500 bg-purple-500/20';
      case 3: return 'border-blue-500 bg-blue-500/20';
      case 2: return 'border-green-500 bg-green-500/20';
      default: return 'border-gray-500 bg-gray-500/20';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050508]">
      <View className="px-4 pt-4 pb-2 border-b border-white/10">
        <Text className="text-2xl font-black text-white text-gradient-gold">WEAPONS</Text>
        <Text className="text-white/50 text-xs mt-1 mb-2">Database of all weapons</Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#cfa858" />
        </View>
      ) : (
        <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="flex-row flex-wrap gap-4 justify-between">
            {weapons.map(w => (
              <TouchableOpacity 
                key={w.id} 
                className="w-[47%] bg-white/5 rounded-xl border border-white/10 overflow-hidden mb-2"
                onPress={() => router.push(`/weapons/${w.id}` as any)}
              >
                <View className={`h-24 w-full items-center justify-center border-b ${getRarityColor(w.rarity)}`}>
                  {w.iconUrl ? (
                    <Image source={{ uri: w.iconUrl }} className="w-20 h-20" contentFit="contain" />
                  ) : (
                    <Text className="text-white/30 text-xs">No Icon</Text>
                  )}
                </View>
                <View className="p-3">
                  <Text className="text-white font-bold text-sm line-clamp-1" numberOfLines={1}>{w.nameEn}</Text>
                  <Text className="text-white/50 text-xs mt-1">{w.type}</Text>
                  <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-gray-400 text-xs text-center w-1/2 border-r border-white/10">ATK {w.baseAtk}</Text>
                    <Text className="text-gray-400 text-xs text-center w-1/2">{w.subStatValue}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
