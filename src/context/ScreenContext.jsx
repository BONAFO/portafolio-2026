"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ScreenContext = createContext(null);

export function ScreenProvider({ children }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [screenLoaded, setScreenLoaded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleScreenChange = () => {
      setIsDesktop(mediaQuery.matches);
      setScreenLoaded(true);
    };

    handleScreenChange();
    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  return (
    <ScreenContext.Provider value={{ isDesktop, screenLoaded }}>
      {children}
    </ScreenContext.Provider>
  );
}

export function useScreen() {
  const context = useContext(ScreenContext);

  if (!context) {
    throw new Error("useScreen debe utilizarse dentro de ScreenProvider");
  }

  return context;
}