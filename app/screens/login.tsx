import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../theme/theme';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // login or register mode
  const { login, register } = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }

      navigation.navigate('Account'); // navigate after success
    } catch (error: any) {
      Alert.alert(isLogin ? t('loginFailed') : t('registrationFailed'), error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {isLogin ? t('login') : t('register')}
      </Text>

      <TextInput
        style={[styles.input, {
          backgroundColor: theme.card,
          color: theme.text,
          borderColor: theme.border,
        }]}
        placeholder={t('email')}
        placeholderTextColor={theme.textSecondary}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, {
          backgroundColor: theme.card,
          color: theme.text,
          borderColor: theme.border,
        }]}
        placeholder={t('password')}
        placeholderTextColor={theme.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isLogin ? theme.primary : theme.secondary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {isLogin ? t('login') : t('register')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={{ color: theme.textSecondary, textAlign: 'center', marginTop: 10 }}>
          {isLogin ? t('noAccount') + ' ' + t('register') : t('haveAccount') + ' ' + t('login')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
