"use client";

import ActualScreen from "@/src/screens/ActualScreen";

export default function MainLayout({ children }) {
  return (
    <main className="relative h-dvh w-full overflow-hidden">
      <ActualScreen />
    </main>
  );
}
