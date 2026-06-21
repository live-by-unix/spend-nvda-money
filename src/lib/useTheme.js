import { useState, useEffect, useCallback } from "react";

const THEME_KEY = "nvidia_spend_theme";

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === "dark" ? "light" : "dark");
  }, []);

  return { theme, toggleTheme };
}