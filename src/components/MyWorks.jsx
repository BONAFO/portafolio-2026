"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { WORKS } from "@/src/data/Works";
import "@/src/css/MyWorks.css";

const WORKS_CHANGE_INTERVAL = 10000;
const WORK_PAGE_CHANGE_INTERVAL = 4000;
const WORK_PAGE_FADE_DURATION = 1000;

const DESK_SCALE = 0;
const MOBILE_SCALE = 0;

const DESK_PATHS = [
  "M0 40 H35 V20 H75 V40 H115 V60 H155 V40 H205 V20 H250",
  "M35 20 V5 H65 V12 H95",
  "M75 40 V75 H115 V65 H145",
  "M155 40 V10 H190 V25 H225",
  "M205 20 V55 H245 V45 H280",
];

const DESK_NODES = [
  [35, 20],
  [75, 40],
  [115, 60],
  [155, 40],
  [205, 20],
  [250, 20],
  [65, 12],
  [95, 12],
  [115, 75],
  [145, 65],
  [190, 25],
  [225, 25],
  [245, 55],
  [280, 45],
];

const MOBILE_PATHS = [
  "M0 35 H25 V18 H55 V35 H85 V52 H115 V35 H150",
  "M25 18 V5 H45 V10 H65",
  "M55 35 V62 H85 V55 H105",
  "M115 35 V12 H140 V22 H165",
  "M150 35 V55 H175 V48 H195",
];

const MOBILE_NODES = [
  [25, 18],
  [55, 35],
  [85, 52],
  [115, 35],
  [150, 35],
  [45, 10],
  [65, 10],
  [85, 62],
  [105, 55],
  [140, 22],
  [165, 22],
  [175, 55],
  [195, 48],
];

export function MyWorksDesk() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [loaded, setLoaded] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scales, setScales] = useState({});
  const [linesLoaded, setLinesLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);
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
    if (!titleLoaded) return;

    const timer = setTimeout(() => {
      setCardsStarted(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [titleLoaded]);

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

  const renderCircuit = (mirrored = false) => (
    <svg
      viewBox="0 0 300 80"
      preserveAspectRatio="none"
      className="h-[75px] min-w-0 flex-1"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={mirrored ? "translate(300 0) scale(-1 1)" : undefined}>
        <g
          className="works-circuit-draw"
          fill="none"
          stroke="#a66e32"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {DESK_PATHS.map((path, index) => (
            <path
              key={index}
              d={path}
              pathLength="100"
              style={{ animationDelay: `${index * 0.08}s` }}
              onAnimationEnd={
                !mirrored && index === DESK_PATHS.length - 1
                  ? () => setLinesLoaded(true)
                  : undefined
              }
            />
          ))}
        </g>

        <g
          className="works-energy-pulse"
          fill="none"
          stroke="#ffe0a0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {DESK_PATHS.map((path, index) => (
            <path
              key={index}
              d={path}
              pathLength="100"
              style={{ animationDelay: `${index * 0.35}s` }}
            />
          ))}
        </g>

        {DESK_NODES.map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="2"
            className="works-circuit-node"
          />
        ))}
      </g>
    </svg>
  );

  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden bg-[#080808]">
      <header className="flex h-[17dvh] min-h-[110px] shrink-0 items-center justify-center px-8">
        <div className="flex w-full items-center justify-center gap-8">
          {renderCircuit()}

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

            {linesLoaded && (
              <g
                className="works-title-enter"
                onAnimationEnd={() => setTitleLoaded(true)}
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
            )}
          </svg>

          {renderCircuit(true)}
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

                    frame.addEventListener(
                      "load",
                      () => handleLoaded(index),
                      { once: true },
                    );
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
  const [linesLoaded, setLinesLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);
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
    if (!titleLoaded) return;

    const timer = setTimeout(() => {
      setCardsStarted(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [titleLoaded]);

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

  const renderCircuit = (mirrored = false) => (
    <svg
      viewBox="0 0 200 70"
      preserveAspectRatio="none"
      className="h-10 min-w-0 flex-1"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={mirrored ? "translate(200 0) scale(-1 1)" : undefined}>
        <g
          className="works-circuit-draw"
          fill="none"
          stroke="#a66e32"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {MOBILE_PATHS.map((path, index) => (
            <path
              key={index}
              d={path}
              pathLength="100"
              style={{ animationDelay: `${index * 0.08}s` }}
              onAnimationEnd={
                !mirrored && index === MOBILE_PATHS.length - 1
                  ? () => setLinesLoaded(true)
                  : undefined
              }
            />
          ))}
        </g>

        <g
          className="works-energy-pulse"
          fill="none"
          stroke="#ffe0a0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {MOBILE_PATHS.map((path, index) => (
            <path
              key={index}
              d={path}
              pathLength="100"
              style={{ animationDelay: `${index * 0.35}s` }}
            />
          ))}
        </g>

        {MOBILE_NODES.map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="2"
            className="works-circuit-node"
          />
        ))}
      </g>
    </svg>
  );

  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden bg-[#080808]">
      <header className="flex h-[12dvh] min-h-[64px] shrink-0 items-center justify-center px-3">
        <div className="flex w-full items-center justify-center gap-3">
          {renderCircuit()}

          <div
            className={`w-[min(34vw,170px)] shrink-0 text-center ${
              linesLoaded ? "works-title-enter" : "opacity-0"
            }`}
            onAnimationEnd={() => setTitleLoaded(true)}
          >
            <span className="whitespace-nowrap font-serif text-[clamp(15px,4vw,22px)] font-medium tracking-[0.18em] text-[#e5bd78]">
              MIS TRABAJOS
            </span>
          </div>

          {renderCircuit(true)}
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