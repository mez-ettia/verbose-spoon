import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/Section";
import { PropertyCard } from "@/components/property/PropertyCard";
import { featured } from "@/lib/properties";
import { listingImage } from "@/lib/media";

export function Featured() {
  return (
    <section className="relative px-6 py-24 sm:px-10 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="Current Portfolio"
            title={
              <>
                On the market
                <span className="block text-foil">right now.</span>
              </>
            }
            lede="A deliberately short list. We take on the homes we can genuinely move, and we tell vendors honestly when we can't."
          />
          <Reveal delay={0.2}>
            <Button href="/buy" variant="outline">
              All listings
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.1} className="h-full">
              <PropertyCard property={p} image={listingImage(p.slug)} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
