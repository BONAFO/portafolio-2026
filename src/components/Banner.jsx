"use client";

const profile = {
  name: "BRUNO GIULIANO",
  surname: "BONASIF COLLOCA",
  role: "PROGRAMADOR FULL STACK",
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

// export default function HeroBanner() {
//   const getTextWidth = (text) =>
//     text.split("").reduce(
//       (width, char) => width + (char === " " ? 20 : 38),
//       0
//     );

//   const nameScale = 1.15;
//   const surnameScale = 0.85;

//   return (
//     <section className="relative flex min-h-[520px] w-full items-center justify-center overflow-hidden bg-[#080808] sm:min-h-[600px] lg:min-h-[650px]">

//       {/* Fondo de pistas */}
//       <svg
//         viewBox="0 0 1400 600"
//         preserveAspectRatio="xMidYMid meet"
//         className="absolute inset-0 h-full w-full"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <linearGradient id="circuitGlow" x1="0" y1="0" x2="1" y2="0">
//             <stop offset="0%" stopColor="#a66e32" stopOpacity="0.15" />
//             <stop offset="50%" stopColor="#e5bd78" stopOpacity="0.8" />
//             <stop offset="100%" stopColor="#a66e32" stopOpacity="0.15" />
//           </linearGradient>
//         </defs>

//         {/* Pistas izquierdas */}
//         <g
//           fill="none"
//           stroke="url(#circuitGlow)"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M0 120 H100 L145 165 H230" />
//           <path d="M0 180 H65 L110 225 H190" />
//           <path d="M0 300 H90 L130 260 H220" />
//           <path d="M0 390 H120 L165 345 H240" />
//           <path d="M0 480 H75 L120 435 H210" />
//           <path d="M0 540 H150 L190 500 H260" />
//         </g>

//         {/* Pistas derechas */}
//         <g
//           fill="none"
//           stroke="url(#circuitGlow)"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M1400 120 H1300 L1255 165 H1170" />
//           <path d="M1400 180 H1335 L1290 225 H1210" />
//           <path d="M1400 300 H1310 L1270 260 H1180" />
//           <path d="M1400 390 H1280 L1235 345 H1160" />
//           <path d="M1400 480 H1325 L1280 435 H1190" />
//           <path d="M1400 540 H1250 L1210 500 H1140" />
//         </g>

//         {/* Terminales */}
//         <g fill="#d6a45c">
//           {[
//             [100, 120],
//             [65, 180],
//             [90, 300],
//             [120, 390],
//             [75, 480],
//             [150, 540],
//             [1300, 120],
//             [1335, 180],
//             [1310, 300],
//             [1280, 390],
//             [1325, 480],
//             [1250, 540],
//           ].map(([x, y], i) => (
//             <circle key={i} cx={x} cy={y} r="4" />
//           ))}
//         </g>

//         {/* Puntos decorativos */}
//         <g fill="#e5bd78" opacity="0.5">
//           <circle cx="40" cy="80" r="2" />
//           <circle cx="180" cy="100" r="2" />
//           <circle cx="80" cy="550" r="2" />
//           <circle cx="1360" cy="80" r="2" />
//           <circle cx="1220" cy="100" r="2" />
//           <circle cx="1320" cy="550" r="2" />
//         </g>
//       </svg>

//       {/* Contenido central */}
//       <div className="relative z-10 flex w-full flex-col items-center justify-center px-4">

//         {/* Nombre y apellidos */}
//         <svg
//           viewBox="0 0 1100 220"
//           className="h-auto w-full max-w-[1100px] overflow-visible"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <CircuitText
//             text={profile.name}
//             y={25}
//             scale={nameScale}
//           />

//           <CircuitText
//             text={profile.surname}
//             y={115}
//             scale={surnameScale}
//           />
//         </svg>

//         {/* Profesión */}
//         <div className="mt-5 flex items-center gap-3 sm:mt-7 sm:gap-5">
//           <span className="h-px w-8 bg-[#a66e32] sm:w-16" />

//           <p className="whitespace-nowrap text-[10px] font-medium tracking-[0.25em] text-[#e5bd78] sm:text-sm sm:tracking-[0.4em] md:text-base">
//             {profile.role}
//           </p>

//           <span className="h-px w-8 bg-[#a66e32] sm:w-16" />
//         </div>
//       </div>
//     </section>
//   );
// }


// ... (mantén todo el código de letters y CircuitText igual hasta HeroBanner)

// export default function HeroBanner() {
//   const nameScale = 1.15;
//   const surnameScale = 0.85;

//   return (
// <section className="relative flex h-[280px] w-full items-center justify-center overflow-hidden bg-[#080808] sm:h-[420px] lg:h-[500px]">
//       {/* Fondo de pistas (SVG) */}
//       <svg
//         viewBox="0 0 1400 600"
//         preserveAspectRatio="xMidYMid meet"
//         className="absolute inset-0 h-full w-full"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <linearGradient id="circuitGlow" x1="0" y1="0" x2="1" y2="0">
//             <stop offset="0%" stopColor="#a66e32" stopOpacity="0.15" />
//             <stop offset="50%" stopColor="#e5bd78" stopOpacity="0.8" />
//             <stop offset="100%" stopColor="#a66e32" stopOpacity="0.15" />
//           </linearGradient>
//         </defs>

//         {/* Pistas izquierdas */}
//         <g
//           fill="none"
//           stroke="url(#circuitGlow)"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M0 120 H100 L145 165 H230" />
//           <path d="M0 180 H65 L110 225 H190" />
//           <path d="M0 300 H90 L130 260 H220" />
//           <path d="M0 390 H120 L165 345 H240" />
//           <path d="M0 480 H75 L120 435 H210" />
//           <path d="M0 540 H150 L190 500 H260" />
//         </g>

//         {/* Pistas derechas */}
//         <g
//           fill="none"
//           stroke="url(#circuitGlow)"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M1400 120 H1300 L1255 165 H1170" />
//           <path d="M1400 180 H1335 L1290 225 H1210" />
//           <path d="M1400 300 H1310 L1270 260 H1180" />
//           <path d="M1400 390 H1280 L1235 345 H1160" />
//           <path d="M1400 480 H1325 L1280 435 H1190" />
//           <path d="M1400 540 H1250 L1210 500 H1140" />
//         </g>

//         {/* Terminales */}
//         <g fill="#d6a45c">
//           {[
//             [100, 120],
//             [65, 180],
//             [90, 300],
//             [120, 390],
//             [75, 480],
//             [150, 540],
//             [1300, 120],
//             [1335, 180],
//             [1310, 300],
//             [1280, 390],
//             [1325, 480],
//             [1250, 540],
//           ].map(([x, y], i) => (
//             <circle key={i} cx={x} cy={y} r="4" />
//           ))}
//         </g>

//         {/* Puntos decorativos */}
//         <g fill="#e5bd78" opacity="0.5">
//           <circle cx="40" cy="80" r="2" />
//           <circle cx="180" cy="100" r="2" />
//           <circle cx="80" cy="550" r="2" />
//           <circle cx="1360" cy="80" r="2" />
//           <circle cx="1220" cy="100" r="2" />
//           <circle cx="1320" cy="550" r="2" />
//         </g>
//       </svg>

//       {/* Contenido central */}
//       <div className="relative z-10 flex w-full flex-col items-center justify-center px-4">

//         {/* Nombre y apellidos */}
//         <svg
//           viewBox="0 0 1100 220"
//           className="h-auto w-full max-w-[1100px] overflow-visible"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <CircuitText
//             text={profile.name}
//             y={25}
//             scale={nameScale}
//           />

//           <CircuitText
//             text={profile.surname}
//             y={115}
//             scale={surnameScale}
//           />
//         </svg>

//         {/* Profesión */}
//         <div className="mt-4 flex items-center gap-3 sm:mt-6 sm:gap-5">
//           <span className="h-px w-8 bg-[#a66e32] sm:w-16" />

//           <p className="whitespace-nowrap text-[10px] font-medium tracking-[0.25em] text-[#e5bd78] sm:text-sm sm:tracking-[0.4em] md:text-base">
//             {profile.role}
//           </p>

//           <span className="h-px w-8 bg-[#a66e32] sm:w-16" />
//         </div>
//       </div>
//     </section>
//   );
// }


export default function HeroBanner() {
  const nameScale = 1.15;
  const surnameScale = 0.85;

  return (
    <section className="relative flex h-[180px] w-full items-start justify-center overflow-hidden bg-[#080808] sm:h-[420px] lg:h-[500px] pt-2">

      {/* Fondo de pistas (SVG adaptado para no dejar espacio arriba) */}
      <svg
        viewBox="0 0 1400 450"
        preserveAspectRatio="xMidYMin meet"
        className="absolute inset-0 h-full w-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circuitGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a66e32" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#e5bd78" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a66e32" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Pistas izquierdas */}
        <g fill="none" stroke="url(#circuitGlow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 60 H100 L145 105 H230" />
          <path d="M0 110 H65 L110 155 H190" />
          <path d="M0 200 H90 L130 160 H220" />
          <path d="M0 270 H120 L165 225 H240" />
        </g>

        {/* Pistas derechas */}
        <g fill="none" stroke="url(#circuitGlow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1400 60 H1300 L1255 105 H1170" />
          <path d="M1400 110 H1335 L1290 155 H1210" />
          <path d="M1400 200 H1310 L1270 160 H1180" />
          <path d="M1400 270 H1280 L1235 225 H1160" />
        </g>
      </svg>

      {/* Contenido central alineado arriba */}
      <div className="relative z-10 flex w-full flex-col items-center justify-start px-2 pt-2">

        {/* Nombre y apellidos */}
        <svg
          viewBox="0 0 1100 180"
          className="h-auto w-full max-w-[1100px] overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <CircuitText
            text={profile.name}
            y={10}
            scale={nameScale}
          />

          <CircuitText
            text={profile.surname}
            y={95}
            scale={surnameScale}
          />
        </svg>

        {/* Profesión */}
        <div className="mt-1 flex items-center gap-3 sm:mt-4 sm:gap-5">
          <span className="h-px w-8 bg-[#a66e32] sm:w-16" />

          <p className="whitespace-nowrap text-[9px] font-medium tracking-[0.2em] text-[#e5bd78] sm:text-sm sm:tracking-[0.4em] md:text-base">
            {profile.role}
          </p>

          <span className="h-px w-8 bg-[#a66e32] sm:w-16" />
        </div>
      </div>
    </section>
  );
}