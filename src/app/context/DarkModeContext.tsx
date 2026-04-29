import React, { createContext, useContext, useState } from "react";

interface DarkModeContextValue {
  isDark: boolean;
  toggle: () => void;
}

const DarkModeContext = createContext<DarkModeContextValue>({
  isDark: false,
  toggle: () => {},
});

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem("b2u-dark-mode") === "true";
    } catch {
      return false;
    }
  });

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("b2u-dark-mode", String(next));
      } catch {}
      return next;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
