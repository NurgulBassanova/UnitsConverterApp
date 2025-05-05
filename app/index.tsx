import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import About from './screens/about';
import Converter from './screens/converter';
import Account from './screens/account';
import Login from './screens/login';

import Settings from './screens/settings'; // Import Settings screen
import { useTheme } from './theme/theme';
import { useTranslation } from 'react-i18next';

const aboutIcon = require('../assets/images/information.png');
const converterIcon = require('../assets/images/math.png');
const accountIcon = require('../assets/images/user.png');
const settingsIcon = require('../assets/images/settings.png'); // Add settings icon

type TabParamList = {
  About: undefined;
  Converter: undefined;
  Account: undefined;
  Settings: undefined;
  Login: undefined;  
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function App() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="About"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: theme.tabBarBackground as string,
          borderTopColor: theme.card as string,
        },
        tabBarIcon: ({ color, size }) => {
          let iconSource;

          if (route.name === 'About') {
            iconSource = aboutIcon;
          } else if (route.name === 'Converter') {
            iconSource = converterIcon;
          } else if (route.name === 'Account') {
            iconSource = accountIcon;
          } else if (route.name === 'Settings') { // Check for Settings tab
            iconSource = settingsIcon;
          } else if (route.name === 'Login') { 
            iconSource = accountIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          );
        },
        tabBarActiveTintColor: theme.tabBarActiveTint as string,
        tabBarInactiveTintColor: theme.tabBarInactiveTint as string,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="About"
        component={About}
        options={{ tabBarLabel: t('about') }}
      />
      <Tab.Screen
        name="Converter"
        component={Converter}
        options={{ tabBarLabel: t('converter') }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{ tabBarLabel: t('Account') }}
      />
      <Tab.Screen
        name="Settings" // Add Settings tab here
        component={Settings}
        options={{ tabBarLabel: t('settings') }} 
      />
      <Tab.Screen
        name="Login" 
        component={Login}
        options={{ tabBarLabel: t('login') }} 
      />

    </Tab.Navigator>
  );
}
