/**
 * Menu content — clearly-marked sample data.
 * Real dishes/prices replace these entries later; components are generic.
 */

export type Diet = "veg" | "non-veg" | "vegan";

export type MenuItem = {
  name: string;
  description: string;
  category: CategoryId;
  diet: Diet;
  /** undefined → shown as "On request" (no invented prices) */
  price?: number;
  signature?: boolean;
};

export type CategoryId =
  | "breakfast"
  | "starters"
  | "main-course"
  | "rice"
  | "breads"
  | "desserts"
  | "beverages";

export const menuCategories: { id: CategoryId; label: string; note: string }[] = [
  { id: "breakfast", label: "Breakfast", note: "Early gatherings, brunch meetings" },
  { id: "starters", label: "Starters", note: "Passed canapés & plated openers" },
  { id: "main-course", label: "Main Course", note: "The heart of the table" },
  { id: "rice", label: "Rice", note: "Pulaos, biryanis & pilaffs" },
  { id: "breads", label: "Breads", note: "From the tandoor & griddle" },
  { id: "desserts", label: "Desserts", note: "Sweet finishes" },
  { id: "beverages", label: "Beverages", note: "Coolers, teas & coffees" },
];

export const menuItems: MenuItem[] = [
  // Breakfast
  { name: "Masala Dosa Station", description: "Crisp dosas off the griddle, coconut & tomato chutneys, molaga podi.", category: "breakfast", diet: "veg", signature: true },
  { name: "Brioche French Toast", description: "Brioche soaked overnight, vanilla custard heart, maple & toasted hazelnut.", category: "breakfast", diet: "veg" },
  { name: "Poha & Fruit Bowl", description: "Kanda poha with pomegranate, banana chips and a squeeze of lime.", category: "breakfast", diet: "vegan" },
  { name: "Egg & Keema Paratha", description: "Layered paratha folded around spiced keema and a soft-set egg.", category: "breakfast", diet: "non-veg" },

  // Starters
  { name: "Dahi Ke Kebab", description: "Hung-curd kebabs, roasted chilli, mint oil, crisp spinach leaf.", category: "starters", diet: "veg", signature: true },
  { name: "Gunpowder Idli Bites", description: "Baby idlis tossed in molaga podi, ghee, curry-leaf tempering.", category: "starters", diet: "veg" },
  { name: "Amritsari Fish Amuse", description: "Ajwain-battered bhetki, chaat masala dust, caraway raita.", category: "starters", diet: "non-veg" },
  { name: "Grilled Corn & Cheese Skewers", description: "Charred sweetcorn, aged cheddar, smoked paprika butter.", category: "starters", diet: "veg" },

  // Main course
  { name: "Nalli Nihari", description: "Slow-braised lamb shanks, black cardamom, ginger juliennes, roomali.", category: "main-course", diet: "non-veg", signature: true },
  { name: "Paneer Lababdar", description: "Hand-torn paneer, tomato-cashew gravy, crushed fenugreek leaves.", category: "main-course", diet: "veg" },
  { name: "Malabar Prawn Curry", description: "Tiger prawns, coconut milk, kudampuli, tempered curry leaves.", category: "main-course", diet: "non-veg" },
  { name: "Dal Saffron & Sage", description: "48-hour simmered black dal, smoked butter, cream finish.", category: "main-course", diet: "veg", signature: true },
  { name: "Subz Diwani Handi", description: "Seasonal vegetables, korma gravy, saffron, boiled egg garnish (optional).", category: "main-course", diet: "veg" },
  { name: "Chicken Chettinad", description: "Fire-roasted masala, star anise, stone-ground coconut, curry leaf.", category: "main-course", diet: "non-veg" },

  // Rice
  { name: "Dum Gosht Biryani", description: "Sealed-pot lamb biryani, saffron milk, birista, mint raita.", category: "rice", diet: "non-veg", signature: true },
  { name: "Kashmiri Pulao", description: "Basmati, dry fruits, saffron, apple & pomegranate gems.", category: "rice", diet: "veg" },
  { name: "Lemon Rice Bowl", description: "Curry-leaf tempering, roasted peanuts, papad crumble.", category: "rice", diet: "vegan" },
  { name: "Jeera Rice", description: "Ghee-roasted cumin, slow-steamed basmati.", category: "rice", diet: "veg" },

  // Breads
  { name: "Truffle-Butter Naan", description: "Tandoor naan brushed with truffle butter, sea salt.", category: "breads", diet: "veg", signature: true },
  { name: "Laccha Paratha", description: "Sixteen-layer whole-wheat paratha, ghee lacquer.", category: "breads", diet: "veg" },
  { name: "Roasted Garlic Kulcha", description: "Stuffed kulcha, roast garlic, coriander stem butter.", category: "breads", diet: "veg" },
  { name: "Gluten-Free Roti", description: "Jowar-bajra roti, pressed to order.", category: "breads", diet: "vegan" },

  // Desserts
  { name: "Kesar Jalebi with Rabri", description: "Saffron jalebi, chilled rabri, rose petals, pistachio dust.", category: "desserts", diet: "veg", signature: true },
  { name: "Belgian Chocolate Tart", description: "70% dark ganache, cocoa nib crust, smoked sea salt.", category: "desserts", diet: "veg" },
  { name: "Mishti Doi Jar", description: "Caramelised yogurt, nolen gur, torched banana.", category: "desserts", diet: "veg" },
  { name: "Coconut-Payasam Shooters", description: "Jaggery-coconut kheer, toasted coconut flakes.", category: "desserts", diet: "vegan" },

  // Beverages
  { name: "Kashmiri Kahwa Cart", description: "Saffron-almond kahwa brewed at the table, dry-fruit trail.", category: "beverages", diet: "veg" },
  { name: "Masala Chaas", description: "Cumin, curry leaf, coriander flowers, black salt.", category: "beverages", diet: "veg" },
  { name: "Watermelon & Basil Cooler", description: "Cold-pressed watermelon, basil seeds, lime wheel.", category: "beverages", diet: "vegan" },
  { name: "Filter Coffee Brewers", description: "Slow-drip filter coffee, frothed milk on the side.", category: "beverages", diet: "veg" },
];
