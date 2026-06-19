import { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { tcgCards } from '@/data/tcgCards';
import { metaDecks } from '@/data/tcgDecks';
import { useTranslation } from 'react-i18next';

export default function TCGScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'cards' | 'decks'>('cards');
  const [search, setSearch] = useState('');

  const filteredCards = useMemo(() => {
    return tcgCards.filter(card => {
      const q = search.toLowerCase();
      const name = i18n.language === 'vi' ? card.nameVi : card.nameEn;
      if (q && !name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, i18n.language]);

  return (
    <SafeAreaView className="flex-1 bg-[#050508]">
      <View className="px-4 py-3 flex-row items-center gap-4 border-b border-white/10">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white/5 rounded-full items-center justify-center">
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <View>
          <Text className="text-xl font-bold text-white text-gradient-gold">Genius Invokation</Text>
          <Text className="text-white/50 text-xs">TCG Cards & Decks</Text>
        </View>
      </View>

      <View className="flex-row gap-2 px-4 pt-4 mb-2">
        <TouchableOpacity
          onPress={() => setActiveTab('cards')}
          className={`flex-1 py-2 rounded-lg items-center ${activeTab === 'cards' ? 'bg-white/10 border border-white/10' : 'bg-transparent'}`}
        >
          <Text className={`font-bold text-sm ${activeTab === 'cards' ? 'text-white' : 'text-white/40'}`}>Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('decks')}
          className={`flex-1 py-2 rounded-lg items-center ${activeTab === 'decks' ? 'bg-white/10 border border-white/10' : 'bg-transparent'}`}
        >
          <Text className={`font-bold text-sm ${activeTab === 'decks' ? 'text-white' : 'text-white/40'}`}>Meta Decks</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
        {activeTab === 'cards' && (
          <View>
            <View className="bg-white/5 border border-white/10 rounded-xl px-4 h-12 justify-center mb-4">
              <TextInput
                className="text-white"
                placeholder="Search cards..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={search}
                onChangeText={setSearch}
              />
            </View>
            <View className="flex-row flex-wrap gap-3 justify-between">
              {filteredCards.map(card => {
                const name = i18n.language === 'vi' ? card.nameVi : card.nameEn;
                return (
                  <View key={card.id} className="w-[30%] mb-4 items-center">
                    <View className="w-full aspect-[256/440] bg-white/5 border border-white/10 rounded-xl items-center justify-center mb-2 overflow-hidden">
                      {/* Placeholder for image, since local web assets aren't statically required in RN without extra setup */}
                      <Text className="text-white/20 text-[10px] text-center px-1 font-bold">{card.type}</Text>
                    </View>
                    <Text className="text-white text-xs font-bold text-center line-clamp-2">{name}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {activeTab === 'decks' && (
          <View className="gap-6">
            {metaDecks.map(deck => (
              <View key={deck.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Text className="text-xl font-bold text-white mb-2">{deck.name}</Text>
                <Text className="text-white/60 text-sm mb-4 leading-relaxed">{deck.description}</Text>
                
                <View className="flex-row gap-3">
                  {deck.characterIds.map(charId => {
                    const card = tcgCards.find(c => c.id === charId);
                    if (!card) return null;
                    return (
                      <View key={charId} className="flex-1 aspect-[256/440] bg-white/10 border border-white/20 rounded-lg items-center justify-center p-2">
                        <Text className="text-white text-[10px] font-bold text-center">{i18n.language === 'vi' ? card.nameVi : card.nameEn}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
