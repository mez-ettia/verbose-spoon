import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative px-6 py-24 sm:px-10 md:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      <Reveal>
        <div className={`flex items-center gap-4 ${centered ? "justify-center" : ""}`}>
          <span aria-hidden className="size-1.5 rotate-45 bg-gold-400" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-6 text-4xl leading-[1.08] font-light text-ivory sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.16}>
          <p className="mt-6 text-base leading-relaxed text-mist md:text-lg">{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
