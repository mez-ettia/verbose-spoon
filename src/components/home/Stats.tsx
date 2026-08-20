import { Counter } from "@/components/ui/Counter";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { awards, stats } from "@/lib/site";

export function Stats() {
  return (
    <section className="relative border-y border-gold-400/12 bg-navy-950/70">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px px-6 sm:px-10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.09}
            className="relative px-2 py-12 text-center lg:px-6 lg:py-16"
          >
            <p className="font-display text-5xl leading-none font-light text-foil md:text-6xl">
              <Counter value={s.value} prefix={"prefix" in s ? s.prefix : ""} suffix={s.suffix} />
            </p>
            <p className="mt-4 text-[0.68rem] tracking-[0.24em] text-bone/80 uppercase">
              {s.label}
            </p>
            <p className="mt-1.5 text-[0.68rem] text-slate-muted">{s.sub}</p>
          </Reveal>
        ))}
      </div>

      <div className="border-t border-gold-400/10 py-5">
        <Marquee items={awards} />
      </div>
    </section>
  );
}
