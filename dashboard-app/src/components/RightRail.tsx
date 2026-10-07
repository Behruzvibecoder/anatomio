import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { AnatomyIcon } from "./anatomy-icon";
import { Heading, Logo, Section, Tile } from "./ui";
import { Artwork } from "./art";

/* ------------------------------------------------------------------ */
/*  Assignments                                                        */
/* ------------------------------------------------------------------ */
const assignments = [
  {
    title: "Axial skeleton quiz",
    due: "12 July, 10:30 AM",
    status: "In progress",
    tone: "brand" as const,
    icon: "bone" as const,
    pill: { bg: "#ede6fb", fg: "#7b5ad6" },
  },
  {
    title: "Cardiac cycle report",
    due: "24 June, 11:00 AM",
    status: "Completed",
    tone: "lilac" as const,
    icon: "heart" as const,
    pill: { bg: "#d7ffb8", fg: "#3f8f13" },
  },
  {
    title: "Lung volumes test",
    due: "12 May, 11:00 AM",
    status: "Upcoming",
    tone: "peach" as const,
    icon: "lungs" as const,
    pill: { bg: "#fce5da", fg: "#d4683b" },
  },
];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function RightRail() {
  const [cursor, setCursor] = useState({ y: 2023, m: 7 }); // August 2023
  const [selected, setSelected] = useState(26);

  const cells = useMemo(() => {
    const firstDay = new Date(cursor.y, cursor.m, 1).getDay();
    const days = new Date(cursor.y, cursor.m + 1, 0).getDate();
    return [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: days }, (_, i) => i + 1),
    ];
  }, [cursor]);

  const step = (dir: number) => {
    setSelected(1);
    setCursor(({ y, m }) => {
      const d = new Date(y, m + dir, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  };

  return (
    <div className="space-y-6">
      {/* ---------------- Go Premium ---------------- */}
      <Section className="relative overflow-hidden rounded-[22px] bg-ink p-5 text-white">
        <Artwork
          name="premium"
          className="pointer-events-none absolute inset-0 size-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />

        <div className="relative">
          <div className="flex items-center gap-2">
            <Logo className="size-7" />
            <span className="text-[13px] font-semibold tracking-[-0.02em]">Anatomio</span>
          </div>

          <h2 className="mt-7 text-[19px] font-semibold leading-[1.15] tracking-[-0.02em]">
            Go Premium
          </h2>
          <p className="mt-2 max-w-[190px] text-[10.5px] leading-[1.65] text-white/60">
            Explore 250+ courses with lowdown 70% off
          </p>

          <button
            type="button"
            className="mt-5 rounded-full bg-brand px-5 py-2.5 text-[11px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_34px_-16px_rgba(88,204,2,0.65)]"
          >
            Get Access
          </button>
        </div>
      </Section>

      {/* ---------------- Calendar ---------------- */}
      <Section delay={0.06} className="rounded-[22px] border border-ink/[0.07] bg-white p-5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => step(-1)}
            className="grid size-8 place-items-center rounded-full border border-ink/10 text-mute transition-colors duration-300 hover:border-brand-deep/50 hover:bg-brand hover:text-ink"
          >
            <ChevronLeft className="size-3.5" strokeWidth={2.2} />
          </button>
          <h2 className="text-[13px] font-semibold tracking-[-0.01em]">
            {MONTHS[cursor.m]}, {cursor.y}
          </h2>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => step(1)}
            className="grid size-8 place-items-center rounded-full border border-ink/10 text-mute transition-colors duration-300 hover:border-brand-deep/50 hover:bg-brand hover:text-ink"
          >
            <ChevronRight className="size-3.5" strokeWidth={2.2} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-y-1">
          {WEEKDAYS.map((d, i) => (
            <span
              key={`${d}-${i}`}
              className="text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-mute"
            >
              {d}
            </span>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-y-1.5">
          {cells.map((day, i) =>
            day === null ? (
              <span key={`empty-${i}`} />
            ) : (
              <button
                key={day}
                type="button"
                onClick={() => setSelected(day)}
                className={`mx-auto grid size-[26px] place-items-center rounded-full text-[10px] transition-colors duration-200 ${
                  selected === day
                    ? "bg-brand font-semibold text-ink"
                    : "font-medium text-ink/70 hover:bg-brand-soft hover:text-ink"
                }`}
              >
                {day}
              </button>
            ),
          )}
        </div>
      </Section>

      {/* ---------------- Assignments ---------------- */}
      <Section delay={0.12} className="rounded-[22px] border border-ink/[0.07] bg-white p-5">
        <Heading title="Assignments">
          <button
            type="button"
            aria-label="Add an assignment"
            className="grid size-8 place-items-center rounded-full bg-brand text-ink transition-all duration-300 hover:rotate-90 hover:bg-brand-deep"
          >
            <Plus className="size-4" strokeWidth={2.6} />
          </button>
        </Heading>

        <ul className="mt-3 space-y-1">
          {assignments.map((a, i) => (
            <motion.li
              key={a.title}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            >
              <a
                href="#"
                className="group flex items-center gap-3 rounded-[15px] p-2.5 transition-colors duration-300 hover:bg-paper"
              >
                <Tile tone={a.tone} className="size-[38px] rounded-[12px]">
                  <AnatomyIcon name={a.icon} className="size-[17px]" />
                </Tile>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-semibold leading-tight">{a.title}</p>
                  <p className="mt-[3px] truncate text-[9px] text-mute">{a.due}</p>
                </div>
                <span
                  className="ml-auto shrink-0 rounded-full px-2.5 py-[5px] text-[8.5px] font-semibold"
                  style={{ backgroundColor: a.pill.bg, color: a.pill.fg }}
                >
                  {a.status}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
