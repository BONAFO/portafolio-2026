import HeroBanner from "@/src/components/Banner";

export default function MainLayout({ children }) {
  return (
    <main className="relative flex min-h-screen w-full flex-col">
      <div className="fixed top-0 left-0 z-50 w-full m-0 p-0">
        <HeroBanner />
      </div>

      {/* Coincide exactamente con h-[180px] de mobile y las alturas responsivas */}
      <div className="relative z-10 w-full pt-[180px] sm:pt-[420px] lg:pt-[500px]">
        {children}
      </div>
    </main>
  );
}