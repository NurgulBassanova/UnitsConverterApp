import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeManager } from '../theme/theme';

export default function Account() {
  const { theme } = useThemeManager();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>Page for account details.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});