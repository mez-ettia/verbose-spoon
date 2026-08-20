export type Member = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  languages: string[];
  bio: string;
  focus: string;
};

/**
 * Team roster. Drop a headshot at `/public/team/<slug>.jpg` and the monogram
 * card picks it up automatically.
 */
export const team: Member[] = [
  {
    slug: "coco-ma",
    name: "Coco Ma",
    role: "Director & Licensed Estate Agent",
    initials: "CM",
    languages: ["English", "Mandarin"],
    focus: "Keysborough · Springvale · Clayton",
    bio: "Named by the Herald Sun among Victoria's top three agents before launching her own agency. Coco negotiates every campaign she lists personally — she has never handed a vendor to a junior, and she doesn't intend to start.",
  },
  {
    slug: "mitchell-nguyen",
    name: "Mitchell Nguyen",
    role: "Senior Sales Consultant",
    initials: "MN",
    languages: ["English", "Vietnamese"],
    focus: "Springvale · Springvale South · Noble Park",
    bio: "Mitchell runs the campaigns where the pricing is genuinely hard — development sites, permit-approved land, and homes with an unusual story to tell. He is the person vendors call at nine on a Sunday night.",
  },
  {
    slug: "selina-shi",
    name: "Selina Shi",
    role: "Sales Consultant",
    initials: "SS",
    languages: ["English", "Mandarin"],
    focus: "Clayton · Mulgrave · Clarinda",
    bio: "Selina manages the buyer register that makes our off-market results possible. If a home in her patch sells before it advertises, she is usually the reason.",
  },
  {
    slug: "nick-zhang",
    name: "Nick Zhang",
    role: "Business Development Manager",
    initials: "NZ",
    languages: ["English", "Mandarin"],
    focus: "Investment & property management",
    bio: "Nick looks after investors — yield, tenant quality, and the unglamorous arithmetic that decides whether a purchase was actually a good one three years later.",
  },
  {
    slug: "trinh-tang",
    name: "Trinh Tang",
    role: "Sales & Client Care",
    initials: "TT",
    languages: ["English", "Vietnamese"],
    focus: "Client care & settlements",
    bio: "Trinh handles the part of the process most agencies quietly drop: the eight weeks between the contract and the keys. Nothing slips.",
  },
  {
    slug: "peter-cooper",
    name: "Peter Cooper",
    role: "Auctioneer",
    initials: "PC",
    languages: ["English"],
    focus: "Auction & negotiation",
    bio: "Peter calls our auctions. Calm on the rostrum, ruthless about the last increment — which is where a vendor's money actually is.",
  },
];
