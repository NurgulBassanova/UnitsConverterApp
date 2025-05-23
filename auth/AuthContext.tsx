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

interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'ru' | 'kk';
}

const defaultPrefs: UserPreferences = {
  theme: 'light',
  language: 'en'
};





interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  preferences: UserPreferences | null;
  register: (email: string, password: string, name: string, surname: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  enterGuestMode: () => void;
  exitGuestMode: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
}


const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null); // Добавлено состояние

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setPreferences({
            theme: data.preferences?.theme || 'light',
            language: data.preferences?.language || 'en'
          });
        } else {
          const defaultPrefs: UserPreferences = {
            theme: 'light',
            language: 'en'
          };
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            preferences: defaultPrefs
          });
          setPreferences(defaultPrefs);
        }
      } else {
        setPreferences(null);
      }
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);


   const updatePreferences = async (prefs: Partial<UserPreferences>) => {
    if (!user) return;
    
    const newPrefs = {
      ...preferences,
      ...prefs
    } as UserPreferences;
    
    try {
      await setDoc(doc(db, 'users', user.uid), {
        preferences: newPrefs
      }, { merge: true });
      setPreferences(newPrefs);
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  };
  const register = async (email: string, password: string, name: string, surname: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        name,
        surname,
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
      preferences,
      register, 
      login, 
      logout,
      enterGuestMode,
      exitGuestMode,
      updatePreferences
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
