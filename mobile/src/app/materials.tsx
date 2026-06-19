import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchGraphQL, GET_MATERIALS } from '@/lib/graphql';

interface Material {
  id: string;
  nameEn: string;
  type: string;
  rarity: number;
  iconUrl: string;
}

export default function MaterialsScreen() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphQL(GET_MATERIALS);
        if (data.materials) {
          const sorted = [...data.materials].sort((a, b) => a.nameEn.localeCompare(b.nameEn));
          setMaterials(sorted);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#050508]">
      <View className="px-4 pt-4 pb-2 border-b border-white/10">
        <Text className="text-2xl font-black text-white text-gradient-gold">MATERIALS</Text>
        <Text className="text-white/50 text-xs mt-1 mb-2">Ascension materials database</Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#cfa858" />
        </View>
      ) : (
        <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="flex-row flex-wrap gap-4 justify-between">
            {materials.map(m => (
              <View key={m.id} className="w-[30%] bg-white/5 rounded-xl border border-white/10 overflow-hidden mb-2 items-center p-2">
                <View className="w-16 h-16 mb-2 items-center justify-center">
                  {m.iconUrl ? (
                    <Image source={{ uri: m.iconUrl }} className="w-14 h-14" resizeMode="contain" />
                  ) : (
                    <Text className="text-white/30 text-[10px]">No Icon</Text>
                  )}
                </View>
                <Text className="text-white font-bold text-xs text-center line-clamp-2" numberOfLines={2}>{m.nameEn}</Text>
                <Text className="text-white/40 text-[10px] text-center mt-1">{m.type}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
