import { useState, useEffect } from 'react';
import { ColorValue } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = {
  border: ColorValue | undefined;
  background: ColorValue;
  text: ColorValue;
  card: ColorValue;
  primary: ColorValue;
  tabBarBackground: ColorValue;
  tabBarActiveTint: ColorValue;
  tabBarInactiveTint: ColorValue;
};

const lightTheme: Theme = {
  border: '#FFFFFF',
  background: '#FFFFFF',
  text: '#000000',
  card: '#F2F2F2',
  primary: '#FF6347',
  tabBarBackground: '#FFFFFF',
  tabBarActiveTint: '#FF6347',
  tabBarInactiveTint: '#888888'
};

const darkTheme: Theme = {
  border: '#121212',
  background: '#121212',
  text: '#FFFFFF',
  card: '#1E1E1E',
  primary: '#FF8C00',
  tabBarBackground: '#1E1E1E',
  tabBarActiveTint: '#FF8C00',
  tabBarInactiveTint: '#AAAAAA'
};

let globalTheme = lightTheme;
let globalIsDark = false;
let globalToggleTheme = () => {};

export const useThemeManager = () => {
  const [isDark, setIsDark] = useState(globalIsDark);
  const [theme, setTheme] = useState<Theme>(globalTheme);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('appTheme');
        const darkMode = savedTheme === 'dark';
        setIsDark(darkMode);
        setTheme(darkMode ? darkTheme : lightTheme);
        globalIsDark = darkMode;
        globalTheme = darkMode ? darkTheme : lightTheme;
      } catch (error) {
        console.error('Failed to load theme', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    setTheme(newTheme ? darkTheme : lightTheme);
    globalIsDark = newTheme;
    globalTheme = newTheme ? darkTheme : lightTheme;
    try {
      await AsyncStorage.setItem('appTheme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  globalToggleTheme = toggleTheme;

  return { theme, isDark, toggleTheme };
};

export const getCurrentTheme = () => globalTheme;
export const getIsDark = () => globalIsDark;
export const toggleGlobalTheme = () => globalToggleTheme();