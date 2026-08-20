/**
 * Generates the site's brand artwork as SVG.
 *
 * Everything here is procedural and on-brand: deep navy grounds with drifting
 * silk bands and a single gold thread, echoing the Coco Ma brand card. Each
 * asset is seeded, so the same slug always renders the same artwork — property
 * cards stay stable between builds.
 *
 * Run: node scripts/gen-art.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = new URL("../public/brand/", import.meta.url);
mkdirSync(OUT, { recursive: true });

/** Small deterministic PRNG (mulberry32) so artwork never shifts between builds. */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** One smooth horizontal silk band across the canvas. */
function band(r, w, h, yBase, amp) {
  const steps = 5;
  const dx = w / steps;
  let d = `M ${-w * 0.1} ${yBase}`;
  let y = yBase;
  for (let i = 0; i < steps; i++) {
    const x0 = -w * 0.1 + i * dx * 1.2;
    const x1 = x0 + dx * 1.2;
    const ny = yBase + (r() - 0.5) * amp * 2;
    d += ` C ${x0 + dx * 0.5} ${y}, ${x1 - dx * 0.5} ${ny}, ${x1} ${ny}`;
    y = ny;
  }
  d += ` L ${w * 1.2} ${h * 1.4} L ${-w * 0.1} ${h * 1.4} Z`;
  return d;
}


/**
 * A fine architectural elevation, drawn over the silk ground.
 *
 * Four archetypes matching the listing types we sell. It is deliberately a
 * line drawing rather than a fake photograph — it signals "artwork standing in
 * for photography" honestly, while still reading as a home.
 */
