"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { nav, site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the drawer while it's open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "glass border-b border-gold-400/12 py-3"
            : "border-b border-transparent py-6"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 sm:px-10">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative text-[0.7rem] font-medium tracking-[0.22em] text-bone/75 uppercase transition-colors duration-300 hover:text-gold-200"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-2 left-0 h-px bg-gold-400 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="hidden text-[0.7rem] tracking-[0.18em] text-gold-200/85 uppercase transition-colors hover:text-gold-100 xl:block"
            >
              {site.phoneDisplay}
            </a>
            <span className="hidden sm:block">
              <Button href="/sell#appraisal" className="px-6 py-3">
                Free appraisal
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-50 flex size-11 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span
                className={`block h-px w-6 bg-gold-200 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-gold-200 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/97 px-8 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display block border-b border-gold-400/10 py-5 text-4xl font-light text-ivory transition-colors hover:text-gold-200"
                  >
                    <span className="mr-4 align-middle text-xs tracking-widest text-gold-500/60">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col gap-4"
            >
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="text-sm tracking-[0.2em] text-gold-200 uppercase"
              >
                {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="text-sm text-mist">
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
