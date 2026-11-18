"use client";

import { createContext, useContext, useState } from "react";

const BannerContext = createContext(null);

export function BannerProvider({ children }) {
  const [bannerVisible, setBannerVisibleState] = useState(true);
  const [bannerLoaded, setBannerLoaded] = useState(false);

  const setBannerVisible = (value) => {
    setBannerLoaded(false);
    setBannerVisibleState(value);
  };

  const showBanner = () => {
    setBannerLoaded(false);
    setBannerVisibleState(true);
  };

  const hideBanner = () => {
    setBannerLoaded(false);
    setBannerVisibleState(false);
  };

  const toggleBanner = () => {
    setBannerLoaded(false);
    setBannerVisibleState((prev) => !prev);
  };

  return (
    <BannerContext.Provider
      value={{
        bannerVisible,
        setBannerVisible,
        showBanner,
        hideBanner,
        toggleBanner,
        bannerLoaded,
        setBannerLoaded,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
}

export function useBanner() {
  const context = useContext(BannerContext);

  if (!context) {
    throw new Error("useBanner debe utilizarse dentro de BannerProvider");
  }

  return context;
}