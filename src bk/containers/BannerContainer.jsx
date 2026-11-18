"use client";

import { useEffect, useState } from "react";
import { useBanner } from "@/src bk/context/BannerContext";
import { profile } from "@/src bk/components/Data";

import { BannerDesktop,BannerMobile} from "@/src bk/components/Banner";

const letters = {
  A: ["M5 40 L5 10 L15 0 L25 10 L25 40", "M5 25 H25"],
  B: ["M5 40 V0 H18 L25 7 V15 L18 20 H5", "M5 20 H19 L25 26 V34 L19 40 H5"],
  C: ["M25 5 H12 L5 12 V28 L12 35 H25"],
  D: ["M5 40 V0 H17 L25 8 V32 L17 40 H5"],
  E: ["M25 0 H5 V40 H25", "M5 20 H20"],
  F: ["M5 40 V0 H25", "M5 20 H20"],
  G: ["M25 5 H12 L5 12 V28 L12 35 H25 V20 H17"],
  H: ["M5 0 V40", "M25 0 V40", "M5 20 H25"],
  I: ["M5 0 H25", "M15 0 V40", "M5 40 H25"],
  J: ["M25 0 V30 L18 40 H8 L3 34"],
  K: ["M5 0 V40", "M25 0 L5 20 L25 40"],
  L: ["M5 0 V40 H25"],
  M: ["M5 40 V0 L15 15 L25 0 V40"],
  N: ["M5 40 V0 L25 40 V0"],
  O: ["M12 0 H18 L25 7 V33 L18 40 H12 L5 33 V7 Z"],
  P: ["M5 40 V0 H18 L25 7 V15 L18 22 H5"],
  Q: ["M12 0 H18 L25 7 V33 L18 40 H12 L5 33 V7 Z", "M18 32 L28 42"],
  R: ["M5 40 V0 H18 L25 7 V15 L18 22 H5", "M16 22 L26 40"],
  S: ["M25 5 H12 L5 12 V16 L12 20 H18 L25 25 V32 L18 40 H5"],
  T: ["M5 0 H25", "M15 0 V40"],
  U: ["M5 0 V32 L12 40 H18 L25 32 V0"],
  V: ["M5 0 L15 40 L25 0"],
  W: ["M5 0 L9 40 L15 25 L21 40 L25 0"],
  X: ["M5 0 L25 40", "M25 0 L5 40"],
  Y: ["M5 0 L15 20 L25 0", "M15 20 V40"],
  Z: ["M5 0 H25 L5 40 H25"],
};

const mobilePaths = [
  "M0 35 H35 L48 48 H78",
  "M0 75 H20 L35 90 H65",
  "M0 165 H35 L48 152 H78",
  "M0 190 H55 L68 177 H95",
  "M390 35 H355 L342 48 H312",
  "M390 75 H370 L355 90 H325",
  "M390 165 H355 L342 152 H312",
  "M390 190 H335 L322 177 H295",
];

const desktopPaths = [
  "M0 120 H250 L310 165 H500",
  "M0 180 H180 L230 225 H420",
  "M0 300 H220 L280 260 H480",
  "M0 390 H300 L360 345 H550",
  "M0 480 H200 L250 435 H450",
  "M0 540 H350 L400 500 H600",
  "M1920 120 H1670 L1610 165 H1420",
  "M1920 180 H1740 L1690 225 H1500",
  "M1920 300 H1700 L1640 260 H1440",
  "M1920 390 H1620 L1560 345 H1370",
  "M1920 480 H1720 L1670 435 H1470",
  "M1920 540 H1570 L1520 500 H1320",
];

function CircuitText({ text, y, scale = 1 }) {
  const chars = text.toUpperCase().split("");
  let cursor = 0;

  const positions = chars.map((char) => {
    const x = cursor;
    cursor += char === " " ? 20 : 38;
    return { char, x };
  });

  const totalWidth = cursor;
  const offsetX = (1100 - totalWidth * scale) / 2;

  return (
    <g transform={`translate(${offsetX} ${y}) scale(${scale})`}>
      {positions.map(({ char, x }, index) => {
        if (char === " ") return null;

        const paths = letters[char] || [];

        return (
          <g key={`${char}-${index}`} transform={`translate(${x} 0)`}>
            {paths.map((path, i) => (
              <g key={i}>
                <path
                  d={path}
                  fill="none"
                  stroke="#a66e32"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={path}
                  fill="none"
                  stroke="#e5bd78"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            ))}

            <circle cx="5" cy="40" r="2.5" fill="#d6a45c" />
            <circle cx="5" cy="40" r="1" fill="#080808" />
          </g>
        );
      })}
    </g>
  );
}

export default function HeroBannerContainer() {
  const { bannerVisible } = useBanner();

  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(null);
  const [showData, setShowData] = useState(false);
  const [bannerLoaded, setBannerLoaded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleScreenChange = () => {
      setIsDesktop(mediaQuery.matches);
    };

    handleScreenChange();
    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  useEffect(() => {
    if (!showData) return;

    const pulseTimer = setTimeout(() => {
      setBannerLoaded(true);
    }, 850);

    return () => clearTimeout(pulseTimer);
  }, [showData]);

  const handleLinesLoaded = () => {
    setShowData(true);
  };

  if (!mounted || !bannerVisible || isDesktop === null) return null;

  return (
    <>
      <style jsx global>{`
        .circuit-draw path {
          stroke-dasharray: 100 100;
          stroke-dashoffset: 100;
          animation: circuit-draw 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        @keyframes circuit-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        .banner-data {
          animation: data-appear 0.85s ease-out forwards;
        }

        @keyframes data-appear {
          from {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(7px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .energy-pulse path {
          stroke-dasharray: 8 92;
          stroke-dashoffset: 100;
          opacity: 0;
        }

        .energy-pulse.active path {
          animation: energy-flow 2.8s linear infinite;
        }

        .energy-pulse.active path:nth-child(2n) {
          animation-duration: 3.2s;
        }

        .energy-pulse.active path:nth-child(3n) {
          animation-duration: 3.6s;
        }

        @keyframes energy-flow {
          0% {
            stroke-dashoffset: 100;
            opacity: 0;
          }

          10% {
            opacity: 0.9;
          }

          85% {
            opacity: 0.9;
          }

          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }
      `}</style>

      {isDesktop ? (
        <BannerDesktop
          profile={profile}
          desktopPaths={desktopPaths}
          CircuitText={CircuitText}
          showData={showData}
          bannerLoaded={bannerLoaded}
          handleLinesLoaded={handleLinesLoaded}
        />
      ) : (
        <BannerMobile
          profile={profile}
          mobilePaths={mobilePaths}
          CircuitText={CircuitText}
          showData={showData}
          bannerLoaded={bannerLoaded}
          handleLinesLoaded={handleLinesLoaded}
        />
      )}
    </>
  );
}