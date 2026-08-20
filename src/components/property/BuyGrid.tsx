"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PropertyCard } from "./PropertyCard";
import type { ListingImage } from "@/lib/media";
import type { Property, Status } from "@/lib/properties";
import { suburbs } from "@/lib/suburbs";

type Item = Property & { image: ListingImage };

const statuses: (Status | "All")[] = ["All", "For Sale", "Auction", "Under Offer", "Sold"];
const priceBands = [
  { label: "Any price", value: "0-99000000" },
  { label: "Under $800k", value: "0-800000" },
  { label: "$800k – $1m", value: "800000-1000000" },
  { label: "$1m – $1.3m", value: "1000000-1300000" },
  { label: "$1.3m +", value: "1300000-99000000" },
];
const bedOptions = ["Any", "2+", "3+", "4+", "5+"];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-4 py-2.5 text-[0.68rem] tracking-[0.16em] uppercase transition-all duration-400 ${
        active
          ? "border-gold-300/70 bg-gold-400/15 text-gold-100"
          : "border-gold-400/15 text-bone/60 hover:border-gold-400/40 hover:text-bone"
      }`}
    >
      {children}
    </button>
  );
}

export function BuyGrid({ items }: { items: Item[] }) {
  const [status, setStatus] = useState<Status | "All">("All");
  const [suburb, setSuburb] = useState("All");
  const [band, setBand] = useState(priceBands[0].value);
  const [beds, setBeds] = useState("Any");

  const results = useMemo(() => {
    const [min, max] = band.split("-").map(Number);
    const minBeds = beds === "Any" ? 0 : Number(beds.replace("+", ""));

    return items.filter(
      (p) =>
        (status === "All" || p.status === status) &&
        (suburb === "All" || p.suburb === suburb) &&
        p.priceValue >= min &&
        p.priceValue <= max &&
        p.beds >= minBeds,
    );
  }, [items, status, suburb, band, beds]);

  const reset = () => {
    setStatus("All");
    setSuburb("All");
    setBand(priceBands[0].value);
    setBeds("Any");
  };

  const filtered =
    status !== "All" || suburb !== "All" || band !== priceBands[0].value || beds !== "Any";

  return (
    <>
      <div className="hairline glass sticky top-20 z-30 mb-14 p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="mr-2 text-[0.62rem] tracking-[0.24em] text-slate-muted uppercase">
              Status
            </span>
            {statuses.map((s) => (
              <Chip key={s} active={status === s} onClick={() => setStatus(s)}>
                {s}
              </Chip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="mr-2 text-[0.62rem] tracking-[0.24em] text-slate-muted uppercase">
              Suburb
            </span>
            <Chip active={suburb === "All"} onClick={() => setSuburb("All")}>
              All
            </Chip>
            {suburbs.map((s) => (
              <Chip key={s.slug} active={suburb === s.name} onClick={() => setSuburb(s.name)}>
                {s.name}
              </Chip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <label className="flex items-center gap-3">
              <span className="text-[0.62rem] tracking-[0.24em] text-slate-muted uppercase">
                Price
              </span>
              <select
                value={band}
                onChange={(e) => setBand(e.target.value)}
                className="hairline bg-navy-900 px-4 py-2.5 text-[0.72rem] tracking-wide text-bone/85"
              >
                {priceBands.map((b) => (
                  <option key={b.value} value={b.value} className="bg-navy-900">
                    {b.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-3">
              <span className="text-[0.62rem] tracking-[0.24em] text-slate-muted uppercase">
                Beds
              </span>
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="hairline bg-navy-900 px-4 py-2.5 text-[0.72rem] tracking-wide text-bone/85"
              >
                {bedOptions.map((b) => (
                  <option key={b} value={b} className="bg-navy-900">
                    {b}
                  </option>
                ))}
              </select>
            </label>

            <p aria-live="polite" className="ml-auto text-[0.68rem] tracking-[0.2em] text-gold-200 uppercase">
              {results.length} {results.length === 1 ? "property" : "properties"}
              {filtered && (
                <button
                  type="button"
                  onClick={reset}
                  className="ml-5 text-bone/50 underline-offset-4 transition-colors hover:text-gold-200 hover:underline"
                >
                  Clear
                </button>
              )}
            </p>
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="hairline bg-navy-900/40 px-8 py-24 text-center">
          <p className="font-display text-3xl font-light text-ivory">
            Nothing matches that brief today.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-mist">
            About a third of what we sell never reaches a portal. Tell Emily what
            you&rsquo;re after and she&rsquo;ll watch the register for you.
          </p>
          <a
            href="/emily"
            className="mt-8 inline-block bg-gradient-to-r from-gold-500 to-gold-300 px-7 py-3.5 text-[0.68rem] tracking-[0.2em] text-ink uppercase"
          >
            Talk to Emily
          </a>
        </div>
      ) : (
        <motion.div layout className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <PropertyCard property={p} image={p.image} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
