"use client";

import React, { useState, useEffect, useContext, createContext, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return React.createElement(
      'div',
      { className: "flex h-screen items-center justify-center" },
      React.createElement(Loader2, { className: "h-8 w-8 animate-spin text-primary" })
    );
  }
  
  return React.createElement(
    AuthContext.Provider,
    { value: { user, isLoading } },
    children
  );
}

export const useAuth = () => useContext(AuthContext);
