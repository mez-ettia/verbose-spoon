import type { MetadataRoute } from "next";
import { properties } from "@/lib/properties";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = ["", "/buy", "/sell", "/emily", "/suburbs", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const listings = properties.map((p) => ({
    url: `${site.url}/property/${p.slug}/`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...pages, ...listings];
}
