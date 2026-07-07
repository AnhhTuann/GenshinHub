"use client";

import { useEffect } from "react";
import { useTheme } from "./ThemeContext";

export default function ThemeSetter({ element }: { element: string }) {
  const { setElement } = useTheme();

  useEffect(() => {
    setElement(element);
    return () => setElement(null); // Reset on unmount
  }, [element, setElement]);

  return null;
}
