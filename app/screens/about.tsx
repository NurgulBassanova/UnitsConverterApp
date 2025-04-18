import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { changeLanguage, initI18n } from "../../i18n";
import { useTheme } from "../theme/theme";

interface FAQItemProps {
  title: string;
  children: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();


  return (
    <View style={[styles.faqItem, { borderColor: theme.card }]}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.faqHeader}>
        <Text style={[styles.subheading, { color: theme.text }]}>
          {expanded ? "▼" : "▶"} {title}
        </Text>
      </TouchableOpacity>
      {expanded && <Text style={[styles.text, { color: theme.text }]}>{children}</Text>}
    </View>
  );
};

export default function About() {
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

      <View style={styles.topRight}>
      <TouchableOpacity
        onPress={() => {
          const nextLang = currentLang === 'en' ? 'ru' : currentLang === 'ru' ? 'kk' : 'en';
          handleLanguageChange(nextLang);
        }}
      >
        <Image source={require('../../assets/images/language.png')} style={styles.langIcon} />
      </TouchableOpacity>

      </View>

      <Text style={[styles.heading, { color: theme.text }]}>{t('appTitle')}</Text>
      
      <View key={isDark? 'dark' : 'light'}>
      <FAQItem title={t('whatIsApp')}>
        {t('appDescription')}
      </FAQItem>

      <FAQItem title={t('length')}>
        {t('lengthUnits')}
      </FAQItem>

      <FAQItem title={t('weight')}>
        {t('weightUnits')}
      </FAQItem>

      <FAQItem title={t('temperature')}>
        {t('temperatureUnits')}
      </FAQItem>

      <FAQItem title={t('volume')}>
        {t('volumeUnits')}
      </FAQItem>

      <FAQItem title={t('credits')}>
        {t('creditsText')}
      </FAQItem>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 22,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 15,
    paddingLeft: 10,
  },
  faqItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  langIcon: {
    width: 30,
    height: 30,
  },
  topRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
    paddingHorizontal: 16,
  },
  themeText: {
    marginRight: 10,
    fontSize: 16,
  },
});