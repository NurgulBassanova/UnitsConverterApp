import { auth, db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { Storage } from './storage';

export const SyncService = {
  async syncPendingData(): Promise<void> {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const pendingConversions = await Storage.getPendingConversions();
    if (!pendingConversions.length) return;

    try {
      const batch = pendingConversions.map(conversion => 
        setDoc(doc(db, `users/${userId}/conversions`, conversion.id), conversion)
      );
      await Promise.all(batch);
      await Storage.clearPendingConversions();
    } catch (error) {
      console.error('Sync failed:', error);
      throw error;
    }
  }
};