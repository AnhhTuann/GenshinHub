import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { fetchGraphQL, GET_ARTIFACTS } from '@/lib/graphql';

interface Artifact {
  id: string;
  nameEn: string;
  iconUrl: string;
  piece2DescEn: string;
  piece4DescEn: string;
}

export default function ArtifactsScreen() {
  const router = useRouter();
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphQL(GET_ARTIFACTS);
        if (data.artifacts) {
          const sorted = [...data.artifacts].sort((a, b) => a.nameEn.localeCompare(b.nameEn));
          setArtifacts(sorted);
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
        <Text className="text-2xl font-black text-white text-gradient-gold">ARTIFACTS</Text>
        <Text className="text-white/50 text-xs mt-1 mb-2">Database of all artifacts</Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#cfa858" />
        </View>
      ) : (
        <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="flex-col gap-4">
            {artifacts.map(a => (
              <TouchableOpacity 
                key={a.id} 
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden p-4 flex-row gap-4"
                onPress={() => router.push(`/artifacts/${a.id}` as any)}
              >
                <View className="w-20 h-20 bg-yellow-500/20 border border-yellow-500 rounded-xl items-center justify-center">
                  {a.iconUrl ? (
                    <Image source={{ uri: a.iconUrl }} className="w-16 h-16" resizeMode="contain" />
                  ) : (
                    <Text className="text-white/30 text-xs">No Icon</Text>
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-base mb-2">{a.nameEn}</Text>
                  <View className="bg-black/30 p-2 rounded mb-2">
                    <Text className="text-[#cfa858] text-xs font-bold mb-1">2-Piece:</Text>
                    <Text className="text-white/80 text-xs leading-tight">{a.piece2DescEn}</Text>
                  </View>
                  <View className="bg-black/30 p-2 rounded">
                    <Text className="text-[#cfa858] text-xs font-bold mb-1">4-Piece:</Text>
                    <Text className="text-white/80 text-xs leading-tight">{a.piece4DescEn}</Text>
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
