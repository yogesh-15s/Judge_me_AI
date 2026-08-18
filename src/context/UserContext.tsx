"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  userName: string | null;
  userId: string | null;
  hasCompletedOnboarding: boolean;
  isLoaded: boolean;
  saveUserName: (name: string) => Promise<void>;
  resetUser: () => void;
  openOnboarding: () => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserNameState] = useState<string | null>(null);
  const [userId, setUserIdState] = useState<string | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedName = localStorage.getItem("judge_me_username");
      const storedId = localStorage.getItem("judge_me_userid");

      if (storedName && storedName.trim().length > 0) {
        setUserNameState(storedName.trim());
        setUserIdState(storedId || `user_${Date.now()}`);
        setHasCompletedOnboarding(true);
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    } catch (e) {
      console.error("LocalStorage error", e);
      setShowModal(true);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveUserName = async (name: string) => {
    const cleanName = name.trim();
    if (!cleanName) return;

    let currentId = userId;
    if (!currentId) {
      currentId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    }

    // Update state
    setUserNameState(cleanName);
    setUserIdState(currentId);
    setHasCompletedOnboarding(true);
    setShowModal(false);

    // Persist in localStorage
    try {
      localStorage.setItem("judge_me_username", cleanName);
      localStorage.setItem("judge_me_userid", currentId);
      localStorage.setItem("judge_me_started_at", new Date().toISOString());
    } catch (e) {
      console.error("Failed to save user in localStorage", e);
    }

    // Post session data to backend API endpoint asynchronously
    try {
      await fetch("/api/users/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          userId: currentId,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn("Backend user start logging error (ignored for offline client):", err);
    }
  };

  const resetUser = () => {
    try {
      localStorage.removeItem("judge_me_username");
    } catch (e) {
      console.error(e);
    }
    setUserNameState(null);
    setHasCompletedOnboarding(false);
    setShowModal(true);
  };

  const openOnboarding = () => {
    setShowModal(true);
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        userId,
        hasCompletedOnboarding,
        isLoaded,
        saveUserName,
        resetUser,
        openOnboarding,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
