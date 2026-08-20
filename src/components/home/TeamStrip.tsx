import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { teamPhoto } from "@/lib/media";
import { team } from "@/lib/team";

export function TeamCard({
  member,
}: {
  member: (typeof team)[number];
}) {
  const photo = teamPhoto(member.slug);

  return (
    <Spotlight
      as="article"
      className="hairline group relative flex h-full flex-col overflow-hidden bg-navy-900/40 transition-colors duration-700 hover:border-gold-400/40"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-950">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={`${member.name}, ${member.role}`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          // Monogram stands in until headshots are delivered.
          <div className="relative flex size-full items-center justify-center">
            <div
              aria-hidden
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(60% 55% at 50% 35%, rgba(22,64,111,0.55), transparent 70%)",
              }}
            />
            <span className="font-display relative text-7xl font-light text-foil">
              {member.initials}
            </span>
            <span
              aria-hidden
              className="absolute inset-6 border border-gold-400/15 transition-all duration-700 group-hover:inset-4 group-hover:border-gold-400/30"
            />
          </div>
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-7">
        <h3 className="font-display text-2xl font-light text-ivory">{member.name}</h3>
        <p className="mt-2 text-[0.66rem] tracking-[0.2em] text-gold-300/85 uppercase">
          {member.role}
        </p>
        <div className="rule-gold my-5" />
        <p className="text-sm leading-relaxed text-mist">{member.bio}</p>
        <p className="mt-auto pt-5 text-[0.64rem] tracking-[0.18em] text-slate-muted uppercase">
          {member.languages.join(" · ")}
        </p>
      </div>
    </Spotlight>
  );
}

export function TeamStrip() {
  return (
    <section className="relative px-6 py-24 sm:px-10 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHead
          eyebrow="The people"
          title={
            <>
              Small team.
              <span className="block text-foil">Deliberately.</span>
            </>
          }
          lede="Six people who each own their part of the process. You will not be handed to someone you have never met."
        />

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {team.slice(0, 3).map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.1} className="h-full">
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <Link
            href="/about#team"
            className="mt-12 inline-flex items-center gap-3 text-[0.7rem] tracking-[0.24em] text-gold-200 uppercase transition-colors hover:text-gold-100"
          >
            Meet the whole team
            <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
