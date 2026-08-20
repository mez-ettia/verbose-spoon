import type { ReactNode } from "react";

/** Edge-faded infinite ticker. Duplicated content keeps the loop seamless. */
export function Marquee({
  items,
  duration = 46,
  className = "",
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
}) {
  const row: ReactNode = (
    <>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-8 px-8">
          <span className="text-[0.7rem] uppercase tracking-[0.32em] text-bone/55">{item}</span>
          <span aria-hidden className="size-1 rotate-45 bg-gold-400/60" />
        </span>
      ))}
    </>
  );

  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div
        className="flex w-max animate-marquee"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center" aria-hidden="false">
          {row}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
}
