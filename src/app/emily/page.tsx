import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { EmilyChat } from "@/components/emily/EmilyChat";
import { CTA } from "@/components/home/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Emily — Your Buyer Concierge",
  description:
    "Tell Emily what you're actually looking for and she'll bring you a short list — including the off-market homes that never reach a portal.",
  alternates: { canonical: "/emily" },
};

const faqs = [
  {
    q: "Is Emily a real person?",
    a: "No, and we won't pretend otherwise. Emily is a guided brief that runs on this site — she asks the same five questions a good agent asks on a first call, then hands you to the person who knows your street. Nothing she collects goes anywhere until you press send.",
  },
  {
    q: "What is the off-market register?",
    a: "Owners who want to sell without a public campaign — for privacy, or because a board on the lawn would tip off a tenant, or simply because they'd rather not. Roughly a third of what we sell moves this way. Emily draws from the same list our agents do.",
  },
  {
    q: "Will I be spammed?",
    a: "You'll hear from us when something genuinely fits the brief you gave, and not otherwise. One line asking us to stop, and we stop. We don't sell or share your details with anyone.",
  },
  {
    q: "I'm not ready to buy for a year. Still worth it?",
    a: "Especially then. Buyers who watch a corridor for twelve months make far better decisions than buyers who start looking the week they get finance. Tell Emily you're watching and she'll keep it to the things worth knowing about.",
  },
];

export default function EmilyPage() {
  return (
    <>
      <PageHero
        eyebrow="Buyer concierge"
        title={
          <>
            Meet Emily.
            <span className="block text-foil">Five questions, one short list.</span>
          </>
        }
        lede="Most agencies make buyers do the chasing — refreshing portals, missing the good ones by a weekend. Emily works the other way around."
      />

      <section className="px-6 py-20 sm:px-10 md:py-28">
        <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Reveal blur={false}>
              <EmilyChat />
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <h2 className="font-display text-3xl leading-tight font-light text-ivory md:text-4xl">
                What she does with your answers
              </h2>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-6 text-base leading-relaxed text-mist">
                Your brief goes to the agent who covers that pocket — Selina for
                Clayton and Mulgrave, Mitchell for Springvale and Noble Park, Coco
                for Keysborough. They check it against the current list and the
                off-market register by hand, and they call you when there is
                something real to talk about.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-5 text-base leading-relaxed text-mist">
                If nothing fits, we say so. A short list that stays short is the
                whole point.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-gold-400/12 px-6 py-24 sm:px-10 md:py-32">
        <div className="mx-auto w-full max-w-4xl">
          <SectionHead eyebrow="Straight answers" title="Questions people actually ask" align="center" />
          <dl className="mt-16 border-t border-gold-400/12">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.07} className="border-b border-gold-400/12 py-8">
                <dt className="font-display text-2xl leading-snug font-light text-ivory">{f.q}</dt>
                <dd className="mt-4 text-sm leading-relaxed text-mist md:text-base">{f.a}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <CTA />
    </>
  );
}
