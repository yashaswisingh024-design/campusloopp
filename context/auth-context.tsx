"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  getCurrentNetlifyUser,
  logoutNetlifyUser,
  loginWithCollegeEmail as netlifyLoginCollege,
  signUpWithCollegeEmail as netlifySignUpCollege,
  loginWithGoogle as netlifyLoginGoogle,
  handleOAuthCallback,
  normalizeUser,
  onAuthChange
} from '@/lib/netlify-identity';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  loginWithCollege: (email: string, password: string) => Promise<UserProfile | null>;
  signUpWithCollege: (data: { name: string; email: string; college: string; password: string; referralCode?: string }) => Promise<UserProfile | null>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        if (typeof window !== 'undefined' && window.location.hash && window.location.hash.includes('access_token')) {
          const oauthUser = await handleOAuthCallback();
          if (oauthUser && mounted) {
            setUser(oauthUser);
            setIsLoading(false);
            window.history.replaceState(null, '', window.location.pathname);
            return;
          }
        }

        const currentNetlifyUser = await getCurrentNetlifyUser();
        if (currentNetlifyUser && mounted) {
          setUser(currentNetlifyUser);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();

    let unsubscribe: any;
    try {
      unsubscribe = onAuthChange((netlifyUser: any) => {
        if (mounted) {
          if (netlifyUser) {
            const norm = normalizeUser(netlifyUser);
            setUser(norm);
          } else {
            setUser(null);
          }
        }
      });
    } catch {
      // Netlify identity JS listener error catch
    }

    return () => {
      mounted = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const loginWithCollege = async (email: string, password: string) => {
    const data = await netlifyLoginCollege(email, password);
    setUser(data);
    return data;
  };

  const signUpWithCollege = async (formData: { name: string; email: string; college: string; password: string; referralCode?: string }) => {
    const data = await netlifySignUpCollege(formData);
    setUser(data);
    return data;
  };

  const loginWithGoogle = async () => {
    await netlifyLoginGoogle();
  };

  const logout = async () => {
    setUser(null);
    await logoutNetlifyUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithCollege,
        signUpWithCollege,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
