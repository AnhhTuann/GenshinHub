import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';

interface Character {
  id: string;
  nameEn: string;
  avatarUrl: string;
  tier: string;
  element: string;
}

export default function CharactersScreen() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphQL(GET_CHARACTERS);
        if (data.characters) {
          // Sort by tier (SS -> S -> A -> B -> C -> Unranked)
          const tierOrder: Record<string, number> = { 'SS': 1, 'S': 2, 'A': 3, 'B': 4, 'C': 5, 'Unranked': 6 };
          const sorted = [...data.characters].sort((a, b) => {
            return (tierOrder[a.tier || 'Unranked'] || 99) - (tierOrder[b.tier || 'Unranked'] || 99);
          });
          setCharacters(sorted);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const renderTierGroup = (tier: string) => {
    const chars = characters.filter(c => (c.tier || 'Unranked') === tier);
    if (chars.length === 0) return null;

    return (
      <View key={tier} className="mb-6">
        <View className="bg-white/10 px-3 py-1.5 rounded-md self-start mb-3">
          <Text className="text-white font-bold text-sm">Tier {tier}</Text>
        </View>
        <View className="flex-row flex-wrap gap-3">
          {chars.map(c => (
              <TouchableOpacity
                key={c.id}
                className="items-center w-[70px]"
                onPress={() => router.push(`/characters/${c.id}` as any)}
              >
                <View className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 overflow-hidden mb-1">
                  {c.avatarUrl ? (
                    <Image source={{ uri: c.avatarUrl }} className="w-full h-full" resizeMode="cover" />
                  ) : (
                    <View className="flex-1 items-center justify-center bg-gray-800">
                      <Text className="text-white/50 text-[10px]">No Img</Text>
                    </View>
                  )}
                </View>
                <Text className="text-white text-[10px] text-center font-medium line-clamp-1" numberOfLines={1}>
                  {c.nameEn}
                </Text>
              </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050508]">
      <View className="px-4 pt-4 pb-2 border-b border-white/10">
        <Text className="text-2xl font-black text-white text-gradient-gold">TIER LIST</Text>
        <Text className="text-white/50 text-xs mt-1 mb-2">Rankings of characters</Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#cfa858" />
        </View>
      ) : (
        <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
          {['SS', 'S', 'A', 'B', 'C', 'Unranked'].map(renderTierGroup)}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
