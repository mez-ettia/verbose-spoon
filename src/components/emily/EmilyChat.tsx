"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CrownMark } from "@/components/ui/Logo";
import { properties, type Property } from "@/lib/properties";
import { suburbs } from "@/lib/suburbs";
import { site } from "@/lib/site";

/* ------------------------------------------------------------------ *
 * Emily — the buyer concierge.
 *
 * A guided brief, not a chatbot pretending to be a person. Every question
 * narrows the register; the last step hands over real matches and a way to
 * reach a human. Answers stay in the browser until the visitor sends them.
 * ------------------------------------------------------------------ */

type Answers = {
  intent?: string;
  suburb?: string;
  budget?: string;
  beds?: string;
  timeline?: string;
};

type Step = {
  key: keyof Answers;
  from: string;
  options: { label: string; value: string }[];
};

const budgets = [
  { label: "Under $800k", value: "0-800000" },
  { label: "$800k – $1m", value: "800000-1000000" },
  { label: "$1m – $1.3m", value: "1000000-1300000" },
  { label: "$1.3m +", value: "1300000-99000000" },
];

const steps: Step[] = [
  {
    key: "intent",
    from: "Lovely to meet you. Are you looking to buy, or thinking about selling?",
    options: [
      { label: "I'm buying", value: "buy" },
      { label: "I'm selling", value: "sell" },
      { label: "A bit of both", value: "both" },
    ],
  },
  {
    key: "suburb",
    from: "Which pocket of the south-east are you focused on?",
    options: [
      ...suburbs.map((s) => ({ label: s.name, value: s.name })),
      { label: "Still deciding", value: "any" },
    ],
  },
  {
    key: "budget",
    from: "And roughly where does your budget sit? I'll only show you things that actually fit.",
    options: budgets,
  },
  {
    key: "beds",
    from: "How much space do you need?",
    options: [
      { label: "2 bedrooms", value: "2" },
      { label: "3 bedrooms", value: "3" },
      { label: "4 bedrooms", value: "4" },
      { label: "5 or more", value: "5" },
    ],
  },
  {
    key: "timeline",
    from: "Last one. When would you like to be moved in?",
    options: [
      { label: "Within 3 months", value: "3m" },
      { label: "3 – 6 months", value: "6m" },
      { label: "6 – 12 months", value: "12m" },
      { label: "Just watching for now", value: "watching" },
    ],
  },
];

type Bubble = { id: string; role: "emily" | "you"; text: string };

