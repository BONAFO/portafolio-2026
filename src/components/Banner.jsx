
"use client";

const profile = {
  name: "BRUNO GIULIANO",
  surname: "BONASIF COLLOCA",
  role: ["PROGRAMADOR", "FULL STACK"],
};

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

export default function HeroBanner() {
  return (
    <>
      {/* MOBILE */}
      <section className="relative flex h-[25dvh] w-full items-center justify-center overflow-hidden bg-[#080808] px-2 sm:hidden">

        <svg
          viewBox="0 0 390 210"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="circuitGlowMobile"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#a66e32" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#e5bd78" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#a66e32" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          <g
            fill="none"
            stroke="url(#circuitGlowMobile)"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 35 H35 L48 48 H78" />
            <path d="M0 75 H20 L35 90 H65" />
            <path d="M0 165 H35 L48 152 H78" />
            <path d="M0 190 H55 L68 177 H95" />

            <path d="M390 35 H355 L342 48 H312" />
            <path d="M390 75 H370 L355 90 H325" />
            <path d="M390 165 H355 L342 152 H312" />
            <path d="M390 190 H335 L322 177 H295" />
          </g>

          <g fill="#d6a45c">
            <circle cx="35" cy="35" r="2.5" />
            <circle cx="20" cy="75" r="2.5" />
            <circle cx="35" cy="165" r="2.5" />
            <circle cx="55" cy="190" r="2.5" />

            <circle cx="355" cy="35" r="2.5" />
            <circle cx="370" cy="75" r="2.5" />
            <circle cx="355" cy="165" r="2.5" />
            <circle cx="335" cy="190" r="2.5" />
          </g>

          <g fill="#e5bd78" opacity="0.45">
            <circle cx="12" cy="15" r="1.5" />
            <circle cx="90" cy="25" r="1.5" />
            <circle cx="378" cy="15" r="1.5" />
            <circle cx="300" cy="25" r="1.5" />
            <circle cx="12" cy="200" r="1.5" />
            <circle cx="378" cy="200" r="1.5" />
          </g>
        </svg>

        <div className="relative z-10 flex w-full flex-col items-center justify-center">
          <svg
            viewBox="0 0 1100 220"
            className="h-auto w-full max-w-[390px] overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <CircuitText text={profile.name} y={25} scale={1.15} />
            <CircuitText text={profile.surname} y={115} scale={0.85} />
          </svg>

          {/* Profesión */}
          <div className="mt-1 flex flex-col items-center gap-1">
            {profile.role.map((line, index) => (
              <div key={index} className="flex items-center gap-2">
                {index === 0 && (
                  <span className="h-px w-5 bg-[#a66e32]" />
                )}

                <p className="text-[11px] font-semibold tracking-[0.22em] text-[#e5bd78]">
                  {line}
                </p>

                {index === 0 && (
                  <span className="h-px w-5 bg-[#a66e32]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESKTOP / TABLET */}
      <section className="relative hidden h-[450px] w-full items-center justify-center overflow-hidden bg-[#080808] sm:flex lg:h-[520px]">

        <svg
          viewBox="0 0 1920 600"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="circuitGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a66e32" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#e5bd78" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a66e32" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <g
            fill="none"
            stroke="url(#circuitGlow)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 120 H250 L310 165 H500" />
            <path d="M0 180 H180 L230 225 H420" />
            <path d="M0 300 H220 L280 260 H480" />
            <path d="M0 390 H300 L360 345 H550" />
            <path d="M0 480 H200 L250 435 H450" />
            <path d="M0 540 H350 L400 500 H600" />
          </g>

          <g
            fill="none"
            stroke="url(#circuitGlow)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1920 120 H1670 L1610 165 H1420" />
            <path d="M1920 180 H1740 L1690 225 H1500" />
            <path d="M1920 300 H1700 L1640 260 H1440" />
            <path d="M1920 390 H1620 L1560 345 H1370" />
            <path d="M1920 480 H1720 L1670 435 H1470" />
            <path d="M1920 540 H1570 L1520 500 H1320" />
          </g>

          <g fill="#d6a45c">
            {[
              [250, 120], [180, 180], [220, 300], [300, 390],
              [200, 480], [350, 540], [1670, 120], [1740, 180],
              [1700, 300], [1620, 390], [1720, 480], [1570, 540],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" />
            ))}
          </g>

          <g fill="#e5bd78" opacity="0.5">
            <circle cx="100" cy="80" r="2" />
            <circle cx="500" cy="100" r="2" />
            <circle cx="250" cy="550" r="2" />
            <circle cx="1820" cy="80" r="2" />
            <circle cx="1400" cy="100" r="2" />
            <circle cx="1650" cy="550" r="2" />
          </g>
        </svg>

        <div className="relative z-10 flex w-full flex-col items-center justify-center px-4">
          <svg
            viewBox="0 0 1100 220"
            className="h-auto w-full max-w-[1100px] overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <CircuitText text={profile.name} y={25} scale={1.15} />
            <CircuitText text={profile.surname} y={115} scale={0.85} />
          </svg>

          <div className="mt-5 flex items-center gap-3 sm:mt-7 sm:gap-5">
            <span className="h-px w-8 bg-[#a66e32] sm:w-16" />

            <p className="whitespace-nowrap text-[10px] font-medium tracking-[0.25em] text-[#e5bd78] sm:text-sm sm:tracking-[0.4em] md:text-base">
              {profile.role.join(" ")}
            </p>

            <span className="h-px w-8 bg-[#a66e32] sm:w-16" />
          </div>
        </div>
      </section>
    </>
  );
}
