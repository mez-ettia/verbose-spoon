"use client";

import type { ReactNode, MouseEvent } from "react";

/**
 * Tracks the pointer and feeds it to the `.spotlight` CSS custom properties,
 * so a card lights up from wherever the cursor is.
 */
export function Spotlight({
  children,
  className = "",
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  id?: string;
}) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag id={id} onMouseMove={onMove} className={`spotlight ${className}`}>
      {children}
    </Tag>
  );
}
