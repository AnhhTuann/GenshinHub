"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UISoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
}

const UISoundContext = createContext<UISoundContextType>({
  soundEnabled: false,
  toggleSound: () => {},
  playHover: () => {},
  playClick: () => {},
});

export const useUISound = () => useContext(UISoundContext);

export const UISoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // Load preference from local storage if available
    const savedPref = localStorage.getItem("genshinhub_sound");
    if (savedPref !== null) {
      setSoundEnabled(savedPref === "true");
    }
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("genshinhub_sound", String(next));
      return next;
    });
  };

  // Mock functions for now. In a real app, use Audio API
  const playHover = () => {
    if (!soundEnabled) return;
    // const audio = new Audio("/sfx/hover.mp3");
    // audio.volume = 0.2;
    // audio.play().catch(() => {});
  };

  const playClick = () => {
    if (!soundEnabled) return;
    // const audio = new Audio("/sfx/click.mp3");
    // audio.volume = 0.3;
    // audio.play().catch(() => {});
  };

  return (
    <UISoundContext.Provider value={{ soundEnabled, toggleSound, playHover, playClick }}>
      {children}
    </UISoundContext.Provider>
  );
};
