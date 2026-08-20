import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BuyGrid } from "@/components/property/BuyGrid";
import { CTA } from "@/components/home/CTA";
import { withMedia } from "@/lib/media";
import { properties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Properties for Sale",
  description:
    "Homes for sale across Keysborough, Springvale, Clayton, Mulgrave and Noble Park. Filter by suburb, price and bedrooms — or let Emily watch the off-market register for you.",
  alternates: { canonical: "/buy" },
};

export default function BuyPage() {
  const items = withMedia(properties);

  return (
    <>
      <PageHero
        eyebrow="Current listings"
        title={
          <>
            Homes worth
            <span className="block text-foil">the drive.</span>
          </>
        }
        lede="Everything we currently represent, in one honest list. If nothing here fits, say so — a third of what we sell never reaches a portal at all."
      />

      <section className="px-6 py-16 sm:px-10 md:py-20">
        <div className="mx-auto w-full max-w-7xl">
          <BuyGrid items={items} />
        </div>
      </section>

      <CTA />
    </>
  );
}
