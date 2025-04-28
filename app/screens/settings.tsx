import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { changeLanguage, initI18n } from "../../i18n";
import { useTheme } from "../theme/theme";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    initI18n().then(() => setCurrentLang(i18n.language));
  }, []);

  const handleLanguageChange = async (lang: string) => {
    await changeLanguage(lang);
    setCurrentLang(lang);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      {/* Theme Toggle */}
      <View style={styles.themeToggleContainer}>
        <Text style={[styles.themeText, { color: theme.text }]}>
          {isDark ? t('Dark Mode') : t('Light Mode')}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: theme.primary }}
          thumbColor={isDark ? "#FF6347" : "#f4f3f4"}
        />
      </View>

      {/* Language Switch */}
      <View style={styles.languageSwitchContainer}>
        <Text style={[styles.languageText, { color: theme.text }]}>
        </Text>
        <TouchableOpacity
          onPress={() => {
            const nextLang = currentLang === 'en' ? 'ru' : currentLang === 'ru' ? 'kk' : 'en';
            handleLanguageChange(nextLang);
          }}
        >
          <Image source={require('../../assets/images/language.png')} style={styles.langIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  themeText: {
    fontSize: 16,
    marginRight: 10,
  },
  languageText: {
    fontSize: 16,
    marginRight: 10,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  languageSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10, 
  },
  langIcon: {
    width: 30,
    height: 30,
  },
});
