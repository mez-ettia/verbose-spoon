import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { addressLine, nav, site } from "@/lib/site";
import { suburbs } from "@/lib/suburbs";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden border-t border-gold-400/12 bg-navy-950">
      {/* A wash of gold from below, so the page ends warm rather than black. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 opacity-40"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(207,167,97,0.16), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-mist">
              An independent agency in Melbourne&rsquo;s south-east, built around one
              idea: the person you meet at the appraisal is the person who
              negotiates your sale.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[0.68rem] tracking-[0.24em] text-bone/55 uppercase transition-colors hover:text-gold-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <h2 className="eyebrow">Explore</h2>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-bone/70 transition-colors hover:text-gold-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="eyebrow">Suburbs</h2>
            <ul className="mt-6 space-y-3">
              {suburbs.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/suburbs#${s.slug}`}
                    className="text-sm text-bone/70 transition-colors hover:text-gold-200"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <address className="not-italic md:col-span-3">
            <h2 className="eyebrow">Office</h2>
            <p className="mt-6 text-sm leading-relaxed text-bone/70">{addressLine}</p>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="mt-5 block text-sm text-gold-200 transition-colors hover:text-gold-100"
            >
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block text-sm text-bone/70 transition-colors hover:text-gold-200"
            >
              {site.email}
            </a>
          </address>
        </div>

        <div className="rule-gold mt-16" />

        <div className="mt-8 flex flex-col gap-4 text-[0.68rem] tracking-[0.14em] text-slate-muted uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <p className="text-slate-muted/80">
            Licensed Estate Agent, Victoria &middot; Site by Coco Ma Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
