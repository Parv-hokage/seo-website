export interface Origin {
  id: string;
  notes: string[];
  priceOffset: number; // p
  scores: [number, number, number]; // s: [Acidity, Body, Sweetness]
  description: string;
}

export interface Roast {
  id: string;
  descriptor: string; // x
  bg: string;
  ink: string;
}

export interface BagSize {
  id: string;
  basePrice: number; // p
  multiplier: number; // m
}

export interface CoffeeData {
  origins: Origin[];
  roasts: Roast[];
  grinds: string[];
  sizes: BagSize[];
}

export const COFFEE_DATA: CoffeeData = {
  origins: [
    {
      id: "Guji, Ethiopia",
      notes: ["jasmine", "bergamot", "stone fruit"],
      priceOffset: 0,
      scores: [92, 40, 70],
      description: "Washed heirloom varieties grown above 2,000 metres. Floral and bright, with a tea-like finish.",
    },
    {
      id: "Huila, Colombia",
      notes: ["red apple", "caramel", "cacao"],
      priceOffset: 0,
      scores: [60, 75, 80],
      description: "Sweet and balanced. Our everyday favourite, good in any brewer.",
    },
    {
      id: "Antigua, Guatemala",
      notes: ["dark cocoa", "toasted almond", "soft spice"],
      priceOffset: 2,
      scores: [40, 95, 90],
      description: "Volcanic soil gives a deep cocoa body and gentle spice.",
    },
  ],
  roasts: [
    {
      id: "Light",
      descriptor: "bright and delicate",
      bg: "#E9ECE4",
      ink: "#2B1A12",
    },
    {
      id: "Medium",
      descriptor: "sweet and balanced",
      bg: "#A5522B",
      ink: "#F4EFE6",
    },
    {
      id: "Dark",
      descriptor: "deep and smoky",
      bg: "#2B1A12",
      ink: "#E9ECE4",
    },
  ],
  grinds: ["Whole bean", "Espresso", "Filter", "French press"],
  sizes: [
    { id: "250 g", basePrice: 18, multiplier: 1 },
    { id: "500 g", basePrice: 33, multiplier: 2 },
    { id: "1 kg", basePrice: 60, multiplier: 4 },
  ],
};

export const TASTING_NOTES = [
  "jasmine",
  "red apple",
  "dark cocoa",
  "bergamot",
  "caramel",
  "toasted almond",
  "stone fruit",
  "cacao",
  "soft spice",
];

export const HERO_WORDS = ["morning", "espresso", "pour-over", "evening"];

export const TIMELINE_STEPS = [
  {
    title: "Green beans arrive",
    desc: "Each lot is cupped, then stored cool and dry until a customer picks it.",
  },
  {
    title: "You place an order",
    desc: "Your roast level sets the profile: temperature, time and airflow.",
  },
  {
    title: "Roasted in a small drum",
    desc: "One batch takes about twelve minutes. We watch colour, aroma and the first crack.",
  },
  {
    title: "Rested for two days",
    desc: "Gases settle and flavour opens up. Then we grind to your setting.",
  },
  {
    title: "Sealed and shipped",
    desc: "Your name goes on the label, the valve goes on the bag, and it leaves within 48 hours.",
  },
];

export const SUBSCRIPTION_FREQUENCIES = [
  {
    id: "f1",
    title: "Every week",
    discount: "Save 10%",
    desc: "For households that go through a bag fast.",
  },
  {
    id: "f2",
    title: "Every two weeks",
    discount: "Save 10%",
    desc: "The most popular rhythm for one or two drinkers.",
  },
  {
    id: "f3",
    title: "Every month",
    discount: "Save 5%",
    desc: "A steady supply of a coffee you love.",
  },
];
