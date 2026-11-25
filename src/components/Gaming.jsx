"use client";

import { useEffect, useRef, useState } from "react";

import "@/src/css/Gaming.css";

const GAMES = [
  {
    id: "snake",
    title: "SNAKE",
    description: "EL CLÁSICO JUEGO DE LA CULEBRITA",
    logo: "/images/games/snake.png",
    src: "/games/Snake",
  },
];

const GAMING_PATHS = [
  "M0 40 H65 V20 H115 V40 H175 V60 H240",
  "M35 40 V65 H90 V55 H145",
  "M115 20 V5 H165",
  "M175 60 V75 H210",
];

const GAMING_NODES = [
  [65, 20],
  [115, 40],
  [175, 60],
  [90, 55],
  [145, 55],
  [165, 5],
  [210, 75],
];

export function GamingDesktop() {
  const [linesLoaded, setLinesLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);

  const iframeRef = useRef(null);

  const visibleGames = GAMES.slice(activeIndex, activeIndex + 4);
  const maxIndex = Math.max(0, GAMES.length - 4);

  useEffect(() => {
    if (!titleLoaded) return;

    const timeout = setTimeout(() => {
      setContentLoaded(true);
    }, 250);

    return () => clearTimeout(timeout);
  }, [titleLoaded]);

  useEffect(() => {
    if (!selectedGame) return;

    const timeout = setTimeout(() => {
      iframeRef.current?.focus();
    }, 500);

    return () => clearTimeout(timeout);
  }, [selectedGame]);

  const previousGames = () => {
    setActiveIndex((current) => Math.max(0, current - 4));
  };

  const nextGames = () => {
    setActiveIndex((current) => Math.min(maxIndex, current + 4));
  };

  const renderCircuit = (mirrored = false) => (
    <svg
      viewBox="0 0 240 80"
      preserveAspectRatio="none"
      className={`h-full w-full ${mirrored ? "scale-x-[-1]" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <g
        className="gaming-circuit-draw"
        fill="none"
        stroke="#a66e32"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {GAMING_PATHS.map((path, index) => (
          <path
            key={index}
            d={path}
            pathLength="100"
            style={{ animationDelay: `${index * 0.08}s` }}
            onAnimationEnd={
              !mirrored && index === GAMING_PATHS.length - 1
                ? () => setLinesLoaded(true)
                : undefined
            }
          />
        ))}
      </g>

      <g
        className="gaming-energy-pulse"
        fill="none"
        stroke="#ffe0a0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {GAMING_PATHS.map((path, index) => (
          <path
            key={index}
            d={path}
            pathLength="100"
            style={{ animationDelay: `${index * 0.35}s` }}
          />
        ))}
      </g>

      {GAMING_NODES.map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r="2"
          className="gaming-circuit-node"
          style={{ animationDelay: `${1.5 + index * 0.035}s` }}
        />
      ))}
    </svg>
  );

  return (
    <section className="relative hidden h-full min-h-0 w-full flex-col overflow-hidden bg-[#080808] sm:flex">
      {/* HEADER */}
      <header className="relative flex h-[145px] w-full shrink-0 items-center justify-center overflow-hidden bg-[#080808]">
        <div className="absolute left-0 top-1/2 h-[100px] w-[34%] -translate-y-1/2">
          {renderCircuit()}
        </div>

        {linesLoaded && (
          <h2
            className="gaming-title-enter relative z-10 whitespace-nowrap px-6 text-center text-2xl font-semibold tracking-[0.3em] text-[#e5bd78] drop-shadow-[0_0_10px_rgba(229,189,120,0.2)] lg:text-3xl"
            onAnimationEnd={() => setTitleLoaded(true)}
          >
            ¿JUGAMOS ALGO?
          </h2>
        )}

        <div className="absolute right-0 top-1/2 h-[100px] w-[34%] -translate-y-1/2">
          {renderCircuit(true)}
        </div>
      </header>

      {/* GAME LIBRARY */}
      {contentLoaded && (
        <div className="gaming-content-enter flex min-h-0 w-full flex-1 flex-col px-8 pb-8 pt-4">
          <div className="mb-6 flex shrink-0 items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] text-[#a66e32]">
                GAME LIBRARY
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-wide text-[#e9dfd1]">
                ESTANTERÍA DE JUEGOS
              </h3>
            </div>

            <span className="text-xs tracking-widest text-[#8d7960]">
              {String(GAMES.length).padStart(2, "0")} JUEGOS
            </span>
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden rounded-xl border border-[#382a1d] bg-gradient-to-b from-[#17110c] to-[#0b0907] p-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a66e32]/70 to-transparent" />

            <div className="relative flex min-h-0 flex-1 items-center gap-5">
              <button
                type="button"
                onClick={previousGames}
                disabled={activeIndex === 0 || GAMES.length === 0}
                aria-label="Juegos anteriores"
                className="gaming-arrow"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="grid min-h-0 min-w-0 flex-1 grid-cols-4 gap-5">
                {visibleGames.map((game, index) => (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => setSelectedGame(game)}
                    className="gaming-desktop-game group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="gaming-desktop-game-logo">
                      {game.logo ? (
                        <img
                          src={game.logo}
                          alt={game.title}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-4xl text-[#d6a45c]">
                          {game.icon || "✦"}
                        </span>
                      )}
                    </div>

                    <span className="mt-4 text-center text-xs font-semibold tracking-[0.15em] text-[#d9c29e] transition-colors group-hover:text-[#ffe0a0]">
                      {game.title}
                    </span>
                  </button>
                ))}

                {GAMES.length === 0 && (
                  <div className="col-span-4 flex min-h-[220px] flex-col items-center justify-center text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-[#624629] bg-[#21170f] text-3xl text-[#d6a45c]">
                      ♙
                    </div>

                    <p className="text-sm font-semibold tracking-[0.25em] text-[#d9c29e]">
                      PRÓXIMAMENTE
                    </p>

                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#827666]">
                      La estantería todavía está vacía. Muy pronto vas a poder
                      elegir un juego y empezar una partida.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={nextGames}
                disabled={activeIndex >= maxIndex || GAMES.length === 0}
                aria-label="Juegos siguientes"
                className="gaming-arrow"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#a66e32]/[0.07] to-transparent" />
          </div>

          <p className="mt-4 shrink-0 text-center text-[10px] tracking-[0.2em] text-[#6f6252]">
            SELECCIONÁ UN JUEGO PARA COMENZAR
          </p>
        </div>
      )}

      {/* DESKTOP TV OVERLAY */}
      {selectedGame && (
        <div className="gaming-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-3 py-4 backdrop-blur-[2px]">
          <div className="gaming-tv-enter relative flex max-h-full w-[94vw] max-w-[1500px] flex-col">
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedGame(null)}
                className="gaming-exit-button"
              >
                <span className="text-base">×</span>
                SALIR DEL JUEGO
              </button>
            </div>

            <div className="gaming-tv-frame w-full">
              <div className="gaming-tv-top">
                <span className="gaming-tv-brand">GAMING SYSTEM</span>
                <span className="gaming-tv-status">
                  <span />
                  ON
                </span>
              </div>

              <div className="gaming-tv-screen">
                <iframe
                  ref={iframeRef}
                  src={selectedGame.src}
                  title={selectedGame.title}
                  tabIndex={0}
                  allow="fullscreen; autoplay; gamepad"
                  allowFullScreen
                  className="h-full w-full border-0"
                  onLoad={() => iframeRef.current?.focus()}
                />
                <div className="gaming-screen-scanlines" />
              </div>

              <div className="gaming-tv-controls">
                <div className="gaming-tv-speaker" />
                <div className="gaming-tv-control-group">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="gaming-tv-power">
                  <span />
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-[10px] tracking-[0.25em] text-[#b98b46]">
              {selectedGame.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
export function GamingMobile() {
  const [linesLoaded, setLinesLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);

  const iframeRef = useRef(null);

  const visibleGame = GAMES[activeIndex];

  useEffect(() => {
    if (!titleLoaded) return;

    const timeout = setTimeout(() => {
      setContentLoaded(true);
    }, 250);

    return () => clearTimeout(timeout);
  }, [titleLoaded]);

  useEffect(() => {
    if (!selectedGame) return;

    const timeout = setTimeout(() => {
      iframeRef.current?.focus();
    }, 500);

    return () => clearTimeout(timeout);
  }, [selectedGame]);

  const previousGame = () => {
    setActiveIndex((current) => Math.max(0, current - 1));
  };

  const nextGame = () => {
    setActiveIndex((current) => Math.min(GAMES.length - 1, current + 1));
  };

  const renderCircuit = (mirrored = false) => (
    <svg
      viewBox="0 0 240 80"
      preserveAspectRatio="none"
      className={`h-full w-full ${mirrored ? "scale-x-[-1]" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <g
        className="gaming-circuit-draw"
        fill="none"
        stroke="#a66e32"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {GAMING_PATHS.map((path, index) => (
          <path
            key={index}
            d={path}
            pathLength="100"
            style={{ animationDelay: `${index * 0.08}s` }}
            onAnimationEnd={
              !mirrored && index === GAMING_PATHS.length - 1
                ? () => setLinesLoaded(true)
                : undefined
            }
          />
        ))}
      </g>

      <g
        className="gaming-energy-pulse"
        fill="none"
        stroke="#ffe0a0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {GAMING_PATHS.map((path, index) => (
          <path
            key={index}
            d={path}
            pathLength="100"
            style={{ animationDelay: `${index * 0.35}s` }}
          />
        ))}
      </g>

      {GAMING_NODES.map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r="2"
          className="gaming-circuit-node"
          style={{ animationDelay: `${1.5 + index * 0.035}s` }}
        />
      ))}
    </svg>
  );

  return (
    <section className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#080808] sm:hidden">
      {/* HEADER */}
      <header className="relative flex h-[clamp(64px,11dvh,96px)] w-full shrink-0 items-center justify-center overflow-hidden bg-[#080808]">
        <div className="absolute left-0 top-1/2 h-[55px] w-[27%] -translate-y-1/2">
          {renderCircuit()}
        </div>

        {linesLoaded && (
          <h2
            className="gaming-title-enter relative z-10 whitespace-nowrap px-2 text-center text-[clamp(0.8rem,4vw,1rem)] font-semibold tracking-[0.13em] text-[#e5bd78] drop-shadow-[0_0_10px_rgba(229,189,120,0.2)]"
            onAnimationEnd={() => setTitleLoaded(true)}
          >
            ¿JUGAMOS ALGO?
          </h2>
        )}

        <div className="absolute right-0 top-1/2 h-[55px] w-[27%] -translate-y-1/2">
          {renderCircuit(true)}
        </div>
      </header>

      {/* MOBILE GAME MENU */}
      {contentLoaded && (
        <div className="gaming-content-enter flex min-h-0 w-full flex-1 flex-col overflow-hidden px-4 pb-5 pt-5">
          <div className="mb-5 flex shrink-0 items-center justify-between">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.3em] text-[#a66e32]">
                GAME LIBRARY
              </p>

              <h3 className="mt-1 text-base font-semibold tracking-wide text-[#e9dfd1]">
                MIS JUEGOS
              </h3>
            </div>

            <span className="text-[10px] tracking-widest text-[#8d7960]">
              {String(GAMES.length).padStart(2, "0")} JUEGOS
            </span>
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#382a1d] bg-gradient-to-b from-[#17110c] to-[#0b0907] p-4">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a66e32]/70 to-transparent" />

            {GAMES.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#624629] bg-[#21170f] text-4xl text-[#d6a45c]">
                  ♙
                </div>

                <p className="text-xs font-semibold tracking-[0.25em] text-[#d9c29e]">
                  PRÓXIMAMENTE
                </p>

                <p className="mt-2 max-w-[230px] text-xs leading-relaxed text-[#827666]">
                  Estamos preparando algunos juegos para que puedas disfrutar
                  desde acá.
                </p>
              </div>
            ) : (
              <div className="flex w-full min-w-0 flex-1 flex-col items-center justify-center">
                <button
                  type="button"
                  onClick={() => setSelectedGame(visibleGame)}
                  className="gaming-mobile-game"
                >
                  <div className="gaming-mobile-game-logo">
                    {visibleGame.logo ? (
                      <img
                        src={visibleGame.logo}
                        alt={visibleGame.title}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-5xl text-[#d6a45c]">
                        {visibleGame.icon || "✦"}
                      </span>
                    )}
                  </div>

                  <span className="mt-4 text-sm font-semibold tracking-[0.15em] text-[#e5bd78]">
                    {visibleGame.title}
                  </span>

                  <span className="mt-2 text-[9px] tracking-[0.2em] text-[#827666]">
                    TOCÁ PARA JUGAR
                  </span>
                </button>
              </div>
            )}

            <div className="mt-5 flex w-full shrink-0 items-center justify-between">
              <button
                type="button"
                onClick={previousGame}
                disabled={activeIndex === 0 || GAMES.length === 0}
                aria-label="Juego anterior"
                className="gaming-arrow"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <span className="text-[10px] tracking-[0.2em] text-[#8d7960]">
                {GAMES.length === 0
                  ? "00 / 00"
                  : `${String(activeIndex + 1).padStart(2, "0")} / ${String(
                      GAMES.length,
                    ).padStart(2, "0")}`}
              </span>

              <button
                type="button"
                onClick={nextGame}
                disabled={activeIndex >= GAMES.length - 1 || GAMES.length === 0}
                aria-label="Juego siguiente"
                className="gaming-arrow"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-4 shrink-0 text-center text-[9px] tracking-[0.2em] text-[#6f6252]">
            ELEGÍ UN JUEGO Y PREPARATE PARA JUGAR
          </p>
        </div>
      )}

      {/* MOBILE ARCADE OVERLAY */}
      {selectedGame && (
        <div className="gaming-overlay fixed inset-0 z-[100] flex h-[100dvh] flex-col overflow-hidden bg-black/40 px-2 py-2 backdrop-blur-[2px]">
          <div className="gaming-arcade-enter flex min-h-0 w-full flex-1 flex-col">
            {/* ARCADE FRAME */}
            <div className="gaming-arcade-frame">
              {/* TOP BORDER */}
              <div className="gaming-arcade-header">
                <span className="gaming-arcade-brand">ARCADE</span>
                <span className="gaming-arcade-light" />
              </div>

              {/* GAME SCREEN */}
              <div className="gaming-arcade-screen">
                <iframe
                  ref={iframeRef}
                  src={selectedGame.src}
                  title={selectedGame.title}
                  tabIndex={0}
                  allow="fullscreen; autoplay; gamepad"
                  allowFullScreen
                  className="h-full w-full border-0"
                  onLoad={() => iframeRef.current?.focus()}
                />

                <div className="gaming-screen-scanlines" />
              </div>

              {/* BOTTOM BORDER */}
              <div className="gaming-arcade-bottom-border" />
            </div>

            {/* BOTTOM BAR */}
            <div className="mt-2 flex w-full shrink-0 items-center justify-between gap-3 px-1">
              <p className="min-w-0 truncate text-[10px] font-semibold tracking-[0.2em] text-[#b98b46]">
                {selectedGame.title}
              </p>

              <button
                type="button"
                onClick={() => setSelectedGame(null)}
                className="gaming-exit-button shrink-0"
              >
                <span className="text-base">×</span>
                SALIR DEL JUEGO
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}