// Single source of truth for Haven Vertex pricing. All prices are USD per month.
export const EXTRA_HOUR = 30;
export const BASE_HOURS: Record<string, number> = { essential: 25, content: 40, dedicated: 75 };

export const TERMS = [
  { id: "m", label: "Month to month", short: "Monthly", off: 0, note: "No lock-in. Cancel with 14 days' notice." },
  { id: "6", label: "6-month commitment", short: "6 months", off: 0.1, note: "10% off. Billed monthly in advance." },
  { id: "12", label: "12 months, paid upfront", short: "12 months", off: 0.15, note: "15% off. Pay the full year before work starts." },
] as const;
export type TermId = (typeof TERMS)[number]["id"];

export const applyTerm = (monthly: number, term: TermId) => {
  const t = TERMS.find((x) => x.id === term)!;
  return Math.round(monthly * (1 - t.off));
};

// What each package already covers, by item id (used by the kiosk so nothing is charged twice).
export const PACKAGE_INCLUDES: Record<string, string[]> = {
  p1: ["w1", "w2", "w3", "w4", "c1"],
  p2: ["w1", "c1", "c2", "c3", "c4"],
  p3: ["w1", "w2", "w3", "w4", "c1", "c2", "c3", "c4", "s1", "s2", "s3", "s4"],
};

// Add-on monthly prices by item id.
export const ADDON_PRICE: Record<string, number> = {
  w1: 150, w2: 120, w3: 100, w4: 80,
  a1: 150, a2: 100, a3: 200, a4: 120,
  c1: 160, c2: 150, c3: 180, c4: 60,
  s1: 200, s2: 120, s3: 100, s4: 100,
};

export const PAYMENT_TERMS = [
  { t: "Paid in advance", p: "Monthly plans are invoiced before each month starts. Pay by bank transfer in your own currency (USD, AUD, GBP, CAD, EUR or NZD). Work begins once payment arrives." },
  { t: "Starting out", p: "Your first month is paid before any work begins. A free 30 minute call comes first, with no charge." },
  { t: "One-off projects", p: "Landing pages, setups and fixes are quoted up front. 50% deposit to book, 50% on delivery." },
  { t: "Hours and extras", p: `Each plan has a set number of hours a month. Extra time is $${EXTRA_HOUR} an hour, agreed with you first. Unused hours do not roll over.` },
  { t: "Changing or stopping", p: "Month-to-month plans can change or stop with 14 days' notice. If you leave a 6 or 12 month plan early, the months used are re-billed at the monthly rate." },
];

// Clients pay by bank transfer in their own currency. The invoice amount is set by hand.
export const CURRENCIES = ["USD", "AUD", "GBP", "CAD", "EUR", "NZD", "Other"] as const;

// One-off website builds (USD, fixed price). 50% deposit, 50% on launch.
export const BUILD_DEPOSIT = 0.5;
export const BUILDS = [
  {
    id: "landing", name: "Landing Page", price: 1000, pages: "1 page", time: "About 1 to 2 weeks",
    includes: ["One designed page that sells one offer", "Mobile-friendly layout", "Enquiry form and booking link connected", "Basic on-page SEO and speed set-up", "Built on Wix, Squarespace, Duda or WordPress"],
  },
  {
    id: "business", name: "Business Website", price: 2000, pages: "Up to 5 pages", time: "About 3 to 4 weeks",
    includes: ["Home, About, Services, Contact and one more page", "Mobile-friendly layout in your brand colours", "Forms, booking and email list connected", "On-page SEO, Google Search Console and analytics", "Two rounds of revisions"],
  },
  {
    id: "growth", name: "Growth Website", price: 3200, pages: "Up to 10 pages", time: "About 5 to 6 weeks",
    includes: ["Everything in Business Website", "Blog set up with your first posts formatted", "Service or location pages written for search", "Newsletter and CRM connected", "30 days of free support after launch"],
  },
  {
    id: "store", name: "Online Store", price: 3600, pages: "Up to 25 products", time: "About 5 to 7 weeks",
    includes: ["Shopify or WooCommerce store, designed and set up", "Products, categories and shipping rules added", "Payment gateway and tax settings connected", "Order emails and abandoned cart steps", "30 days of free support after launch"],
  },
];
