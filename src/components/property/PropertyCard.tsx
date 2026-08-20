import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import type { ListingImage } from "@/lib/media";
import type { Property } from "@/lib/properties";

const statusStyle: Record<Property["status"], string> = {
  Auction: "border-gold-300/60 text-gold-100 bg-gold-500/15",
  "For Sale": "border-gold-400/35 text-gold-200 bg-navy-900/70",
  "Under Offer": "border-sky-300/35 text-sky-100 bg-sky-500/10",
  Sold: "border-emerald-300/30 text-emerald-100 bg-emerald-500/10",
};

function Spec({ value, label }: { value: number | string; label: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="font-display text-lg leading-none text-ivory">{value}</span>
      <span className="text-[0.6rem] tracking-[0.18em] text-mist uppercase">{label}</span>
    </span>
  );
}

export function PropertyCard({
  property,
  image,
  priority = false,
}: {
  property: Property;
  /** Resolved on the server — see `lib/media.ts`. */
  image: ListingImage;
  priority?: boolean;
}) {
  const { src, isPhoto } = image;

  return (
    <Spotlight
      as="article"
      className="group hairline relative h-full overflow-hidden bg-navy-900/40 transition-colors duration-700 hover:border-gold-400/40"
    >
      <Link href={`/property/${property.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={
              isPhoto
                ? `${property.address}, ${property.suburb}`
                : `${property.address}, ${property.suburb} — photography to come`
            }
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
          />

          <span
            className={`absolute top-5 left-5 border px-3 py-1.5 text-[0.6rem] tracking-[0.22em] uppercase backdrop-blur-md ${statusStyle[property.status]}`}
          >
            {property.status}
          </span>

          {!isPhoto && (
            <span className="absolute right-5 bottom-5 text-[0.55rem] tracking-[0.2em] text-bone/35 uppercase">
              Photography to come
            </span>
          )}
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-7">
          <p className="eyebrow">
            {property.suburb} &middot; {property.postcode}
          </p>
          <h3 className="font-display mt-3 text-2xl leading-tight font-light text-ivory transition-colors duration-500 group-hover:text-gold-100">
            {property.address}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-mist">
            {property.headline}
          </p>

          {/* The hairline is 1px tall — the spacing has to live on a wrapper. */}
          <div className="mt-auto pt-6">
            <div className="rule-gold" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <Spec value={property.beds} label="Bed" />
            <Spec value={property.baths} label="Bath" />
            <Spec value={property.cars} label="Car" />
            <Spec value={`${property.land}`} label="sqm" />
          </div>

          <p className="mt-6 text-sm tracking-wide text-gold-200">{property.price}</p>

          {property.auctionDate && (
            <p className="mt-2 text-[0.7rem] tracking-[0.16em] text-mist uppercase">
              Auction &middot; {property.auctionDate}
            </p>
          )}
          {property.inspection && !property.auctionDate && (
            <p className="mt-2 text-[0.7rem] tracking-[0.16em] text-mist uppercase">
              Inspect &middot; {property.inspection}
            </p>
          )}
        </div>
      </Link>
    </Spotlight>
  );
}
