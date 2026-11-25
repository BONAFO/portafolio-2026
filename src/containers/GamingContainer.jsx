"use client";

import { GamingDesktop, GamingMobile } from "../components/Gaming";
import { useScreen } from "../context/ScreenContext";

export default function GamingContainer() {
  const { isDesktop, screenLoaded } = useScreen();

  if (!screenLoaded) return null;

  return isDesktop ? <GamingDesktop /> : <GamingMobile />;
}
