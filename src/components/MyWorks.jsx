"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { WORKS } from "@/src/data/Works";
import "@/src/css/MyWorks.css";

const WORKS_CHANGE_INTERVAL = 10000;
const WORK_PAGE_CHANGE_INTERVAL = 4000;
const WORK_PAGE_FADE_DURATION = 1000;

const DESK_SCALE = 0;
const MOBILE_SCALE = 0;

export function MyWorksDesk() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [loaded, setLoaded] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scales, setScales] = useState({});
  const [linesVisible, setLinesVisible] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [cardsStarted, setCardsStarted] = useState(false);

  const containersRef = useRef([]);
  const stagesRef = useRef([]);
  const currentFramesRef = useRef({});
  const pageIndexesRef = useRef({});
  const pageTimersRef = useRef({});
  const transitionFramesRef = useRef({});
  const groupTimerRef = useRef(null);
  const activeHoverRef = useRef(null);

  const totalGroups = Math.ceil(WORKS.length / 6);
  const works = WORKS.slice(groupIndex * 6, groupIndex * 6 + 6);
  const ready = works.length > 0 && loaded.length === works.length;

  const handleLoaded = (index) => {
    setLoaded((current) =>
      current.includes(index) ? current : [...current, index],
    );
  };

  const createFrame = (src, title) => {
    const iframe = document.createElement("iframe");

    iframe.src = src;
    iframe.title = title;
    iframe.loading = "eager";
    iframe.tabIndex = -1;
    iframe.setAttribute("scrolling", "no");

    iframe.className =
      "absolute inset-0 block h-full w-full border-0 pointer-events-none";

    iframe.style.transform = "translateX(0)";
    iframe.style.transition = `transform ${WORK_PAGE_FADE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    return iframe;
  };

  const clearPageTimer = (index) => {
    clearTimeout(pageTimersRef.current[index]);
    delete pageTimersRef.current[index];
  };

  const transitionFrame = (index, src, title, direction, onComplete) => {
    const stage = stagesRef.current[index];
    const currentFrame = currentFramesRef.current[index];

    if (!stage || !currentFrame) return;

    const previousTransition = transitionFramesRef.current[index];

    if (previousTransition) {
      previousTransition.incoming.remove();
      previousTransition.outgoing.style.transition = "none";
      previousTransition.outgoing.style.transform = "translateX(0)";
    }

    const nextFrame = createFrame(src, title);
    const transition = {
      incoming: nextFrame,
      outgoing: currentFrame,
    };

    transitionFramesRef.current[index] = transition;

    nextFrame.style.transition = "none";
    nextFrame.style.transform = `translateX(${direction * 100}%)`;

    stage.appendChild(nextFrame);

    nextFrame.addEventListener(
      "load",
      () => {
        if (transitionFramesRef.current[index] !== transition) return;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (transitionFramesRef.current[index] !== transition) return;

            currentFrame.style.transition = `transform ${WORK_PAGE_FADE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

            nextFrame.style.transition = `transform ${WORK_PAGE_FADE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

            currentFrame.style.transform = `translateX(${-direction * 100}%)`;
            nextFrame.style.transform = "translateX(0)";
          });
        });
      },
      { once: true },
    );

    nextFrame.addEventListener(
      "transitionend",
      (event) => {
        if (
          event.propertyName !== "transform" ||
          transitionFramesRef.current[index] !== transition
        ) {
          return;
        }

        currentFrame.remove();

        nextFrame.style.transition = `transform ${WORK_PAGE_FADE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

        currentFramesRef.current[index] = nextFrame;
        delete transitionFramesRef.current[index];

        onComplete?.();
      },
      { once: true },
    );
  };

  const rotatePage = (work, index) => {
    if (activeHoverRef.current !== index) return;

    const pages = work.pages?.length ? work.pages : [];

    if (!pages.length) return;

    const nextIndex =
      ((pageIndexesRef.current[index] ?? -1) + 1) % pages.length;

    transitionFrame(
      index,
      pages[nextIndex],
      `${work.name} - página ${nextIndex + 1}`,
      1,
      () => {
        if (activeHoverRef.current !== index) return;

        pageIndexesRef.current[index] = nextIndex;

        pageTimersRef.current[index] = setTimeout(() => {
          rotatePage(work, index);
        }, WORK_PAGE_CHANGE_INTERVAL);
      },
    );
  };

  const startPageRotation = (work, index) => {
    if (activeHoverRef.current !== null) return;

    activeHoverRef.current = index;
    setHoveredIndex(index);

    pageIndexesRef.current[index] = -1;

    const pages = work.pages?.length ? work.pages : [];

    if (!pages.length) return;

    pageTimersRef.current[index] = setTimeout(() => {
      rotatePage(work, index);
    }, 1000);
  };

  const stopPageRotation = (index, work) => {
    if (activeHoverRef.current !== index) return;

    clearPageTimer(index);

    activeHoverRef.current = null;
    setHoveredIndex(null);

    const transition = transitionFramesRef.current[index];

    if (transition) {
      transition.incoming.remove();

      transition.outgoing.style.transition = "none";
      transition.outgoing.style.transform = "translateX(0)";

      currentFramesRef.current[index] = transition.outgoing;

      delete transitionFramesRef.current[index];
    }

    transitionFrame(index, work.url, work.name, -1, () => {
      delete pageIndexesRef.current[index];
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLinesVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!linesVisible) return;

    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 1900);

    return () => clearTimeout(timer);
  }, [linesVisible]);

  useEffect(() => {
    if (!ready || totalGroups <= 1 || hoveredIndex !== null) return;

    groupTimerRef.current = setTimeout(() => {
      setLoaded([]);
      setGroupIndex((current) => (current + 1) % totalGroups);
    }, WORKS_CHANGE_INTERVAL);

    return () => clearTimeout(groupTimerRef.current);
  }, [ready, totalGroups, groupIndex, hoveredIndex]);

  useLayoutEffect(() => {
    const updateScales = () => {
      const updated = {};

      containersRef.current.forEach((container, index) => {
        if (!container) return;

        const { width, height } = container.getBoundingClientRect();
        const baseScale = Math.max(width / 1280, height / 720);

        updated[index] = baseScale * (1 + DESK_SCALE / 100);
      });

      setScales(updated);
    };

    updateScales();

    const observer = new ResizeObserver(updateScales);

    containersRef.current.forEach((container) => {
      if (container) observer.observe(container);
    });

    return () => observer.disconnect();
  }, [groupIndex]);

  useEffect(() => {
    return () => {
      Object.values(pageTimersRef.current).forEach(clearTimeout);
      clearTimeout(groupTimerRef.current);
    };
  }, []);

  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden bg-[#080808]">
      <style>{`
        @keyframes works-energy-flow {
          0% { stroke-dashoffset: 100; opacity: 0; }
          10% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .works-energy-pulse path { stroke-dasharray: 8 92; stroke-dashoffset: 100; opacity: 0; }
        .works-energy-pulse.active path { animation: works-energy-flow 2.8s linear infinite; }
        .works-energy-pulse.active path:nth-child(2n) { animation-duration: 3.2s; }
        .works-energy-pulse.active path:nth-child(3n) { animation-duration: 3.6s; }
      `}</style>

      <header className="flex h-[17dvh] min-h-[110px] shrink-0 items-center justify-center px-8">
        <div className="flex w-full items-center justify-center gap-8">
          <svg
            viewBox="0 0 600 100"
            preserveAspectRatio="none"
            className="h-[75px] min-w-0 flex-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="worksDeskGlowLeft">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            <g
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: linesVisible ? 1 : 0,
                transition: "opacity 500ms ease-out",
              }}
            >
              <g
                stroke="#a66e32"
                strokeWidth="4"
                filter="url(#worksDeskGlowLeft)"
                className="works-circuit-pulse"
              >
                <path
                  pathLength="100"
                  d="M0 50 H90 L125 20 H235 L270 50 H350 L385 15 H470 L505 50 H600"
                />
                <path pathLength="100" d="M0 50 H45 L75 80 H165 L195 50" />
                <path pathLength="100" d="M270 50 L300 80 H410 L440 50" />
              </g>

              <g
                stroke="#e5bd78"
                strokeWidth="1.5"
                style={{
                  strokeDasharray: 1200,
                  strokeDashoffset: linesVisible ? 0 : 1200,
                  transition:
                    "stroke-dashoffset 1.8s cubic-bezier(0.65, 0, 0.35, 1)",
                }}
              >
                <path
                  pathLength="100"
                  d="M0 50 H90 L125 20 H235 L270 50 H350 L385 15 H470 L505 50 H600"
                />
                <path pathLength="100" d="M0 50 H45 L75 80 H165 L195 50" />
                <path pathLength="100" d="M270 50 L300 80 H410 L440 50" />
              </g>

              <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`works-energy-pulse ${linesVisible ? "active" : ""}`}
              >
                <path
                  pathLength="100"
                  d="M0 50 H90 L125 20 H235 L270 50 H350 L385 15 H470 L505 50 H600"
                  stroke="#ffe7b5"
                  strokeWidth="2.5"
                  filter="url(#worksDeskGlowLeft)"
                />

                <path
                  pathLength="100"
                  d="M0 50 H45 L75 80 H165 L195 50"
                  stroke="#ffe7b5"
                  strokeWidth="2.5"
                  filter="url(#worksDeskGlowLeft)"
                />

                <path
                  pathLength="100"
                  d="M270 50 L300 80 H410 L440 50"
                  stroke="#ffe7b5"
                  strokeWidth="2.5"
                  filter="url(#worksDeskGlowLeft)"
                />
              </g>

              <g fill="#d6a45c">
                <circle cx="90" cy="50" r="4" />
                <circle cx="125" cy="20" r="4" />
                <circle cx="235" cy="20" r="4" />
                <circle cx="270" cy="50" r="4" />
                <circle cx="385" cy="15" r="4" />
                <circle cx="470" cy="15" r="4" />
                <circle cx="505" cy="50" r="4" />
                <circle cx="75" cy="80" r="3" />
                <circle cx="165" cy="80" r="3" />
                <circle cx="300" cy="80" r="3" />
                <circle cx="410" cy="80" r="3" />
              </g>
            </g>
          </svg>

          <svg
            viewBox="0 0 520 70"
            className="h-auto w-[min(34vw,430px)] shrink-0 overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="worksDeskTitleGlow">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>

            <g
              className={showTitle ? "works-title-enter" : "opacity-0"}
              onAnimationEnd={(event) => {
                if (event.target === event.currentTarget) {
                  setCardsStarted(true);
                }
              }}
            >
              <text
                x="260"
                y="48"
                textAnchor="middle"
                fill="#e5bd78"
                stroke="#a66e32"
                strokeWidth="0.7"
                paintOrder="stroke"
                fontSize="43"
                fontWeight="500"
                letterSpacing="9"
                fontFamily="serif"
              >
                MIS TRABAJOS
              </text>

              <text
                x="260"
                y="48"
                textAnchor="middle"
                fill="none"
                stroke="#ffe0a0"
                strokeWidth="2"
                fontSize="43"
                letterSpacing="9"
                fontFamily="serif"
                filter="url(#worksDeskTitleGlow)"
                className="works-circuit-pulse"
              >
                MIS TRABAJOS
              </text>
            </g>
          </svg>

          <svg
            viewBox="0 0 600 100"
            preserveAspectRatio="none"
            className="h-[75px] min-w-0 flex-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="worksDeskGlowRight">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            <g transform="translate(600 0) scale(-1 1)">
              <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  opacity: linesVisible ? 1 : 0,
                  transition: "opacity 500ms ease-out",
                }}
              >
                <g
                  stroke="#a66e32"
                  strokeWidth="4"
                  filter="url(#worksDeskGlowRight)"
                  className="works-circuit-pulse"
                >
                  <path
                    pathLength="100"
                    d="M0 50 H90 L125 20 H235 L270 50 H350 L385 15 H470 L505 50 H600"
                  />
                  <path pathLength="100" d="M0 50 H45 L75 80 H165 L195 50" />
                  <path pathLength="100" d="M270 50 L300 80 H410 L440 50" />
                </g>

                <g
                  stroke="#e5bd78"
                  strokeWidth="1.5"
                  style={{
                    strokeDasharray: 1200,
                    strokeDashoffset: linesVisible ? 0 : 1200,
                    transition:
                      "stroke-dashoffset 1.8s cubic-bezier(0.65, 0, 0.35, 1)",
                  }}
                >
                  <path
                    pathLength="100"
                    d="M0 50 H90 L125 20 H235 L270 50 H350 L385 15 H470 L505 50 H600"
                  />
                  <path pathLength="100" d="M0 50 H45 L75 80 H165 L195 50" />
                  <path pathLength="100" d="M270 50 L300 80 H410 L440 50" />
                </g>

                <g
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`works-energy-pulse ${linesVisible ? "active" : ""}`}
                >
                  <path
                    pathLength="100"
                    d="M0 50 H90 L125 20 H235 L270 50 H350 L385 15 H470 L505 50 H600"
                    stroke="#ffe7b5"
                    strokeWidth="2.5"
                    filter="url(#worksDeskGlowRight)"
                  />

                  <path
                    pathLength="100"
                    d="M0 50 H45 L75 80 H165 L195 50"
                    stroke="#ffe7b5"
                    strokeWidth="2.5"
                    filter="url(#worksDeskGlowRight)"
                  />

                  <path
                    pathLength="100"
                    d="M270 50 L300 80 H410 L440 50"
                    stroke="#ffe7b5"
                    strokeWidth="2.5"
                    filter="url(#worksDeskGlowRight)"
                  />
                </g>

                <g fill="#d6a45c">
                  <circle cx="90" cy="50" r="4" />
                  <circle cx="125" cy="20" r="4" />
                  <circle cx="235" cy="20" r="4" />
                  <circle cx="270" cy="50" r="4" />
                  <circle cx="385" cy="15" r="4" />
                  <circle cx="470" cy="15" r="4" />
                  <circle cx="505" cy="50" r="4" />
                  <circle cx="75" cy="80" r="3" />
                  <circle cx="165" cy="80" r="3" />
                  <circle cx="300" cy="80" r="3" />
                  <circle cx="410" cy="80" r="3" />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </header>

      <div
        key={groupIndex}
        className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-4 overflow-hidden p-5"
      >
        {works.map((work, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <a
              key={`${groupIndex}-${work.id ?? index}`}
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => startPageRotation(work, index)}
              onMouseLeave={() => stopPageRotation(index, work)}
              style={{ animationDelay: `${index * 180}ms` }}
              className={`group relative block h-full w-full cursor-pointer overflow-hidden rounded-xl border bg-[#111] transition-all duration-300 ${
                isHovered
                  ? "z-10 scale-[1.025] border-[#e5bd78]/80 shadow-[0_0_35px_rgba(229,189,120,0.25)]"
                  : "border-[#e5bd78]/20"
              } ${ready && cardsStarted ? "works-light-on" : "opacity-0"}`}
            >
              <div
                ref={(element) => {
                  containersRef.current[index] = element;

                  if (element && !element.dataset.initialized) {
                    element.dataset.initialized = "true";

                    const frame = createFrame(work.url, work.name);

                    element.appendChild(frame);
                    currentFramesRef.current[index] = frame;

                    frame.addEventListener("load", () => handleLoaded(index), {
                      once: true,
                    });
                  }
                }}
                className="absolute inset-0 overflow-hidden"
              >
                <div
                  ref={(element) => {
                    stagesRef.current[index] = element;
                  }}
                  className="absolute left-1/2 top-1/2 h-[720px] w-[1280px] overflow-hidden"
                  style={{
                    transform: `translate(-50%, -50%) scale(${scales[index] ?? 0.25})`,
                  }}
                />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function MyWorksMobile() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [loaded, setLoaded] = useState([]);
  const [scales, setScales] = useState([0.25, 0.25, 0.25]);
  const [linesVisible, setLinesVisible] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [cardsStarted, setCardsStarted] = useState(false);

  const containersRef = useRef([]);

  const totalGroups = Math.ceil(WORKS.length / 3);
  const works = WORKS.slice(groupIndex * 3, groupIndex * 3 + 3);
  const ready = works.length > 0 && loaded.length === works.length;

  const handleLoaded = (index) => {
    setLoaded((current) =>
      current.includes(index) ? current : [...current, index],
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLinesVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!linesVisible) return;

    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 1900);

    return () => clearTimeout(timer);
  }, [linesVisible]);

  useEffect(() => {
    if (!ready || totalGroups <= 1) return;

    const timer = setTimeout(() => {
      setLoaded([]);
      setGroupIndex((current) => (current + 1) % totalGroups);
    }, WORKS_CHANGE_INTERVAL);

    return () => clearTimeout(timer);
  }, [ready, totalGroups, groupIndex]);

  useLayoutEffect(() => {
    containersRef.current = containersRef.current.slice(0, works.length);

    const updateScales = () => {
      setScales(
        containersRef.current.map((container) => {
          if (!container) return 0.25;

          const { width, height } = container.getBoundingClientRect();

          const baseScale = Math.max(width / 390, height / 844) * 0.8;

          return baseScale * (1 + MOBILE_SCALE / 100);
        }),
      );
    };

    updateScales();

    const observer = new ResizeObserver(updateScales);

    containersRef.current.forEach((container) => {
      if (container) observer.observe(container);
    });

    return () => observer.disconnect();
  }, [groupIndex, works.length]);

  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden bg-[#080808]">
      <style>{`
        @keyframes works-energy-flow {
          0% { stroke-dashoffset: 100; opacity: 0; }
          10% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .works-energy-pulse path { stroke-dasharray: 8 92; stroke-dashoffset: 100; opacity: 0; }
        .works-energy-pulse.active path { animation: works-energy-flow 2.8s linear infinite; }
        .works-energy-pulse.active path:nth-child(2n) { animation-duration: 3.2s; }
        .works-energy-pulse.active path:nth-child(3n) { animation-duration: 3.6s; }
      `}</style>

      <header className="flex h-[12dvh] min-h-[64px] shrink-0 items-center justify-center px-3">
        <div className="flex w-full items-center justify-center gap-3">
          <svg
            viewBox="0 0 300 70"
            preserveAspectRatio="none"
            className="h-10 min-w-0 flex-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="worksMobileGlowLeft">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>

            <g
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: linesVisible ? 1 : 0,
                transition: "opacity 500ms ease-out",
              }}
            >
              <g
                stroke="#a66e32"
                strokeWidth="4"
                filter="url(#worksMobileGlowLeft)"
                className="works-circuit-pulse"
              >
                <path
                  pathLength="100"
                  d="M0 35 H35 L55 15 H115 L135 35 H185 L205 10 H255 L280 35 H300"
                />
                <path pathLength="100" d="M0 35 H25 L45 55 H95 L115 35" />
              </g>

              <g
                stroke="#e5bd78"
                strokeWidth="1.5"
                style={{
                  strokeDasharray: 650,
                  strokeDashoffset: linesVisible ? 0 : 650,
                  transition:
                    "stroke-dashoffset 1.5s cubic-bezier(0.65, 0, 0.35, 1)",
                }}
              >
                <path
                  pathLength="100"
                  d="M0 35 H35 L55 15 H115 L135 35 H185 L205 10 H255 L280 35 H300"
                />
                <path pathLength="100" d="M0 35 H25 L45 55 H95 L115 35" />
              </g>

              <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`works-energy-pulse ${linesVisible ? "active" : ""}`}
              >
                <path
                  pathLength="100"
                  d="M0 35 H35 L55 15 H115 L135 35 H185 L205 10 H255 L280 35 H300"
                  stroke="#ffe7b5"
                  strokeWidth="2.5"
                  filter="url(#worksMobileGlowLeft)"
                />

                <path
                  pathLength="100"
                  d="M0 35 H25 L45 55 H95 L115 35"
                  stroke="#ffe7b5"
                  strokeWidth="2.5"
                  filter="url(#worksMobileGlowLeft)"
                />
              </g>

              <g fill="#d6a45c">
                <circle cx="35" cy="35" r="3" />
                <circle cx="55" cy="15" r="3" />
                <circle cx="115" cy="15" r="3" />
                <circle cx="135" cy="35" r="3" />
                <circle cx="205" cy="10" r="3" />
                <circle cx="255" cy="10" r="3" />
                <circle cx="280" cy="35" r="3" />
                <circle cx="45" cy="55" r="2.5" />
                <circle cx="95" cy="55" r="2.5" />
              </g>
            </g>
          </svg>

          <div
            className={`w-[min(34vw,170px)] shrink-0 text-center ${
              showTitle ? "works-title-enter" : "opacity-0"
            }`}
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget) {
                setCardsStarted(true);
              }
            }}
          >
            <span className="whitespace-nowrap font-serif text-[clamp(15px,4vw,22px)] font-medium tracking-[0.18em] text-[#e5bd78]">
              MIS TRABAJOS
            </span>
          </div>

          <svg
            viewBox="0 0 300 70"
            preserveAspectRatio="none"
            className="h-10 min-w-0 flex-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="worksMobileGlowRight">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>

            <g
              transform="translate(300 0) scale(-1 1)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: linesVisible ? 1 : 0,
                transition: "opacity 500ms ease-out",
              }}
            >
              <g
                stroke="#a66e32"
                strokeWidth="4"
                filter="url(#worksMobileGlowRight)"
                className="works-circuit-pulse"
              >
                <path
                  pathLength="100"
                  d="M0 35 H35 L55 15 H115 L135 35 H185 L205 10 H255 L280 35 H300"
                />
                <path pathLength="100" d="M0 35 H25 L45 55 H95 L115 35" />
              </g>

              <g
                stroke="#e5bd78"
                strokeWidth="1.5"
                style={{
                  strokeDasharray: 650,
                  strokeDashoffset: linesVisible ? 0 : 650,
                  transition:
                    "stroke-dashoffset 1.5s cubic-bezier(0.65, 0, 0.35, 1)",
                }}
              >
                <path
                  pathLength="100"
                  d="M0 35 H35 L55 15 H115 L135 35 H185 L205 10 H255 L280 35 H300"
                />
                <path pathLength="100" d="M0 35 H25 L45 55 H95 L115 35" />
              </g>

              <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`works-energy-pulse ${linesVisible ? "active" : ""}`}
              >
                <path
                  pathLength="100"
                  d="M0 35 H35 L55 15 H115 L135 35 H185 L205 10 H255 L280 35 H300"
                  stroke="#ffe7b5"
                  strokeWidth="2.5"
                  filter="url(#worksMobileGlowRight)"
                />

                <path
                  pathLength="100"
                  d="M0 35 H25 L45 55 H95 L115 35"
                  stroke="#ffe7b5"
                  strokeWidth="2.5"
                  filter="url(#worksMobileGlowRight)"
                />
              </g>

              <g fill="#d6a45c">
                <circle cx="35" cy="35" r="3" />
                <circle cx="55" cy="15" r="3" />
                <circle cx="115" cy="15" r="3" />
                <circle cx="135" cy="35" r="3" />
                <circle cx="205" cy="10" r="3" />
                <circle cx="255" cy="10" r="3" />
                <circle cx="280" cy="35" r="3" />
                <circle cx="45" cy="55" r="2.5" />
                <circle cx="95" cy="55" r="2.5" />
              </g>
            </g>
          </svg>
        </div>
      </header>

      <div
        key={groupIndex}
        className="grid min-h-0 flex-1 grid-cols-1 grid-rows-3 gap-2 overflow-hidden px-3 pb-3"
      >
        {works.map((work, index) => (
          <a
            key={`${groupIndex}-${work.id ?? index}`}
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ animationDelay: `${index * 180}ms` }}
            className={`relative block min-h-0 w-full cursor-pointer overflow-hidden rounded-xl border border-[#e5bd78]/20 bg-[#111] ${
              ready && cardsStarted ? "works-light-on" : "opacity-0"
            }`}
          >
            <div
              ref={(element) => {
                containersRef.current[index] = element;
              }}
              className="absolute inset-0 overflow-hidden"
            >
              <div
                className="absolute left-1/2 top-1/2 h-[844px] w-[390px] origin-center"
                style={{
                  transform: `translate(-50%, -50%) scale(${scales[index] ?? 0.25})`,
                }}
              >
                <iframe
                  src={work.url}
                  title={work.name}
                  loading="eager"
                  tabIndex={-1}
                  scrolling="no"
                  onLoad={() => handleLoaded(index)}
                  className="pointer-events-none block h-full w-full overflow-hidden border-0"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}