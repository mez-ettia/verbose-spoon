import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CTA } from "@/components/home/CTA";
import { TeamCard } from "@/components/home/TeamStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/Section";
import { Counter } from "@/components/ui/Counter";
import { awards, stats } from "@/lib/site";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "About the Agency",
  description:
    "Named among Victoria's top three agents by the Herald Sun, Coco Ma left to build a smaller agency around one idea: the person you meet at the appraisal negotiates your sale.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The agency"
        title={
          <>
            Built small,
            <span className="block text-foil">on purpose.</span>
          </>
        }
        lede="Coco Ma was named by the Herald Sun among Victoria's top three agents. She left to start something smaller — because the thing that made her good at this doesn't survive being scaled."
      />

      <section className="px-6 py-24 sm:px-10 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight font-light text-ivory md:text-5xl">
                The story, briefly
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-base leading-relaxed text-mist md:text-lg">
              <Reveal delay={0.08}>
                <p>
                  Most agencies grow by hiring. A director wins the listing, a
                  junior runs the campaign, and by the time the auction arrives the
                  vendor is dealing with their fourth point of contact. It is an
                  efficient business model and a poor experience.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p>
                  Coco Ma Real Estate is deliberately structured against that. Six
                  people. Six suburbs. Every listing negotiated by the person who
                  won it. We turn away work outside our corridor, and we turn away
                  vendors whose expectations we can&rsquo;t honestly meet &mdash;
                  which costs us listings and saves everyone six wasted weeks.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  What it produces: 146 sales last year, $131 million in value, an
                  average of 26 days on market, and more than 800 verified reviews.
                  Coco works in English and Mandarin; the wider team adds Vietnamese.
                  In this part of Melbourne that isn&rsquo;t a nice-to-have &mdash;
                  it is the difference between a family understanding their contract
                  and merely signing it.
                </p>
              </Reveal>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={0.18}>
              <div className="hairline bg-navy-900/40 p-9">
                <h3 className="eyebrow">Last twelve months</h3>
                <dl className="mt-8 space-y-7">
                  {stats.map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between gap-6">
                      <dt className="text-sm text-mist">{s.label}</dt>
                      <dd className="font-display text-3xl font-light text-foil">
                        <Counter
                          value={s.value}
                          prefix={"prefix" in s ? s.prefix : ""}
                          suffix={s.suffix}
                        />
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="rule-gold my-9" />

                <h3 className="eyebrow">Recognition</h3>
                <ul className="mt-7 space-y-3">
                  {awards.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-sm text-bone/80">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rotate-45 bg-gold-400" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section id="team" className="scroll-mt-28 border-t border-gold-400/12 px-6 py-24 sm:px-10 md:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHead
            eyebrow="The team"
            title={
              <>
                Six people, and
                <span className="block text-foil">what each one owns.</span>
              </>
            }
          />
          <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 3) * 0.09} className="h-full">
                <TeamCard member={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </>
  );
}
