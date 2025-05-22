import React, { createContext, useEffect, useState, useContext } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type AuthCtx = {
  user: FirebaseAuthTypes.User | null;
  loginWithEmail: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const sub = auth().onUserChanged(setUser);
    return sub;
  }, []);

  const loginWithEmail = (email: string, password: string) =>
    auth().signInWithEmailAndPassword(email.trim(), password.trim());

  const logout = () => auth().signOut();

  return <Ctx.Provider value={{ user, loginWithEmail, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be within <AuthProvider>');
  return ctx;
};
