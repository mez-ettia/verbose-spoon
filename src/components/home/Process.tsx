import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/Section";

const stages = [
  {
    n: "01",
    title: "Appraisal",
    body: "A number Coco will stand behind, with the comparable sales that produced it. No inflated figure to win the listing and quietly walk back six weeks later.",
    meta: "Day 1",
  },
  {
    n: "02",
    title: "Preparation",
    body: "Styling, trades, gardens, cleaning — arranged and project-managed by us. Vendors who prepare properly clear the cost several times over.",
    meta: "Week 1–2",
  },
  {
    n: "03",
    title: "Campaign",
    body: "Photography, copy, portals, and the buyer register worked by hand. You get the actual numbers every Sunday: groups through, who's serious, who isn't.",
    meta: "Week 3–6",
  },
  {
    n: "04",
    title: "Negotiation",
    body: "Coco negotiates every campaign she lists, personally. Peter calls the auctions. The last increment is where your money is, and it isn't delegated.",
    meta: "Auction day",
  },
  {
    n: "05",
    title: "Settlement",
    body: "Final inspections, paperwork and the eight weeks most agencies quietly drop. Trinh holds it until the keys change hands.",
    meta: "30–90 days",
  },
];

export function Process() {
  return (
    <section className="relative px-6 py-24 sm:px-10 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHead
          eyebrow="How we work"
          title={
            <>
              Five stages.
              <span className="block text-foil">No surprises in any of them.</span>
            </>
          }
          lede="Selling a home is mostly logistics wearing a suit. Here is exactly what we do, in the order we do it."
        />

        <ol className="mt-20 grid gap-px border border-gold-400/12 md:grid-cols-5">
          {stages.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={i * 0.08}
              className="group relative bg-navy-950/60 p-8 transition-colors duration-700 hover:bg-navy-900/70"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <p className="font-display text-4xl font-light text-gold-500/50 transition-colors duration-500 group-hover:text-gold-300">
                {s.n}
              </p>
              <h3 className="font-display mt-6 text-2xl font-light text-ivory">{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-mist">{s.body}</p>
              <p className="mt-6 text-[0.62rem] tracking-[0.24em] text-slate-muted uppercase">
                {s.meta}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
