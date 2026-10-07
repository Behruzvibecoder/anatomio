export type Colorway = {
  id: string;
  name: string;
  hex: string;
  image: string;
  /** CSS filter that recolors the master shoe render for this colorway. */
  filter?: string;
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  model: string;
  price: number;
  tagline: string;
  colors: Colorway[];
};

/** Single tack-sharp master render — every colorway is derived from it. */
const MASTER = "/images/shoe-magenta.png";

const MAGENTA: Colorway = {
  id: "magenta",
  name: "Pulse Magenta",
  hex: "#ff2bd6",
  image: MASTER,
};

const CYAN: Colorway = {
  id: "cyan",
  name: "Ion Cyan",
  hex: "#00d4ff",
  image: MASTER,
  filter: "hue-rotate(238deg) saturate(1.15)",
};

const ICE: Colorway = {
  id: "ice",
  name: "Ice White",
  hex: "#e8eef5",
  image: MASTER,
  filter: "saturate(0.12) brightness(1.16) contrast(1.04)",
};

const CRIMSON: Colorway = {
  id: "crimson",
  name: "Crimson",
  hex: "#f43f5e",
  image: MASTER,
  filter: "hue-rotate(44deg) saturate(1.2)",
};

const VOLT: Colorway = {
  id: "volt",
  name: "Volt",
  hex: "#c6ff00",
  image: MASTER,
  filter: "hue-rotate(146deg) saturate(1.35) brightness(1.06)",
};

export const products: Product[] = [
  {
    id: "pulse",
    name: "ADAPT",
    subtitle: "SELF-LACING",
    model: "Adapt BB Pulse",
    price: 379,
    tagline: "Get the right fit, every game, every step.",
    colors: [MAGENTA, CYAN],
  },
  {
    id: "ion",
    name: "ADAPT",
    subtitle: "SELF-LACING",
    model: "Adapt BB Ion",
    price: 379,
    tagline: "Electric control. Zero laces. Instant lock-in.",
    colors: [CYAN, MAGENTA],
  },
  {
    id: "ice",
    name: "ADAPT",
    subtitle: "SELF-LACING",
    model: "Adapt BB Ice",
    price: 359,
    tagline: "Cool under pressure. Fitted for the fourth.",
    colors: [ICE, CYAN],
  },
  {
    id: "crimson",
    name: "ADAPT",
    subtitle: "SELF-LACING",
    model: "Adapt BB Crimson",
    price: 379,
    tagline: "Heat for the hardwood. Precision for the play.",
    colors: [CRIMSON, MAGENTA],
  },
  {
    id: "volt",
    name: "ADAPT",
    subtitle: "SELF-LACING",
    model: "Adapt BB Volt",
    price: 399,
    tagline: "Voltage on demand. Fit that keeps up.",
    colors: [VOLT, CYAN],
  },
];

export const sizes = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"];

export const sizeGuide = [
  { uk: "6", us: "7", eu: "40", cm: "25" },
  { uk: "7", us: "8", eu: "41", cm: "26" },
  { uk: "8", us: "9", eu: "42.5", cm: "27" },
  { uk: "9", us: "10", eu: "44", cm: "28" },
  { uk: "10", us: "11", eu: "45", cm: "29" },
  { uk: "11", us: "12", eu: "46", cm: "30" },
  { uk: "12", us: "13", eu: "47.5", cm: "31" },
];

export const features = [
  {
    title: "Adaptive Fit",
    kicker: "01 — Motors",
    copy: "Four underfoot motors read pressure in real time and lace you in — tighter for cut-and-go, looser for recovery.",
  },
  {
    title: "Engineered Knit",
    kicker: "02 — Upper",
    copy: "A sock-like bootie maps the foot without traditional laces. Breathable, locked, and built for four quarters.",
    image: "/images/knit-detail.png",
  },
  {
    title: "LED Intelligence",
    kicker: "03 — Feedback",
    copy: "Midsole indicators pulse battery, pairing, and fit status so you know you’re game-ready before tip-off.",
    image: "/images/tech-leds.png",
  },
];

export const steps = [
  { n: "01", title: "Slip on", copy: "No knots. No wasted seconds. The collar opens, you step in, the system wakes." },
  { n: "02", title: "It maps you", copy: "Pressure sensors chart your foot in motion — not a static last, a living fit." },
  { n: "03", title: "Motors lock", copy: "Hidden cables cinch in milliseconds. Dial it from the tongue or the app." },
  { n: "04", title: "Play, adjust", copy: "Mid-game swell? Tap looser. Need lockdown? One press. The fit keeps thinking." },
];

export const specs = [
  { label: "Silhouette", value: "Basketball / Court" },
  { label: "Closure", value: "Adaptive self-lacing" },
  { label: "Upper", value: "Engineered knit bootie" },
  { label: "Motors", value: "Quad midfoot actuators" },
  { label: "Battery", value: "~14 days mixed use" },
  { label: "Charge", value: "Magnetic puck, ~3 hrs" },
  { label: "App", value: "iOS & Android" },
  { label: "Drop", value: "10 mm court geometry" },
];
