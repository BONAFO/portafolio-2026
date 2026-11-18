import { ScreenProvider } from "@/src/context/ScreenContext";
import { SlideLogicProvider } from "../context/SlideLogicContext";
import MainLayout from "../layout/MainLayout";

export default function PageContainer({ children }) {
  return (
    <>
      <ScreenProvider>
        <SlideLogicProvider>
          <MainLayout />
        </SlideLogicProvider>
      </ScreenProvider>
    </>
  );
}
