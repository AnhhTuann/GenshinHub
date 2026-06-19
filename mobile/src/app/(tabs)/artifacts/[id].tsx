import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchGraphQL, GET_ARTIFACT_SET } from '@/lib/graphql';
import { ChevronLeft, Star } from 'lucide-react-native';

export default function ArtifactDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [artifact, setArtifact] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphQL(GET_ARTIFACT_SET, { id });
        if (data.artifactSet) {
          setArtifact(data.artifactSet);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadData();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 bg-[#050508] items-center justify-center">
        <ActivityIndicator size="large" color="#cfa858" />
      </View>
    );
  }

  if (!artifact) {
    return (
      <View className="flex-1 bg-[#050508] items-center justify-center">
        <Text className="text-white">Artifact not found</Text>
      </View>
    );
  }

  const maxRarity = artifact.rarityList ? Math.max(...artifact.rarityList) : 5;

  return (
    <SafeAreaView className="flex-1 bg-[#050508]">
      <View className="px-4 py-3 flex-row items-center gap-4 border-b border-white/10">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white/5 rounded-full items-center justify-center">
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">Artifact Details</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="w-full h-48 rounded-xl border items-center justify-center mb-6 bg-yellow-500/20 border-yellow-500">
          {artifact.iconUrl && (
            <Image source={{ uri: artifact.iconUrl }} className="w-32 h-32" resizeMode="contain" />
          )}
        </View>

        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-1">
            <View className="flex-row">
              {Array.from({ length: maxRarity }).map((_, i) => (
                <Star key={i} size={16} color="#cfa858" fill="#cfa858" />
              ))}
            </View>
            <Text className="text-white/50 text-sm">Max Rarity</Text>
          </View>
          <Text className="text-3xl font-black text-white text-gradient-gold">{artifact.nameEn}</Text>
        </View>

        <View className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <Text className="text-[#cfa858] font-bold text-base mb-2">2-Piece Bonus</Text>
          <Text className="text-white/80 text-sm leading-relaxed">{artifact.piece2DescEn}</Text>
        </View>

        {artifact.piece4DescEn && (
          <View className="bg-white/5 border border-white/10 rounded-xl p-4">
            <Text className="text-[#cfa858] font-bold text-base mb-2">4-Piece Bonus</Text>
            <Text className="text-white/80 text-sm leading-relaxed">{artifact.piece4DescEn}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
