import type { ReactNode } from "react";
import { motion } from "framer-motion";
import owlMark from "../assets/anatomio-owl.png";

/* ------------------------------------------------------------------ */
/*  shared tint tokens for icon tiles + status pills                    */
/* ------------------------------------------------------------------ */
export const tint = {
  brand: { bg: "#d7ffb8", fg: "#3f8f13" },
  lilac: { bg: "#ede6fb", fg: "#7b5ad6" },
  peach: { bg: "#fce5da", fg: "#d4683b" },
  mint: { bg: "#d9f4e3", fg: "#3f9a6a" },
  violet: { bg: "#e0d2f9", fg: "#7b5ad6" },
  rose: { bg: "#ffdada", fg: "#d65a5a" },
  sun: { bg: "#fff1bd", fg: "#b8860b" },
  ink: { bg: "#1b1d18", fg: "#58cc02" },
} as const;

export type TintKey = keyof typeof tint;

/* ------------------------------------------------------------------ */
/*  scroll reveal                                                      */
/* ------------------------------------------------------------------ */
export function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  the Anatomio mark — the owl from the landing page logo              */
/* ------------------------------------------------------------------ */
export function Logo({ className = "size-9" }: { className?: string }) {
  return (
    <img
      src={owlMark}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`shrink-0 object-contain ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  rounded icon tile                                                  */
/* ------------------------------------------------------------------ */
export function Tile({
  tone,
  children,
  className = "size-11 rounded-[14px]",
}: {
  tone: TintKey;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center ${className}`}
      style={{ backgroundColor: tint[tone].bg, color: tint[tone].fg }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  progress ring that draws itself on scroll                          */
/* ------------------------------------------------------------------ */
export function Ring({
  value,
  size = 36,
  stroke = 4,
  color = "#1b1d18",
  track = "#e6e8df",
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  section heading with an optional right-hand action                 */
/* ------------------------------------------------------------------ */
export function Heading({
  title,
  children,
  className = "",
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{title}</h2>
      {children}
    </div>
  );
}
