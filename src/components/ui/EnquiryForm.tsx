"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { Button } from "./Button";
import { site } from "@/lib/site";

/**
 * Enquiry submission.
 *
 * If `NEXT_PUBLIC_FORM_ENDPOINT` is set the form POSTs JSON there (Formspree,
 * a Worker, a CRM webhook — anything that accepts JSON). Without it, the site
 * stays fully static and falls back to opening a pre-filled email, so no
 * enquiry is ever silently dropped into a form that goes nowhere.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type State = "idle" | "sending" | "sent" | "error";

export function EnquiryForm({
  children,
  subject,
  submitLabel = "Send enquiry",
  successTitle = "Thank you.",
  successBody = "We read every enquiry ourselves. You'll hear back within one business day.",
}: {
  children: ReactNode;
  subject: string;
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
}) {
  const [state, setState] = useState<State>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — real people leave it empty.
    if (data.company) return;
    delete data.company;

    if (!ENDPOINT) {
      const body = Object.entries(data)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setState("sent");
      return;
    }

    setState("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, subject }),
      });
      setState(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="hairline bg-navy-900/50 px-8 py-16 text-center"
      >
        <span aria-hidden className="mx-auto block size-2 rotate-45 bg-gold-400" />
        <h3 className="font-display mt-8 text-3xl font-light text-ivory">{successTitle}</h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-mist">{successBody}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      {children}

      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute size-0 opacity-0"
      />

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <Button type="submit" magnetic={false}>
          {state === "sending" ? "Sending…" : submitLabel}
        </Button>
        <p className="text-[0.66rem] leading-relaxed tracking-[0.14em] text-slate-muted uppercase">
          No obligation &middot; We never share your details
        </p>
      </div>

      {state === "error" && (
        <p role="alert" className="text-sm text-rose-300">
          That didn&rsquo;t send. Please email{" "}
          <a href={`mailto:${site.email}`} className="text-gold-200 underline">
            {site.email}
          </a>{" "}
          or call {site.phoneDisplay}.
        </p>
      )}
    </form>
  );
}
