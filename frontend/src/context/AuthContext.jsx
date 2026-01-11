import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, provider } from '../firebase';
import { 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut,
  setPersistence,
  browserLocalPersistence 
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Persistence ensures you stay logged in if the page refreshes
  const login = async () => {
    try {
      // Hardens the session for the demo environment
      await setPersistence(auth, browserLocalPersistence);
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    // The observer manages the global user state
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {/* Prevents UI flickering by waiting for the auth state */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);1