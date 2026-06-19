import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { BANNERS_HISTORY } from '@/data/banners';
import { useTranslation } from 'react-i18next';

export default function BannersScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-[#050508]">
      <View className="px-4 py-3 flex-row items-center gap-4 border-b border-white/10">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white/5 rounded-full items-center justify-center">
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <View>
          <Text className="text-xl font-bold text-white text-gradient-gold">Banners History</Text>
          <Text className="text-white/50 text-xs">Past and present wishes</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 40 }}>
        {BANNERS_HISTORY.map((versionBlock, index) => {
          const vName = i18n.language === 'en' ? versionBlock.versionNameEn : versionBlock.versionNameVi;
          
          return (
            <View key={versionBlock.version} className="mb-12">
              <View className="flex-row items-center gap-3 mb-6">
                <View className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/50">
                  <Text className="text-blue-400 font-black text-sm">v{versionBlock.version}</Text>
                </View>
                <Text className="text-lg font-bold text-white flex-1">{vName}</Text>
              </View>

              {/* Phase 1 */}
              {versionBlock.phases[0] && (
                <View className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
                  <View className="flex-row justify-between mb-4 pb-2 border-b border-white/5">
                    <Text className="text-blue-400 font-bold text-xs uppercase">Phase 1</Text>
                    <Text className="text-white/50 text-xs">{versionBlock.phases[0].startDate} - {versionBlock.phases[0].endDate}</Text>
                  </View>
                  
                  {versionBlock.phases[0].characterBanners && versionBlock.phases[0].characterBanners.length > 0 && (
                    <View className="mb-4">
                      <Text className="text-white/50 text-xs font-bold uppercase mb-2">Characters</Text>
                      {versionBlock.phases[0].characterBanners.map((img, i) => (
                        <Image key={i} source={{ uri: img }} className="w-full h-32 rounded-lg mb-2" resizeMode="cover" />
                      ))}
                    </View>
                  )}
                  {versionBlock.phases[0].weaponBanners && versionBlock.phases[0].weaponBanners.length > 0 && (
                    <View>
                      <Text className="text-white/50 text-xs font-bold uppercase mb-2">Weapons</Text>
                      {versionBlock.phases[0].weaponBanners.map((img, i) => (
                        <Image key={i} source={{ uri: img }} className="w-full h-32 rounded-lg mb-2" resizeMode="cover" />
                      ))}
                    </View>
                  )}
                </View>
              )}

              {/* Phase 2 */}
              {versionBlock.phases[1] && (
                <View className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <View className="flex-row justify-between mb-4 pb-2 border-b border-white/5">
                    <Text className="text-purple-400 font-bold text-xs uppercase">Phase 2</Text>
                    <Text className="text-white/50 text-xs">{versionBlock.phases[1].startDate} - {versionBlock.phases[1].endDate}</Text>
                  </View>
                  
                  {versionBlock.phases[1].characterBanners && versionBlock.phases[1].characterBanners.length > 0 && (
                    <View className="mb-4">
                      <Text className="text-white/50 text-xs font-bold uppercase mb-2">Characters</Text>
                      {versionBlock.phases[1].characterBanners.map((img, i) => (
                        <Image key={i} source={{ uri: img }} className="w-full h-32 rounded-lg mb-2" resizeMode="cover" />
                      ))}
                    </View>
                  )}
                  {versionBlock.phases[1].weaponBanners && versionBlock.phases[1].weaponBanners.length > 0 && (
                    <View>
                      <Text className="text-white/50 text-xs font-bold uppercase mb-2">Weapons</Text>
                      {versionBlock.phases[1].weaponBanners.map((img, i) => (
                        <Image key={i} source={{ uri: img }} className="w-full h-32 rounded-lg mb-2" resizeMode="cover" />
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
