export type MenuTabId =
  | "all"
  | "breakfast"
  | "mains"
  | "grill"
  | "non-alcoholic"
  | "cocktails-beers"
  | "wines-spirits";

export interface SimpleMenuItem {
  name: string;
  price: string;
  description?: string;
}

export interface TieredMenuItem {
  name: string;
  bottle?: string;
  glass?: string;
  toti?: string;
}

export interface MenuSubsection {
  id: string;
  tab: Exclude<MenuTabId, "all">;
  title: string;
  eyebrow: string;
  note?: string;
  kind: "simple" | "tiered";
  items?: SimpleMenuItem[];
  tieredItems?: TieredMenuItem[];
}

export const MENU_TABS: { id: MenuTabId; label: string }[] = [
  { id: "all", label: "Full menu" },
  { id: "breakfast", label: "Breakfast & starters" },
  { id: "mains", label: "Mains & African" },
  { id: "grill", label: "Grill, pizza & pasta" },
  { id: "non-alcoholic", label: "Coffee, juices & soft drinks" },
  { id: "cocktails-beers", label: "Cocktails & beers" },
  { id: "wines-spirits", label: "Wines & spirits" },
];

export const HOMEPAGE_MENU_HIGHLIGHTS: {
  name: string;
  detail: string;
  price: string;
}[] = [
  {
    name: "Zouru Bravo Breakfast",
    detail: "Seasonal fruits, eggs your way, warm breads & hot beverage",
    price: "12,000 RWF",
  },
  {
    name: "Grilled Whole Tilapia",
    detail: "Lake Kivu catch served with your choice of accompaniment",
    price: "15,000 RWF",
  },
  {
    name: "Igisafuriya",
    detail: "Traditional Rwandan pot with beef or whole local chicken",
    price: "35,000 RWF",
  },
  {
    name: "House Signature Cocktail",
    detail: "Gin, pineapple, passion fruit, fresh lime & grenadine",
    price: "15,000 RWF",
  },
];

const ACCOMPANIMENT_NOTE =
  "Served with one accompaniment of your choice: basmati rice, pomme nature, French fries, cassava ugali, boiled bananas, banana chips, or maize ugali. Extra accompaniment is charged separately.";

