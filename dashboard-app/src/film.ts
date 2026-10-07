/** 20-second Adapt BB commercial — one continuous camera, one product image. */

export const FILM_DURATION = 20000;
export const SHOE_SRC = "/images/shoe-magenta.png";
export const COURT_SRC = "/images/court-atmosphere.png";

export type Cam = {
  t: number;
  x?: number;
  y?: number;
  scale?: number;
  rot?: number;
  spin?: number;
  blur?: number;
  light?: number;
  opacity?: number;
};

const TILT = -9.5;

/**
 * Camera path. t is 0..1 over 20s.
 *  0.00–0.10  darkness → cyan underglow reveal
 *  0.10–0.18  extreme macro of knit
 *  0.18–0.28  travel to the magenta swoosh
 *  0.28–0.40  drop to the midsole / LED side
 *  0.40–0.55  lift, orbit, self-lace
 *  0.55–0.75  night court stride
 *  0.75–0.90  land, 360 hero orbit
 *  0.90–1.00  clean side-profile + titles
 */
export const camKeys: Cam[] = [
  { t: 0.0, scale: 0.82, x: 0, y: 10, rot: TILT, spin: -8, blur: 10, light: 0.05, opacity: 0 },
  { t: 0.03, scale: 0.88, y: 8, opacity: 0.35, light: 0.15, blur: 6 },
  { t: 0.1, scale: 1.02, x: 0, y: 2, rot: TILT, spin: -4, blur: 0, light: 0.7, opacity: 1 },
  { t: 0.18, scale: 5.1, x: 14, y: -20, rot: -5, spin: 2, blur: 0.4, light: 0.85 },
  { t: 0.23, scale: 3.55, x: 10, y: 1, rot: -7, spin: 0, light: 1 },
  { t: 0.28, scale: 2.9, x: 6, y: 4, rot: TILT, spin: -2, light: 0.95 },
  { t: 0.34, scale: 2.35, x: -18, y: 16, rot: -8, spin: 4, light: 1 },
  { t: 0.4, scale: 1.55, x: -6, y: 6, rot: TILT, spin: 6, light: 0.9 },
  { t: 0.44, scale: 1.18, x: 0, y: -7, rot: TILT, spin: 14, light: 0.95 },
  { t: 0.5, scale: 1.22, x: 4, y: -10, rot: -8, spin: -16, light: 1 },
  { t: 0.55, scale: 1.16, x: 0, y: -4, rot: TILT, spin: 8, light: 0.9 },
  { t: 0.58, scale: 1.55, x: -22, y: 20, rot: -4, spin: -10, blur: 5, light: 0.8 },
  { t: 0.63, scale: 1.7, x: -4, y: 26, rot: -2, spin: -4, blur: 2, light: 0.85 },
  { t: 0.68, scale: 1.85, x: 14, y: 18, rot: -6, spin: 8, blur: 6, light: 0.8 },
  { t: 0.73, scale: 2.1, x: 8, y: 28, rot: 0, spin: 0, blur: 1.5, light: 0.9 },
  { t: 0.78, scale: 1.08, x: 0, y: 6, rot: TILT, spin: -28, blur: 0, light: 0.85 },
  { t: 0.84, scale: 1.06, x: 2, y: 1, rot: TILT, spin: 22, light: 1 },
  { t: 0.9, scale: 1.02, x: 0, y: 2, rot: TILT, spin: 4, light: 0.95 },
  { t: 0.95, scale: 1.0, x: 0, y: 1, rot: TILT, spin: 0, blur: 0, light: 1, opacity: 1 },
  { t: 1.0, scale: 1.0, x: 0, y: 1, rot: TILT, spin: 0, light: 1, opacity: 1 },
];

export type Cue = { from: number; to: number; kicker: string; line: string };

export const liveCues: Cue[] = [
  { from: 0.06, to: 0.14, kicker: "", line: "" },
  { from: 0.14, to: 0.22, kicker: "ENGINEERED KNIT", line: "" },
  { from: 0.22, to: 0.3, kicker: "PULSE MAGENTA", line: "" },
  { from: 0.3, to: 0.4, kicker: "LED INTELLIGENCE", line: "" },
  { from: 0.4, to: 0.54, kicker: "SELF-LACING", line: "" },
  { from: 0.56, to: 0.74, kicker: "GAME READY", line: "" },
];

