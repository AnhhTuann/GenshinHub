import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchGraphQL, GET_TEAMS_DATA } from '@/lib/graphql';

export default function TeamsScreen() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphQL(GET_TEAMS_DATA);
        if (data.characters) {
          const allTeams: any[] = [];
          data.characters.forEach((char: any) => {
            if (char.teams && char.teams.length > 0) {
              char.teams.forEach((t: any) => {
                allTeams.push({
                  ...t,
                  parentCharacter: char,
                });
              });
            }
          });
          
          // Sort teams by Rank (SS -> S -> A -> B -> C)
          const rankOrder: Record<string, number> = { 'SS': 1, 'S': 2, 'A': 3, 'B': 4, 'C': 5 };
          allTeams.sort((a, b) => (rankOrder[a.rank] || 99) - (rankOrder[b.rank] || 99));

          // Filter unique teams by members or name to prevent duplicates if multiple characters share the exact team
          const uniqueTeams = Array.from(new Map(allTeams.map(t => [t.name, t])).values());
          
          setTeams(uniqueTeams);
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
        <Text className="text-2xl font-black text-white text-gradient-gold">META TEAMS</Text>
        <Text className="text-white/50 text-xs mt-1 mb-2">Optimal team compositions</Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#cfa858" />
        </View>
      ) : (
        <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="gap-6">
            {teams.map((team, idx) => (
              <View key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">{team.name}</Text>
                    <Text className="text-white/40 text-[10px] uppercase">Main DPS: {team.parentCharacter?.nameEn}</Text>
                  </View>
                  <View className="bg-[#cfa858]/20 px-3 py-1 rounded border border-[#cfa858]/30">
                    <Text className="text-[#cfa858] font-bold">{team.rank} Tier</Text>
                  </View>
                </View>

                <View className="flex-row gap-2 mb-4">
                  {team.members.map((m: any, i: number) => (
                    <View key={i} className="flex-1 aspect-square bg-black/50 border border-white/5 rounded-xl items-center justify-center p-1">
                      <Text className="text-white text-[10px] font-bold text-center mb-1" numberOfLines={1}>{m.characterId}</Text>
                      <Text className="text-white/30 text-[8px] text-center uppercase">{m.role}</Text>
                    </View>
                  ))}
                </View>

                <Text className="text-white/70 text-sm leading-relaxed">{team.description}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
