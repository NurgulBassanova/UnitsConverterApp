import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import about from './screens/about';
import converter from './screens/converter';
import account from './screens/account';

// Import icons
const aboutIcon = require('../assets/images/information.png');
const converterIcon = require('../assets/images/math.png');
const accountIcon = require('../assets/images/user.png');

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
    initialRouteName="About"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconSource;
        if (route.name === 'About') iconSource = aboutIcon;
        else if (route.name === 'Converter') iconSource = converterIcon;
        else iconSource = accountIcon;
  
        return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown: false, 
    })}
  >
    <Tab.Screen name="About" component={about} options={{ title: 'About' }} />
    <Tab.Screen name="Converter" component={converter} options={{ title: 'Converter' }} />
    <Tab.Screen name="Account" component={account} options={{ title: 'Account' }} />
    </Tab.Navigator>
  
  );
}
