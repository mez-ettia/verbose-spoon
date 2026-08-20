import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { Field, FieldRow, Select, TextArea } from "@/components/ui/Field";
import { PropertyCard } from "@/components/property/PropertyCard";
import { listingImage } from "@/lib/media";
import { recentlySold } from "@/lib/properties";
import { suburbs } from "@/lib/suburbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "A free appraisal with the comparable sales behind it, a five-stage campaign, and a director who negotiates every sale personally. 146 homes sold last year across Melbourne's south-east.",
  alternates: { canonical: "/sell" },
};

const promises = [
  {
    title: "An honest number, first time",
    body: "Some agents quote high to win the listing and walk it back six weeks later, once you're locked into a contract and an advertising bill. We quote what we believe we can achieve, and we show you the sales that support it.",
  },
  {
    title: "The director does the negotiating",
    body: "Coco has never handed a vendor to a junior. The person who sits at your kitchen table at the appraisal is the person on the phone at the pointy end, when the last thirty thousand dollars is decided.",
  },
  {
    title: "The whole campaign, project-managed",
    body: "Styling, trades, gardens, photography, cleaning, final inspections. We arrange it and we chase it. Vendors who prepare properly clear the cost several times over — that isn't a sales line, it's what the numbers show.",
  },
  {
    title: "Sunday-night numbers, without spin",
    body: "Groups through, who's genuinely interested, who's gone cold, and what we think that means for price. Every week. It's the difference between a stressful eight weeks and a manageable one.",
  },
];

export default function SellPage() {
  return (
    <>
      <PageHero
        eyebrow="For vendors"
        title={
          <>
            The number matters.
            <span className="block text-foil">So does who gets you there.</span>
          </>
        }
        lede="146 homes sold last year, $131 million in total value, and an average of 26 days on market. Here is exactly how we do it — and what we'll promise you before you sign anything."
      >
        <div className="mt-10 flex flex-wrap gap-5">
          <Button href="#appraisal">Book a free appraisal</Button>
          <Button href={`tel:${site.phone.replace(/\s/g, "")}`} variant="outline">
            {site.phoneDisplay}
          </Button>
        </div>
      </PageHero>

      <section className="px-6 py-24 sm:px-10 md:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHead
            eyebrow="Four promises"
            title={
              <>
                What we&rsquo;ll commit to
                <span className="block text-foil">in writing.</span>
              </>
            }
          />
          <div className="mt-16 grid gap-px border border-gold-400/12 md:grid-cols-2">
            {promises.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.08}
                className="group bg-navy-950/60 p-10 transition-colors duration-700 hover:bg-navy-900/70"
              >
                <span className="font-display text-2xl font-light text-gold-500/50 transition-colors duration-500 group-hover:text-gold-300">
                  0{i + 1}
                </span>
                <h3 className="font-display mt-5 text-2xl leading-snug font-light text-ivory">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-mist">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />

      <section className="border-y border-gold-400/12 bg-navy-950/50 px-6 py-24 sm:px-10 md:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHead
            eyebrow="Recent results"
            title={
              <>
                Numbers, not
                <span className="block text-foil">adjectives.</span>
              </>
            }
          />
          <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {recentlySold.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1} className="h-full">
                <PropertyCard property={p} image={listingImage(p.slug)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="appraisal" className="scroll-mt-28 px-6 py-24 sm:px-10 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow="Free appraisal"
              title={
                <>
                  Thirty minutes.
                  <span className="block text-foil">No obligation.</span>
                </>
              }
              lede="We'll walk the home, look at what's actually sold nearby in the last ninety days, and give you a range we're prepared to stand behind."
            />
            <Reveal delay={0.25}>
              <ul className="mt-10 space-y-4">
                {[
                  "Comparable sales from the last 90 days",
                  "A realistic price range, and the reasoning",
                  "What preparation would and wouldn't be worth it",
                  "Auction or private sale — and why",
                  "No pressure to list, ever",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-bone/85">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rotate-45 bg-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.15} blur={false}>
              <div className="hairline bg-navy-900/40 p-8 md:p-10">
                <EnquiryForm
                  subject="Appraisal request — cmrealestate.com.au"
                  submitLabel="Request my appraisal"
                  successTitle="Booked in."
                  successBody="Coco or one of the team will call within one business day to arrange a time that suits you."
                >
                  <FieldRow>
                    <Field label="First name" name="firstName" required autoComplete="given-name" />
                    <Field label="Last name" name="lastName" required autoComplete="family-name" />
                  </FieldRow>
                  <FieldRow>
                    <Field label="Email" name="email" type="email" required autoComplete="email" />
                    <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
                  </FieldRow>
                  <Field
                    label="Property address"
                    name="address"
                    required
                    placeholder="42 Example Street, Clayton"
                    autoComplete="street-address"
                  />
                  <FieldRow>
                    <Select label="Suburb" name="suburb" options={suburbs.map((s) => s.name)} />
                    <Select
                      label="Timeframe"
                      name="timeframe"
                      options={[
                        "As soon as possible",
                        "Within 3 months",
                        "3 – 6 months",
                        "6 – 12 months",
                        "Just curious about value",
                      ]}
                    />
                  </FieldRow>
                  <TextArea
                    label="Anything we should know"
                    name="notes"
                    placeholder="Recent renovations, tenancy, a deadline you're working to…"
                  />
                </EnquiryForm>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
