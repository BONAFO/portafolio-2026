"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import "@/src/css/IAGen.css";

const GALLERY_CATEGORIES = [
  {
    title: "PERSONAJES ANIME",
    href: "/gallery/anime",
    images: [
      "https://fiverr-res.cloudinary.com/images/t_main1%2Cq_auto%2Cf_auto%2Cq_auto%2Cf_auto/gigs3/442304297/original/25d2d77066a8ab9590db7fe76f2a6de682d38141/draw-cute-anime-chibi-art-character-design-for-pfp-sticker-and-sheets.png",
      "https://images.aiscribbles.com/ebbfd234631946cd8f6e51f6f259340a.png?v=c2c018",
      "https://fiverr-res.cloudinary.com/images/t_main1%2Cq_auto%2Cf_auto%2Cq_auto%2Cf_auto/gigs2/488386896/original/944acac740e99489684cc8f006691dab821399df/draw-anime-character-art-original-character-design.png",
      "https://image.fonwall.ru/o/bt/girls-an-anime-portrait-ifvx.jpeg?auto=compress&domain=img3.fonwall.ru&fit=crop&h=1440&w=2560",
      "https://cdn.prod.website-files.com/65c9e4c6cfce6029a3d58e3e/66fb47a304b5487857e8dea5_mental-health-ai-game-character.webp",
    ],
  },
  {
    title: "BACKGROUND ANIME",
    href: "/gallery/bganime",
    images: [
      "https://image.cdn2.seaart.ai/2024-06-25/cpt5lbte878c73854d9g/28f1b279cbedeadcdfdf18740a61304ccf40b18a_high.webp",
      "https://www.xtrafondos.com/wallpapers/gran-vista-a-paisaje-anime-de-primavera-13854.jpg",
      "https://i.etsystatic.com/64083374/r/il/32c6c4/8107989119/il_794xN.8107989119_ava7.jpg",
      "https://wallpapers.com/images/featured/fondods-de-la-ciudad-de-anime-estetica-0jgeoodxtcmwhw1z.jpg",
      "https://i0.wp.com/wallpapercave.com/wp/wp7170402.jpg",
    ],
  },
  {
    title: "REALISMO",
    href: "/gallery/real",
    images: [
      "https://assets.vofy.art/images/cad074dc-cede-4890-ae9d-7a63a48abe74/image_HGNawaeM_kQz-9yi/output-1.webp",
      "https://img.imgpilot.app/prompt-seo/featured/1782488225177-06034f.png",
      "https://pmgroupkz.s3.eu-north-1.amazonaws.com/uploads/elle/2024/12/partners3032_numerology_beautiful_man_and_woman_0f593c88-a41d-4742-b6ef-88d24772c828.jpg",
      "https://acf.meganovel.com/seo/resources/202403/cover-iQiEcovcJA.jpg",
      "https://enhanceaiart.s3.us-west-2.amazonaws.com/uploads/8ba7402c-0357-4f4e-b7ca-f319390b2846.jpg",
    ],
  },
  {
    title: "BACKGROUNDS REALISTAS",
    href: "/gallery/bgreal",
    images: [
      "https://images5.alphacoders.com/881/thumb-1920-881732.jpg",
      "https://img.goodfon.com/original/2400x1228/a/6e/lake-river-beautiful-landscape-mountains-alpines-forest-suns.jpg",
      "https://pl.million-wallpapers.ru/wallpapers/5/10/17359700775032063254/jezioro-w-g-rach-otoczone-lasem.jpg",
      "https://oakbayvillage.ca/images/2024/coin-id-scanner/December/article_3_2.webp",
      "https://hintergrundbild.org/wallpaper/full/1/9/d/47178-beliebt-berge-hintergrundbilder-1920x1080.jpg",
    ],
  },
];

const DESKTOP_PATHS = [
  "M0 40 H45 V18 H90 V40 H135 V62 H185 V40 H235",
  "M45 18 V5 H80 V12 H110",
  "M90 40 V75 H125 V65 H160",
  "M135 62 V82 H175 V72 H205",
  "M185 40 V12 H220 V25 H255",
];

const DESKTOP_NODES = [
  [45, 18],
  [90, 40],
  [135, 62],
  [185, 40],
  [235, 40],
  [80, 12],
  [110, 12],
  [125, 75],
  [160, 65],
  [175, 82],
  [205, 72],
  [220, 25],
  [255, 25],
];

const MOBILE_PATHS = [
  "M0 35 H25 V15 H55 V35 H85 V55 H115 V35 H145",
  "M25 15 V5 H45 V10 H65",
  "M55 35 V62 H85 V55 H105",
  "M115 35 V12 H140 V22 H165",
];

const MOBILE_NODES = [
  [25, 15],
  [55, 35],
  [85, 55],
  [115, 35],
  [145, 35],
  [45, 10],
  [65, 10],
  [85, 62],
  [105, 55],
  [140, 22],
];

