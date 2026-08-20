export type Suburb = {
  name: string;
  slug: string;
  postcode: string;
  blurb: string;
  median: string;
  growth: string;
  daysOnMarket: number;
};

/**
 * Core service area. Median and growth figures are indicative and should be
 * refreshed from the agency's quarterly market data.
 */
export const suburbs: Suburb[] = [
  {
    name: "Keysborough",
    slug: "keysborough",
    postcode: "3173",
    blurb:
      "Family estates, newer builds and deep buyer competition. Our strongest auction market and a 2023 suburb win.",
    median: "$1.02m",
    growth: "+4.1%",
    daysOnMarket: 24,
  },
  {
    name: "Springvale",
    slug: "springvale",
    postcode: "3171",
    blurb:
      "A dense, fast-moving market where Mandarin-speaking buyers and developers meet. Pricing strategy matters more here than anywhere.",
    median: "$886k",
    growth: "+3.4%",
    daysOnMarket: 28,
  },
  {
    name: "Springvale South",
    slug: "springvale-south",
    postcode: "3172",
    blurb:
      "Established homes on generous land. Renovation upside is the story buyers pay for — if it's presented properly.",
    median: "$905k",
    growth: "+3.9%",
    daysOnMarket: 26,
  },
  {
    name: "Noble Park",
    slug: "noble-park",
    postcode: "3174",
    blurb:
      "Entry-level buyers and investors compete hard. Campaign timing moves the result by tens of thousands.",
    median: "$762k",
    growth: "+2.8%",
    daysOnMarket: 31,
  },
  {
    name: "Clayton",
    slug: "clayton",
    postcode: "3168",
    blurb:
      "Monash, the Medical Centre and rail. An investor and downsizer market with the deepest offshore interest in the region.",
    median: "$1.16m",
    growth: "+5.2%",
    daysOnMarket: 22,
  },
  {
    name: "Mulgrave",
    slug: "mulgrave",
    postcode: "3170",
    blurb:
      "Quiet pockets, strong schools, upgrader demand. Families buy the street here as much as the house.",
    median: "$1.04m",
    growth: "+3.6%",
    daysOnMarket: 27,
  },
];
