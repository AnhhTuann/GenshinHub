import { useState, useEffect, useMemo } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';

interface Character {
  id: string;
  nameEn: string;
  avatarUrl: string;
  tier: string;
  element: string;
}

type ListItem = 
  | { type: 'header'; tier: string }
  | { type: 'character'; data: Character };

export default function CharactersScreen() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  // Number of columns: estimate ~80px per item
  const numColumns = Math.max(4, Math.floor((width - 32) / 80));

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphQL(GET_CHARACTERS);
        if (data.characters) setCharacters(data.characters);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const flattenedData = useMemo(() => {
    const tierOrder: Record<string, number> = { 'SS': 1, 'S': 2, 'A': 3, 'B': 4, 'C': 5, 'Unranked': 6 };
    const grouped: Record<string, Character[]> = {};
    
    characters.forEach(c => {
      const tier = c.tier || 'Unranked';
      if (!grouped[tier]) grouped[tier] = [];
      grouped[tier].push(c);
    });

    const sortedTiers = Object.keys(grouped).sort((a, b) => tierOrder[a] - tierOrder[b]);
    const items: ListItem[] = [];

    sortedTiers.forEach(tier => {
      items.push({ type: 'header', tier });
      grouped[tier].forEach(c => items.push({ type: 'character', data: c }));
      // Pad empty slots so the next header starts on a new row
      const remainder = grouped[tier].length % numColumns;
      if (remainder !== 0) {
        for (let i = 0; i < numColumns - remainder; i++) {
          items.push({ type: 'character', data: { id: `empty-${tier}-${i}`, nameEn: '', avatarUrl: '', tier: '', element: '' } });
        }
      }
    });

    return items;
  }, [characters, numColumns]);

  const renderItem = ({ item }: { item: ListItem }) => {
    if (item.type === 'header') {
      return (
        <View className="w-full mt-4 mb-2 pl-1">
          <View className="bg-white/10 px-3 py-1.5 rounded-md self-start">
            <Text className="text-white font-bold text-sm">Tier {item.tier}</Text>
          </View>
        </View>
      );
    }

    if (!item.data.nameEn) return <View style={{ flex: 1 }} />; // Empty padded item

    return (
      <View style={{ flex: 1, padding: 4, alignItems: 'center' }}>
        <TouchableOpacity
          className="items-center w-full max-w-[70px]"
          onPress={() => router.push(`/characters/${item.data.id}` as any)}
        >
          <View className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 overflow-hidden mb-1">
            {item.data.avatarUrl ? (
              <Image source={{ uri: item.data.avatarUrl }} className="w-full h-full" contentFit="cover" transition={200} />
            ) : (
              <View className="flex-1 items-center justify-center bg-gray-800">
                <Text className="text-white/50 text-[10px]">No Img</Text>
              </View>
            )}
          </View>
          <Text className="text-white text-[10px] text-center font-medium line-clamp-1" numberOfLines={1}>
            {item.data.nameEn}
          </Text>
        </TouchableOpacity>
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
        <View className="flex-1 px-2 pt-2">
          <FlashList
            data={flattenedData}
            renderItem={renderItem}
            estimatedItemSize={100}
            numColumns={numColumns}
            getItemType={(item) => typeof item === 'object' && item.type === 'header' ? 'header' : 'character'}
            overrideItemLayout={(layout, item) => {
              if (item.type === 'header') {
                layout.span = numColumns;
                layout.size = 50;
              }
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
