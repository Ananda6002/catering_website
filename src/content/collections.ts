/**
 * Services, packages, event types, testimonials, gallery metadata.
 * All sample data — replace with the real business details when provided.
 */

/* ---------------- services ---------------- */

export type Service = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  points: string[];
  /** optional future image */
  image?: string;
};

export const services: Service[] = [
  {
    id: "weddings",
    index: "01",
    title: "Wedding Catering",
    blurb:
      "Multi-day feasts, live counters and seated dinners — choreographed service for the most important table you will ever set.",
    points: ["Live counters & chef stations", "Plated multi-course dinners", "Baraat & sangeet spreads"],
  },
  {
    id: "corporate",
    index: "02",
    title: "Corporate Events",
    blurb:
      "Boardroom lunches, town halls, off-sites and launch parties — precise timings, quiet professionalism, zero fuss.",
    points: ["Working lunches & coffee carts", "Town-hall buffets", "Executive hosting"],
  },
  {
    id: "birthdays",
    index: "03",
    title: "Birthday Events",
    blurb:
      "Cake tables that photograph beautifully, kid-approved counters and menus tuned to the guest of honour.",
    points: ["Dessert & cake tables", "Live chaat & waffle counters", "Themed kids' menus"],
  },
  {
    id: "family",
    index: "04",
    title: "Family Functions",
    blurb:
      "Engagements, naming days, anniversaries — homely food at celebratory scale, served the way elders expect and cousins remember.",
    points: ["Traditional menus", "Elders-first service", "Satvik & jain options"],
  },
  {
    id: "housewarming",
    index: "05",
    title: "Housewarming",
    blurb:
      "Intimate gathering, generous table. A full spread that lets you host instead of cook on your big day.",
    points: ["Compact live setups", "Full tray service", "Temple-style prasadam menus"],
  },
  {
    id: "outdoor",
    index: "06",
    title: "Outdoor Catering",
    blurb:
      "Farmhouses, lawns, terraces, backwaters. We bring the kitchen — water, power, staff and all — anywhere the party goes.",
    points: ["Mobile kitchens", "Weather-proof setups", "Off-grid power & water"],
  },
];

/* ---------------- packages ---------------- */

export type CateringPackage = {
  id: string;
  name: string;
  tagline: string;
  suitedFor: string;
  guests: string;
  price: string; // "Custom Quote" until real pricing exists
  currency?: string;
  features: string[];
  featured?: boolean;
};

export const packages: CateringPackage[] = [
  {
    id: "basic",
    name: "The Gathering",
    tagline: "Warm, simple, done beautifully",
    suitedFor: "Housewarmings, birthdays, family lunches",
    guests: "25 – 80 guests",
    price: "Custom Quote",
    features: [
      "2 starters, 3 mains, 1 dessert",
      "Steamed rice & assorted breads",
      "Buffet service with uniformed staff",
      "Table setup & disposal serviceware",
      "Complimentary tasting for 2",
    ],
  },
  {
    id: "classic",
    name: "The Celebration",
    tagline: "Our most-loved table",
    suitedFor: "Weddings, engagements, corporate galas",
    guests: "80 – 300 guests",
    price: "Custom Quote",
    featured: true,
    features: [
      "4 starters, 5 mains, 2 desserts",
      "One live counter of your choice",
      "Plated or buffet, your call",
      "Full tableware, linen & floral tablescape",
      "Menu tasting for up to 6",
      "Dedicated event captain",
    ],
  },
  {
    id: "premium",
    name: "The Grand Table",
    tagline: "For occasions that come once",
    suitedFor: "Weddings, milestone celebrations, galas",
    guests: "200 – 1,000+ guests",
    price: "Custom Quote",
    features: [
      "Chef-designed bespoke menu",
      "Multiple live & chef-attended stations",
      "Curated beverage & mocktail service",
      "Plated fine-dining service",
      "Dessert bar & cake coordination",
      "Full kitchen crew on site",
      "Two tastings & event design consult",
    ],
  },
];

/* ---------------- event types ---------------- */

export type EventType = {
  id: string;
  name: string;
  caption: string;
  detail: string;
};

