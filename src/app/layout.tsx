import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Jost } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { addressLine, site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} | Real Estate, Melbourne South-East`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "real estate Clayton",
    "Keysborough real estate agent",
    "Springvale property",
    "Noble Park houses for sale",
    "Mulgrave real estate",
    "Melbourne south east agent",
    "Coco Ma Real Estate",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/brand/crown.svg", apple: "/brand/crown.svg" },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: `${site.name} — ${site.tagline}`,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04091a",
  colorScheme: "dark",
};

/** Schema.org — helps the agency surface in local and AI search results. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.legalName,
  alternateName: `${site.name} — ${site.tagline}`,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  image: `${site.url}/brand/crown.svg`,
  description: site.description,
  priceRange: "$$$",
  knowsLanguage: ["en-AU", "zh-CN", "vi-VN"],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postcode,
    addressCountry: site.address.country,
  },
  areaServed: [
    "Keysborough",
    "Springvale",
    "Springvale South",
    "Noble Park",
    "Clayton",
    "Mulgrave",
  ].map((name) => ({ "@type": "Place", name })),
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-AU"
      className={`${cormorant.variable} ${jost.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Structured data is static and author-controlled.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-gold-400 focus:px-5 focus:py-3 focus:text-xs focus:tracking-widest focus:text-ink focus:uppercase"
        >
          Skip to content
        </a>
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <span className="sr-only">{addressLine}</span>
      </body>
    </html>
  );
}
