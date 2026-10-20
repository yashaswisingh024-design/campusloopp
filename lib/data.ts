export type Condition = "New" | "Like New" | "Good" | "Fair"

export type Category =
  | "Textbooks"
  | "Electronics"
  | "Furniture"
  | "Transport"
  | "Lab & Tools"
  | "Hostel Essentials"

export interface Seller {
  initials: string
}

export interface Listing {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  category: Category
  condition: Condition
  image: string
  meetup: string
  postedAt: string
  seller: Seller
  swappable?: boolean
}

export const CATEGORIES: { name: Category; icon: string }[] = [
  { name: "Textbooks", icon: "BookOpen" },
  { name: "Electronics", icon: "Laptop" },
  { name: "Furniture", icon: "Armchair" },
  { name: "Transport", icon: "Bike" },
  { name: "Lab & Tools", icon: "FlaskConical" },
  { name: "Hostel Essentials", icon: "Lamp" },
]

export const MEETUP_SPOTS = [
  "Central Library",
  "Main Cafeteria",
  "Hostel Lobby",
  "Student Center",
  "Academic Block A",
  "Sports Complex",
]

export const LISTINGS: Listing[] = [
  {
    id: "l1",
    title: "Dell Inspiron 15 Laptop — i5, 8GB RAM, 512GB SSD",
    description:
      "Reliable everyday laptop, perfect for coding and coursework. Battery holds ~4 hours. Minor wear on the lid, screen is flawless. Comes with original charger.",
    price: 22000,
    originalPrice: 48000,
    category: "Electronics",
    condition: "Good",
    image: "/images/product-laptop.png",
    meetup: "Central Library",
    postedAt: "Example",
    seller: { initials: "EX" },
  },
  {
    id: "l2",
    title: "First-Year Computer Engineering Textbook Bundle (6 books)",
    description:
      "Complete set covering DSA, Digital Logic, Maths-I & II, and Physics. Lightly highlighted, no torn pages. Saves you over 4,000 vs buying new.",
    price: 1800,
    originalPrice: 6200,
    category: "Textbooks",
    condition: "Good",
    image: "/images/product-books.png",
    meetup: "Academic Block A",
    postedAt: "Example",
    seller: { initials: "EX" },
    swappable: true,
  },
  {
    id: "l3",
    title: "Hero Sprint City Bicycle — Great for Campus Commute",
    description:
      "Single-speed city cycle, recently serviced with new brake pads. Ideal for getting between hostel and academic blocks. Lock included.",
    price: 3500,
    originalPrice: 9000,
    category: "Transport",
    condition: "Good",
    image: "/images/product-bicycle.png",
    meetup: "Hostel Lobby",
    postedAt: "Example",
    seller: { initials: "EX" },
  },
  {
    id: "l4",
    title: "Casio FX-991EX Scientific Calculator",
    description:
      "Allowed in all exams. Fully functional, screen and buttons like new. Cover included. Barely used for one semester.",
    price: 650,
    originalPrice: 1300,
    category: "Lab & Tools",
    condition: "Like New",
    image: "/images/product-calculator.png",
    meetup: "Student Center",
    postedAt: "Example",
    seller: { initials: "EX" },
  },
  {
    id: "l5",
    title: "LED Study Desk Lamp — Adjustable Brightness",
    description:
      "Eye-care LED lamp with 3 brightness levels and USB charging. Perfect for late-night study sessions in the hostel.",
    price: 450,
    originalPrice: 1100,
    category: "Hostel Essentials",
    condition: "Like New",
    image: "/images/product-desklamp.png",
    meetup: "Hostel Lobby",
    postedAt: "Example",
    seller: { initials: "EX" },
    swappable: true,
  },
  {
    id: "l6",
    title: "Compact Mini Fridge 45L — Dorm Friendly",
    description:
      "Quiet compact fridge, great for keeping drinks and snacks cold. Works perfectly, moving out so need it gone this week.",
    price: 4200,
    originalPrice: 8500,
    category: "Hostel Essentials",
    condition: "Good",
    image: "/images/product-minifridge.png",
    meetup: "Hostel Lobby",
    postedAt: "Example",
    seller: { initials: "EX" },
  },
  {
    id: "l7",
    title: "Sony WH-CH720 Wireless Headphones",
    description:
      "Noise-cancelling over-ear headphones with ~35hr battery. Amazing for focus and calls. Includes cable and pouch.",
    price: 5500,
    originalPrice: 9990,
    category: "Electronics",
    condition: "Like New",
    image: "/images/product-headphones.png",
    meetup: "Central Library",
    postedAt: "Example",
    seller: { initials: "EX" },
  },
  {
    id: "l8",
    title: "Engineering Drawing Kit — Full Set with Instruments",
    description:
      "Complete drafting kit: compass, set squares, protractor, drawing board clips. Everything a first-year needs. Barely used.",
    price: 550,
    originalPrice: 1500,
    category: "Lab & Tools",
    condition: "Good",
    image: "/images/product-calculator.png",
    meetup: "Academic Block A",
    postedAt: "Example",
    seller: { initials: "EX" },
    swappable: true,
  },
]

export function getListing(id: string): Listing | undefined {
  return LISTINGS.find((l) => l.id === id)
}

export function formatPrice(n: number): string {
  return "₹" + n.toLocaleString("en-IN")
}
