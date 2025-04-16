import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button } from "react-native";
import { useTranslation } from "react-i18next";
import { changeLanguage, initI18n } from "../../i18n";

const FAQItem = ({ title, children }: { title: string; children: string }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.faqItem}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.faqHeader}>
        <Text style={styles.subheading}>
          {expanded ? "▼" : "▶"} {title}
        </Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.text}>{children}</Text>}
    </View>
  );
};

export default function About() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    initI18n().then(() => setCurrentLang(i18n.language));
  }, []);

  const handleLanguageChange = async (lang: string) => {
    await changeLanguage(lang);
    setCurrentLang(lang);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.languageSwitcher}>
        <Button 
          title="English" 
          onPress={() => handleLanguageChange('en')} 
          color={currentLang === 'en' ? '#007AFF' : '#CCCCCC'}
        />
        <Button 
          title="Русский" 
          onPress={() => handleLanguageChange('ru')} 
          color={currentLang === 'ru' ? '#007AFF' : '#CCCCCC'}
        />
      </View>

      <Text style={styles.heading}>{t('appTitle')}</Text>

      <FAQItem title={t('whatIsApp')}>
        {t('appDescription')}
      </FAQItem>

      {/* Остальные FAQItems с использованием t() */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    color: "#333",
  },
  faqItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 10,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageSwitcher: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
    
})