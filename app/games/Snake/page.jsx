"use client";

import { SnakeDesktop, SnakeMobile } from "@/app/games/Snake/Snake";

export default function SnakePage() {
  return (
    <>
      <div className="hidden h-dvh md:block">
        <SnakeDesktop />
      </div>

      <div className="h-dvh md:hidden">
        <SnakeMobile />
      </div>
    </>
  );
} 