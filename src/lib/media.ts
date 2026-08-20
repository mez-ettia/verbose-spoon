import { existsSync } from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const PHOTO_EXTS = [".jpg", ".jpeg", ".webp", ".avif", ".png"];

/**
 * Resolves the image for a listing or team member at build time.
 *
 * Drop a real photo at `public/listings/<slug>.jpg` (or .webp/.avif) and it is
 * used automatically; otherwise the generated brand artwork stands in. This is
 * what lets the site launch before the photography is delivered.
 */
export type ListingImage = { src: string; isPhoto: boolean };

export function listingImage(slug: string): ListingImage {
  for (const ext of PHOTO_EXTS) {
    const rel = `/listings/${slug}${ext}`;
    if (existsSync(path.join(PUBLIC_DIR, rel))) return { src: rel, isPhoto: true };
  }
  return { src: `/brand/listing-${slug}.svg`, isPhoto: false };
}

export function teamPhoto(slug: string): string | null {
  for (const ext of PHOTO_EXTS) {
    const rel = `/team/${slug}${ext}`;
    if (existsSync(path.join(PUBLIC_DIR, rel))) return rel;
  }
  return null;
}

/** Attaches resolved artwork so listings can be handed to client components. */
export function withMedia<T extends { slug: string }>(items: T[]) {
  return items.map((item) => ({ ...item, image: listingImage(item.slug) }));
}
