"use client";

import { useState } from "react";
import "@/src/css/ProblemR.css";

export function ProblemRDesktop() {
  const [linesLoaded, setLinesLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);

  const paths = [
    "M0 40 H65 V20 H115 V40 H175 V60 H240",
    "M35 40 V65 H90 V55 H145",
    "M115 20 V5 H165",
    "M175 60 V75 H210",
  ];

  return (
    <section className="hidden w-full overflow-hidden bg-[#080808] sm:block">
      {/* HEADER */}
      <div className="relative flex h-[145px] w-full shrink-0 items-center justify-center overflow-hidden bg-[#080808]">
        <div className="absolute left-0 top-1/2 h-[100px] w-[34%] -translate-y-1/2">
          <svg
            viewBox="0 0 240 80"
            preserveAspectRatio="none"
            className="h-full w-full"
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
                    index === paths.length - 1
                      ? () => setLinesLoaded(true)
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
        </div>

        {linesLoaded && (
          <div
            className="banner-data relative z-10"
            onAnimationEnd={() => setTitleLoaded(true)}
          >
            <h2 className="whitespace-nowrap text-center text-xl font-semibold tracking-[0.35em] text-[#e5bd78] drop-shadow-[0_0_10px_rgba(229,189,120,0.2)] md:text-2xl">
              SOLUCIONADOR DE PROBLEMAS
            </h2>
          </div>
        )}

        <div className="absolute right-0 top-1/2 h-[100px] w-[34%] -translate-y-1/2">
          <svg
            viewBox="0 0 240 80"
            preserveAspectRatio="none"
            className="h-full w-full scale-x-[-1]"
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
        </div>
      </div>

      {/* CONTENT */}
      {titleLoaded && (
        <div className="banner-data">
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
                  Cuando algo no funciona, mi primera reacción es intentar
                  entender por qué. Investigo, pruebo alternativas y busco
                  distintas maneras de llegar a una solución.
                </p>

                <p>
                  Es algo que forma parte de mi día a día. Si alguien cercano
                  tiene un problema, difícilmente me quede sin intentar ayudar.
                  Me gusta involucrarme, encontrar respuestas y aprender en el
                  proceso.
                </p>
              </div>

              <div className="mt-9 flex items-center gap-3 border-l-2 border-[#a66e32] py-2 pl-4">
                <span className="text-2xl text-[#d6a45c]">✦</span>
                <p className="text-sm italic leading-relaxed text-[#d0c2ad]">
                  A veces la solución no aparece enseguida. Pero eso no
                  significa que deje de buscarla.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[#382a1d] bg-gradient-to-br from-[#15110d] to-[#0c0b09] p-6 sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#a66e32]/[0.07] blur-3xl" />

              <div className="relative mb-8 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#e9dfd1]">
                  MI PROCEDIMIENTO
                </h3>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#624629] bg-[#21170f] text-lg text-[#d6a45c]">
                  ⌘
                </div>
              </div>

              <div className="relative">
                {[
                  {
                    number: "01",
                    title: "Observar",
                    description:
                      "Primero intento entender el problema y detectar qué puede estar fallando.",
                  },
                  {
                    number: "02",
                    title: "Investigar",
                    description:
                      "Busco información, considero posibilidades y trato de encontrar el origen.",
                  },
                  {
                    number: "03",
                    title: "Probar",
                    description:
                      "Pongo a prueba distintas alternativas, aprendo de cada intento y ajusto el camino.",
                  },
                  {
                    number: "04",
                    title: "Reconocer",
                    description:
                      "Si algo me supera, lo digo. Prefiero ser honesto antes que fingir que tengo todas las respuestas.",
                  },
                ].map((step) => (
                  <div key={step.number} className="group relative flex gap-4">
                    <div className="relative flex shrink-0 flex-col items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#77532e] bg-[#17110b] text-xs font-semibold tracking-wider text-[#d6a45c] transition-colors duration-300 group-hover:border-[#e5bd78] group-hover:bg-[#2b1d13] group-hover:text-[#ffe0a0]">
                        {step.number}
                      </div>
                      <div className="mt-2 h-full min-h-8 w-px bg-gradient-to-b from-[#77532e] to-transparent" />
                    </div>

                    <div className="pb-7">
                      <h3 className="mb-1 text-sm font-semibold tracking-wide text-[#e5bd78]">
                        {step.title}
                      </h3>
                      <p className="max-w-[330px] text-sm leading-relaxed text-[#aaa096]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
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
        </div>
      )}
    </section>
  );
}
export function ProblemRMobile() {
  const [linesLoaded, setLinesLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);

  const paths = [
    "M0 40 H65 V20 H115 V40 H175 V60 H240",
    "M35 40 V65 H90 V55 H145",
    "M115 20 V5 H165",
    "M175 60 V75 H210",
  ];

  return (
    <section className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#080808] sm:hidden">
      {/* HEADER */}
      <div className="relative flex h-[88px] w-full shrink-0 items-center justify-center overflow-hidden bg-[#080808]">
        <div className="absolute left-0 top-1/2 h-[55px] w-[27%] -translate-y-1/2">
          <svg
            viewBox="0 0 240 80"
            preserveAspectRatio="none"
            className="h-full w-full"
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
                    index === paths.length - 1
                      ? () => setLinesLoaded(true)
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
        </div>

        {linesLoaded && (
          <div
            className="banner-data relative z-10"
            onAnimationEnd={() => setTitleLoaded(true)}
          >
            <h2 className="whitespace-nowrap text-center text-[clamp(0.6875rem,2.85vw,0.6875rem)] font-semibold tracking-[0.13em] text-[#e5bd78] drop-shadow-[0_0_10px_rgba(229,189,120,0.2)]">
              SOLUCIONADOR
              <span className="mt-1 block text-[clamp(0.5625rem,2.35vw,0.5625rem)] tracking-[0.3em] text-[#c99a59]">
                DE PROBLEMAS
              </span>
            </h2>
          </div>
        )}

        <div className="absolute right-0 top-1/2 h-[55px] w-[27%] -translate-y-1/2">
          <svg
            viewBox="0 0 240 80"
            preserveAspectRatio="none"
            className="h-full w-full scale-x-[-1]"
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
        </div>
      </div>

      {/* CONTENT */}
      {titleLoaded && (
        <div className="banner-data min-h-0 flex-1 overflow-y-auto">
          <div className="flex min-h-full flex-col px-4 pb-4 pt-5">
            <div className="mb-4 flex shrink-0 items-center justify-between">
              <h3 className="text-[clamp(0.9375rem,4vw,0.9375rem)] font-semibold tracking-wide text-[#e9dfd1]">
                MI PROCEDIMIENTO
              </h3>

              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#624629] bg-[#21170f] text-sm text-[#d6a45c]">
                ⌘
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2">
              {[
                {
                  number: "01",
                  title: "Observar",
                  description:
                    "Entender el problema y detectar qué puede estar fallando.",
                },
                {
                  number: "02",
                  title: "Investigar",
                  description:
                    "Buscar información y encontrar el posible origen.",
                },
                {
                  number: "03",
                  title: "Probar",
                  description:
                    "Explorar alternativas, aprender y ajustar el camino.",
                },
                {
                  number: "04",
                  title: "Reconocer",
                  description:
                    "Aceptar mis límites y ser honesto cuando algo me supera.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="flex w-fit max-w-full shrink-0 gap-3 rounded-xl border border-[#382a1d] bg-[#15110d]/80 p-3"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#77532e] bg-[#21170f] text-[clamp(0.875rem,3.7vw,0.875rem)] font-semibold text-[#d6a45c]">
                    {step.number}
                  </span>

                  <div className="min-w-0">
                    <h4 className="mb-1 text-[clamp(1.125rem,4.8vw,1.125rem)] font-semibold tracking-wide text-[#e5bd78]">
                      {step.title}
                    </h4>

                    <p className="text-[clamp(1rem,4.27vw,1rem)] leading-[1.5] text-[#aaa096]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex shrink-0 items-center gap-3 border-l-2 border-[#a66e32] py-2 pl-4">
              <span className="shrink-0 text-[clamp(1.25rem,5.3vw,1.5rem)] text-[#d6a45c]">
                ✦
              </span>

              <p className="min-w-0 text-[clamp(0.875rem,3.73vw,0.875rem)] italic leading-relaxed text-[#d0c2ad]">
                A veces la solución no aparece enseguida. Pero eso no significa
                que deje de buscarla.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}