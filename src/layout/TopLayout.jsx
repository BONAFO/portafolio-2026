"use client";

import BannerContainer from "../containers/BannerContainer";
import { ScreenProvider } from "../context/ScreenContext";


export default function TopLayout({ children }) {
  return (
    <ScreenProvider>
      <main className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <BannerContainer/>
        {children}
      </main>
    </ScreenProvider>
  );
}