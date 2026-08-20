import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Shared masthead for every page below the homepage. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="grain relative overflow-hidden border-b border-gold-400/12 px-6 pt-40 pb-20 sm:px-10 md:pt-52 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(80% 70% at 20% 0%, rgba(22,64,111,0.42), transparent 65%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <span aria-hidden className="size-1.5 rotate-45 bg-gold-400" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="font-display mt-7 max-w-4xl text-5xl leading-[1.02] font-light text-ivory sm:text-6xl md:text-7xl lg:text-8xl">
            {title}
          </h1>
        </Reveal>

        {lede && (
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
              {lede}
            </p>
          </Reveal>
        )}

        {children && <Reveal delay={0.24}>{children}</Reveal>}
      </div>
    </header>
  );
}
