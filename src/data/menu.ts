export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // Price in UAH
  priceEUR?: number; // Price in EUR (optional, calculated if not provided)
  category: "Кава" | "Десерти" | "Випічка" | "Напої";
  image: string;
}

// Exchange rate: 1 EUR = 48.98 UAH (as of November 2024)
const EUR_RATE = 48.98;

// Helper function to calculate EUR price
const calculateEUR = (uah: number): number => {
  return Math.round((uah / EUR_RATE) * 10) / 10; // Round to 1 decimal place
};

export const menuItems: MenuItem[] = [
  // Кава
  {
    id: "1",
    name: "Капучино",
    description: "Класичний італійський капучино з ніжною молочною пінкою та красивим латте-арт",
    price: 65,
    priceEUR: calculateEUR(65), // ~1.3 EUR
    category: "Кава",
    image: "cappuccino",
  },
  {
    id: "2",
    name: "Еспресо",
    description: "Насичений та ароматний подвійний еспресо з густою кремою",
    price: 45,
    priceEUR: calculateEUR(45), // ~0.9 EUR
    category: "Кава",
    image: "espresso",
  },
  {
    id: "3",
    name: "Колд Брю",
    description: "Освіжаючий холодний кавовий напій з льодом та вершками",
    price: 75,
    priceEUR: calculateEUR(75), // ~1.5 EUR
    category: "Кава",
    image: "coldbrew",
  },
  {
    id: "4",
    name: "Матча Латте",
    description: "Японський зелений чай матча з спіненим молоком",
    price: 70,
    priceEUR: calculateEUR(70), // ~1.4 EUR
    category: "Кава",
    image: "matcha",
  },
  
  // Десерти
  {
    id: "5",
    name: "Тірамісу",
    description: "Класичний італійський десерт з маскарпоне та кавовим просоченням",
    price: 95,
    priceEUR: calculateEUR(95), // ~1.9 EUR
    category: "Десерти",
    image: "tiramisu",
  },
  {
    id: "6",
    name: "Чізкейк з ягодами",
    description: "Ніжний Нью-Йорк чізкейк з соусом з лісових ягід",
    price: 85,
    priceEUR: calculateEUR(85), // ~1.7 EUR
    category: "Десерти",
    image: "cheesecake",
  },
  {
    id: "7",
    name: "Шоколадний брауні",
    description: "Насичений шоколадний брауні з глянцевим ганашем",
    price: 75,
    priceEUR: calculateEUR(75), // ~1.5 EUR
    category: "Десерти",
    image: "brownie",
  },
  
  // Випічка
  {
    id: "8",
    name: "Круасан",
    description: "Свіжий французький круасан з хрусткою скоринкою та маслянистими шарами",
    price: 55,
    priceEUR: calculateEUR(55), // ~1.1 EUR
    category: "Випічка",
    image: "croissant",
  },
  {
    id: "9",
    name: "Булочка з корицею",
    description: "Пухка булочка з корицею та вершковою глазур'ю",
    price: 60,
    priceEUR: calculateEUR(60), // ~1.2 EUR
    category: "Випічка",
    image: "cinnamon",
  },
  {
    id: "10",
    name: "Чорничний мафін",
    description: "Домашній мафін зі свіжою чорницею та хрусткою посипкою",
    price: 50,
    priceEUR: calculateEUR(50), // ~1.0 EUR
    category: "Випічка",
    image: "muffin",
  },
  
  // Напої
  {
    id: "11",
    name: "Свіжовичавлений апельсиновий сік",
    description: "100% натуральний свіжий апельсиновий сік",
    price: 65,
    priceEUR: calculateEUR(65), // ~1.3 EUR
    category: "Напої",
    image: "orange",
  },
  {
    id: "12",
    name: "Авокадо тост",
    description: "Хрусткий тост з авокадо, яйцем пашот та мікрогріном",
    price: 120,
    priceEUR: calculateEUR(120), // ~2.5 EUR
    category: "Напої",
    image: "avocado",
  },
];

