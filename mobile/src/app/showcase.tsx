import { useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchGraphQL, GET_SHOWCASE } from '@/lib/graphql';
import { Search } from 'lucide-react-native';

interface ShowcaseData {
  uid: string;
  nickname: string;
  level: number;
  avatarUrl: string;
  characters: string[];
}

export default function ShowcaseScreen() {
  const [uid, setUid] = useState('');
  const [data, setData] = useState<ShowcaseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!uid) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetchGraphQL(GET_SHOWCASE, { uid });
      if (res.showcase) {
        setData(res.showcase);
      } else {
        setError('Player not found or data is private.');
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching showcase data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050508]">
      <View className="px-4 pt-4 pb-2 border-b border-white/10">
        <Text className="text-2xl font-black text-white text-gradient-gold">SHOWCASE</Text>
        <Text className="text-white/50 text-xs mt-1 mb-2">Fetch live player data via UID</Text>
      </View>

      <View className="px-4 py-6 border-b border-white/5">
        <View className="flex-row items-center bg-white/5 border border-white/10 rounded-xl px-4 h-12">
          <TextInput
            className="flex-1 text-white"
            placeholder="Enter Genshin UID (e.g. 800000000)"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={uid}
            onChangeText={setUid}
            keyboardType="number-pad"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch} disabled={loading} className="ml-2">
            {loading ? <ActivityIndicator color="#cfa858" /> : <Search color="#cfa858" size={20} />}
          </TouchableOpacity>
        </View>
        {error ? <Text className="text-red-400 text-xs mt-2">{error}</Text> : null}
      </View>

      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
        {data && (
          <View className="bg-white/5 rounded-xl border border-white/10 overflow-hidden p-6 items-center">
            <View className="w-24 h-24 rounded-full border-2 border-[#cfa858] overflow-hidden mb-4">
              {data.avatarUrl ? (
                <Image source={{ uri: data.avatarUrl }} className="w-full h-full" resizeMode="cover" />
              ) : (
                <View className="flex-1 bg-black/50 items-center justify-center">
                  <Text className="text-white/50 text-xs">No Avatar</Text>
                </View>
              )}
            </View>
            <Text className="text-white font-bold text-2xl mb-1">{data.nickname}</Text>
            <Text className="text-[#cfa858] font-medium text-sm mb-6">AR {data.level} • UID: {data.uid}</Text>

            <View className="w-full">
              <Text className="text-white/80 font-bold mb-3">Showcased Characters</Text>
              {data.characters && data.characters.length > 0 ? (
                <View className="flex-row flex-wrap gap-2">
                  {data.characters.map((charName, idx) => (
                    <View key={idx} className="bg-white/10 px-3 py-1.5 rounded-md">
                      <Text className="text-white text-xs">{charName}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text className="text-white/40 text-sm">No characters showcased</Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