function useImageRotation() {
  const [activeImage, setActiveImage] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [layerImages, setLayerImages] = useState(
    GALLERY_CATEGORIES.map((category) => [
      category.images[0],
      category.images[0],
    ])
  );
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    let holdTimeout;
    let transitionTimeout;
    let cancelled = false;

    const nextIndex = (activeImage + 1) % 5;
    const inactiveLayer = 1 - activeLayer;

    const preloadImages = GALLERY_CATEGORIES.map((category) => {
      return new Promise((resolve) => {
        const image = new Image();
        const nextSrc = category.images[nextIndex];

        image.onload = () => resolve(nextSrc);
        image.onerror = () => resolve(category.images[activeImage]);

        image.src = nextSrc;

        if (image.complete && image.naturalWidth > 0) {
          resolve(nextSrc);
        }
      });
    });

    Promise.all(preloadImages).then((loadedImages) => {
      if (cancelled) return;

      setLayerImages((current) =>
        current.map((layers, index) => {
          const updated = [...layers];
          updated[inactiveLayer] = loadedImages[index];
          return updated;
        })
      );

      holdTimeout = setTimeout(() => {
        if (cancelled) return;

        setTransitioning(true);

        transitionTimeout = setTimeout(() => {
          if (cancelled) return;

          setActiveLayer(inactiveLayer);
          setActiveImage(nextIndex);
          setTransitioning(false);
        }, 1400);
      }, 6000);
    });

    return () => {
      cancelled = true;
      clearTimeout(holdTimeout);
      clearTimeout(transitionTimeout);
    };
  }, [activeImage, activeLayer]);

  return { activeLayer, layerImages, transitioning };
}

function CircuitDesktop({ onLoaded }) {
  return (
    <svg
      viewBox="0 0 260 100"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="none"
    >
      <g className="works-circuit-draw">
        {DESKTOP_PATHS.map((path, index) => (
          <path
            key={index}
            d={path}
            fill="none"
            stroke="#b98b46"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: `${index * 0.12}s` }}
            onAnimationEnd={() => {
              if (index === DESKTOP_PATHS.length - 1) onLoaded();
            }}
          />
        ))}
      </g>

      <g className="works-energy-pulse">
        {DESKTOP_PATHS.map((path, index) => (
          <path
            key={index}
            d={path}
            fill="none"
            stroke="#e8bd75"
            strokeLinecap="round"
            style={{ animationDelay: `${index * 0.18}s` }}
          />
        ))}
      </g>

      {DESKTOP_NODES.map(([cx, cy], index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r="2"
          className="works-circuit-node"
          style={{ animationDelay: `${1.5 + index * 0.035}s` }}
        />
      ))}
    </svg>
  );
}

function CircuitMobile({ onLoaded }) {
  return (
    <svg
      viewBox="0 0 170 70"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="none"
    >
      <g className="works-circuit-draw">
        {MOBILE_PATHS.map((path, index) => (
          <path
            key={index}
            d={path}
            fill="none"
            stroke="#b98b46"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: `${index * 0.12}s` }}
            onAnimationEnd={() => {
              if (index === MOBILE_PATHS.length - 1) onLoaded();
            }}
          />
        ))}
      </g>

      <g className="works-energy-pulse">
        {MOBILE_PATHS.map((path, index) => (
          <path
            key={index}
            d={path}
            fill="none"
            stroke="#e8bd75"
            strokeLinecap="round"
            style={{ animationDelay: `${index * 0.18}s` }}
          />
        ))}
      </g>

      {MOBILE_NODES.map(([cx, cy], index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r="2"
          className="works-circuit-node"
          style={{ animationDelay: `${1.5 + index * 0.035}s` }}
        />
      ))}
    </svg>
  );
}

