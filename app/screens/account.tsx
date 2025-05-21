import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch, TextInput } from 'react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../theme/theme';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const AccountScreen = () => {
  const { user, logout} = useAuth();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      // Здесь можно добавить загрузку дополнительных данных пользователя из Firestore
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      Toast.show({
        type: 'success',
        text1: t('logoutSuccess'),
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('logoutFailed'),
        text2: t('somethingWentWrong'),
      });
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    
  };

  const handleSave = () => {
    // Здесь можно добавить логику сохранения изменений
    setIsEditing(false);
    Toast.show({
      type: 'success',
      text1: t('changesSaved'),
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={[styles.avatarContainer, { backgroundColor: theme.primary }]}>
          <Ionicons name="person" size={60} color="white" />
        </View>
        <Text style={[styles.username, { color: theme.text }]}>{email}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="person-circle" size={24} color={theme.primary} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>{t('personalInfo')}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>{t('name')}</Text>
          {isEditing ? (
            <TextInput
              style={[styles.infoValue, { color: theme.text }]}
              value={name}
              onChangeText={setName}
              placeholder={t('enterName')}
              placeholderTextColor={theme.textSecondary}
            />
          ) : (
            <Text style={[styles.infoValue, { color: theme.text }]}>{name || t('notSpecified')}</Text>
          )}
        </View>

        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>{t('email')}</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>{email}</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="settings" size={24} color={theme.primary} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>{t('settings')}</Text>
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon" size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>{t('darkMode')}</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            thumbColor={theme.primary}
            trackColor={{ false: theme.textSecondary, true: theme.primary }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="language" size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>{t('language')}</Text>
          </View>
          <View style={styles.languageButtons}>
            <TouchableOpacity
              style={[
                styles.langButton,
                currentLanguage === 'en' && { backgroundColor: theme.primary },
                { borderColor: theme.primary }
              ]}
              onPress={() => changeLanguage('en')}
            >
              <Text style={[
                styles.langButtonText,
                currentLanguage === 'en' ? { color: 'white' } : { color: theme.text }
              ]}>
                EN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.langButton,
                currentLanguage === 'ru' && { backgroundColor: theme.primary },
                { borderColor: theme.primary }
              ]}
              onPress={() => changeLanguage('ru')}
            >
              <Text style={[
                styles.langButtonText,
                currentLanguage === 'ru' ? { color: 'white' } : { color: theme.text }
              ]}>
                RU
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.langButton,
                currentLanguage === 'kk' && { backgroundColor: theme.primary },
                { borderColor: theme.primary }
              ]}
              onPress={() => changeLanguage('kk')}
            >
              <Text style={[
                styles.langButtonText,
                currentLanguage === 'kk' ? { color: 'white' } : { color: theme.text }
              ]}>
                KK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>{t('save')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.error }]}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.buttonText}>{t('cancel')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>{t('editProfile')}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.error }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>{t('logout')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 10,
  },
  languageButtons: {
    flexDirection: 'row',
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 8,
  },
  langButtonText: {
    fontSize: 14,
  },
  buttonsContainer: {
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AccountScreen;