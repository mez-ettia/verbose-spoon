import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { CTA } from "@/components/home/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { properties } from "@/lib/properties";
import { suburbs } from "@/lib/suburbs";

export const metadata: Metadata = {
  title: "Suburbs We Know",
  description:
    "Keysborough, Springvale, Springvale South, Noble Park, Clayton and Mulgrave — medians, growth, days on market, and what actually moves price in each.",
  alternates: { canonical: "/suburbs" },
};

export default function SuburbsPage() {
  return (
    <>
      <PageHero
        eyebrow="Service area"
        title={
          <>
            One corridor,
            <span className="block text-foil">known properly.</span>
          </>
        }
        lede="We decline listings outside these six suburbs. It costs us business and it is the single biggest reason our vendors do better — you cannot price a street you have never worked."
      />

      <section className="px-6 py-20 sm:px-10 md:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-7 md:grid-cols-2">
          {suburbs.map((s, i) => {
            const listings = properties.filter(
              (p) => p.suburb === s.name && p.status !== "Sold",
            );
            return (
              <Reveal key={s.slug} delay={(i % 2) * 0.08} className="h-full">
                <Spotlight
                  as="article"
                  id={s.slug}
                  className="hairline h-full scroll-mt-28 bg-navy-900/40 p-9 transition-colors duration-700 hover:border-gold-400/40"
                >
                  <div className="relative z-10">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-display text-4xl font-light text-ivory">{s.name}</h2>
                      <span className="text-xs tracking-[0.2em] text-slate-muted">
                        {s.postcode}
                      </span>
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-mist">{s.blurb}</p>

                    <div className="rule-gold my-7" />

                    <dl className="grid grid-cols-3 gap-4">
                      <div>
                        <dd className="font-display text-2xl text-gold-200">{s.median}</dd>
                        <dt className="mt-1 text-[0.6rem] tracking-[0.18em] text-slate-muted uppercase">
                          Median
                        </dt>
                      </div>
                      <div>
                        <dd className="font-display text-2xl text-emerald-300/90">{s.growth}</dd>
                        <dt className="mt-1 text-[0.6rem] tracking-[0.18em] text-slate-muted uppercase">
                          12 mo growth
                        </dt>
                      </div>
                      <div>
                        <dd className="font-display text-2xl text-ivory">{s.daysOnMarket}</dd>
                        <dt className="mt-1 text-[0.6rem] tracking-[0.18em] text-slate-muted uppercase">
                          Days on market
                        </dt>
                      </div>
                    </dl>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link
                        href="/buy"
                        className="text-[0.68rem] tracking-[0.2em] text-gold-200 uppercase transition-colors hover:text-gold-100"
                      >
                        {listings.length > 0
                          ? `${listings.length} available now →`
                          : "See all listings →"}
                      </Link>
                      <Link
                        href="/sell#appraisal"
                        className="text-[0.68rem] tracking-[0.2em] text-bone/55 uppercase transition-colors hover:text-gold-200"
                      >
                        Appraise a home here
                      </Link>
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTA />
    </>
  );
}
