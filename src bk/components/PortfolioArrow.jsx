
"use client";

import { useEffect, useState } from "react";

const arrowPaths = [
  "M60 0 V125",
  "M60 125 L20 85",
  "M60 125 L100 85",
  "M0 22 H30 L45 37",
  "M120 22 H90 L75 37",
];

export default function PortfolioArrow({ onClick }) {
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
    <>
      <style jsx>{`
        .arrow-draw path {
          stroke-dasharray: 100 100;
          stroke-dashoffset: 100;
          animation: arrow-draw 1.1s cubic-bezier(0.65, 0, 0.35, 1)
            forwards;
        }

        @keyframes arrow-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        .arrow-pulse path {
          stroke-dasharray: 10 90;
          stroke-dashoffset: 100;
          opacity: 0;
        }

        .arrow-pulse.active path {
          animation: arrow-energy 2.8s linear infinite;
        }

        .arrow-pulse.active path:nth-child(2n) {
          animation-duration: 3.2s;
        }

        .arrow-pulse.active path:nth-child(3n) {
          animation-duration: 3.6s;
        }

        @keyframes arrow-energy {
          0% {
            stroke-dashoffset: 100;
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          85% {
            opacity: 1;
          }

          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        .arrow-appear {
          animation: arrow-appear 0.7s ease-out forwards;
        }

        @keyframes arrow-appear {
          from {
            opacity: 0;
            filter: blur(5px);
          }

          to {
            opacity: 1;
            filter: blur(0);
          }
        }

        .arrow-float {
          animation: arrow-float 2s ease-in-out infinite;
        }

        @keyframes arrow-float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(9px);
          }
        }
      `}</style>

      <button
        type="button"
        onClick={onClick}
        aria-label="Explorar portfolio"
        className="arrow-appear group flex flex-col items-center gap-2"
      >
        <span className="text-[11px] font-medium tracking-[0.45em] text-[#e5bd78]/70 transition-colors duration-300 group-hover:text-[#e5bd78]">
          EXPLORAR
        </span>

        <div className="arrow-float relative h-[145px] w-[120px]">
          <svg
            viewBox="0 0 120 140"
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter
                id="arrowGlow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            {/* PISTAS BASE */}
            <g
              className="arrow-draw"
              fill="none"
              stroke="#a66e32"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {arrowPaths.map((path, index) => (
                <path
                  key={index}
                  d={path}
                  pathLength="100"
                  style={{ animationDelay: `${index * 0.12}s` }}
                  onAnimationEnd={
                    index === arrowPaths.length - 1
                      ? () => setDrawn(true)
                      : undefined
                  }
                />
              ))}
            </g>

            {/* PULSO CON RESPLANDOR */}
            <g
              className={`arrow-pulse ${pulseActive ? "active" : ""}`}
              fill="none"
              stroke="#ffe0a0"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#arrowGlow)"
            >
              {arrowPaths.map((path, index) => (
                <path key={index} d={path} pathLength="100" />
              ))}
            </g>

            {/* PULSO CENTRAL */}
            <g
              className={`arrow-pulse ${pulseActive ? "active" : ""}`}
              fill="none"
              stroke="#fff0c8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {arrowPaths.map((path, index) => (
                <path key={index} d={path} pathLength="100" />
              ))}
            </g>

            {/* NODOS */}
            <g fill="#d6a45c">
              <circle cx="60" cy="0" r="3" />
              <circle cx="20" cy="85" r="3" />
              <circle cx="100" cy="85" r="3" />
              <circle cx="0" cy="22" r="2" />
              <circle cx="120" cy="22" r="2" />
            </g>
          </svg>
        </div>
      </button>
    </>
  );
}
