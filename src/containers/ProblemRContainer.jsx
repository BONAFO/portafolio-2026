"use client";

import { useScreen } from "@/src/context/ScreenContext";
import { ProblemRDesktop, ProblemRMobile } from "../components/ProblemR";


export default function ProblemRContainer() {
  const { isDesktop, screenLoaded } = useScreen();

  if (!screenLoaded) return null;

  return isDesktop ? <ProblemRDesktop /> : <ProblemRMobile />;
}
 