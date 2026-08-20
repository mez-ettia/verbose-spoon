/**
 * Single source of truth for brand, contact and navigation.
 * Everything user-visible that isn't page copy lives here so it can be
 * corrected in one place.
 */
export const site = {
  name: "Coco Ma",
  legalName: "Coco Ma Real Estate",
  tagline: "Exclusive Property",
  domain: "cmrealestate.com.au",
  url: "https://www.cmrealestate.com.au",
  description:
    "Melbourne's south-east, sold properly. Coco Ma Real Estate pairs a top-3 Victorian agent with a concierge-led process — appraisal to settlement, in English and Mandarin.",
  email: "cma@cmare.com.au",
  phone: "+61 3 8524 8888",
  phoneDisplay: "03 8524 8888",
  address: {
    street: "A11, 2a Westall Road",
    locality: "Clayton",
    region: "VIC",
    postcode: "3168",
    country: "AU",
  },
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/cocomarealestate/" },
    { label: "Instagram", href: "https://www.instagram.com/cocomarealestate/" },
    { label: "LinkedIn", href: "https://au.linkedin.com/in/coco-ma-340614179" },
    {
      label: "RateMyAgent",
      href: "https://www.ratemyagent.com.au/real-estate-agency/coco-ma-real-estate-bi242/sales/overview",
    },
  ],
} as const;

export const addressLine = `${site.address.street}, ${site.address.locality} ${site.address.region} ${site.address.postcode}`;

export const nav = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Emily", href: "/emily" },
  { label: "Suburbs", href: "/suburbs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Headline numbers. Sourced from public agency records — review each quarter. */
export const stats = [
  { value: 146, suffix: "", label: "Properties sold", sub: "last 12 months" },
  { value: 131, prefix: "$", suffix: "m", label: "Total sales value", sub: "last 12 months" },
  { value: 922, prefix: "$", suffix: "k", label: "Average sale price", sub: "across all suburbs" },
  { value: 800, suffix: "+", label: "Verified reviews", sub: "from past clients" },
] as const;

export const awards = [
  "Herald Sun — Top 3 Victorian Agents",
  "RateMyAgent — National Top 100 Agent",
  "Suburb Winner 2023 — Keysborough",
  "Suburb Winner 2023 — Springvale South",
  "800+ Verified Client Reviews",
  "Fluent in English & Mandarin",
] as const;
