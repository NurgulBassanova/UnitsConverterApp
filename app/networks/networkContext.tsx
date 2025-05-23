import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

interface NetworkContextProps {
  isOffline: boolean;
  syncDataToFirebase: () => Promise<void>;
}

const NetworkContext = createContext<NetworkContextProps>({
  isOffline: false,
  syncDataToFirebase: async () => {},
});

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const syncDataToFirebase = async () => {
    try {
      const raw = await AsyncStorage.getItem('unsyncedData');
      const unsyncedData = raw ? JSON.parse(raw) : [];

      if (unsyncedData.length === 0) return;

      const batch = firestore().batch();
      const conversionsRef = firestore().collection('conversions');

      unsyncedData.forEach((data: any) => {
        const docRef = conversionsRef.doc();
        batch.set(docRef, data);
      });

      await batch.commit();
      await AsyncStorage.removeItem('unsyncedData');
    } catch (error) {
      console.error('Error syncing data to Firebase:', error);
    }
  };

  return (
    <NetworkContext.Provider value={{ isOffline, syncDataToFirebase }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
