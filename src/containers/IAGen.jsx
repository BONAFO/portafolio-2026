"use client";

import { useScreen } from "@/src/context/ScreenContext";
import { IAGenDesktop, IAGenMobile } from "../components/IAGen";

export default function IAGenContainer() {
  const { isDesktop, screenLoaded } = useScreen();

  if (!screenLoaded) return null;

  return isDesktop ? <IAGenDesktop /> : <IAGenMobile />;
}
