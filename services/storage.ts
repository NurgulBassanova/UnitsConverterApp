import AsyncStorage from '@react-native-async-storage/async-storage';

interface ConversionData {
  id: string;
  from: string;
  to: string;
  type: string;
  timestamp: string;
}

export const Storage = {
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('Storage set error:', e);
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Storage remove error:', e);
    }
  },

  async getPendingConversions(): Promise<ConversionData[]> {
    return (await this.getItem<ConversionData[]>('pendingConversions')) || [];
  },

  async addPendingConversion(conversion: ConversionData): Promise<void> {
    const current = await this.getPendingConversions();
    await this.setItem('pendingConversions', [...current, conversion]);
  },

  async clearPendingConversions(): Promise<void> {
    await this.setItem('pendingConversions', []);
  }
};