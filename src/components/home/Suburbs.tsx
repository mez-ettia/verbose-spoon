import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/Section";
import { suburbs } from "@/lib/suburbs";

export function Suburbs() {
  return (
    <section className="relative border-y border-gold-400/12 bg-navy-950/50 px-6 py-24 sm:px-10 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHead
          eyebrow="Where we work"
          title={
            <>
              Six suburbs.
              <span className="block text-foil">Not sixty.</span>
            </>
          }
          lede="We decline listings outside this map. Knowing one corridor properly is worth more to a vendor than covering all of Melbourne badly."
        />

        <div className="mt-16 border-t border-gold-400/12">
          {suburbs.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link
                href={`/suburbs#${s.slug}`}
                className="group grid grid-cols-1 items-center gap-4 border-b border-gold-400/12 py-8 transition-colors duration-500 hover:bg-navy-900/40 md:grid-cols-12 md:gap-8 md:px-4"
              >
                <div className="md:col-span-4">
                  <h3 className="font-display flex items-baseline gap-3 text-3xl font-light text-ivory transition-colors duration-500 group-hover:text-gold-100 md:text-4xl">
                    {s.name}
                    <span className="text-xs tracking-[0.2em] text-slate-muted">
                      {s.postcode}
                    </span>
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-mist md:col-span-5">{s.blurb}</p>

                <div className="flex items-center gap-8 md:col-span-2">
                  <span>
                    <span className="block font-display text-xl text-gold-200">{s.median}</span>
                    <span className="text-[0.6rem] tracking-[0.18em] text-slate-muted uppercase">
                      Median
                    </span>
                  </span>
                  <span>
                    <span className="block font-display text-xl text-emerald-300/90">
                      {s.growth}
                    </span>
                    <span className="text-[0.6rem] tracking-[0.18em] text-slate-muted uppercase">
                      12&nbsp;mo
                    </span>
                  </span>
                </div>

                <span
                  aria-hidden
                  className="hidden text-right text-gold-400/50 transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold-200 md:col-span-1 md:block"
                >
                  &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
