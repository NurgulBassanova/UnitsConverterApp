import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
   isGuest: boolean;
  register: (email: string, password: string, name: string, surname: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
   enterGuestMode: () => void; 
  exitGuestMode: () => void; 
  updateUserPreferences: (prefs: UserPreferences) => Promise<void>;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string, name: string, surname: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserPreferences: (prefs: UserPreferences) => Promise<void>;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'ru' | 'kk';
}

<<<<<<< Updated upstream
=======
const STORAGE_KEY = '@app_user_data';

>>>>>>> Stashed changes
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
<<<<<<< Updated upstream

  useEffect(() => {
=======
  const [isGuest, setIsGuest] = useState(false);

  const saveUserData = async (userData: any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (e) {
      console.warn('Failed to save user data locally', e);
    }
  };

  const loadCachedUser = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const cachedUser = JSON.parse(json);
        setUser(cachedUser);
      }
    } catch (e) {
      console.warn('Failed to load cached user', e);
    }
  };

  const clearCachedUser = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear cached user', e);
    }
  };

  useEffect(() => {
    loadCachedUser();
>>>>>>> Stashed changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if(user) {
        const userDataToSave = {
          uid: user.uid,
          email: user.email,
        };
        await saveUserData(userDataToSave);
      } else {
        await clearCachedUser();
      }
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        preferences: {
          theme: 'light',
          language: 'en'
        }
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message);
    }
  };

  const updateUserPreferences = async (prefs: UserPreferences) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid), {
        preferences: prefs
      }, { merge: true });
<<<<<<< Updated upstream
    } catch (error: any) {
      console.error('Error updating preferences:', error);
      throw new Error(error.message);
    }
=======

      const cached = await AsyncStorage.getItem(STORAGE_KEY);
      if (cached) {
        const cachedUser = JSON.parse(cached);
        cachedUser.preferences = prefs;
        await saveUserData(cachedUser);
      }
    } catch (error: any) 
    
    {
      console.error('Error updating preferences:', error);
      throw new Error(error.message);
    }
  };
  

   const enterGuestMode = () => {
    setIsGuest(true);
    setUser(null); // Гость не имеет Firebase-пользователя
  };

  const exitGuestMode = () => {
    setIsGuest(false);
>>>>>>> Stashed changes
  };

   return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
<<<<<<< Updated upstream
      register, 
      login, 
      logout,
=======
      isGuest,
      register, 
      login, 
      logout,
      enterGuestMode,
      exitGuestMode,
>>>>>>> Stashed changes
      updateUserPreferences
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);