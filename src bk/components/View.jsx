
"use client";

import { useEffect, useRef, isValidElement } from "react";

export default function View({ slides = [] }) {
  const discRef = useRef(null);
  const trackRef = useRef(null);
  const scrollbarRef = useRef(null);
  const thumbRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const disc = discRef.current;
    const track = trackRef.current;
    const scrollbar = scrollbarRef.current;
    const thumb = thumbRef.current;
    const counter = counterRef.current;

    if (!disc || !track || !scrollbar || !thumb || !slides.length) return;

    let currentX = 0;
    let targetX = 0;
    let animationFrame = null;
    let snapTimer = null;
    let dragging = false;
    let dragOffset = 0;

    const getMaxX = () => (slides.length - 1) * window.innerWidth;

    // ACTUALIZAR BARRA PERSONALIZADA

    const updateScrollbar = () => {
      const trackHeight = scrollbar.clientHeight;

      const thumbHeight = Math.min(
        trackHeight,
        Math.max(42, trackHeight / slides.length)
      );

      const availableHeight = trackHeight - thumbHeight;
      const progress = getMaxX() > 0 ? currentX / getMaxX() : 0;

      thumb.style.height = `${thumbHeight}px`;

      thumb.style.transform = `translateY(${
        availableHeight * progress
      }px)`;

      const currentPage = Math.round(currentX / window.innerWidth) + 1;

      counter.textContent = `${String(currentPage).padStart(2, "0")} / ${String(
        slides.length
      ).padStart(2, "0")}`;
    };

    // ANIMACIÓN DEL DISC

    const animate = () => {
      const difference = targetX - currentX;

      currentX += difference * 0.22;

      if (Math.abs(difference) < 0.2) {
        currentX = targetX;
        animationFrame = null;
      } else {
        animationFrame = requestAnimationFrame(animate);
      }

      track.style.transform = `translate3d(${-currentX}px, 0, 0)`;

      updateScrollbar();
    };

    const startAnimation = () => {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const moveSlides = (delta) => {
      targetX = Math.max(
        0,
        Math.min(getMaxX(), targetX + delta)
      );

      startAnimation();
    };

    // SNAP SUAVE: AJUSTAR AL SLIDE MÁS CERCANO

    const snapToSlide = () => {
      const slideWidth = window.innerWidth;
      const nearestSlide = Math.round(targetX / slideWidth);

      targetX =
        Math.max(0, Math.min(slides.length - 1, nearestSlide)) *
        slideWidth;

      startAnimation();
    };

    const scheduleSnap = () => {
      clearTimeout(snapTimer);

      snapTimer = setTimeout(() => {
        snapToSlide();
      }, 220);
    };

    // DESKTOP: RUEDA

    const handleWheel = (event) => {
      event.preventDefault();

      let delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (event.deltaMode === 1) delta *= 16;
      if (event.deltaMode === 2) delta *= window.innerHeight;

      if (!delta) return;

      moveSlides(delta);
      scheduleSnap();
    };

    // MOBILE: GESTOS TÁCTILES

    let touchStart = null;

    const handleTouchStart = (event) => {
      if (event.touches.length !== 1) return;

      clearTimeout(snapTimer);

      touchStart = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    };

    const handleTouchMove = (event) => {
      if (!touchStart || event.touches.length !== 1) return;

      event.preventDefault();

      const touch = event.touches[0];

      const deltaX = touchStart.x - touch.clientX;
      const deltaY = touchStart.y - touch.clientY;

      const delta =
        Math.abs(deltaX) >= Math.abs(deltaY) ? deltaX : deltaY;

      moveSlides(delta);

      touchStart = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    const handleTouchEnd = () => {
      if (!touchStart) return;

      touchStart = null;
      snapToSlide();
    };

    // BARRA: ACTUALIZAR POSICIÓN MEDIANTE CLIC O ARRASTRE

    const updatePositionFromPointer = (clientY) => {
      const rect = scrollbar.getBoundingClientRect();
      const thumbHeight = thumb.offsetHeight;
      const availableHeight = rect.height - thumbHeight;

      if (availableHeight <= 0) return;

      const position = Math.max(
        0,
        Math.min(
          1,
          (clientY - rect.top - dragOffset) / availableHeight
        )
      );

      targetX = position * getMaxX();

      startAnimation();
    };

    const handlePointerDown = (event) => {
      event.preventDefault();

      clearTimeout(snapTimer);

      if (event.target === thumb || thumb.contains(event.target)) {
        dragging = true;

        dragOffset =
          event.clientY - thumb.getBoundingClientRect().top;
      } else {
        dragging = true;
        dragOffset = thumb.offsetHeight / 2;

        updatePositionFromPointer(event.clientY);
      }

      scrollbar.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
      if (!dragging) return;

      updatePositionFromPointer(event.clientY);
    };

    const handlePointerUp = () => {
      if (!dragging) return;

      dragging = false;
      snapToSlide();
    };

    // REDIMENSIONAMIENTO

    const handleResize = () => {
      targetX = Math.min(targetX, getMaxX());
      currentX = Math.min(currentX, getMaxX());

      track.style.transform = `translate3d(${-currentX}px, 0, 0)`;

      updateScrollbar();
      startAnimation();
    };

    // OCULTAR SCROLL NATIVO

    const nativeScrollbarStyle = document.createElement("style");

    nativeScrollbarStyle.textContent = `
      html {
        scrollbar-width: none !important;
      }

      html::-webkit-scrollbar {
        display: none !important;
      }
    `;

    document.head.appendChild(nativeScrollbarStyle);

    // EVENTOS

    disc.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    disc.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    disc.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    disc.addEventListener("touchend", handleTouchEnd);
    disc.addEventListener("touchcancel", handleTouchEnd);

    scrollbar.addEventListener("pointerdown", handlePointerDown);
    scrollbar.addEventListener("pointermove", handlePointerMove);
    scrollbar.addEventListener("pointerup", handlePointerUp);
    scrollbar.addEventListener("pointercancel", handlePointerUp);

    window.addEventListener("resize", handleResize);

    updateScrollbar();

    return () => {
      disc.removeEventListener("wheel", handleWheel);
      disc.removeEventListener("touchstart", handleTouchStart);
      disc.removeEventListener("touchmove", handleTouchMove);
      disc.removeEventListener("touchend", handleTouchEnd);
      disc.removeEventListener("touchcancel", handleTouchEnd);

      scrollbar.removeEventListener("pointerdown", handlePointerDown);
      scrollbar.removeEventListener("pointermove", handlePointerMove);
      scrollbar.removeEventListener("pointerup", handlePointerUp);
      scrollbar.removeEventListener("pointercancel", handlePointerUp);

      window.removeEventListener("resize", handleResize);

      nativeScrollbarStyle.remove();

      clearTimeout(snapTimer);

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section
      ref={discRef}
      className="relative w-full"
      style={{
        height: `${slides.length * 100}dvh`,
        touchAction: "none",
      }}
    >
      {/* VENTANA DEL DISC */}

      <div className="sticky top-0 z-20 h-dvh w-full overflow-hidden bg-black">
        <div
          ref={trackRef}
          className="flex h-full w-max will-change-transform"
        >
          {slides.map((Slide, index) => (
            <div
              key={index}
              data-slide={index}
              className="h-dvh w-screen shrink-0 overflow-hidden"
            >
              {isValidElement(Slide) ? Slide : <Slide />}
            </div>
          ))}
        </div>
      </div>

      {/* BARRA DE NAVEGACIÓN PERSONALIZADA */}

      <div className="fixed right-5 top-1/2 z-[100] flex -translate-y-1/2 flex-col items-center gap-4">
        <span
          ref={counterRef}
          className="font-mono text-[9px] tracking-[0.2em] text-white/50"
        >
          01 / {String(slides.length).padStart(2, "0")}
        </span>

        <div
          ref={scrollbarRef}
          className="group relative h-[92dvh] w-8 cursor-pointer touch-none"
        >
          {/* LÍNEA DE FONDO */}

          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-white/15" />

          {/* LÍNEA DE PROGRESO */}

          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-400/50 to-blue-500/30" />

          {/* INDICADOR ARRASTRABLE */}

          <div
            ref={thumbRef}
            className="absolute left-1/2 top-0 w-[5px] -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.65)] transition-[width] duration-200 group-hover:w-[7px]"
            style={{
              height: "42px",
            }}
          />
        </div>

        <span className="text-[8px] tracking-[0.25em] text-white/30">
          SCROLL
        </span>
      </div>
    </section>
  );
}
