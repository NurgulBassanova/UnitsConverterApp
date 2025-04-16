import React, { useEffect, useState } from "react";

import { Image } from "react-native";

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
    <View style={styles.headerRight}>
      <TouchableOpacity onPress={() => handleLanguageChange(currentLang === 'en' ? 'ru' : 'en')}>
        <Image source={require('../../assets/images/language.png')} style={styles.langIcon} />
      </TouchableOpacity>
    </View>

      <Text style={styles.heading}>{t('appTitle')}</Text>

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
  headerRight: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  
  langIcon: {
    width: 30,
    height: 30,
  }
    
})