"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { CrownMark } from "@/components/ui/Logo";
import { RevealWords } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // The backdrop drifts slower than the copy, so the section gains depth as
  // you leave it rather than simply sliding away.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: bgY }}
        className="absolute inset-0 -z-20"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/hero-silk.svg"
          alt=""
          className="size-full scale-110 object-cover animate-silk"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/40 to-ink"
      />

      {/* An oversized crown watermark holds the right half of wide viewports,
          echoing the brand card without adding clutter. */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: bgY }}
        className="pointer-events-none absolute top-1/2 -right-[8%] -z-10 hidden w-[46vw] max-w-[44rem] -translate-y-1/2 opacity-[0.055] lg:block"
      >
        <CrownMark className="w-full" />
      </motion.div>

      {/* The brand card's inner gold frame, carried onto the page itself. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-5 -z-10 hidden border border-gold-400/15 sm:block md:inset-8"
      />

      <motion.div
        style={reduce ? undefined : { y: copyY, opacity: fade }}
        className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-28 sm:px-14"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <CrownMark className="w-11 md:w-14" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 1 }}
          className="eyebrow mt-7"
        >
          Melbourne South-East &middot; Est. Clayton
        </motion.p>

        <h1 className="font-display mt-6 max-w-5xl text-[12.5vw] leading-[0.94] font-light text-ivory sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <RevealWords text="Every home has" delay={0.45} />
          <span className="block">
            <RevealWords text="a right buyer." delay={0.62} className="text-foil" />
          </span>
          <RevealWords text="We know where" delay={0.8} />
          <span className="block">
            <RevealWords text="they are." delay={0.95} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-base leading-relaxed text-mist md:text-lg"
        >
          {site.legalName} sold 146 homes across Keysborough, Springvale, Clayton and
          Mulgrave last year &mdash; $131 million worth &mdash; with the director
          personally negotiating every one.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.38, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <Button href="/sell#appraisal">Book a free appraisal</Button>
          <Button href="/buy" variant="outline">
            View listings
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={reduce ? undefined : { opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="text-[0.6rem] tracking-[0.35em] text-bone/40 uppercase">Scroll</span>
        <span className="relative block h-14 w-px bg-gradient-to-b from-gold-400/60 to-transparent">
          <motion.span
            className="absolute top-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gold-200"
            animate={{ y: [0, 48, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
