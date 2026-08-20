"use client";

import Link from "next/link";
import type { ReactNode, MouseEvent } from "react";

type Variant = "gold" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden " +
  "px-8 py-4 text-[0.7rem] font-medium uppercase tracking-[0.24em] " +
  "transition-[color,background-color,border-color,transform] duration-500 " +
  "ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform";

const variants: Record<Variant, string> = {
  gold: "bg-gradient-to-r from-gold-500 to-gold-300 text-ink hover:from-gold-300 hover:to-gold-100",
  outline:
    "border border-gold-400/40 text-gold-200 hover:border-gold-300 hover:text-gold-100 hover:bg-gold-400/8",
  ghost: "text-bone/70 hover:text-gold-200",
};

/**
 * Cursor-following lift. Subtle enough to read as weight rather than a gimmick.
 * Uses `currentTarget` so no ref is needed.
 */
const STRENGTH = 0.22;

function onMagnetMove(e: MouseEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const node = e.currentTarget;
  const r = node.getBoundingClientRect();
  const x = (e.clientX - r.left - r.width / 2) * STRENGTH;
  const y = (e.clientY - r.top - r.height / 2) * STRENGTH;
  node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function onMagnetLeave(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = "translate3d(0,0,0)";
}

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  magnetic?: boolean;
};

export function Button({
  children,
  href,
  variant = "gold",
  className = "",
  type = "button",
  onClick,
  magnetic = true,
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;

  const inner = (
    <>
      {/* Light sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-18deg] bg-white/25 opacity-0 transition-none group-hover:animate-[shimmer-sweep_0.9s_ease-out] group-hover:opacity-100"
      />
      <span className="relative z-10">{children}</span>
    </>
  );

  const handlers = magnetic
    ? { onMouseMove: onMagnetMove, onMouseLeave: onMagnetLeave }
    : {};

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          {...handlers}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cls}
        {...handlers}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cls}
      {...handlers}
    >
      {inner}
    </button>
  );
}
