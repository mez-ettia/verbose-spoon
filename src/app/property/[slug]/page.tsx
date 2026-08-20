import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyCard } from "@/components/property/PropertyCard";
import { listingImage } from "@/lib/media";
import { properties, propertyBySlug } from "@/lib/properties";
import { team } from "@/lib/team";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = propertyBySlug(slug);
  if (!property) return { title: "Property not found" };

  return {
    title: `${property.address}, ${property.suburb}`,
    description: property.summary,
    alternates: { canonical: `/property/${slug}` },
    openGraph: {
      title: `${property.address}, ${property.suburb} — ${property.price}`,
      description: property.summary,
    },
  };
}

function Spec({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-l border-gold-400/20 pl-5">
      <p className="font-display text-3xl font-light text-ivory">{value}</p>
      <p className="mt-1.5 text-[0.62rem] tracking-[0.22em] text-slate-muted uppercase">
        {label}
      </p>
    </div>
  );
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = propertyBySlug(slug);
  if (!property) notFound();

  const image = listingImage(property.slug);
  const agent = team.find((m) => m.slug === property.agent) ?? team[0];
  const more = properties.filter((p) => p.slug !== property.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: `${property.address}, ${property.suburb} ${property.postcode}`,
    description: property.summary,
    numberOfRooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    floorSize: { "@type": "QuantitativeValue", value: property.land, unitCode: "MTK" },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.suburb,
      addressRegion: "VIC",
      postalCode: property.postcode,
      addressCountry: "AU",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Gallery */}
      <div className="relative h-[70svh] min-h-[28rem] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={
            image.isPhoto
              ? `${property.address}, ${property.suburb}`
              : `${property.address}, ${property.suburb} — photography to come`
          }
          className="size-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/70" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal>
              <Link
                href="/buy"
                className="text-[0.66rem] tracking-[0.24em] text-gold-200/80 uppercase transition-colors hover:text-gold-100"
              >
                &larr; All listings
              </Link>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="eyebrow mt-6">
                {property.status} &middot; {property.suburb} {property.postcode}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[1.02] font-light text-ivory sm:text-6xl md:text-7xl">
                {property.address}
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 text-lg text-gold-200">{property.price}</p>
            </Reveal>
          </div>
        </div>
      </div>

      <section className="px-6 py-20 sm:px-10 md:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight font-light text-ivory md:text-4xl">
                {property.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 text-base leading-relaxed text-mist md:text-lg">
                {property.summary}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                <Spec label="Bedrooms" value={property.beds} />
                <Spec label="Bathrooms" value={property.baths} />
                <Spec label="Car spaces" value={property.cars} />
                <Spec label="Land sqm" value={property.land} />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rule-gold my-14" />
              <h3 className="eyebrow">What stands out</h3>
              <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {property.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-bone/85">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rotate-45 bg-gold-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Agent panel */}
          <aside className="lg:col-span-5">
            <Reveal delay={0.16}>
              <div className="hairline glass sticky top-28 p-8">
                {(property.auctionDate || property.inspection) && (
                  <div className="mb-8 space-y-4 border-b border-gold-400/12 pb-8">
                    {property.auctionDate && (
                      <div>
                        <p className="text-[0.62rem] tracking-[0.24em] text-slate-muted uppercase">
                          Auction
                        </p>
                        <p className="mt-2 text-base text-gold-100">{property.auctionDate}</p>
                      </div>
                    )}
                    {property.inspection && (
                      <div>
                        <p className="text-[0.62rem] tracking-[0.24em] text-slate-muted uppercase">
                          Inspection
                        </p>
                        <p className="mt-2 text-base text-ivory">{property.inspection}</p>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-[0.62rem] tracking-[0.24em] text-slate-muted uppercase">
                  Your agent
                </p>
                <div className="mt-5 flex items-center gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center border border-gold-400/30 bg-navy-900">
                    <span className="font-display text-xl text-foil">{agent.initials}</span>
                  </span>
                  <span>
                    <span className="font-display block text-xl font-light text-ivory">
                      {agent.name}
                    </span>
                    <span className="mt-1 block text-[0.64rem] tracking-[0.18em] text-gold-300/80 uppercase">
                      {agent.role}
                    </span>
                  </span>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-mist">{agent.bio}</p>

                <div className="mt-8 flex flex-col gap-3">
                  <Button href={`tel:${site.phone.replace(/\s/g, "")}`} className="w-full">
                    Call {site.phoneDisplay}
                  </Button>
                  <Button
                    href={`mailto:${site.email}?subject=${encodeURIComponent(
                      `Enquiry — ${property.address}, ${property.suburb}`,
                    )}`}
                    variant="outline"
                    className="w-full"
                  >
                    Email about this home
                  </Button>
                  <Button href="/emily" variant="ghost" className="w-full">
                    Ask Emily for similar
                  </Button>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="border-t border-gold-400/12 px-6 py-20 sm:px-10 md:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="font-display text-3xl font-light text-ivory md:text-4xl">
            You might also consider
          </h2>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.09} className="h-full">
                <PropertyCard property={p} image={listingImage(p.slug)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