function elevation(kind, r, w, h, id) {
  const stroke = `stroke="url(#line${id})" fill="none" stroke-linejoin="round" stroke-linecap="round"`;
  const cx = w * 0.5;
  const baseY = h * 0.845;
  const glow = [];
  const lines = [];

  // Lit windows — the single warm note in an otherwise cool drawing.
  const win = (x, y, ww, hh) => {
    glow.push(
      `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${ww.toFixed(1)}" height="${hh.toFixed(1)}" fill="url(#warm${id})" opacity="${(0.45 + r() * 0.45).toFixed(2)}"/>`,
    );
    lines.push(
      `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${ww.toFixed(1)}" height="${hh.toFixed(1)}" ${stroke} stroke-width="1.1"/>`,
    );
  };

  if (kind === 0) {
    // Gabled family home
    const bw = w * 0.54;
    const bh = h * 0.34;
    const x0 = cx - bw / 2;
    const y0 = baseY - bh;
    const peak = y0 - h * 0.15;
    lines.push(`<path d="M ${x0} ${y0} L ${x0} ${baseY} L ${x0 + bw} ${baseY} L ${x0 + bw} ${y0}" ${stroke} stroke-width="1.6"/>`);
    lines.push(`<path d="M ${x0 - bw * 0.07} ${y0} L ${cx} ${peak} L ${x0 + bw * 1.07} ${y0}" ${stroke} stroke-width="1.6"/>`);
    lines.push(`<path d="M ${cx + bw * 0.2} ${peak + h * 0.045} L ${cx + bw * 0.2} ${peak - h * 0.02} L ${cx + bw * 0.3} ${peak - h * 0.02} L ${cx + bw * 0.3} ${peak + h * 0.085}" ${stroke} stroke-width="1.2"/>`);
    for (let i = 0; i < 3; i++) win(x0 + bw * (0.1 + i * 0.3), y0 + bh * 0.18, bw * 0.2, bh * 0.3);
    win(cx - bw * 0.08, baseY - bh * 0.42, bw * 0.16, bh * 0.42);
  } else if (kind === 1) {
    // Flat-roof contemporary, two staggered volumes
    const aw = w * 0.32;
    const ah = h * 0.38;
    const bw2 = w * 0.26;
    const bh2 = h * 0.25;
    const ax = cx - w * 0.29;
    lines.push(`<rect x="${ax}" y="${baseY - ah}" width="${aw}" height="${ah}" ${stroke} stroke-width="1.6"/>`);
    lines.push(`<rect x="${ax + aw}" y="${baseY - bh2}" width="${bw2}" height="${bh2}" ${stroke} stroke-width="1.6"/>`);
    lines.push(`<path d="M ${ax - w * 0.03} ${baseY - ah} L ${ax + aw + bw2 + w * 0.03} ${baseY - ah}" ${stroke} stroke-width="1"/>`);
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++) win(ax + aw * (0.12 + i * 0.46), baseY - ah + ah * (0.14 + j * 0.42), aw * 0.34, ah * 0.28);
    win(ax + aw + bw2 * 0.2, baseY - bh2 * 0.7, bw2 * 0.6, bh2 * 0.42);
  } else if (kind === 2) {
    // Townhouse row
    const n = 3;
    const uw = w * 0.19;
    const uh = h * 0.36;
    const x0 = cx - (uw * n) / 2;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * uw;
      const top = baseY - uh + (i === 1 ? -h * 0.03 : 0);
      lines.push(`<path d="M ${x} ${baseY} L ${x} ${top} L ${x + uw} ${top} L ${x + uw} ${baseY}" ${stroke} stroke-width="1.5"/>`);
      win(x + uw * 0.22, top + uh * 0.18, uw * 0.56, uh * 0.24);
      win(x + uw * 0.34, baseY - uh * 0.34, uw * 0.32, uh * 0.34);
    }
  } else {
    // Apartment grid
    const bw = w * 0.34;
    const bh = h * 0.42;
    const x0 = cx - bw / 2;
    const y0 = baseY - bh;
    lines.push(`<rect x="${x0}" y="${y0}" width="${bw}" height="${bh}" ${stroke} stroke-width="1.6"/>`);
    for (let row = 0; row < 4; row++)
      for (let col = 0; col < 3; col++)
        if (r() > 0.28) win(x0 + bw * (0.12 + col * 0.29), y0 + bh * (0.1 + row * 0.21), bw * 0.19, bh * 0.13);
  }

  // Ground line — long, thin, and fading at both ends.
  lines.push(`<path d="M ${w * 0.06} ${baseY} L ${w * 0.94} ${baseY}" stroke="url(#gold${id})" stroke-width="1" fill="none" opacity="0.55"/>`);

  return `<g filter="url(#warmblur${id})">${glow.join("")}</g><g opacity="0.78">${lines.join("")}</g>`;
}

function silk({ seed, w = 1200, h = 800, tone = 0, gold = 0.5, arch = null, weight = 1 }) {
  const r = rng(seed);
  const id = seed.toString(36);
  // Tone shifts the ground very slightly toward teal or violet so a grid of
  // cards reads as a set rather than as clones.
  const grounds = [
    ["#04091a", "#0a1730"],
    ["#050d1e", "#0b1c34"],
    ["#040a1c", "#0d1b3a"],
    ["#050b17", "#09182f"],
  ];
  const [g0, g1] = grounds[tone % grounds.length];

  const bands = Array.from({ length: 5 }, (_, i) => {
    const yBase = h * (0.22 + i * 0.16) + (r() - 0.5) * h * 0.08;
    const amp = h * (0.05 + r() * 0.09);
    const op = (0.10 + i * 0.045) * weight;
    const light = ["#12305c", "#16406f", "#1b3a63", "#0f2a51", "#1d4a7d"][i];
    return `<path d="${band(r, w, h, yBase, amp)}" fill="${light}" opacity="${op.toFixed(3)}"/>`;
  }).join("");

  // A single gold thread — restraint is the point.
  const threadY = h * (0.34 + r() * 0.34);
  const thread = `<path d="${band(rng(seed + 7), w, h, threadY, h * 0.06).split(" L ")[0]}"
      fill="none" stroke="url(#gold${id})" stroke-width="${(1.1 + r()).toFixed(2)}"
      opacity="${gold.toFixed(2)}"/>`;

  const glowX = (20 + r() * 60).toFixed(1);
  const glowY = (12 + r() * 40).toFixed(1);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg${id}" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="${g1}"/>
      <stop offset="100%" stop-color="${g0}"/>
    </linearGradient>
    <linearGradient id="gold${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8d6a2c" stop-opacity="0"/>
      <stop offset="35%" stop-color="#e6cd97"/>
      <stop offset="62%" stop-color="#f6e7c1"/>
      <stop offset="100%" stop-color="#8d6a2c" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="glow${id}" cx="${glowX}%" cy="${glowY}%" r="62%">
      <stop offset="0%" stop-color="#2a5892" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#2a5892" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f6e9c8" stop-opacity="1"/>
      <stop offset="100%" stop-color="#9fb8d8" stop-opacity="0.5"/>
    </linearGradient>
    <radialGradient id="warm${id}" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#ffd89b"/>
      <stop offset="100%" stop-color="#c9903f" stop-opacity="0.2"/>
    </radialGradient>
    <filter id="warmblur${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="${(h * 0.0022).toFixed(2)}"/>
    </filter>
    <filter id="soft${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${(h * 0.028).toFixed(1)}"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg${id})"/>
  <g filter="url(#soft${id})">${bands}</g>
  <rect width="${w}" height="${h}" fill="url(#glow${id})"/>
  <g filter="url(#soft${id})" opacity="0.9">${thread}</g>
  ${arch === null ? "" : elevation(arch, r, w, h, id)}
