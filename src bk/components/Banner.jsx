export function BannerMobile({
  profile,
  mobilePaths,
  CircuitText,
  showData,
  bannerLoaded,
  handleLinesLoaded,
}) {
  return (
    <section className="relative flex h-[25dvh] w-full items-center justify-center overflow-hidden bg-[#080808] px-2 sm:hidden">
      <svg
        viewBox="0 0 390 210"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circuitGlowMobile" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a66e32" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#e5bd78" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#a66e32" stopOpacity="0.12" />
          </linearGradient>

          <filter
            id="energyGlowMobile"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        <g
          className="circuit-draw"
          fill="none"
          stroke="url(#circuitGlowMobile)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {mobilePaths.map((path, index) => (
            <path
              key={index}
              d={path}
              pathLength="100"
              style={{ animationDelay: `${index * 0.08}s` }}
              onAnimationEnd={
                index === mobilePaths.length - 1
                  ? handleLinesLoaded
                  : undefined
              }
            />
          ))}
        </g>

        <g
          className={`energy-pulse ${bannerLoaded ? "active" : ""}`}
          fill="none"
          stroke="#ffe0a0"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#energyGlowMobile)"
        >
          {mobilePaths.map((path, index) => (
            <path key={index} d={path} pathLength="100" />
          ))}
        </g>

        <g
          className={`energy-pulse ${bannerLoaded ? "active" : ""}`}
          fill="none"
          stroke="#fff0c8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {mobilePaths.map((path, index) => (
            <path key={index} d={path} pathLength="100" />
          ))}
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

      {showData && (
        <div className="banner-data relative z-10 flex w-full flex-col items-center justify-center">
          <svg
            viewBox="0 0 1100 220"
            className="h-auto w-full max-w-[390px] overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <CircuitText text={profile.name} y={25} scale={1.15} />
            <CircuitText text={profile.surname} y={115} scale={0.85} />
          </svg>

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
      )}
    </section>
  );
}

export function BannerDesktop({
  profile,
  desktopPaths,
  CircuitText,
  showData,
  bannerLoaded,
  handleLinesLoaded,
}) {
  return (
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

          <filter
            id="energyGlowDesktop"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <g
          className="circuit-draw"
          fill="none"
          stroke="url(#circuitGlow)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {desktopPaths.map((path, index) => (
            <path
              key={index}
              d={path}
              pathLength="100"
              style={{ animationDelay: `${index * 0.08}s` }}
              onAnimationEnd={
                index === desktopPaths.length - 1
                  ? handleLinesLoaded
                  : undefined
              }
            />
          ))}
        </g>

        <g
          className={`energy-pulse ${bannerLoaded ? "active" : ""}`}
          fill="none"
          stroke="#ffe0a0"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#energyGlowDesktop)"
        >
          {desktopPaths.map((path, index) => (
            <path key={index} d={path} pathLength="100" />
          ))}
        </g>

        <g
          className={`energy-pulse ${bannerLoaded ? "active" : ""}`}
          fill="none"
          stroke="#fff0c8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {desktopPaths.map((path, index) => (
            <path key={index} d={path} pathLength="100" />
          ))}
        </g>

        <g fill="#d6a45c">
          {[
            [250, 120],
            [180, 180],
            [220, 300],
            [300, 390],
            [200, 480],
            [350, 540],
            [1670, 120],
            [1740, 180],
            [1700, 300],
            [1620, 390],
            [1720, 480],
            [1570, 540],
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

      {showData && (
        <div className="banner-data relative z-10 flex w-full flex-col items-center justify-center px-4">
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
      )}
    </section>
  );
}