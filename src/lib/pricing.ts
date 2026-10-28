// Single source of truth for Haven Vertex pricing. All prices are USD per month.
export const EXTRA_HOUR = 55;

export const TERMS = [
  { id: "m", label: "Month to month", short: "Monthly", off: 0, note: "No lock-in. Cancel with 14 days' notice." },
  { id: "6", label: "6-month commitment", short: "6 months", off: 0.1, note: "10% off. Billed monthly in advance." },
  { id: "12", label: "12 months, paid yearly", short: "12 months", off: 0.15, note: "15% off. Pay once a year in advance." },
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
  { t: "Paid in advance", p: "Monthly plans are invoiced before each month starts. Work for a new month begins once payment arrives." },
  { t: "Starting out", p: "Your first month is paid before any work begins. A free 30 minute call comes first, with no charge." },
  { t: "One-off projects", p: "Landing pages, setups and fixes are quoted up front. 50% deposit to book, 50% on delivery." },
  { t: "Hours and extras", p: `Each plan has a set number of hours a month. Extra time is $${EXTRA_HOUR} an hour, agreed with you first. Unused hours do not roll over.` },
  { t: "Changing or stopping", p: "Month-to-month plans can change or stop with 14 days' notice. If you leave a 6 or 12 month plan early, the months used are re-billed at the monthly rate." },
];
