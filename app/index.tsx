import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, ColorValue } from 'react-native';
import About from './screens/about';
import Converter from './screens/converter';
import Account from './screens/account';
import { useThemeManager } from './theme/theme';

const aboutIcon = require('../assets/images/information.png');
const converterIcon = require('../assets/images/math.png');
const accountIcon = require('../assets/images/user.png');


type TabParamList = {
  About: undefined;
  Converter: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function App() {
  const { theme } = useThemeManager();

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
  <Tab.Screen name="About" component={About} />
  <Tab.Screen name="Converter" component={Converter} />
  <Tab.Screen name="Account" component={Account} />
</Tab.Navigator>
  );
}