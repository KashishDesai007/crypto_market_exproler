import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext({ theme: 'dark' as Theme, toggle: () => {} });

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // Start with a stable default to match server render and avoid reading localStorage during render
  const [theme, setTheme] = useState<Theme>('dark');

  // On mount, read saved preference and apply it. This avoids accessing localStorage during SSR or initial render
  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? (window.localStorage.getItem('theme') as Theme | null) : null;
      if (saved && saved !== theme) setTheme(saved);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply theme class and persist preference whenever theme changes (after mount)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-light', 'theme-dark');
      document.documentElement.classList.add(`theme-${theme}`);
    }
    try {
      if (typeof window !== 'undefined') window.localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  return useContext(ThemeContext);
}
