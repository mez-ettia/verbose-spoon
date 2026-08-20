export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  result?: string;
};

/**
 * Representative of the agency's 800+ verified reviews. Swap in real RateMyAgent
 * quotes with the reviewer's consent before launch.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We had two other agents quote us a lower reserve and a longer campaign. Coco told us exactly what she thought the house was worth, then got more than that on the day.",
    name: "The Nguyen family",
    detail: "Sold in Keysborough",
    result: "$95,000 above reserve",
  },
  {
    quote:
      "My parents speak very little English. Coco walked them through the contract in Mandarin, twice, without ever making them feel rushed. That is the whole reason we signed.",
    name: "Wei L.",
    detail: "Sold in Springvale South",
  },
  {
    quote:
      "The styling recommendation added about eleven thousand dollars of cost and, by the agent's own numbers, somewhere near seventy thousand of result. I would do it again immediately.",
    name: "David & Anna P.",
    detail: "Sold in Clayton",
    result: "9 days on market",
  },
  {
    quote:
      "We didn't want a public campaign. They found the buyer from their own register in under a week and we never put a board up.",
    name: "M. Tran",
    detail: "Sold off-market in Mulgrave",
    result: "6 days, no advertising spend",
  },
  {
    quote:
      "Every Sunday evening we got a call with the actual numbers — groups through, who was serious, who wasn't. No spin. It made a stressful eight weeks genuinely manageable.",
    name: "Sarah K.",
    detail: "Sold in Noble Park",
  },
  {
    quote:
      "As a first home buyer I expected to be ignored. Instead I got a call before the property was even listed because it matched what I'd told them months earlier.",
    name: "James O.",
    detail: "Purchased in Springvale",
  },
];