</svg>`;
}

/** Book-matched marble, as on a feature wall. */
function marble() {
  const r = rng(90210);
  const veins = Array.from({ length: 26 }, () => {
    const y = r() * 900;
    const drift = 60 + r() * 220;
    const w = (0.5 + r() * 2.2).toFixed(2);
    const op = (0.06 + r() * 0.2).toFixed(3);
    return `<path d="M -40 ${y.toFixed(0)} C 240 ${(y - drift).toFixed(0)}, 480 ${(y + drift).toFixed(0)}, 800 ${(y - drift * 0.4).toFixed(0)}"
      stroke="#c9d6e6" stroke-width="${w}" fill="none" opacity="${op}"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 900" width="760" height="900" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="m" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="#0d1b33"/>
      <stop offset="55%" stop-color="#122542"/>
      <stop offset="100%" stop-color="#070f22"/>
    </linearGradient>
    <filter id="mb"><feGaussianBlur stdDeviation="1.4"/></filter>
  </defs>
  <rect width="760" height="900" fill="url(#m)"/>
  <g filter="url(#mb)">${veins}</g>
  <g filter="url(#mb)" transform="translate(760,0) scale(-1,1)" opacity="0.7">${veins}</g>
</svg>`;
}

const assets = {
  "hero-silk.svg": silk({ seed: hash("hero"), w: 1920, h: 1200, tone: 2, gold: 0.8, weight: 2.1 }),
  "marble.svg": marble(),
};

// Per-listing artwork, keyed by slug.
// Elevation archetype per listing — varied so a grid never repeats a silhouette
// side by side, and roughly matched to each home's built form.
const archKinds = [0, 1, 0, 1, 0, 2, 0, 2];

const slugs = [
  "westall-road-clayton",
  "elm-grove-springvale",
  "corrigan-road-noble-park",
  "hutton-avenue-keysborough",
  "wellington-road-mulgrave",
  "athol-road-springvale-south",
  "clarinda-court-clarinda",
  "police-road-mulgrave",
];
slugs.forEach((slug, i) => {
  assets[`listing-${slug}.svg`] = silk({
    seed: hash(slug),
    w: 1200,
    h: 900,
    tone: i,
    gold: 0.35 + (i % 3) * 0.12,
    arch: archKinds[i % archKinds.length],
  });
});

for (const [name, svg] of Object.entries(assets)) {
  writeFileSync(new URL(name, OUT), svg.replace(/\n\s+/g, "\n"));
}
console.log(`Generated ${Object.keys(assets).length} brand assets.`);
