"use client";

import { useScreen } from "@/src/context/ScreenContext";
import { MyWorksMobile, MyWorksDesk } from "@/src/components/MyWorks";

export default function MyWorksContainer() {
  const { isDesktop, screenLoaded } = useScreen();

  if (!screenLoaded) return null;

  return isDesktop ? <MyWorksDesk /> : <MyWorksMobile />;
}
 