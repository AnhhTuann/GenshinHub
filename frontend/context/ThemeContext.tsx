"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  element: string | null;
  setElement: (el: string | null) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  element: null,
  setElement: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [element, setElement] = useState<string | null>(null);

  useEffect(() => {
    // Remove all existing element theme classes
    const classes = document.documentElement.className.split(" ");
    const nonThemeClasses = classes.filter(c => !c.startsWith("theme-"));
    
    if (element) {
      nonThemeClasses.push(`theme-${element.toLowerCase()}`);
    }
    
    document.documentElement.className = nonThemeClasses.join(" ");
  }, [element]);

  return (
    <ThemeContext.Provider value={{ element, setElement }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
