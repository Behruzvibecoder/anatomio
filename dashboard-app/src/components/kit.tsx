import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronDown, type LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Avatar                                                             */
/* ------------------------------------------------------------------ */
export const avatarTones = {
  peach: "#ffb98f",
  violet: "#c9a8f5",
  mint: "#9adcc0",
  rose: "#ffd0d0",
  blue: "#bcd5ff",
  lime: "#cdeb43",
} as const;

export type AvatarTone = keyof typeof avatarTones;

export const avatarFallback =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44'%3E%3Crect width='44' height='44' fill='%23d8f24f'/%3E%3Ccircle cx='22' cy='17.5' r='7.5' fill='%231b1d18'/%3E%3Cpath d='M22 27c-7.2 0-13 4.6-13 10.3V44h26v-6.7C35 31.6 29.2 27 22 27z' fill='%231b1d18'/%3E%3C/svg%3E";

export function Avatar({
  name,
  tone,
  className = "size-10 text-[12px]",
}: {
  name: string;
  tone: AvatarTone;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-semibold text-ink/65 ${className}`}
      style={{ backgroundColor: avatarTones[tone] }}
    >
      {initials}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Pill tabs — the active pill glides between options                 */
/* ------------------------------------------------------------------ */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  id,
  className = "",
}: {
  items: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  id: string;
  className?: string;
}) {
  return (
    <div role="tablist" className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(it.value)}
            className={`relative rounded-full border border-ink/[0.05] bg-white px-4 py-2.5 text-[12px] font-semibold transition-colors duration-300 sm:px-5 sm:text-[12.5px] ${
              active ? "" : "hover:bg-brand-soft"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`tab-${id}`}
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className={`relative transition-colors duration-300 ${active ? "text-white" : "text-ink"}`}>
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Select — native element (great a11y + mobile), custom chrome       */
/* ------------------------------------------------------------------ */
export function Select<T extends string>({
  value,
  onChange,
  options,
  label,
  className = "",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  label: string;
  className?: string;
}) {
  return (
    <label
      className={`relative block transition-shadow duration-300 focus-within:ring-4 focus-within:ring-brand/40 ${className}`}
    >
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-full w-full cursor-pointer appearance-none rounded-[inherit] bg-transparent pl-4 pr-10 text-[12.5px] font-medium text-ink outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-ink/60"
        strokeWidth={2.4}
      />
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Switch                                                             */
/* ------------------------------------------------------------------ */
export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[26px] w-12 shrink-0 rounded-full transition-colors duration-300 ${
        checked ? "bg-brand" : "bg-[#e1e3da]"
      }`}
    >
      <span
        className={`absolute left-[3px] top-[3px] size-5 rounded-full transition-all duration-300 ${
          checked ? "translate-x-[22px] bg-ink" : "translate-x-0 bg-white shadow-[0_2px_5px_rgba(27,29,24,0.25)]"
        }`}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty state                                                        */
/* ------------------------------------------------------------------ */
export function EmptyState({
  icon: Icon,
  title,
  text,
  action,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="mt-6 grid place-items-center rounded-[24px] border border-dashed border-ink/15 bg-white/60 px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-brand-soft text-brand-ink">
        <Icon className="size-6" strokeWidth={1.9} />
      </span>
      <h3 className="mt-4 text-[16px] font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-[320px] text-[13px] leading-relaxed text-mute">{text}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
