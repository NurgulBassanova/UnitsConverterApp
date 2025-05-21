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

interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'ru' | 'kk';
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
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
    } catch (error: any) {
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
  };

   return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isGuest,
      register, 
      login, 
      logout,
      enterGuestMode,
      exitGuestMode,
      updateUserPreferences
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);