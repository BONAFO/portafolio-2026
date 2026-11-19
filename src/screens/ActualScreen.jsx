
"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { useScreen } from "@/src/context/ScreenContext";
import { useSlideLogic } from "@/src/context/SlideLogicContext";
import SCREENS from "@/src/data/Screens";

export default function ActualScreen() {
  const { screenLoaded } = useScreen();
  const { activeScreen } = useSlideLogic();

  const [mountedScreens, setMountedScreens] = useState([0]);
  const [initialOffsets, setInitialOffsets] = useState({});

  const previousScreenRef = useRef(activeScreen);
  const animationFrameRef = useRef(null);

  useLayoutEffect(() => {
    const previousScreen = previousScreenRef.current;

    if (activeScreen === previousScreen) return;

    const isMounted = mountedScreens.includes(activeScreen);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (!isMounted) {
      setMountedScreens((current) =>
        current.includes(activeScreen)
          ? current
          : [...current, activeScreen]
      );

      setInitialOffsets({
        [activeScreen]: activeScreen - previousScreen,
      });
    } else {
      setInitialOffsets({});
    }

    previousScreenRef.current = activeScreen;
  }, [activeScreen, mountedScreens]);

  useLayoutEffect(() => {
    const screenIndex = Number(Object.keys(initialOffsets)[0]);

    if (Number.isNaN(screenIndex)) return;

    animationFrameRef.current = requestAnimationFrame(() => {
      setInitialOffsets((current) => {
        const updated = { ...current };
        delete updated[screenIndex];
        return updated;
      });
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initialOffsets]);

  if (!screenLoaded || SCREENS.length === 0) return null;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {mountedScreens.map((screenIndex) => {
        const Screen = SCREENS[screenIndex];

        const offset =
          initialOffsets[screenIndex] ??
          screenIndex - activeScreen;

        const isActive = screenIndex === activeScreen;

        return (
          <div
            key={screenIndex}
            className="absolute inset-0 h-full w-full"
            style={{
              transform: `translate3d(${offset * 100}%, 0, 0)`,
              transition: "transform 1000ms ease-in-out",
              visibility: "visible",
              pointerEvents: isActive ? "auto" : "none",
              willChange: "transform",
            }}
          >
            <Screen />
          </div>
        );
      })}
    </div>
  );
}
