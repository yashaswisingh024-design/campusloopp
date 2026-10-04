"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  getCurrentNetlifyUser,
  logoutNetlifyUser,
  loginWithCollegeEmail as netlifyLoginCollege,
  loginWithApaar as netlifyLoginApaar,
  signUpWithCollegeEmail as netlifySignUpCollege,
  signUpWithApaar as netlifySignUpApaar,
  loginWithGoogle as netlifyLoginGoogle,
  handleOAuthCallback,
  normalizeUser,
  onAuthChange
} from '@/lib/netlify-identity';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  loginWithCollege: (email: string, password: string) => Promise<UserProfile | null>;
  loginWithApaar: (apaarId: string, password: string) => Promise<UserProfile | null>;
  signUpWithCollege: (data: { name: string; email: string; college: string; password: string; referralCode?: string }) => Promise<UserProfile | null>;
  signUpWithApaar: (data: { name: string; apaarId: string; college: string; password: string; referralCode?: string }) => Promise<UserProfile | null>;
  loginWithGoogle: () => void;
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
            localStorage.setItem('campusloop_user', JSON.stringify(oauthUser));
            setIsLoading(false);
            window.history.replaceState(null, '', window.location.pathname);
            return;
          }
        }

        const currentNetlifyUser = await getCurrentNetlifyUser();
        if (currentNetlifyUser && mounted) {
          setUser(currentNetlifyUser);
          localStorage.setItem('campusloop_user', JSON.stringify(currentNetlifyUser));
          setIsLoading(false);
          return;
        }

        if (typeof window !== 'undefined') {
          const savedUser = localStorage.getItem('campusloop_user');
          if (savedUser && mounted) {
            setUser(JSON.parse(savedUser));
          }
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
            if (typeof window !== 'undefined') {
              localStorage.setItem('campusloop_user', JSON.stringify(norm));
            }
          } else {
            setUser(null);
            if (typeof window !== 'undefined') {
              localStorage.removeItem('campusloop_user');
            }
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('campusloop_user', JSON.stringify(data));
    }
    return data;
  };

  const loginWithApaar = async (apaarId: string, password: string) => {
    const data = await netlifyLoginApaar(apaarId, password);
    setUser(data);
    if (typeof window !== 'undefined') {
      localStorage.setItem('campusloop_user', JSON.stringify(data));
    }
    return data;
  };

  const signUpWithCollege = async (formData: { name: string; email: string; college: string; password: string; referralCode?: string }) => {
    const data = await netlifySignUpCollege(formData);
    setUser(data);
    if (typeof window !== 'undefined') {
      localStorage.setItem('campusloop_user', JSON.stringify(data));
    }
    return data;
  };

  const signUpWithApaar = async (formData: { name: string; apaarId: string; college: string; password: string; referralCode?: string }) => {
    const data = await netlifySignUpApaar(formData);
    setUser(data);
    if (typeof window !== 'undefined') {
      localStorage.setItem('campusloop_user', JSON.stringify(data));
    }
    return data;
  };

  const loginWithGoogle = () => {
    netlifyLoginGoogle();
  };

  const logout = async () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('campusloop_user');
    }
    await logoutNetlifyUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithCollege,
        loginWithApaar,
        signUpWithCollege,
        signUpWithApaar,
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
