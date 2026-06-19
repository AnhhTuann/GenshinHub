import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchGraphQL, GET_WEAPON_BY_ID } from '@/lib/graphql';
import { ChevronLeft, Star } from 'lucide-react-native';

export default function WeaponDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [weapon, setWeapon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphQL(GET_WEAPON_BY_ID, { id });
        if (data.weapon) {
          setWeapon(data.weapon);
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

  if (!weapon) {
    return (
      <View className="flex-1 bg-[#050508] items-center justify-center">
        <Text className="text-white">Weapon not found</Text>
      </View>
    );
  }

  const getRarityColor = (rarity: number) => {
    switch (rarity) {
      case 5: return 'bg-yellow-500/20 border-yellow-500';
      case 4: return 'bg-purple-500/20 border-purple-500';
      case 3: return 'bg-blue-500/20 border-blue-500';
      case 2: return 'bg-green-500/20 border-green-500';
      default: return 'bg-gray-500/20 border-gray-500';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050508]">
      <View className="px-4 py-3 flex-row items-center gap-4 border-b border-white/10">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white/5 rounded-full items-center justify-center">
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">Weapon Details</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className={`w-full h-48 rounded-xl border items-center justify-center mb-6 ${getRarityColor(weapon.rarity)}`}>
          {weapon.iconUrl && (
            <Image source={{ uri: weapon.iconUrl }} className="w-32 h-32" resizeMode="contain" />
          )}
        </View>

        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-1">
            <View className="flex-row">
              {Array.from({ length: weapon.rarity }).map((_, i) => (
                <Star key={i} size={16} color="#cfa858" fill="#cfa858" />
              ))}
            </View>
            <Text className="text-white/50 text-sm">{weapon.type}</Text>
          </View>
          <Text className="text-3xl font-black text-white text-gradient-gold">{weapon.nameEn}</Text>
        </View>

        <View className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex-row">
          <View className="flex-1 border-r border-white/10">
            <Text className="text-white/50 text-xs mb-1">Base ATK (Lv. 90)</Text>
            <Text className="text-white font-bold text-lg">{weapon.baseAtk}</Text>
          </View>
          <View className="flex-1 pl-4">
            <Text className="text-white/50 text-xs mb-1">{weapon.subStat || 'Substat'} (Lv. 90)</Text>
            <Text className="text-white font-bold text-lg">{weapon.subStatValue || 'N/A'}</Text>
          </View>
        </View>

        {weapon.passiveNameEn && (
          <View className="bg-white/5 border border-white/10 rounded-xl p-4">
            <Text className="text-[#cfa858] font-bold text-base mb-2">{weapon.passiveNameEn}</Text>
            <Text className="text-white/80 text-sm leading-relaxed">{weapon.passiveDescEn}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
