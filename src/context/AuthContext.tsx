"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: "google";
  createdAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoaded: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  signInWithGoogle: (customEmail?: string) => Promise<AuthUser>;
  setUserFromGoogleProfile: (profile: { id?: string; email: string; name: string; picture?: string }) => AuthUser;
  logout: () => void;
  triggerAuth: (onSuccessAction?: () => void) => void;
  pendingCallback: (() => void) | null;
  googleClientId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("judge_me_user_auth");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Auth localStorage parse error", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const completeLogin = (newUser: AuthUser): AuthUser => {
    setUser(newUser);
    try {
      localStorage.setItem("judge_me_user_auth", JSON.stringify(newUser));
    } catch (e) {
      console.error("Failed to store user auth", e);
    }

    setShowAuthModal(false);

    // Run pending action callback if any (e.g. submit vote immediately)
    if (pendingCallback) {
      setTimeout(() => {
        pendingCallback();
        setPendingCallback(null);
      }, 100);
    }

    return newUser;
  };

  const setUserFromGoogleProfile = (profile: { id?: string; email: string; name: string; picture?: string }): AuthUser => {
    const id = profile.id ? `usr_google_${profile.id}` : `usr_google_${btoa(profile.email).substring(0, 12).replace(/=/g, "")}`;
    const newUser: AuthUser = {
      id,
      name: profile.name || profile.email.split("@")[0].toUpperCase(),
      email: profile.email,
      image: profile.picture || "https://lh3.googleusercontent.com/a/default-user=s96-c",
      provider: "google",
      createdAt: new Date().toISOString(),
    };
    return completeLogin(newUser);
  };

  const signInWithGoogle = async (customEmail?: string): Promise<AuthUser> => {
    // Generate deterministic Google Auth Session ID for mock/test mode
    const email = customEmail || `jury_member_${Math.floor(100 + Math.random() * 900)}@gmail.com`;
    const name = email.split("@")[0].replace(/_/g, " ").toUpperCase();
    
    // Hash email to create deterministic ID
    const id = `usr_google_${btoa(email).substring(0, 12).replace(/=/g, "")}`;
    
    const newUser: AuthUser = {
      id,
      name: name || "ANONYMOUS JUROR",
      email,
      image: "https://lh3.googleusercontent.com/a/default-user=s96-c",
      provider: "google",
      createdAt: new Date().toISOString(),
    };

    return completeLogin(newUser);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("judge_me_user_auth");
    } catch (e) {
      console.error(e);
    }
  };

  const triggerAuth = (onSuccessAction?: () => void) => {
    if (onSuccessAction) {
      setPendingCallback(() => onSuccessAction);
    }
    setShowAuthModal(true);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated: Boolean(user),
          isLoaded,
          showAuthModal,
          setShowAuthModal,
          signInWithGoogle,
          setUserFromGoogleProfile,
          logout,
          triggerAuth,
          pendingCallback,
          googleClientId: GOOGLE_CLIENT_ID,
        }}
      >
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