export const MENU_SECTIONS: MenuSubsection[] = [
  // === BREAKFAST & STARTERS ===
  {
    id: "breakfast-sets",
    tab: "breakfast",
    eyebrow: "MORNINGS AT ZOURU",
    title: "Breakfast",
    kind: "simple",
    items: [
      {
        name: "American Breakfast",
        price: "15,000",
        description:
          "Fresh juice, seasonal fruits, cereals, porridge or soup, eggs of your choice (scrambled, fried, plain or Spanish omelet, boiled), sausages, ham, chicken or beef, potatoes & seasonal vegetables, assorted breads, preserves, and tea, coffee, milk, hot chocolate, or green tea.",
      },
      {
        name: "Continental Breakfast",
        price: "15,000",
        description:
          "Fresh juice or seasonal fruits, eggs of your choice, toasted bread or bread rolls, preserves (jam, honey, butter, or Blue Band), and tea, coffee, milk, hot chocolate, or green tea.",
      },
      {
        name: "Zouru Bravo Breakfast",
        price: "12,000",
        description:
          "Seasonal fruits, eggs of your choice (scrambled, fried, plain or Spanish omelet, or boiled), toasted bread or bread rolls, and tea, coffee, milk, hot chocolate, or green tea.",
      },
    ],
  },
  {
    id: "omelets",
    tab: "breakfast",
    eyebrow: "EGGS YOUR WAY",
    title: "Omelets & Eggs",
    kind: "simple",
    items: [
      { name: "Plain Omelet (Omelette Nature)", price: "4,000" },
      { name: "Cheese Omelet", price: "5,000" },
      { name: "Spanish Omelet", price: "5,000" },
      {
        name: "Special Omelet",
        price: "6,000",
        description: "Chips, meat, tomatoes, and onions.",
      },
      { name: "Boiled Eggs (3 pcs)", price: "4,000" },
      { name: "Scrambled Eggs (2 pcs)", price: "4,000" },
    ],
  },
  {
    id: "starters",
    tab: "breakfast",
    eyebrow: "TO BEGIN",
    title: "Hot & Cold Starters",
    kind: "simple",
    items: [
      { name: "Plate of Cheese", price: "8,000" },
      { name: "Plate of Sausages", price: "8,000" },
      { name: "Meat or Vegetable Samosas (3 pcs)", price: "8,000" },
      { name: "Mini Tacos (Chicken or Beef)", price: "8,000" },
      { name: "Meatballs", price: "8,000" },
    ],
  },
  {
    id: "soups",
    tab: "breakfast",
    eyebrow: "WARM BOWLS",
    title: "Soups",
    kind: "simple",
    items: [
      { name: "Chicken Soup", price: "8,000" },
      { name: "Mushroom Soup", price: "8,000" },
      { name: "Fish Soup", price: "8,000" },
      { name: "Vegetable Soup", price: "7,000" },
      { name: "Cream of Tomato Soup", price: "8,000" },
      { name: "Carrot & Ginger Soup", price: "7,000" },
    ],
  },
  {
    id: "salads",
    tab: "breakfast",
    eyebrow: "FRESH & CRISP",
    title: "Salads",
    kind: "simple",
    items: [
      { name: "Caesar Salad", price: "10,000" },
      { name: "Avocado with Fresh Dressing", price: "6,000" },
      {
        name: "Chef's Salad (Salade du Chef)",
        price: "10,000",
        description: "Eggs, ham, cucumber, lettuce, tomato, and cheese.",
      },
      {
        name: "Tuna Salad (Salade Niçoise)",
        price: "10,000",
        description: "Tuna, tomato, avocado, eggs, and lettuce.",
      },
      { name: "Kachumbari (Gacumbali)", price: "4,000" },
    ],
  },

  // === MAINS & AFRICAN ===
  {
    id: "house-specialties",
    tab: "mains",
    eyebrow: "SIGNATURE PLATES",
    title: "House Specialties",
    kind: "simple",
    items: [
      {
        name: "Buffet Minimum",
        price: "25,000",
        description: "Beef, chicken, and fish selection.",
      },
      { name: "Méchoui de Poulet", price: "25,000" },
      { name: "Plantain Banana Plate", price: "10,000" },
      { name: "Chicken Rice", price: "30,000" },
    ],
  },
  {
    id: "african-dishes",
    tab: "mains",
    eyebrow: "LOCAL FAVOURITES",
    title: "African Dishes",
    kind: "simple",
    items: [
      {
        name: "Beef Agatogo",
        price: "8,000",
        description: "Matoke, beef, vegetables, and tomato sauce.",
      },
      {
        name: "Peanut & Vegetable Agatogo",
        price: "8,000",
        description: "Matoke, vegetables in tomato and peanut sauce.",
      },
      {
        name: "Igisafuriya",
        price: "35,000",
        description: "Prepared with beef or whole local chicken.",
      },
    ],
  },
  {
    id: "beef-dishes",
    tab: "mains",
    eyebrow: "FROM THE KITCHEN",
    title: "Beef Dishes",
    note: ACCOMPANIMENT_NOTE,
    kind: "simple",
    items: [
      { name: "Stir-Fried Beef", price: "10,000" },
      { name: "T-Bone Steak", price: "15,000" },
      { name: "Pepper Steak", price: "12,000" },
      { name: "Beef Sizzling", price: "15,000" },
      { name: "Beef Stroganoff", price: "12,000" },
      { name: "Beef Stew", price: "12,000" },
      { name: "Steak aux Champignons", price: "13,000" },
    ],
  },
  {
    id: "fish-dishes",
    tab: "mains",
    eyebrow: "LAKE KIVU CATCH",
    title: "Fish Dishes",
    note: ACCOMPANIMENT_NOTE,
    kind: "simple",
    items: [
      {
        name: "Grilled Captain Fish Fillet",
        price: "13,000",
        description: "Marinated in lemon butter sauce.",
      },
      { name: "Whole Tilapia Boiled in Tomato Sauce (Medium)", price: "15,000" },
      { name: "Grilled Whole Tilapia (Medium)", price: "15,000" },
      { name: "Sambaza", price: "8,000" },
    ],
  },
  {
    id: "chicken-dishes",
    tab: "mains",
    eyebrow: "POULTRY",
    title: "Chicken Dishes",
    note: ACCOMPANIMENT_NOTE,
    kind: "simple",
    items: [
      { name: "Chicken Stew", price: "12,000" },
      { name: "Stir-Fried Chicken", price: "12,000" },
      { name: "Chicken Curry", price: "12,000" },
      { name: "Chicken Sizzling", price: "15,000" },
      { name: "Archiduc Chicken", price: "12,000" },
    ],
  },
  {
    id: "goat-dishes",
    tab: "mains",
    eyebrow: "RWANDAN CLASSIC",
    title: "Goat Meat",
    note: ACCOMPANIMENT_NOTE,
    kind: "simple",
    items: [
      { name: "Goat Stew", price: "12,000" },
      { name: "Agatogo (Boiled Goat Meat)", price: "10,000" },
      { name: "Goat Sizzling", price: "15,000" },
      { name: "Goat Platter", price: "15,000" },
    ],
  },
  {
    id: "pork-dishes",
    tab: "mains",
    eyebrow: "SAVOURY CUTS",
    title: "Pork Dishes",
    note: ACCOMPANIMENT_NOTE,
    kind: "simple",
    items: [
      { name: "Pork Chops", price: "15,000" },
      { name: "Pork Flambée", price: "15,000" },
      { name: "Pork Sizzling", price: "15,000" },
    ],
  },

  // === GRILL, PIZZA & PASTA ===
  {
    id: "grilled",
    tab: "grill",
    eyebrow: "CHARCOAL & BROCHETTES",
    title: "From the Grill",
    kind: "simple",
    items: [
      {
        name: "One Beef Brochette",
        price: "8,000",
        description: "Served with chips or grilled potatoes and salad.",
      },
      {
        name: "Two Beef Brochettes",
        price: "10,000",
        description: "Served with chips or grilled potatoes and salad.",
      },
      {
        name: "One Fish Brochette",
        price: "10,000",
        description: "Served with chips or grilled potatoes and salad.",
      },
      {
        name: "Two Fish Brochettes",
        price: "13,000",
        description: "Served with chips or grilled potatoes and salad.",
      },
      {
        name: "One Chicken Brochette",
        price: "10,000",
        description: "Served with chips or grilled potatoes and salad.",
      },
      {
        name: "Two Chicken Brochettes",
        price: "13,000",
        description: "Served with chips or grilled potatoes and salad.",
      },
      {
        name: "One Goat Brochette",
        price: "8,000",
        description: "Served with chips or grilled potatoes and salad.",
      },
      {
        name: "Two Goat Brochettes",
        price: "13,000",
        description: "Served with chips or grilled potatoes and salad.",
      },
      { name: "Simple Beef Brochette", price: "3,000" },
      { name: "Simple Goat Brochette", price: "3,000" },
      { name: "Simple Fish Brochette", price: "5,000" },
      { name: "Simple Chicken Brochette", price: "5,000" },
      { name: "Zingaro Only", price: "4,000" },
      { name: "Grilled Goat Leg", price: "20,000" },
      { name: "Grilled Goat Ribs (1 kg)", price: "20,000" },
      { name: "Whole Fish (with one accompaniment)", price: "20,000" },
      { name: "Whole Local Chicken (with one accompaniment)", price: "30,000" },
      { name: "Zouru Local Chicken", price: "35,000" },
      { name: "Zouru Fish", price: "35,000" },
    ],
  },
  {
    id: "pizza-lasagne",
    tab: "grill",
    eyebrow: "OVEN BAKED",
    title: "Pizza & Lasagne",
    kind: "simple",
    items: [
      {
        name: "Margherita Pizza",
        price: "10,000",
        description: "Tomato, cheese, and oregano.",
      },
      {
        name: "Bolognese Pizza",
        price: "10,000",
        description: "Tomato, cheese, onions, Bolognese sauce, and oregano.",
      },
      {
        name: "Hawaiian Pizza",
        price: "13,000",
        description: "Tomato, ham, cheese, pineapple, olives, and oregano.",
      },
      {
        name: "Mafioso Pizza",
        price: "13,000",
        description: "Tomato, cheese, onion, ham or sausage, olives, and oregano.",
      },
      { name: "Four Seasons Pizza", price: "13,000" },
      { name: "Meat Lasagne", price: "12,000" },
      { name: "Chicken Lasagne", price: "12,000" },
      { name: "Vegetable Lasagne", price: "8,000" },
    ],
  },
  {
    id: "pasta",
    tab: "grill",
    eyebrow: "ITALIAN CLASSICS",
    title: "Spaghetti & Pasta",
    kind: "simple",
    items: [
      { name: "Spaghetti in White Sauce", price: "8,000" },
      { name: "Spaghetti Bolognese", price: "8,000" },
      { name: "Spaghetti Napolitaine", price: "8,000" },
      { name: "Spaghetti Carbonara", price: "8,000" },
    ],
  },
  {
    id: "sandwiches-wraps",
    tab: "grill",
    eyebrow: "ALL-DAY BITES",
    title: "Burgers, Sandwiches & Chapatis",
    note: "Chapati wraps and shawarmas are served with chips.",
    kind: "simple",
    items: [
      {
        name: "Croque Monsieur",
        price: "10,000",
        description: "Toasted bread, ham, and cheese.",
      },
      {
        name: "Croque Hawaiian",
        price: "10,000",
        description: "Toasted bread, ham, cheese, and pineapple.",
      },
      { name: "Chicken Avocado Sandwich", price: "10,000" },
      { name: "Chicken Sandwich", price: "10,000" },
      { name: "Vegetarian Grilled Sandwich", price: "8,000" },
      { name: "Grilled Cheese Sandwich", price: "8,000" },
      { name: "Hamburger", price: "10,000" },
      { name: "Beef Burger", price: "10,000" },
      { name: "Cheese Beef Burger", price: "10,000" },
      { name: "Crispy Chicken Burger", price: "10,000" },
      { name: "King Burger", price: "12,000" },
      { name: "Chicken Chapati Wrap", price: "10,000" },
      { name: "Vegetable Chapati Wrap", price: "8,000" },
      {
        name: "Rolex Chapati Wrap",
        price: "8,000",
        description: "Rolled with Spanish omelet.",
      },
      { name: "Chicken Shawarma", price: "10,000" },
      { name: "Beef Shawarma", price: "10,000" },
    ],
  },
  {
    id: "snacks-sides-desserts",
    tab: "grill",
    eyebrow: "LIGHT PLATES & SWEETS",
    title: "Snacks, Sauces & Desserts",
    kind: "simple",
    items: [
      { name: "Chicken Wings", price: "10,000" },
      { name: "Fish Fingers", price: "10,000" },
      { name: "French Fries with Salad", price: "3,500" },
      { name: "Masala Chips", price: "3,500" },
      { name: "Banana Chips", price: "3,500" },
      { name: "Plantain Chips", price: "6,000" },
      { name: "Mushroom, Pepper, or Tomato Sauce (Side)", price: "3,000" },
      { name: "Assorted Fresh Fruit Cuts", price: "8,000" },
      { name: "Fruit Salad (Macédoine)", price: "8,000" },
      { name: "Pancake with Honey", price: "5,000" },
      { name: "Vanilla Ice Cream (1 scoop)", price: "3,000" },
      { name: "Strawberry Ice Cream (1 scoop)", price: "3,000" },
    ],
  },

  // === COFFEE, JUICES & SOFT DRINKS ===
  {
    id: "hot-beverages",
    tab: "non-alcoholic",
    eyebrow: "COFFEE, ALWAYS",
    title: "Hot Beverages",
    kind: "simple",
    items: [
      { name: "Espresso", price: "3,000" },
      { name: "Double Espresso", price: "5,000" },
      { name: "Americano", price: "4,000" },
      { name: "Cappuccino", price: "4,000" },
      { name: "Café Latte", price: "4,000" },
      { name: "Hot Chocolate", price: "4,000" },
      { name: "Black Tea", price: "2,500" },
      { name: "Green Tea", price: "3,000" },
      { name: "African Tea", price: "4,000" },
      { name: "Ginger Tea", price: "4,000" },
      { name: "Masala Tea", price: "4,000" },
      { name: "Spiced Tea", price: "5,000" },
      { name: "Dawa Africa", price: "6,000" },
      { name: "Nido Tea", price: "4,000" },
      { name: "Hot Milk", price: "3,000" },
    ],
  },
  {
    id: "juices-smoothies",
    tab: "non-alcoholic",
    eyebrow: "FRESHLY BLENDED",
    title: "Fresh Juices, Milkshakes & Smoothies",
    kind: "simple",
    items: [
      { name: "Tree Tomato Juice", price: "6,000" },
      { name: "Passion Fruit Juice", price: "6,000" },
      { name: "Cocktail Juice", price: "7,000" },
      { name: "Mango Milkshake", price: "7,000" },
      { name: "Banana Milkshake", price: "7,000" },
      {
        name: "Fresh Fruit Smoothie",
        price: "8,000",
        description: "Banana or pineapple blended with milk and ice cream.",
      },
    ],
  },
  {
    id: "soft-drinks-water",
    tab: "non-alcoholic",
    eyebrow: "CHILLED REFRESHMENTS",
    title: "Soft Drinks & Mineral Water",
    kind: "simple",
    items: [
      { name: "Still Water", price: "1,000" },
      { name: "Sparkling Water", price: "1,500" },
      { name: "Coca-Cola", price: "1,500" },
      { name: "Fanta Orange", price: "1,500" },
      { name: "Fanta (Plastic)", price: "2,000" },
      { name: "Sprite", price: "1,500" },
      { name: "Tonic Water", price: "1,500" },
      { name: "Citron Lemon", price: "1,500" },
      { name: "Pineapple Soda", price: "1,500" },
      { name: "Fiesta", price: "1,500" },
      { name: "Panaché", price: "2,000" },
      { name: "Inyange Juice", price: "2,000" },
      { name: "Energy Drink", price: "1,500" },
      { name: "Bavaria", price: "4,000" },
      { name: "Red Bull", price: "5,000" },
    ],
  },

  // === COCKTAILS & BEERS ===
  {
    id: "cocktails",
    tab: "cocktails-beers",
    eyebrow: "MIXED TO ORDER",
    title: "Cocktails",
    kind: "simple",
    items: [
      {
        name: "House Signature Special",
        price: "15,000",
        description: "Gin, pineapple juice, passion fruit, lime juice, and grenadine.",
      },
      {
        name: "Screwdriver",
        price: "15,000",
        description: "Vodka, fresh orange juice, ice cubes, and orange slice.",
      },
      {
        name: "White Russian",
        price: "15,000",
        description: "Vodka, coffee liqueur, fresh cream, and ice cubes.",
      },
      {
        name: "Black Russian",
        price: "15,000",
        description: "Vodka, coffee liqueur, and ice cubes.",
      },
    ],
  },
  {
    id: "mocktails",
    tab: "cocktails-beers",
    eyebrow: "ZERO-PROOF",
    title: "Non-Alcoholic Mocktails",
    kind: "simple",
    items: [
      {
        name: "Virgin Mojito",
        price: "15,000",
        description: "Fresh lime, mint leaves, sugar syrup, soda water, and crushed ice.",
      },
      {
        name: "Shirley Temple",
        price: "15,000",
        description: "Grenadine syrup, lemon-lime soda or ginger ale, fresh lime, and cherry.",
      },
      {
        name: "Virgin Piña Colada",
        price: "15,000",
        description: "Pineapple juice, coconut cream, and crushed ice.",
      },
      {
        name: "Tropical Sunrise",
        price: "15,000",
        description: "Orange juice, pineapple juice, grenadine syrup, and ice.",
      },
      {
        name: "Fruit Punch",
        price: "15,000",
        description:
          "Orange juice, pineapple juice, passion fruit juice, grenadine, and fresh fruits.",
      },
      {
        name: "Blue Lagoon Mocktail",
        price: "15,000",
        description: "Non-alcoholic blue curaçao syrup, lemonade, fresh lime, and ice.",
      },
    ],
  },
  {
    id: "beers",
    tab: "cocktails-beers",
    eyebrow: "ICE COLD & ON TAP",
    title: "Beers & Draft",
    kind: "simple",
    items: [
      { name: "Mützig", price: "2,000" },
      { name: "Amstel", price: "2,000" },
      { name: "Primus", price: "2,000" },
      { name: "Skol", price: "2,000" },
      { name: "Virunga", price: "2,000" },
      { name: "Turbo", price: "2,000" },
      { name: "Legend", price: "2,000" },
      { name: "Heineken", price: "2,500" },
      { name: "Tusker", price: "3,000" },
      { name: "Block", price: "3,000" },
      { name: "Guinness", price: "4,000" },
      { name: "Smirnoff Ice", price: "4,000" },
      { name: "Stella Artois", price: "4,000" },
      { name: "Draft Mützig", price: "4,000" },
      { name: "Draft Amstel", price: "4,500" },
      { name: "Leffe", price: "6,000" },
    ],
  },

  // === WINES & SPIRITS ===
  {
    id: "wines",
    tab: "wines-spirits",
    eyebrow: "THE CELLAR",
    title: "Red, White & Rosé Wines",
    note: "All bottle prices listed below in RWF.",
    kind: "simple",
    items: [
      { name: "Nederburg Cabernet Sauvignon (Red)", price: "60,000" },
      { name: "Robertson Winery Cabernet Sauvignon (Red)", price: "60,000" },
      { name: "4th Street Red Wine", price: "60,000" },
      { name: "KWV Cabernet Sauvignon (Red)", price: "60,000" },
      { name: "Domaine Bergon (Red)", price: "60,000" },
      { name: "Nederburg Sauvignon Blanc (White)", price: "60,000" },
      { name: "Robertson Winery Sauvignon Blanc (White)", price: "60,000" },
      { name: "Jacob's Creek Chardonnay (White)", price: "60,000" },
      { name: "4th Street White Wine", price: "60,000" },
      { name: "Four Cousins White", price: "60,000" },
      { name: "Nederburg Rosé", price: "60,000" },
      { name: "Four Cousins Rosé", price: "60,000" },
      { name: "4th Street Rosé", price: "60,000" },
      { name: "Robertson Winery Rosé", price: "60,000" },
      { name: "Mateus Rosé", price: "60,000" },
      { name: "House Wine (Glass)", price: "6,000 / 12,000" },
    ],
  },
  {
    id: "champagne",
    tab: "wines-spirits",
    eyebrow: "CELEBRATE",
    title: "Champagne & Sparkling Wine",
    kind: "simple",
    items: [
      { name: "Moët & Chandon", price: "300,000" },
      { name: "Veuve Clicquot", price: "250,000" },
      { name: "Chandon Brut", price: "200,000" },
    ],
  },
  {
    id: "whisky",
    tab: "wines-spirits",
    eyebrow: "TOP SHELF",
    title: "Whisky",
    kind: "tiered",
    tieredItems: [
      { name: "Johnnie Walker Red Label", bottle: "80,000", glass: "20,000", toti: "4,000" },
      { name: "Johnnie Walker Black Label", bottle: "100,000", glass: "20,000", toti: "6,000" },
      { name: "Chivas Regal 12 Years", bottle: "120,000", glass: "25,000", toti: "5,000" },
      { name: "Chivas Regal 18 Years", bottle: "150,000", glass: "30,000", toti: "6,000" },
      { name: "Jack Daniel's", bottle: "120,000", glass: "15,000" },
      { name: "Jameson (Large)", bottle: "120,000", glass: "20,000", toti: "5,000" },
      { name: "Jameson", bottle: "70,000", glass: "15,000", toti: "3,000" },
      { name: "Jameson Black Barrel", bottle: "130,000", glass: "120,000", toti: "5,000" },
      { name: "Grant's", bottle: "80,000", glass: "15,000", toti: "5,000" },
    ],
  },
  {
    id: "brandy-cognac",
    tab: "wines-spirits",
    eyebrow: "AGED SPIRITS",
    title: "Brandy & Cognac",
    kind: "tiered",
    tieredItems: [
      { name: "Hennessy VS", bottle: "160,000", glass: "30,000", toti: "6,000" },
      { name: "Hennessy VSOP", bottle: "300,000", glass: "30,000", toti: "10,000" },
      { name: "Rémy Martin VSOP", bottle: "400,000", glass: "50,000", toti: "12,000" },
      { name: "Martell VS", bottle: "400,000", glass: "50,000", toti: "15,000" },
      { name: "Martell VSOP", bottle: "200,000", glass: "30,000", toti: "10,000" },
      { name: "Courvoisier VS", bottle: "200,000", glass: "30,000", toti: "10,000" },
      { name: "St-Rémy VSOP", bottle: "500,000", glass: "60,000", toti: "10,000" },
    ],
  },
  {
    id: "tequila",
    tab: "wines-spirits",
    eyebrow: "AGAVE",
    title: "Tequila",
    kind: "tiered",
    tieredItems: [
      { name: "Jose Cuervo Silver", bottle: "200,000", glass: "20,000", toti: "8,000" },
      { name: "Patrón Silver", bottle: "250,000", glass: "20,000", toti: "8,000" },
      { name: "Olmeca Gold", bottle: "200,000", glass: "20,000", toti: "6,000" },
      { name: "Tequila Camino", bottle: "7,000", glass: "20,000", toti: "5,000" },
    ],
  },
  {
    id: "rum",
    tab: "wines-spirits",
    eyebrow: "SUGARCANE",
    title: "Rum",
    kind: "tiered",
    tieredItems: [
      { name: "Bacardi White", bottle: "70,000", glass: "15,000", toti: "3,000" },
      { name: "Captain Morgan", bottle: "70,000", glass: "15,000", toti: "3,000" },
      { name: "Malibu", bottle: "100,000", glass: "15,000", toti: "5,000" },
      { name: "Mount Gay", bottle: "100,000", glass: "15,000", toti: "3,000" },
    ],
  },
  {
    id: "vodka-gin",
    tab: "wines-spirits",
    eyebrow: "CLEAR SPIRITS",
    title: "Vodka & Gin",
    kind: "tiered",
    tieredItems: [
      { name: "Smirnoff Vodka", bottle: "70,000", glass: "15,000", toti: "3,000" },
      { name: "Absolut Vodka", bottle: "70,000", glass: "15,000", toti: "3,000" },
      { name: "Belvedere Vodka", bottle: "70,000", glass: "15,000", toti: "3,000" },
      { name: "Finlandia Vodka", bottle: "70,000", glass: "15,000", toti: "3,000" },
      { name: "SKYY Vodka", bottle: "70,000", glass: "15,000", toti: "3,000" },
      { name: "Gordon's Gin", bottle: "70,000", glass: "15,000", toti: "3,000" },
      { name: "Tanqueray Gin", bottle: "70,000", glass: "15,000", toti: "3,000" },
      { name: "Beefeater Gin", bottle: "100,000", glass: "15,000", toti: "3,000" },
      { name: "Hendrick's Gin", bottle: "200,000", glass: "20,000", toti: "5,000" },
      { name: "Roku Gin", bottle: "70,000", glass: "15,000", toti: "3,000" },
    ],
  },
  {
    id: "liqueurs",
    tab: "wines-spirits",
    eyebrow: "AFTER DINNER",
    title: "Liqueurs",
    kind: "tiered",
    tieredItems: [
      { name: "Baileys Irish Cream", bottle: "80,000", glass: "15,000" },
      { name: "Amarula", bottle: "80,000", glass: "15,000" },
      { name: "Campari", bottle: "70,000", glass: "15,000", toti: "3,000" },
      { name: "Cointreau", bottle: "100,000", glass: "15,000", toti: "4,000" },
      { name: "Grand Marnier", bottle: "100,000", glass: "15,000", toti: "4,000" },
    ],
  },
];
