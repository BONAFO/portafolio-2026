
"use client";

import { useEffect, useState } from "react";
import { useScreen } from "@/src/context/ScreenContext";
import "@/src/css/ActionArrow.css";

const desktopPaths = [
  "M60 0 V125",
  "M60 125 L20 85",
  "M60 125 L100 85",
  "M0 22 H30 L45 37",
  "M120 22 H90 L75 37",
];

const mobilePaths = [
  "M0 60 H125",
  "M125 60 L85 20",
  "M125 60 L85 100",
  "M22 0 V30 L37 45",
  "M22 120 V90 L37 75",
];

function Arrow({ paths, mobile, onClick }) {
  const [mounted, setMounted] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!drawn) return;

    const timer = setTimeout(() => setPulseActive(true), 400);
    return () => clearTimeout(timer);
  }, [drawn]);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Explorar portfolio"
      className="action-arrow group flex cursor-pointer flex-col items-center gap-2 rounded-xl px-5 py-3 transition-all duration-300 hover:-translate-y-2 hover:bg-[#e5bd78]/[0.06] hover:shadow-[0_0_35px_rgba(229,189,120,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5bd78]/70"
    >
      <span className="text-[11px] font-medium tracking-[0.45em] text-[#e5bd78]/70 transition-all duration-300 group-hover:text-[#ffe0a0] group-hover:tracking-[0.55em]">
        EXPLORAR
      </span>

      <div
        className={`arrow-float relative transition-transform duration-300 group-hover:scale-110 ${
          mobile ? "h-[120px] w-[145px]" : "h-[145px] w-[120px]"
        }`}
      >
        <svg
          viewBox={mobile ? "0 0 140 120" : "0 0 120 140"}
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id={mobile ? "arrowGlowMobile" : "arrowGlowDesktop"}
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          <g
            className="arrow-draw"
            fill="none"
            stroke="#a66e32"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {paths.map((path, index) => (
              <path
                key={index}
                d={path}
                pathLength="100"
                style={{ animationDelay: `${index * 0.12}s` }}
                onAnimationEnd={
                  index === paths.length - 1
                    ? () => setDrawn(true)
                    : undefined
                }
              />
            ))}
          </g>

          <g
            className={`arrow-pulse ${pulseActive ? "active" : ""}`}
            fill="none"
            stroke="#ffe0a0"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${mobile ? "arrowGlowMobile" : "arrowGlowDesktop"})`}
          >
            {paths.map((path, index) => (
              <path key={index} d={path} pathLength="100" />
            ))}
          </g>

          <g
            className={`arrow-pulse ${pulseActive ? "active" : ""}`}
            fill="none"
            stroke="#fff0c8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {paths.map((path, index) => (
              <path key={index} d={path} pathLength="100" />
            ))}
          </g>

          <g fill="#d6a45c">
            {mobile ? (
              <>
                <circle cx="0" cy="60" r="3" />
                <circle cx="85" cy="20" r="3" />
                <circle cx="85" cy="100" r="3" />
                <circle cx="22" cy="0" r="2" />
                <circle cx="22" cy="120" r="2" />
              </>
            ) : (
              <>
                <circle cx="60" cy="0" r="3" />
                <circle cx="20" cy="85" r="3" />
                <circle cx="100" cy="85" r="3" />
                <circle cx="0" cy="22" r="2" />
                <circle cx="120" cy="22" r="2" />
              </>
            )}
          </g>
        </svg>
      </div>
    </button>
  );
}

export default function ActionArrow({ onClick }) {
  const { isDesktop, screenLoaded } = useScreen();

  if (!screenLoaded) return null;

  return (
    <Arrow
      paths={isDesktop ? desktopPaths : mobilePaths}
      mobile={!isDesktop}
      onClick={onClick}
    />
  );
}
