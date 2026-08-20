export type Status = "For Sale" | "Auction" | "Under Offer" | "Sold";

export type Property = {
  slug: string;
  address: string;
  suburb: string;
  postcode: string;
  price: string;
  priceValue: number;
  status: Status;
  beds: number;
  baths: number;
  cars: number;
  land: number;
  type: "House" | "Townhouse" | "Apartment" | "Land";
  headline: string;
  summary: string;
  features: string[];
  inspection?: string;
  auctionDate?: string;
  soldFor?: string;
  agent: string;
};

/**
 * Demonstration listing set.
 *
 * Replace with a feed from the agency CRM (Console/VaultRE/AgentBox). Keep the
 * `slug` values in sync with `scripts/gen-art.mjs` so each listing keeps its
 * artwork, or drop a photo at `/public/listings/<slug>.jpg` and it takes over.
 */
export const properties: Property[] = [
  {
    slug: "westall-road-clayton",
    address: "42 Westall Road",
    suburb: "Clayton",
    postcode: "3168",
    price: "$1,450,000 – $1,550,000",
    priceValue: 1500000,
    status: "Auction",
    beds: 5,
    baths: 3,
    cars: 2,
    land: 682,
    type: "House",
    headline: "A considered family home, minutes from Monash",
    summary:
      "Double-glazed, north-facing and finished with a restraint you rarely see at this price. The rear living room opens to a landscaped garden that holds afternoon light until seven in summer.",
    features: [
      "North-facing rear garden",
      "Butler's pantry & 900mm gas cooktop",
      "Hydronic heating throughout",
      "Walk to Clayton Station & Monash",
      "Ducted refrigerated cooling",
      "Remote double garage with internal access",
    ],
    inspection: "Saturday 11:00 – 11:30am",
    auctionDate: "Saturday 13 September, 12:00pm",
    agent: "coco-ma",
  },
  {
    slug: "elm-grove-springvale",
    address: "8 Elm Grove",
    suburb: "Springvale",
    postcode: "3171",
    price: "$880,000 – $940,000",
    priceValue: 910000,
    status: "For Sale",
    beds: 4,
    baths: 2,
    cars: 2,
    land: 557,
    type: "House",
    headline: "The renovation the street has been waiting for",
    summary:
      "A solid brick original on 557sqm with permits already in hand. Buyers here are paying for certainty, and this one removes almost all of it.",
    features: [
      "Permits approved for two dwellings",
      "557sqm with 15.2m frontage",
      "Original brick, structurally sound",
      "600m to Springvale Road shops",
      "Zoned GRZ1",
    ],
    inspection: "Saturday 12:00 – 12:30pm",
    agent: "mitchell-nguyen",
  },
  {
    slug: "corrigan-road-noble-park",
    address: "115 Corrigan Road",
    suburb: "Noble Park",
    postcode: "3174",
    price: "$740,000 – $790,000",
    priceValue: 765000,
    status: "For Sale",
    beds: 3,
    baths: 1,
    cars: 1,
    land: 496,
    type: "House",
    headline: "First home, done sensibly",
    summary:
      "Move-in ready without the renovation premium. Fresh throughout, low-maintenance yard, and priced to actually transact rather than to advertise.",
    features: [
      "Recently repainted throughout",
      "New kitchen appliances",
      "Split-system heating & cooling",
      "Walk to Noble Park Station",
      "Low-maintenance 496sqm",
    ],
    inspection: "Saturday 10:00 – 10:30am",
    agent: "phillip-khuon",
  },
  {
    slug: "hutton-avenue-keysborough",
    address: "26 Hutton Avenue",
    suburb: "Keysborough",
    postcode: "3173",
    price: "$1,180,000 – $1,260,000",
    priceValue: 1220000,
    status: "Under Offer",
    beds: 4,
    baths: 2,
    cars: 2,
    land: 604,
    type: "House",
    headline: "Somerfield living, without the wait",
    summary:
      "Six years young in the estate that set the benchmark for the suburb. Every upgrade you would have specified has already been made.",
    features: [
      "Stone benchtops throughout",
      "Alfresco with built-in kitchen",
      "Solar 6.6kW",
      "Zoned to Keysborough Primary",
      "Landscaped front and rear",
    ],
    agent: "selina-shi",
  },
  {
    slug: "wellington-road-mulgrave",
    address: "310 Wellington Road",
    suburb: "Mulgrave",
    postcode: "3170",
    price: "$1,020,000 – $1,090,000",
    priceValue: 1055000,
    status: "For Sale",
    beds: 4,
    baths: 2,
    cars: 2,
    land: 651,
    type: "House",
    headline: "The quiet end, which is the whole point",
    summary:
      "Set back from the road behind established planting. Families buy the street here as much as the house — and this is the part of it people wait for.",
    features: [
      "Set well back from the road",
      "Established garden, mature trees",
      "Separate study",
      "Zoned to Wellington Secondary",
      "651sqm north-east aspect",
    ],
    inspection: "Saturday 1:00 – 1:30pm",
    agent: "coco-ma",
  },
  {
    slug: "athol-road-springvale-south",
    address: "77 Athol Road",
    suburb: "Springvale South",
    postcode: "3172",
    price: "$895,000 – $960,000",
    priceValue: 927000,
    status: "For Sale",
    beds: 4,
    baths: 2,
    cars: 2,
    land: 613,
    type: "House",
    headline: "Land you can't make any more of",
    summary:
      "613sqm with a wide frontage in a pocket that rarely turns over. Whether you live in it, rent it, or eventually build on it, the land does the work.",
    features: [
      "16.8m frontage",
      "Two living zones",
      "Established fruit trees",
      "Close to Springvale Rise Primary",
      "Long-term tenant in place if desired",
    ],
    inspection: "Saturday 2:00 – 2:30pm",
    agent: "mitchell-nguyen",
  },
  {
    slug: "clarinda-court-clarinda",
    address: "5 Clarinda Court",
    suburb: "Clarinda",
    postcode: "3169",
    price: "Sold for $1,340,000",
    priceValue: 1340000,
    status: "Sold",
    beds: 4,
    baths: 2,
    cars: 2,
    land: 720,
    type: "House",
    headline: "Nine days on market, $95,000 above reserve",
    summary:
      "Styled, photographed and launched inside two weeks. Twenty-eight groups through the first open, four registered bidders, and a result the street is still talking about.",
    features: [
      "Sold in 9 days",
      "$95,000 above reserve",
      "4 registered bidders",
      "28 groups at first inspection",
    ],
    soldFor: "$1,340,000",
    agent: "coco-ma",
  },
  {
    slug: "police-road-mulgrave",
    address: "204 Police Road",
    suburb: "Mulgrave",
    postcode: "3170",
    price: "Sold for $1,105,000",
    priceValue: 1105000,
    status: "Sold",
    beds: 3,
    baths: 2,
    cars: 2,
    land: 588,
    type: "Townhouse",
    headline: "Off-market, at the number the owner wanted",
    summary:
      "The owner didn't want a campaign. We took it to eleven buyers already on our register and had it under contract in six days, with no advertising spend at all.",
    features: [
      "Sold off-market in 6 days",
      "Zero advertising spend",
      "11 qualified buyers approached",
    ],
    soldFor: "$1,105,000",
    agent: "selina-shi",
  },
];

export const featured = properties.filter((p) => p.status !== "Sold").slice(0, 6);
export const recentlySold = properties.filter((p) => p.status === "Sold");

export function propertyBySlug(slug: string) {
  return properties.find((p) => p.slug === slug);
}