export function IAGenDesktop() {
  const [linesLoaded, setLinesLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);
  const [cardsStarted, setCardsStarted] = useState(false);

  const { activeLayer, layerImages, transitioning } = useImageRotation();

  useEffect(() => {
    if (!titleLoaded) return;

    const timeout = setTimeout(() => setCardsStarted(true), 200);
    return () => clearTimeout(timeout);
  }, [titleLoaded]);

  return (
    <section className="hidden h-full min-h-0 w-full flex-col overflow-hidden bg-[#080808] sm:flex">
      <header className="relative flex h-[145px] w-full shrink-0 items-center justify-center overflow-hidden bg-[#080808]">
        <div className="absolute left-0 top-1/2 h-[100px] w-[34%] -translate-y-1/2">
          <CircuitDesktop onLoaded={() => setLinesLoaded(true)} />
        </div>

        {linesLoaded && (
          <h2
            className="relative z-10 px-6 text-center font-serif text-[28px] font-medium tracking-[0.22em] text-[#e8d5b5] works-title-enter"
            onAnimationEnd={() => setTitleLoaded(true)}
          >
            GENERACIÓN CON IA
          </h2>
        )}

        <div className="absolute right-0 top-1/2 h-[100px] w-[34%] -translate-y-1/2 scale-x-[-1]">
          <CircuitDesktop onLoaded={() => setLinesLoaded(true)} />
        </div>
      </header>

      {cardsStarted && (
        <div className="grid w-full min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-4 px-5 pb-5 pt-1">
          {GALLERY_CATEGORIES.map((category, index) => (
            <Link
              key={category.href}
              href={category.href}
              className="ia-gen-card-enter group flex min-h-0 min-w-0 cursor-pointer flex-col overflow-hidden border border-[#6d512e]/50 bg-[#101010] p-3 transition-colors duration-300 hover:border-[#b98b46] hover:bg-[#15120e]"
              style={{ animationDelay: `${index * 350}ms` }}
            >
              <h3 className="mb-2 flex shrink-0 items-center justify-center text-center text-[12px] font-medium tracking-[0.13em] text-[#d9c29e] transition-colors duration-300 group-hover:text-[#f0d29c] xl:text-[14px]">
                {category.title}
              </h3>

              <div className="relative min-h-0 w-full flex-1 overflow-hidden bg-[#080808]">
                <img
                  src={layerImages[index][0]}
                  alt={category.title}
                  draggable="false"
                  className={`absolute inset-0 h-full w-full object-fill transition-opacity duration-[1400ms] ease-in-out will-change-[opacity] ${
                    (activeLayer === 0) !== transitioning
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />

                <img
                  src={layerImages[index][1]}
                  alt={category.title}
                  draggable="false"
                  className={`absolute inset-0 h-full w-full object-fill transition-opacity duration-[1400ms] ease-in-out will-change-[opacity] ${
                    (activeLayer === 1) !== transitioning
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />

                <div className="pointer-events-none absolute inset-0 border border-white/[0.04]" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export function IAGenMobile() {
  const [linesLoaded, setLinesLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);
  const [cardsStarted, setCardsStarted] = useState(false);

  const { activeLayer, layerImages, transitioning } = useImageRotation();

  useEffect(() => {
    if (!titleLoaded) return;

    const timeout = setTimeout(() => setCardsStarted(true), 200);
    return () => clearTimeout(timeout);
  }, [titleLoaded]);

  return (
    <section className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#080808] sm:hidden">
      <header className="relative flex h-[clamp(64px,11dvh,96px)] w-full shrink-0 items-center justify-center overflow-hidden bg-[#080808]">
        <div className="absolute left-0 top-1/2 h-[85%] w-[25%] -translate-y-1/2">
          <CircuitMobile onLoaded={() => setLinesLoaded(true)} />
        </div>

        {linesLoaded && (
          <h2
            className="relative z-10 px-[clamp(4px,2vw,12px)] text-center font-serif text-[clamp(12px,3.6vw,18px)] font-medium tracking-[0.13em] text-[#e8d5b5] works-title-enter"
            onAnimationEnd={() => setTitleLoaded(true)}
          >
            GENERACIÓN CON IA
          </h2>
        )}

        <div className="absolute right-0 top-1/2 h-[85%] w-[25%] -translate-y-1/2 scale-x-[-1]">
          <CircuitMobile onLoaded={() => setLinesLoaded(true)} />
        </div>
      </header>

      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
        {cardsStarted && (
          <div className="flex min-h-0 w-full flex-1 flex-col gap-[clamp(8px,1.5dvh,14px)] overflow-y-auto px-[clamp(8px,3vw,16px)] pb-[clamp(10px,2dvh,18px)] pt-1">
            {GALLERY_CATEGORIES.map((category, index) => (
              <Link
                key={category.href}
                href={category.href}
                className="ia-gen-card-enter group flex min-h-[clamp(100px,18dvh,180px)] w-full flex-1 flex-col overflow-hidden border border-[#6d512e]/50 bg-[#101010] p-[clamp(6px,2vw,10px)] transition-colors duration-300 active:border-[#b98b46]"
                style={{ animationDelay: `${index * 350}ms` }}
              >
                <h3 className="mb-[clamp(4px,1.5vw,8px)] flex shrink-0 items-center justify-center text-center text-[clamp(9px,2.5vw,12px)] font-medium tracking-[0.08em] text-[#d9c29e]">
                  {category.title}
                </h3>

                <div className="relative min-h-0 w-full flex-1 overflow-hidden bg-[#080808]">
                  <img
                    src={layerImages[index][0]}
                    alt={category.title}
                    draggable="false"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out will-change-[opacity] ${
                      (activeLayer === 0) !== transitioning
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />

                  <img
                    src={layerImages[index][1]}
                    alt={category.title}
                    draggable="false"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out will-change-[opacity] ${
                      (activeLayer === 1) !== transitioning
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />

                  <div className="pointer-events-none absolute inset-0 border border-white/[0.04]" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}