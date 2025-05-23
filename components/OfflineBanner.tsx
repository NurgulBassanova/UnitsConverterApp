import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme';

interface OfflineBannerProps {
  onSyncPress: () => void;
}

const OfflineBanner: React.FC<OfflineBannerProps> = ({ onSyncPress }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.error }]}>
      <Text style={[styles.text, { color: theme.text }]}>Offline Mode</Text>
      <TouchableOpacity onPress={onSyncPress}>
        <Text style={[styles.syncText, { color: theme.text }]}>Try to Sync</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold'
  },
  syncText: {
    textDecorationLine: 'underline'
  }
});

export default OfflineBanner;