import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { EmilyChat } from "@/components/emily/EmilyChat";

const points = [
  {
    n: "01",
    title: "She listens before she sends",
    body: "Five questions, ninety seconds. Emily builds a brief precise enough that what lands in your inbox is worth opening.",
  },
  {
    n: "02",
    title: "She sees the off-market list",
    body: "Roughly a third of what we sell never reaches a portal. Emily draws from the same register our agents do.",
  },
  {
    n: "03",
    title: "She hands you to a human",
    body: "The moment there's something real to discuss, you're talking to the agent who knows the street — not a call centre.",
  },
];

export function EmilySection() {
  return (
    <section id="emily" className="relative overflow-hidden border-y border-gold-400/12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(70% 60% at 80% 20%, rgba(22,64,111,0.35), transparent 65%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <div className="flex items-center gap-4">
              <span aria-hidden className="size-1.5 rotate-45 bg-gold-400" />
              <span className="eyebrow">Introducing Emily</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="font-display mt-6 text-4xl leading-[1.05] font-light text-ivory sm:text-5xl md:text-6xl">
              Your new
              <span className="block text-foil">buyer concierge.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-mist md:text-lg">
              Most agencies make buyers chase them. Emily works the other way
              around: tell her what you&rsquo;re actually after, and she brings the
              short list to you &mdash; including the homes that never make it to a
              portal.
            </p>
          </Reveal>

          <ul className="mt-12 space-y-8">
            {points.map((p, i) => (
              <Reveal as="li" key={p.n} delay={0.24 + i * 0.09} className="flex gap-6">
                <span className="font-display shrink-0 text-2xl font-light text-gold-500/70">
                  {p.n}
                </span>
                <span>
                  <span className="block text-base text-ivory">{p.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-mist">{p.body}</span>
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.55}>
            <div className="mt-12">
              <Button href="/emily" variant="outline">
                More about Emily
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} blur={false}>
          <EmilyChat />
        </Reveal>
      </div>
    </section>
  );
}
