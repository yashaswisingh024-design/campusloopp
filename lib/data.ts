export type Condition = "New" | "Like New" | "Good" | "Fair"

export type Category =
  | "Textbooks"
  | "Electronics"
  | "Furniture"
  | "Transport"
  | "Lab & Tools"
  | "Hostel Essentials"

export type RiskLevel = "low" | "medium" | "high"

export interface Seller {
  id: string
  name: string
  initials: string
  college: string
  verified: boolean
  rating: number
  sales: number
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
  riskLevel: RiskLevel
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

const sellers: Seller[] = [
  {
    id: "u1",
    name: "Aarav Mehta",
    initials: "AM",
    college: "IIT Delhi",
    verified: true,
    rating: 4.9,
    sales: 34,
  },
  {
    id: "u2",
    name: "Priya Nair",
    initials: "PN",
    college: "IIT Delhi",
    verified: true,
    rating: 4.8,
    sales: 21,
  },
  {
    id: "u3",
    name: "Rohan Gupta",
    initials: "RG",
    college: "IIT Delhi",
    verified: true,
    rating: 5.0,
    sales: 12,
  },
  {
    id: "u4",
    name: "Sara Khan",
    initials: "SK",
    college: "IIT Delhi",
    verified: true,
    rating: 4.7,
    sales: 8,
  },
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
    postedAt: "2h ago",
    seller: sellers[0],
    riskLevel: "low",
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
    postedAt: "5h ago",
    seller: sellers[1],
    swappable: true,
    riskLevel: "low",
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
    postedAt: "1d ago",
    seller: sellers[2],
    riskLevel: "low",
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
    postedAt: "3h ago",
    seller: sellers[3],
    riskLevel: "low",
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
    postedAt: "6h ago",
    seller: sellers[1],
    swappable: true,
    riskLevel: "low",
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
    postedAt: "8h ago",
    seller: sellers[0],
    riskLevel: "medium",
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
    postedAt: "12h ago",
    seller: sellers[2],
    riskLevel: "low",
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
    postedAt: "1d ago",
    seller: sellers[3],
    swappable: true,
    riskLevel: "low",
  },
]

export function getListing(id: string): Listing | undefined {
  return LISTINGS.find((l) => l.id === id)
}

export interface LeaderboardEntry {
  rank: number
  name: string
  initials: string
  points: number
  sales: number
  badge: string
}

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Priya Nair", initials: "PN", points: 2840, sales: 21, badge: "Campus Legend" },
  { rank: 2, name: "Aarav Mehta", initials: "AM", points: 2610, sales: 34, badge: "Top Seller" },
  { rank: 3, name: "Rohan Gupta", initials: "RG", points: 1990, sales: 12, badge: "Trusted Trader" },
  { rank: 4, name: "Sara Khan", initials: "SK", points: 1540, sales: 8, badge: "Rising Star" },
  { rank: 5, name: "Vikram Rao", initials: "VR", points: 1320, sales: 15, badge: "Rising Star" },
  { rank: 6, name: "Ananya Das", initials: "AD", points: 1180, sales: 9, badge: "Ambassador" },
]

export interface Mission {
  id: string
  title: string
  description: string
  points: number
  progress: number
  goal: number
  icon: string
}

export const MISSIONS: Mission[] = [
  {
    id: "m1",
    title: "List your first item",
    description: "Create a listing with an AI-generated description.",
    points: 100,
    progress: 1,
    goal: 1,
    icon: "PackagePlus",
  },
  {
    id: "m2",
    title: "Invite 3 classmates",
    description: "Share your referral link and get friends verified.",
    points: 300,
    progress: 1,
    goal: 3,
    icon: "UserPlus",
  },
  {
    id: "m3",
    title: "Complete 5 trades",
    description: "Successfully sell or swap 5 items on campus.",
    points: 500,
    progress: 2,
    goal: 5,
    icon: "Repeat",
  },
  {
    id: "m4",
    title: "Reach a 4.8+ rating",
    description: "Keep buyers happy to unlock the Trusted Trader badge.",
    points: 250,
    progress: 47,
    goal: 48,
    icon: "Star",
  },
]

export function formatPrice(n: number): string {
  return "₹" + n.toLocaleString("en-IN")
}
