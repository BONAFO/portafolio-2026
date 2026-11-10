import HeroBanner from "@/src/components/Banner3";

export default function MainLayout({ children }) {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Banner fijo arriba */}
      <div className="fixed top-0 left-0 z-50 w-full m-0 p-0">
        <HeroBanner />
      </div>

      <div className="relative z-10 w-full pt-[250px] sm:pt-[450px] lg:pt-[520px]">
        {children}
      </div>
    </main>
  );
}