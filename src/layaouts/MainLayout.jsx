
import HeroBanner from "@/src/components/Banner";

export default function MainLayout({ children }) {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="fixed top-0 left-0 z-50 m-0 w-full p-0">
        <HeroBanner />
      </div>

      <div className="relative z-10 w-full pt-[25dvh] sm:pt-[450px] lg:pt-[520px]">
        {children}
      </div>
    </main>
  );
}
