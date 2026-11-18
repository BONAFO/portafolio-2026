"use client";

import { useEffect, useState } from "react";
import HeroBannerContainer from "@/src bk/containers/BannerContainer";
import PortfolioArrow from "@/src bk/components/PortfolioArrow";
import { BannerProvider, useBanner } from "@/src bk/context/BannerContext";

function MainContent({ children }) {
  const { bannerVisible } = useBanner();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleScreenChange = () => {
      setIsDesktop(mediaQuery.matches);
    };

    handleScreenChange();
    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {bannerVisible && (
        <>
          <div className="fixed inset-x-0 top-0 z-50 w-full">
            <HeroBannerContainer />
          </div>

          {isDesktop && (
            <div className="absolute inset-x-0 bottom-35 z-50 flex justify-center">
              <PortfolioArrow />
            </div>
          )}
        </>
      )}

      <div
        className={`relative z-10 w-full ${
          bannerVisible ? "pt-[25dvh] sm:pt-[450px] lg:pt-[520px]" : ""
        }`}
      >
        {children}
      </div>
    </main>
  );
}

export default function MainLayout({ children }) {
  return (
    <BannerProvider>
      <MainContent>{children}</MainContent>
    </BannerProvider>
  );
}