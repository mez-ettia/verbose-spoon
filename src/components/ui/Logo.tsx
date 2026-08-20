import Link from "next/link";
import { site } from "@/lib/site";

/** The crown mark, drawn inline so it can inherit gradients and animate. */
export function CrownMark({ className = "" }: { className?: string }) {
  const id = "crown-grad";
  return (
    <svg viewBox="0 0 120 96" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8d6a2c" />
          <stop offset="35%" stopColor="#f0dcae" />
          <stop offset="65%" stopColor="#cfa761" />
          <stop offset="100%" stopColor="#9a7433" />
        </linearGradient>
      </defs>
      <rect x="55" y="0" width="10" height="10" transform="rotate(45 60 5)" fill={`url(#${id})`} />
      <path
        d="M8 20 L60 84 L112 20 L86 44 L60 14 L34 44 Z"
        stroke={`url(#${id})`}
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({
  stacked = false,
  className = "",
}: {
  stacked?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — ${site.tagline}, home`}
      className={`group inline-flex items-center gap-3 ${
        stacked ? "flex-col gap-4 text-center" : ""
      } ${className}`}
    >
      <CrownMark
        className={`${stacked ? "w-16" : "w-8"} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5`}
      />
      <span className="block">
        <span
          className={`wordmark block text-foil ${
            stacked ? "text-4xl sm:text-5xl" : "text-lg"
          }`}
        >
          {site.name.toUpperCase()}
        </span>
        <span
          className={`mt-1 block text-gold-300/70 ${
            stacked ? "" : "text-[0.5rem]"
          }`}
          style={{
            fontFamily: "var(--font-sans)",
            letterSpacing: stacked ? "0.5em" : "0.34em",
            fontSize: stacked ? "0.7rem" : undefined,
          }}
        >
          {site.tagline.toUpperCase()}
        </span>
      </span>
    </Link>
  );
}