export const eventTypes: EventType[] = [
  {
    id: "wedding",
    name: "Wedding",
    caption: "Multi-day feasts",
    detail: "Mehendi lunches, sangeet counters, wedding dinners and farewell brunches — one menu story across the whole celebration.",
  },
  {
    id: "birthday",
    name: "Birthday",
    caption: "Cake & counters",
    detail: "From first birthdays to sixtieths — dessert tables, live counters and menus built around the guest of honour.",
  },
  {
    id: "corporate",
    name: "Corporate",
    caption: "Boardroom to ballroom",
    detail: "Working lunches, conference catering, launch parties and annual-day galas with airtight timelines.",
  },
  {
    id: "family",
    name: "Family Gathering",
    caption: "Homely, at scale",
    detail: "Engagements, naming ceremonies, anniversaries — traditional menus that taste like home, served like a restaurant.",
  },
  {
    id: "housewarming",
    name: "Housewarming",
    caption: "First feast in a new home",
    detail: "Compact setups, prasadam-friendly menus and full tray service so you host, not cook.",
  },
  {
    id: "special",
    name: "Special Events",
    caption: "Anything worth a table",
    detail: "Baby showers, graduations, retirements, community feasts — if people are gathering, we will feed them well.",
  },
];

/* ---------------- testimonials ---------------- */

export type Testimonial = {
  quote: string;
  author: string;
  role: string; // e.g. "Wedding client, Indiranagar"
};

/** PLACEHOLDER TESTIMONIALS — replace with real client reviews when provided. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "They served three hundred guests a hot, seven-course dinner in a lawn with no kitchen — and made it look effortless. Our families still talk about the biryani.",
    author: "Sample Review — A. Family",
    role: "Wedding reception, Whitefield",
  },
  {
    quote:
      "Precise, quiet and genuinely courteous. The team arrived early, set up without a single disruption to our office floor, and the coffee cart was a hit.",
    author: "Sample Review — R. Menon",
    role: "Corporate town hall, Embassy Tech Village",
  },
  {
    quote:
      "The tasting alone told us we were in good hands. On the day, every dish arrived hotter and better than at the tasting — rare and lovely.",
    author: "Sample Review — S. & K. Rao",
    role: "Engagement lunch, Malleshwaram",
  },
];

/* ---------------- gallery ---------------- */

export type GalleryCategory = "food" | "weddings" | "buffets" | "corporate" | "decor" | "setups";

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "weddings", label: "Weddings" },
  { id: "buffets", label: "Buffets" },
  { id: "corporate", label: "Corporate" },
  { id: "decor", label: "Decor" },
  { id: "setups", label: "Setups" },
];

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  /** future real photo; span controls masonry weight */
  image?: string;
  span: 1 | 2;
  aspect: "tall" | "wide" | "square";
};

/** PLACEHOLDER ENTRIES — real photographs drop into `image` when provided. */
export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "The wedding table", category: "weddings", span: 2, aspect: "wide" },
  { id: "g2", title: "Passed canapés", category: "food", span: 1, aspect: "tall" },
  { id: "g3", title: "Buffet in the courtyard", category: "buffets", span: 1, aspect: "square" },
  { id: "g4", title: "Dessert bar", category: "decor", span: 1, aspect: "tall" },
  { id: "g5", title: "Chef's live station", category: "setups", span: 1, aspect: "square" },
  { id: "g6", title: "Conference lunch", category: "corporate", span: 2, aspect: "wide" },
  { id: "g7", title: "Sangeet spread", category: "weddings", span: 1, aspect: "tall" },
  { id: "g8", title: "Plated course one", category: "food", span: 1, aspect: "square" },
  { id: "g9", title: "Tea & kahwa cart", category: "setups", span: 1, aspect: "tall" },
];

/* ---------------- stats (about page + why-us) ---------------- */

export const stats = [
  { value: 500, suffix: "+", label: "Events served" },
  { value: 120, suffix: "k", label: "Guests fed" },
  { value: 40, suffix: "+", label: "Dishes on the book" },
  { value: 12, suffix: "", label: "Years in service" },
];