function matchProperties(a: Answers): Property[] {
  const [min, max] = (a.budget ?? "0-99000000").split("-").map(Number);
  const beds = Number(a.beds ?? 0);

  return properties
    .filter((p) => p.status !== "Sold")
    .map((p) => {
      let score = 0;
      // Budget is the filter buyers actually care about; a 12% stretch is still
      // worth showing rather than hiding.
      if (p.priceValue >= min * 0.92 && p.priceValue <= max * 1.12) score += 3;
      if (a.suburb && a.suburb !== "any" && p.suburb === a.suburb) score += 3;
      if (beds && p.beds >= beds) score += 2;
      if (beds && p.beds === beds) score += 1;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .map((x) => x.p);
}

function closingLine(a: Answers, matches: Property[]) {
  if (a.intent === "sell") {
    return "Then the fastest thing I can do is get Coco to an appraisal. She'll give you a number she's prepared to stand behind — not a number designed to win the listing.";
  }
  if (matches.length === 0) {
    return "Nothing on the current list is an honest match for that brief, and I'd rather say so than pad it out. About a third of what we sell never advertises, so let me put you on the register instead.";
  }
  const inSuburb =
    a.suburb && a.suburb !== "any" && matches.some((m) => m.suburb === a.suburb);

  if (a.suburb && a.suburb !== "any" && !inSuburb) {
    return `Nothing in ${a.suburb} fits that budget this week — I won't pretend otherwise. These ${matches.length} match everything else you told me, and they're close by.`;
  }
  return matches.length === 1
    ? "One home on our current list genuinely fits. Here it is."
    : `${matches.length} homes on our current list genuinely fit. Here they are.`;
}

export function EmilyChat({ compact = false }: { compact?: boolean }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<string[]>([]);
  /** How many of Emily's lines have finished "typing". */
  const [revealed, setRevealed] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  // Derived, so no effect ever has to push state to catch up.
  const isTyping = revealed <= index && revealed <= steps.length;
  const done = revealed > steps.length;

  const matches = useMemo(() => (done ? matchProperties(answers) : []), [done, answers]);

  const bubbles = useMemo<Bubble[]>(() => {
    const out: Bubble[] = [];
    for (let i = 0; i < Math.min(revealed, steps.length); i++) {
      out.push({ id: `e-${i}`, role: "emily", text: steps[i].from });
      if (chosen[i]) out.push({ id: `y-${i}`, role: "you", text: chosen[i] });
    }
    return out;
  }, [revealed, chosen]);

  // The only job of this effect is to schedule the reveal; state changes
  // happen in the timer callback, never in the effect body.
  useEffect(() => {
    if (revealed > index || revealed > steps.length) return;
    const delay = revealed === 0 ? 700 : 950;
    const t = setTimeout(() => setRevealed((r) => r + 1), delay);
    return () => clearTimeout(t);
  }, [revealed, index]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [bubbles, isTyping, done]);

  const answer = (label: string, value: string) => {
    const step = steps[index];
    setAnswers((a) => ({ ...a, [step.key]: value }));
    setChosen((c) => {
      const next = [...c];
      next[index] = label;
      return next;
    });
    setIndex((i) => i + 1);
  };

  const restart = () => {
    setAnswers({});
    setChosen([]);
    setIndex(0);
    setRevealed(0);
  };

  const current = index < steps.length && revealed > index ? steps[index] : null;

  return (
    <div
      className={`hairline glass relative flex flex-col overflow-hidden ${
        compact ? "h-[560px]" : "h-[640px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gold-400/12 px-6 py-5">
        <span className="relative flex size-11 items-center justify-center rounded-full border border-gold-400/35 bg-navy-900">
          <CrownMark className="w-5" />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-gold-400/40 animate-pulse-ring"
          />
        </span>
        <div className="min-w-0">
          <p className="font-display text-xl leading-none font-light text-ivory">Emily</p>
          <p className="mt-1.5 flex items-center gap-2 text-[0.62rem] tracking-[0.22em] text-gold-300/80 uppercase">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
            Buyer concierge &middot; Online
          </p>
        </div>
      </div>

      {/* Log */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation with Emily"
        className="flex flex-1 flex-col justify-end gap-4 overflow-y-auto px-6 py-6"
      >
        <AnimatePresence initial={false}>
          {bubbles.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${b.role === "you" ? "justify-end" : "justify-start"}`}
            >
              <p
                className={`max-w-[85%] px-5 py-3.5 text-sm leading-relaxed ${
                  b.role === "you"
                    ? "bg-gradient-to-r from-gold-500 to-gold-300 text-ink"
                    : "hairline bg-navy-900/70 text-bone/90"
                }`}
              >
                {b.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex justify-start">
            <span className="hairline flex items-center gap-1.5 bg-navy-900/70 px-5 py-4">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 rounded-full bg-gold-300"
                  animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.16 }}
                />
              ))}
            </span>
          </div>
        )}

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <p className="hairline max-w-[85%] bg-navy-900/70 px-5 py-3.5 text-sm leading-relaxed text-bone/90">
              {closingLine(answers, matches)}
            </p>

            {matches.map((p) => (
              <Link
                key={p.slug}
                href={`/property/${p.slug}`}
                className="hairline group flex items-center justify-between gap-4 bg-navy-800/50 px-5 py-4 transition-colors hover:border-gold-400/45"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm text-ivory transition-colors group-hover:text-gold-100">
                    {p.address}, {p.suburb}
                  </span>
                  <span className="mt-1 block text-[0.68rem] tracking-[0.16em] text-mist uppercase">
                    {p.beds} bed &middot; {p.baths} bath &middot; {p.price}
                  </span>
                </span>
                <span aria-hidden className="text-gold-300 transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={answers.intent === "sell" ? "/sell#appraisal" : "/contact"}
                className="bg-gradient-to-r from-gold-500 to-gold-300 px-6 py-3 text-[0.68rem] tracking-[0.2em] text-ink uppercase transition-opacity hover:opacity-90"
              >
                {answers.intent === "sell" ? "Book an appraisal" : "Join the buyer register"}
              </Link>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="hairline px-6 py-3 text-[0.68rem] tracking-[0.2em] text-gold-200 uppercase transition-colors hover:border-gold-300"
              >
                Call {site.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={restart}
                className="px-2 py-3 text-[0.68rem] tracking-[0.2em] text-bone/50 uppercase transition-colors hover:text-gold-200"
              >
                Start over
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Options */}
      <div className="border-t border-gold-400/12 px-6 py-5">
        {current ? (
          <div className="flex flex-wrap gap-2.5">
            {current.options.map((o, i) => (
              <motion.button
                key={o.value}
                type="button"
                onClick={() => answer(o.label, o.value)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="hairline px-4 py-2.5 text-[0.72rem] tracking-[0.1em] text-bone/85 transition-colors hover:border-gold-300/60 hover:bg-gold-400/10 hover:text-gold-100"
              >
                {o.label}
              </motion.button>
            ))}
          </div>
        ) : (
          <p className="text-[0.66rem] tracking-[0.2em] text-slate-muted uppercase">
            {done
              ? "Emily has finished her brief"
              : isTyping
                ? "Emily is typing…"
                : " "}
          </p>
        )}
      </div>
    </div>
  );
}
