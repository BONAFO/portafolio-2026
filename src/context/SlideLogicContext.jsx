
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useScreen } from "@/src/context/ScreenContext";
import SCREENS from "@/src/data/Screens";

const SlideLogicContext = createContext(null);

export function SlideLogicProvider({ children }) {
  const { isDesktop, screenLoaded } = useScreen();

  const [activeScreen, setActiveScreen] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeScreenRef = useRef(0);
  const wheelLocked = useRef(false);
  const wheelTimer = useRef(null);
  const touchStart = useRef(null);

  const goToScreen = useCallback((index) => {
    const nextIndex = Math.max(
      0,
      Math.min(SCREENS.length - 1, index)
    );

    const currentIndex = activeScreenRef.current;

    if (nextIndex === currentIndex) return;

    setDirection(nextIndex > currentIndex ? 1 : -1);
    activeScreenRef.current = nextIndex;
    setActiveScreen(nextIndex);
  }, []);

  const nextScreen = useCallback(() => {
    goToScreen(activeScreenRef.current + 1);
  }, [goToScreen]);

  const previousScreen = useCallback(() => {
    goToScreen(activeScreenRef.current - 1);
  }, [goToScreen]);

  useEffect(() => {
    if (!screenLoaded) return;

    const handleWheel = (event) => {
      const delta = isDesktop
        ? event.deltaY
        : Math.abs(event.deltaY) > Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (Math.abs(delta) < 10) return;

      event.preventDefault();

      if (wheelLocked.current) return;

      wheelLocked.current = true;

      if (delta > 0) {
        nextScreen();
      } else {
        previousScreen();
      }

      clearTimeout(wheelTimer.current);

      wheelTimer.current = setTimeout(() => {
        wheelLocked.current = false;
      }, 140);
    };

    const handleTouchStart = (event) => {
      if (event.touches.length !== 1) return;

      touchStart.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    };

    const handleTouchEnd = (event) => {
      if (!touchStart.current || event.changedTouches.length !== 1) return;

      const deltaX = event.changedTouches[0].clientX - touchStart.current.x;
      const deltaY = event.changedTouches[0].clientY - touchStart.current.y;

      touchStart.current = null;

      const horizontal = Math.abs(deltaX) > Math.abs(deltaY);
      const delta = horizontal ? deltaX : deltaY;

      if (Math.abs(delta) < 40) return;

      if (delta < 0) {
        nextScreen();
      } else {
        previousScreen();
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    if (!isDesktop) {
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });

      window.addEventListener("touchend", handleTouchEnd, {
        passive: true,
      });
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);

      clearTimeout(wheelTimer.current);

      wheelLocked.current = false;
      touchStart.current = null;
    };
  }, [isDesktop, screenLoaded, nextScreen, previousScreen]);

  return (
    <SlideLogicContext.Provider
      value={{
        activeScreen,
        direction,
        goToScreen,
        nextScreen,
        previousScreen,
      }}
    >
      {children}
    </SlideLogicContext.Provider>
  );
}

export function useSlideLogic() {
  const context = useContext(SlideLogicContext);

  if (!context) {
    throw new Error(
      "useSlideLogic debe utilizarse dentro de SlideLogicProvider"
    );
  }

  return context;
}
