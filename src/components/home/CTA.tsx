import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CrownMark } from "@/components/ui/Logo";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section className="grain relative overflow-hidden border-t border-gold-400/12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(75% 90% at 50% 110%, rgba(189,143,69,0.20), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-6 -z-10 hidden border border-gold-400/15 md:block"
      />

      <div className="mx-auto w-full max-w-3xl px-6 py-28 text-center sm:px-10 md:py-40">
        <Reveal>
          <CrownMark className="mx-auto w-12" />
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="font-display mt-10 text-4xl leading-[1.05] font-light text-ivory sm:text-5xl md:text-6xl">
            Find out what your home
            <span className="block text-foil">is actually worth.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            A free, no-obligation appraisal with the comparable sales behind it.
            Thirty minutes at your kitchen table, and an honest number &mdash; even
            when the honest number isn&rsquo;t the one you were hoping for.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <Button href="/sell#appraisal">Book a free appraisal</Button>
            <Button href={`tel:${site.phone.replace(/\s/g, "")}`} variant="outline">
              {site.phoneDisplay}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
