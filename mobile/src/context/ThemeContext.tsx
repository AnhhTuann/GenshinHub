import React, { createContext, useContext, useState } from 'react';

type ElementType = 'pyro' | 'hydro' | 'anemo' | 'electro' | 'dendro' | 'cryo' | 'geo' | 'default';

interface ThemeContextType {
  elementTheme: ElementType;
  setElementTheme: (theme: ElementType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  elementTheme: 'default',
  setElementTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [elementTheme, setElementTheme] = useState<ElementType>('default');

  // In React Native with NativeWind v4, we can apply the theme class to a View wrapper
  return (
    <ThemeContext.Provider value={{ elementTheme, setElementTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
