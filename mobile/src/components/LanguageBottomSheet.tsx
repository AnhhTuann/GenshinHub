import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';

const LOCALES = ['en', 'vi', 'zh', 'ja', 'ko', 'es', 'fr', 'ru', 'th', 'de', 'id', 'pt', 'it', 'tr'];

const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  zh: '简体中文',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
  fr: 'Français',
  ru: 'Русский',
  th: 'ภาษาไทย',
  de: 'Deutsch',
  id: 'Bahasa Indonesia',
  pt: 'Português',
  it: 'Italiano',
  tr: 'Türkçe'
};

interface LanguageBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function LanguageBottomSheet({ visible, onClose }: LanguageBottomSheetProps) {
  const { i18n } = useTranslation();

  const handleSelect = (lang: string) => {
    i18n.changeLanguage(lang);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        {visible && (
          <Animated.View 
            entering={FadeIn.duration(200)} 
            exiting={FadeOut.duration(200)}
            className="absolute inset-0 bg-black/60"
          >
            <Pressable className="flex-1" onPress={onClose} />
          </Animated.View>
        )}

        {visible && (
          <Animated.View 
            entering={SlideInDown.springify().damping(20).stiffness(150)} 
            exiting={SlideOutDown.duration(200)}
            className="w-full bg-[#0d0d14] rounded-t-3xl overflow-hidden shadow-2xl shadow-black border-t border-white/10"
            style={{ paddingBottom: 40, maxHeight: '80%' }}
          >
            <BlurView intensity={20} tint="dark" className="absolute inset-0" />
            <View className="items-center py-3">
              <View className="w-12 h-1.5 bg-white/20 rounded-full" />
            </View>
            
            <View className="px-6 pb-2">
              <Text className="text-white text-xl font-black uppercase tracking-widest text-center mb-4 text-theme-main">
                {i18n.t('Common.language')}
              </Text>
            </View>

            <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
              {LOCALES.map((l) => (
                <TouchableOpacity
                  key={l}
                  onPress={() => handleSelect(l)}
                  className={`flex-row items-center justify-between p-4 mb-2 rounded-2xl border ${
                    i18n.language === l
                      ? 'bg-theme-glow border-theme-main'
                      : 'bg-white/5 border-transparent'
                  }`}
                  activeOpacity={0.7}
                >
                  <Text 
                    className={`text-lg font-bold ${
                      i18n.language === l ? 'text-theme-light' : 'text-white/70'
                    }`}
                  >
                    {LOCALE_NAMES[l]}
                  </Text>
                  {i18n.language === l && (
                    <Check size={20} color="var(--theme-main)" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </View>
    </Modal>
  );
}
