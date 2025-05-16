import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../theme/theme';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface LoginProps {
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [secureEntry, setSecureEntry] = useState(true);
  const { login, register,} = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name, surname);
      }
      // Call the onLogin callback prop if exists
      if (onLogin) {
        onLogin();
      }
      navigation.navigate('Account');
    } catch (error: any) {
      Alert.alert(isLogin ? t('loginFailed') : t('registrationFailed'), error.message);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setSurname('');
    setIsLogin(!isLogin);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Ionicons name="lock-closed" size={60} color={theme.primary} />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>
          {isLogin ? t('Welcome!') : t('Create Account')}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {isLogin ? t('loginToContinue') : t('register now')}
        </Text>

        {/* Name and Surname Inputs (only visible in registration mode) */}
        {!isLogin && (
          <>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, {
                  backgroundColor: theme.card,
                  color: theme.text,
                }]}
                placeholder={t('name')}
                placeholderTextColor={theme.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="people-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, {
                  backgroundColor: theme.card,
                  color: theme.text,
                }]}
                placeholder={t('surname')}
                placeholderTextColor={theme.textSecondary}
                value={surname}
                onChangeText={setSurname}
                autoCapitalize="words"
              />
            </View>
          </>
        )}

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, {
              backgroundColor: theme.card,
              color: theme.text,
            }]}
            placeholder={t('email')}
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, {
              backgroundColor: theme.card,
              color: theme.text,
            }]}
            placeholder={t('password')}
            placeholderTextColor={theme.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity 
            onPress={() => setSecureEntry(!secureEntry)} 
            style={styles.eyeIcon}
          >
            <Ionicons name={secureEntry ? 'eye-off' : 'eye'} size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {isLogin ? t('login') : t('register')}
          </Text>
        </TouchableOpacity>

        {/* Switch between Login/Register */}
        <View style={styles.switchContainer}>
          <Text style={{ color: theme.textSecondary }}>
            {isLogin ? t('no account?') : t('haveAnAccount')}
          </Text>
          <TouchableOpacity onPress={resetForm}>
            <Text style={[styles.switchText, { color: theme.primary }]}>
              {isLogin ? t('register') : t('login')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 45,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  switchText: {
    fontWeight: 'bold',
  },
  socialContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  socialText: {
    marginBottom: 15,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default Login;