export const endTitles: Cue[] = [
  { from: 0.905, to: 0.94, kicker: "", line: "SELF-LACING" },
  { from: 0.94, to: 0.975, kicker: "", line: "GET THE RIGHT FIT. EVERY GAME." },
  { from: 0.975, to: 1.02, kicker: "", line: "$379" },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export type SampledCam = Required<Omit<Cam, "t">>;

export function sampleCam(t: number, keys: Cam[] = camKeys): SampledCam {
  const fallback: SampledCam = {
    x: 0,
    y: 0,
    scale: 1,
    rot: TILT,
    spin: 0,
    blur: 0,
    light: 1,
    opacity: 1,
  };
  const val = (k: Cam, key: keyof SampledCam) =>
    (k[key] as number | undefined) ?? fallback[key];

  if (t <= keys[0].t) {
    const k = keys[0];
    return {
      x: val(k, "x"),
      y: val(k, "y"),
      scale: val(k, "scale"),
      rot: val(k, "rot"),
      spin: val(k, "spin"),
      blur: val(k, "blur"),
      light: val(k, "light"),
      opacity: val(k, "opacity"),
    };
  }
  const last = keys[keys.length - 1];
  if (t >= last.t) {
    return {
      x: val(last, "x"),
      y: val(last, "y"),
      scale: val(last, "scale"),
      rot: val(last, "rot"),
      spin: val(last, "spin"),
      blur: val(last, "blur"),
      light: val(last, "light"),
      opacity: val(last, "opacity"),
    };
  }

  let a = keys[0];
  let b = keys[1];
  for (let i = 0; i < keys.length - 1; i++) {
    if (t >= keys[i].t && t <= keys[i + 1].t) {
      a = keys[i];
      b = keys[i + 1];
      break;
    }
  }
  const p = ease((t - a.t) / (b.t - a.t || 1));
  const pick = (key: keyof SampledCam) => {
    const av = a[key] as number | undefined;
    const bv = b[key] as number | undefined;
    if (av === undefined && bv === undefined) return fallback[key];
    if (av === undefined) return bv as number;
    if (bv === undefined) return av;
    return lerp(av, bv, p);
  };
  return {
    x: pick("x"),
    y: pick("y"),
    scale: pick("scale"),
    rot: pick("rot"),
    spin: pick("spin"),
    blur: pick("blur"),
    light: pick("light"),
    opacity: pick("opacity"),
  };
}

/** Smooth 0→1→0 window. */
export function gate(t: number, a: number, b: number, fade = 0.03) {
  if (t < a || t > b) return 0;
  if (t < a + fade) return ease((t - a) / fade);
  if (t > b - fade) return ease((b - t) / fade);
  return 1;
}

export function ramp(t: number, a: number, b: number) {
  if (t <= a) return 0;
  if (t >= b) return 1;
  return ease((t - a) / (b - a));
}

export function ledLevel(t: number, i: number) {
  const start = 0.3 + i * 0.032;
  return ramp(t, start, start + 0.025);
}

export function laceLevel(t: number) {
  return ramp(t, 0.42, 0.52);
}

export function courtLevel(t: number) {
  return gate(t, 0.545, 0.755, 0.035);
}

export function stepSquash(t: number) {
  // Two foot-plants during the court beat.
  const hits = [0.63, 0.725];
  let s = 0;
  for (const h of hits) {
    const d = Math.abs(t - h);
    if (d < 0.018) s = Math.max(s, 1 - d / 0.018);
  }
  return s;
}

export type Particle = { x: number; y: number; s: number; d: number; delay: number };

export function makeParticles(n = 48): Particle[] {
  return Array.from({ length: n }, (_, i) => ({
    x: (i * 47) % 100,
    y: (i * 31) % 100,
    s: 1 + (i % 5),
    d: 7 + (i % 9),
    delay: (i % 10) * -0.7,
  }));
}
