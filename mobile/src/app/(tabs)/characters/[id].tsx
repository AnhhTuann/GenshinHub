import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchGraphQL, GET_CHARACTER_BY_ID } from '@/lib/graphql';
import { ChevronLeft, Star } from 'lucide-react-native';

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphQL(GET_CHARACTER_BY_ID, { id });
        if (data.character) {
          setCharacter(data.character);
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

  if (!character) {
    return (
      <View className="flex-1 bg-[#050508] items-center justify-center">
        <Text className="text-white">Character not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#050508]" bounces={false}>
      {/* Splash Art Header */}
      <View className="h-96 w-full relative">
        {character.splashArtUrl && (
          <Image source={{ uri: character.splashArtUrl }} className="w-full h-full absolute" contentFit="cover" />
        )}
        {/* Gradient Overlay */}
        <View className="absolute inset-0 bg-black/40" />
        <View className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050508] to-transparent" />
        
        <SafeAreaView className="absolute inset-x-0 top-0 px-4 pt-2">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-black/50 rounded-full items-center justify-center border border-white/10">
            <ChevronLeft color="white" size={24} />
          </TouchableOpacity>
        </SafeAreaView>

        <View className="absolute bottom-6 left-4 right-4">
          <View className="flex-row items-center gap-2 mb-1">
            <View className="flex-row">
              {Array.from({ length: character.rarity }).map((_, i) => (
                <Star key={i} size={16} color="#cfa858" fill="#cfa858" />
              ))}
            </View>
            <Text className="text-white/80 font-bold text-xs uppercase">{character.element} • {character.weapon}</Text>
          </View>
          <Text className="text-4xl font-black text-white text-gradient-gold">{character.nameEn}</Text>
          <Text className="text-white/60 text-base font-medium">{character.titleEn}</Text>
        </View>
      </View>

      <View className="px-4 pb-12 gap-8">
        {/* Description */}
        <View>
          <Text className="text-white/80 text-sm leading-relaxed">{character.descriptionEn}</Text>
        </View>

        {/* Base Stats */}
        <View className="bg-white/5 border border-white/10 rounded-xl p-4">
          <Text className="text-white font-bold text-lg mb-3">Base Stats (Lv. 90)</Text>
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-white/50 text-xs mb-1">HP</Text>
              <Text className="text-white font-bold">{Math.round(character.baseHp)}</Text>
            </View>
            <View className="items-center flex-1 border-x border-white/10">
              <Text className="text-white/50 text-xs mb-1">ATK</Text>
              <Text className="text-white font-bold">{Math.round(character.baseAtk)}</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-white/50 text-xs mb-1">DEF</Text>
              <Text className="text-white font-bold">{Math.round(character.baseDef)}</Text>
            </View>
          </View>
        </View>

        {/* Best Weapons */}
        <View>
          <Text className="text-white font-bold text-lg mb-4 text-gradient-gold">Best Weapons</Text>
          <View className="gap-3">
            {character.bestWeapons?.map((w: any, idx: number) => (
              <View key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 flex-row items-center gap-3">
                <View className="w-12 h-12 bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                  {w.iconUrl && <Image source={{ uri: w.iconUrl }} className="w-full h-full" contentFit="contain" />}
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-sm">{w.nameEn}</Text>
                  <Text className="text-[#cfa858] text-xs mt-0.5">{w.subStat}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Best Artifacts */}
        <View>
          <Text className="text-white font-bold text-lg mb-4 text-gradient-gold">Best Artifacts</Text>
          <View className="gap-3">
            {character.bestArtifacts?.map((a: any, idx: number) => (
              <View key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 flex-row items-center gap-3">
                <View className="w-12 h-12 bg-yellow-500/20 rounded-lg border border-yellow-500/50 overflow-hidden items-center justify-center">
                  {a.iconUrl ? <Image source={{ uri: a.iconUrl }} className="w-10 h-10" contentFit="contain" /> : <Text className="text-white/30 text-[10px]">No Icon</Text>}
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-sm">{a.setNameEn}</Text>
                  <Text className="text-white/60 text-xs mt-0.5">{a.pieces}-Piece Set</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Ascension Materials Summary */}
        {character.ascensionMats && character.ascensionMats.length > 0 && (
          <View>
            <Text className="text-white font-bold text-lg mb-4 text-gradient-gold">Ascension Materials</Text>
            <View className="bg-white/5 border border-white/10 rounded-xl p-4">
              {character.ascensionMats.map((lv: any, idx: number) => (
                <View key={idx} className="mb-4 last:mb-0">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-[#cfa858] font-bold text-sm">{lv.level}</Text>
                    <Text className="text-white/50 text-xs">{lv.mora} Mora</Text>
                  </View>
                  <View className="flex-row flex-wrap gap-2">
                    {lv.items.map((item: any, i: number) => (
                      <View key={i} className="bg-black/30 rounded-lg px-2 py-1 border border-white/5">
                        <Text className="text-white/80 text-xs">{item.materialId.replace(/_/g, ' ')} x{item.count}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Teams */}
        {character.teams && character.teams.length > 0 && (
          <View>
            <Text className="text-white font-bold text-lg mb-4 text-gradient-gold">Recommended Teams</Text>
            <View className="gap-4">
              {character.teams.map((team: any, idx: number) => (
                <View key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <View className="flex-row items-center justify-between mb-2 border-b border-white/5 pb-2">
                    <Text className="text-white font-bold text-base">{team.name}</Text>
                    <View className="bg-[#cfa858]/20 px-2 py-1 rounded">
                      <Text className="text-[#cfa858] font-bold text-xs">{team.rank}</Text>
                    </View>
                  </View>
                  <Text className="text-white/60 text-xs mb-4 leading-relaxed">{team.description}</Text>
                  <View className="flex-row gap-2">
                    {team.members.map((m: any, i: number) => (
                      <View key={i} className="flex-1 items-center bg-black/30 rounded-lg p-2 border border-white/5">
                        <Text className="text-white text-xs font-bold mb-1 text-center" numberOfLines={1}>{m.characterId}</Text>
                        <Text className="text-white/40 text-[10px] text-center">{m.role}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
