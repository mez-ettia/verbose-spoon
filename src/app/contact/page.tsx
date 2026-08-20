import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { Field, FieldRow, Select, TextArea } from "@/components/ui/Field";
import { addressLine, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Coco Ma Real Estate, ${addressLine}. Call ${site.phoneDisplay} or email ${site.email}.`,
  alternates: { canonical: "/contact" },
};

const hours = [
  ["Monday – Friday", "9:00am – 6:00pm"],
  ["Saturday", "9:00am – 5:00pm"],
  ["Sunday", "By appointment"],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Talk to someone
            <span className="block text-foil">who answers.</span>
          </>
        }
        lede="Call, email, or send the form. Whichever you choose, a person who knows your suburb reads it — usually the same day."
      />

      <section className="px-6 py-20 sm:px-10 md:py-28">
        <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="hairline bg-navy-900/40 p-9">
                <h2 className="eyebrow">Office</h2>
                <address className="mt-6 text-lg leading-relaxed text-ivory not-italic">
                  {site.address.street}
                  <br />
                  {site.address.locality} {site.address.region} {site.address.postcode}
                </address>

                <div className="rule-gold my-8" />

                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="font-display block text-3xl font-light text-foil transition-opacity hover:opacity-80"
                >
                  {site.phoneDisplay}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block text-sm text-bone/75 transition-colors hover:text-gold-200"
                >
                  {site.email}
                </a>

                <div className="rule-gold my-8" />

                <h2 className="eyebrow">Hours</h2>
                <dl className="mt-6 space-y-3">
                  {hours.map(([day, time]) => (
                    <div key={day} className="flex justify-between gap-6 text-sm">
                      <dt className="text-mist">{day}</dt>
                      <dd className="text-bone/85">{time}</dd>
                    </div>
                  ))}
                </dl>

                <div className="rule-gold my-8" />

                <h2 className="eyebrow">Elsewhere</h2>
                <ul className="mt-6 space-y-3">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-bone/75 transition-colors hover:text-gold-200"
                      >
                        {s.label} &nearr;
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.12} blur={false}>
              <div className="hairline bg-navy-900/40 p-8 md:p-10">
                <h2 className="font-display text-3xl font-light text-ivory">Send us a note</h2>
                <p className="mt-3 text-sm text-mist">
                  Everything is optional except a way to reach you back.
                </p>

                <div className="mt-10">
                  <EnquiryForm subject="Website enquiry — cmrealestate.com.au">
                    <FieldRow>
                      <Field label="First name" name="firstName" required autoComplete="given-name" />
                      <Field label="Last name" name="lastName" required autoComplete="family-name" />
                    </FieldRow>
                    <FieldRow>
                      <Field label="Email" name="email" type="email" required autoComplete="email" />
                      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
                    </FieldRow>
                    <Select
                      label="What's this about"
                      name="topic"
                      options={[
                        "Selling a property",
                        "Buying a property",
                        "Property management",
                        "An appraisal",
                        "Something else",
                      ]}
                    />
                    <TextArea label="Message" name="message" rows={5} />
                  </EnquiryForm>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
