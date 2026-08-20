"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  const go = (dir: 1 | -1) =>
    setI((v) => (v + dir + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-10 md:py-32">
      {/* Book-matched marble, as on a feature wall — the one moment of texture. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-45">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/marble.svg" alt="" className="size-full object-cover" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/60" />

      <div className="mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <span aria-hidden className="size-1.5 rotate-45 bg-gold-400" />
            <span className="eyebrow">800+ verified reviews</span>
          </div>
        </Reveal>

        <div className="relative mt-12 min-h-[17rem] sm:min-h-[15rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="font-display text-2xl leading-[1.35] font-light text-ivory sm:text-3xl md:text-4xl">
                <span aria-hidden className="text-gold-400/60">&ldquo;</span>
                {t.quote}
                <span aria-hidden className="text-gold-400/60">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-10">
                <span className="block text-sm tracking-[0.18em] text-gold-200 uppercase">
                  {t.name}
                </span>
                <span className="mt-2 block text-[0.7rem] tracking-[0.2em] text-slate-muted uppercase">
                  {t.detail}
                  {t.result && (
                    <>
                      {" "}
                      &middot; <span className="text-emerald-300/80">{t.result}</span>
                    </>
                  )}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="text-gold-300/70 transition-colors hover:text-gold-100"
          >
            &larr;
          </button>

          <div className="flex items-center gap-2.5">
            {testimonials.map((_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Review ${n + 1} of ${testimonials.length}`}
                aria-current={n === i}
                className={`h-px transition-all duration-500 ${
                  n === i ? "w-10 bg-gold-300" : "w-5 bg-bone/25 hover:bg-bone/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next review"
            className="text-gold-300/70 transition-colors hover:text-gold-100"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
