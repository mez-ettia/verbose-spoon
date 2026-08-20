"use client";

import { useEffect, useRef } from "react";

/**
 * A thin gold ring that trails the pointer and swells over interactive
 * elements. Pointer-devices only — never rendered on touch, and disabled
 * entirely under reduced-motion.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;
    let frame = 0;

    const move = (e: PointerEvent) => {
      // Nothing is drawn until the pointer moves, so a page that is never
      // touched doesn't show a ring parked in the middle of it.
      root.current?.classList.add("opacity-100");
      tx = e.clientX;
      ty = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      }
      const interactive = Boolean(
        (e.target as HTMLElement)?.closest("a, button, input, textarea, select, [data-cursor]"),
      );
      // Scale lives on an inner node so it never fights the inline transform
      // that positions the ring.
      inner.current?.classList.toggle("scale-[2.1]", interactive);
      inner.current?.classList.toggle("bg-gold-400/10", interactive);
    };

    // The ring lags the dot — that lag is what makes it read as weighted.
    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Visibility is decided in CSS (`.custom-cursor`), so nothing renders on
  // touch devices or under reduced motion and there is no state to sync.
  return (
    <div
      ref={root}
      aria-hidden
      className="custom-cursor pointer-events-none fixed inset-0 z-[100] opacity-0 transition-opacity duration-500"
    >
      <div ref={ring} className="absolute top-0 left-0">
        <div
          ref={inner}
          className="size-8 rounded-full border border-gold-300/50 transition-[scale,background-color] duration-300 ease-out"
        />
      </div>
      <div ref={dot} className="absolute top-0 left-0 size-1 rounded-full bg-gold-200" />
    </div>
  );
}
