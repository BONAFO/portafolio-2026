"use client";

import { useState } from "react";
import "@/src/css/ProblemR.css"
function ProblemCircuit({ side = "left", onLinesLoaded }) {
  const paths = [
    "M0 40 H65 V20 H115 V40 H175 V60 H240",
    "M35 40 V65 H90 V55 H145",
    "M115 20 V5 H165",
    "M175 60 V75 H210",
  ];

  return (
    <svg
      viewBox="0 0 240 80"
      preserveAspectRatio="none"
      className={`h-full w-full ${side === "right" ? "scale-x-[-1]" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <g
        className="circuit-draw"
        fill="none"
        stroke="#a66e32"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths.map((path, index) => (
          <path
            key={index}
            d={path}
            pathLength="100"
            style={{ animationDelay: `${index * 0.08}s` }}
            onAnimationEnd={
              side === "left" && index === paths.length - 1
                ? onLinesLoaded
                : undefined
            }
          />
        ))}
      </g>

      <g
        className="problem-energy-pulse"
        fill="none"
        stroke="#ffe0a0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths.map((path, index) => (
          <path
            key={index}
            d={path}
            pathLength="100"
            style={{ animationDelay: `${index * 0.35}s` }}
          />
        ))}
      </g>

      {[65, 115, 175, 90, 145, 165, 210].map((x, index) => (
        <circle
          key={index}
          cx={x}
          cy={[20, 40, 60, 55, 55, 5, 75][index]}
          r="2"
          className="problem-circuit-node"
        />
      ))}
    </svg>
  );
}



function ProblemHeader({
  mobile = false,
  linesLoaded,
  onLinesLoaded,
  onTitleLoaded,
}) {
  return (
    <div
      className={`relative flex w-full shrink-0 items-center justify-center overflow-hidden bg-[#080808] ${
        mobile ? "h-[88px]" : "h-[145px]"
      }`}
    >
    

      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 ${
          mobile ? "h-[55px] w-[27%]" : "h-[100px] w-[34%]"
        }`}
      >
        <ProblemCircuit onLinesLoaded={onLinesLoaded} />
      </div>

      {linesLoaded && (
        <div
          className="banner-data relative z-10"
          onAnimationEnd={onTitleLoaded}
        >
          <h2
            className={`whitespace-nowrap text-center font-semibold text-[#e5bd78] drop-shadow-[0_0_10px_rgba(229,189,120,0.2)] ${
              mobile
                ? "text-[12px] tracking-[0.13em]"
                : "text-xl tracking-[0.35em] md:text-2xl"
            }`}
          >
            SOLUCIONADOR
            {mobile ? (
              <span className="mt-1 block text-[10px] tracking-[0.3em] text-[#c99a59]">
                DE PROBLEMAS
              </span>
            ) : (
              " DE PROBLEMAS"
            )}
          </h2>
        </div>
      )}

      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 ${
          mobile ? "h-[55px] w-[27%]" : "h-[100px] w-[34%]"
        }`}
      >
        <ProblemCircuit side="right" />
      </div>
    </div>
  );
}

function ProblemStep({ number, title, description }) {
  return (
    <div className="group relative flex gap-4">
      <div className="relative flex shrink-0 flex-col items-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#77532e] bg-[#17110b] text-xs font-semibold tracking-wider text-[#d6a45c] transition-colors duration-300 group-hover:border-[#e5bd78] group-hover:bg-[#2b1d13] group-hover:text-[#ffe0a0]">
          {number}
        </div>
        <div className="mt-2 h-full min-h-8 w-px bg-gradient-to-b from-[#77532e] to-transparent" />
      </div>

      <div className="pb-7">
        <h3 className="mb-1 text-sm font-semibold tracking-wide text-[#e5bd78]">
          {title}
        </h3>
        <p className="max-w-[330px] text-sm leading-relaxed text-[#aaa096]">
          {description}
        </p>
      </div>
    </div>
  );
}

function ProblemContent() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-5 pb-16 pt-8 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:px-10 md:pb-24 md:pt-14">
      <div className="flex flex-col justify-center">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-[#b8894c]" />
          <span className="text-[10px] font-semibold tracking-[0.28em] text-[#b8894c]">
            MI FORMA DE ENFRENTAR LOS DESAFÍOS
          </span>
        </div>

        <h3 className="max-w-xl text-3xl font-semibold leading-[1.2] tracking-tight text-[#eee5d8] sm:text-4xl lg:text-5xl">
          No me gusta dejar un problema sin{" "}
          <span className="text-[#d6a45c]">intentar resolver.</span>
        </h3>

        <div className="mt-7 max-w-lg space-y-4 text-sm leading-[1.9] text-[#aaa096] sm:text-base">
          <p>
            Cuando algo no funciona, mi primera reacción es intentar entender
            por qué. Investigo, pruebo alternativas y busco distintas maneras
            de llegar a una solución.
          </p>

          <p>
            Es algo que forma parte de mi día a día. Si alguien cercano tiene
            un problema, difícilmente me quede sin intentar ayudar. Me gusta
            involucrarme, encontrar respuestas y aprender en el proceso.
          </p>
        </div>

        <div className="mt-9 flex items-center gap-3 border-l-2 border-[#a66e32] py-2 pl-4">
          <span className="text-2xl text-[#d6a45c]">✦</span>
          <p className="text-sm italic leading-relaxed text-[#d0c2ad]">
            A veces la solución no aparece enseguida. Eso no significa que
            deje de buscarla.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#382a1d] bg-gradient-to-br from-[#15110d] to-[#0c0b09] p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#a66e32]/[0.07] blur-3xl" />

        <div className="relative mb-8 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#8e7555]">
              MI PROCESO
            </span>
            <h3 className="mt-2 text-xl font-semibold text-[#e9dfd1]">
              ¿Cómo lo encaro?
            </h3>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#624629] bg-[#21170f] text-lg text-[#d6a45c]">
            ⌘
          </div>
        </div>

        <div className="relative">
          <ProblemStep
            number="01"
            title="Observar"
            description="Primero intento entender el problema y detectar qué puede estar fallando."
          />

          <ProblemStep
            number="02"
            title="Investigar"
            description="Busco información, considero posibilidades y trato de encontrar el origen."
          />

          <ProblemStep
            number="03"
            title="Probar"
            description="Pongo a prueba distintas alternativas, aprendo de cada intento y ajusto el camino."
          />

          <ProblemStep
            number="04"
            title="Reconocer"
            description="Si algo me supera, lo digo. Prefiero ser honesto antes que fingir que tengo todas las respuestas."
          />
        </div>

        <div className="relative mt-1 rounded-xl border border-[#594127] bg-[#21170f]/70 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#d6a45c] shadow-[0_0_8px_#d6a45c]" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#c99a59]">
              ALGO QUE TENGO PRESENTE
            </span>
          </div>

          <p className="text-sm leading-relaxed text-[#e0d4c3]">
            No siempre voy a tener la respuesta, y no tengo problema en
            admitirlo. Resolver problemas también significa saber cuándo
            pedir ayuda.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProblemMobileStep({ number, title, description }) {
  return (
    <div className="relative flex min-w-0 gap-2.5 rounded-xl border border-[#382a1d] bg-[#15110d]/80 p-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#77532e] bg-[#21170f] text-[10px] font-semibold text-[#d6a45c]">
        {number}
      </span>

      <div className="min-w-0">
        <h4 className="mb-1 text-[12px] font-semibold tracking-wide text-[#e5bd78]">
          {title}
        </h4>

        <p className="text-[11px] leading-[1.5] text-[#aaa096]">
          {description}
        </p>
      </div>
    </div>
  );
}

function ProblemMobileContent() {
  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_auto_minmax(0,1fr)_auto] gap-3 px-4 pb-4 pt-3">
      <div className="min-h-0">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-[#b8894c]" />
          <span className="text-[9px] font-semibold tracking-[0.18em] text-[#b8894c]">
            MI FORMA DE ENFRENTAR LOS DESAFÍOS
          </span>
        </div>

        <h3 className="text-[clamp(21px,5.8vw,25px)] font-semibold leading-[1.15] tracking-tight text-[#eee5d8]">
          No me gusta dejar un problema sin{" "}
          <span className="text-[#d6a45c]">intentar resolver.</span>
        </h3>

        <p className="mt-2 text-[12px] leading-[1.6] text-[#aaa096]">
          Cuando algo no funciona, intento entender por qué. Investigo, pruebo
          alternativas y busco distintas maneras de encontrar una solución.
          Si alguien cercano necesita ayuda, me cuesta quedarme de brazos
          cruzados.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-lg border-l-2 border-[#a66e32] bg-[#15110d]/70 px-3 py-2">
        <span className="shrink-0 text-xl text-[#d6a45c]">✦</span>
        <p className="text-[11px] italic leading-[1.5] text-[#d0c2ad]">
          A veces la solución no aparece enseguida. Eso no significa que deje
          de buscarla.
        </p>
      </div>

      <div className="flex min-h-0 flex-col">
        <div className="mb-2 flex shrink-0 items-center justify-between">
          <div>
            <span className="text-[9px] font-semibold tracking-[0.22em] text-[#8e7555]">
              MI PROCESO
            </span>
            <h3 className="mt-0.5 text-base font-semibold text-[#e9dfd1]">
              ¿Cómo lo encaro?
            </h3>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#624629] bg-[#21170f] text-sm text-[#d6a45c]">
            ⌘
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2">
          <ProblemMobileStep
            number="01"
            title="Observar"
            description="Entender el problema y detectar qué puede estar fallando."
          />

          <ProblemMobileStep
            number="02"
            title="Investigar"
            description="Buscar información y encontrar el posible origen."
          />

          <ProblemMobileStep
            number="03"
            title="Probar"
            description="Explorar alternativas, aprender y ajustar el camino."
          />

          <ProblemMobileStep
            number="04"
            title="Reconocer"
            description="Aceptar mis límites y ser honesto cuando algo me supera."
          />
        </div>
      </div>

      <div className="rounded-xl border border-[#594127] bg-[#21170f]/80 px-3 py-2.5">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d6a45c] shadow-[0_0_8px_#d6a45c]" />
          <span className="text-[9px] font-semibold tracking-[0.16em] text-[#c99a59]">
            ALGO QUE TENGO PRESENTE
          </span>
        </div>

        <p className="text-[11px] leading-[1.5] text-[#e0d4c3]">
          No siempre voy a tener la respuesta. Resolver problemas también
          significa saber cuándo pedir ayuda.
        </p>
      </div>
    </div>
  );
}

function ProblemRScreen({ mobile = false }) {
  const [linesLoaded, setLinesLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);

  return (
    <section
      className={`w-full overflow-hidden bg-[#080808] ${
        mobile
          ? "flex h-full min-h-0 flex-col sm:hidden"
          : "hidden sm:block"
      }`}
    >
      <ProblemHeader
        mobile={mobile}
        linesLoaded={linesLoaded}
        onLinesLoaded={() => setLinesLoaded(true)}
        onTitleLoaded={() => setTitleLoaded(true)}
      />

      {titleLoaded && (
        <div
          className={`banner-data ${
            mobile ? "min-h-0 flex-1 overflow-hidden" : ""
          }`}
        >
          {mobile ? <ProblemMobileContent /> : <ProblemContent />}
        </div>
      )}
    </section>
  );
}

export function ProblemRDesktop() {
  return <ProblemRScreen />;
}

export function ProblemRMobile() {
  return <ProblemRScreen mobile />;
}