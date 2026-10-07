import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { AnatomyIcon } from "./anatomy-icon";
import { Heading, Ring, Section, Tile } from "./ui";

/* ------------------------------------------------------------------ */
/*  New Courses                                                        */
/* ------------------------------------------------------------------ */
const courses = [
  {
    title: "Skeletal System",
    lessons: "12 Lessons",
    rate: "4.6",
    type: "Osteology",
    tone: "peach" as const,
    icon: "skeleton" as const,
  },
  {
    title: "Cardiovascular System",
    lessons: "10 Lessons",
    rate: "5.0",
    type: "Angiology",
    tone: "brand" as const,
    icon: "heart" as const,
  },
  {
    title: "Nervous System",
    lessons: "8 Lessons",
    rate: "4.6",
    type: "Neurology",
    tone: "lilac" as const,
    icon: "brain" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  Hours activity                                                     */
/* ------------------------------------------------------------------ */
const week = [
  { day: "Su", time: "4h 12m", date: "23 Jul 2023", hours: 4.2 },
  { day: "Mo", time: "5h 36m", date: "24 Jul 2023", hours: 5.6 },
  { day: "Tu", time: "3h 06m", date: "25 Jul 2023", hours: 3.1 },
  { day: "We", time: "8h 40m", date: "26 Jul 2023", hours: 8.66 },
  { day: "Th", time: "6h 24m", date: "27 Jul 2023", hours: 6.4 },
  { day: "Fr", time: "2h 48m", date: "28 Jul 2023", hours: 2.8 },
  { day: "Sa", time: "4h 54m", date: "29 Jul 2023", hours: 4.9 },
];
const CHART_H = 152;
const MAX_H = 11;

/* ------------------------------------------------------------------ */
/*  Daily schedule                                                     */
/* ------------------------------------------------------------------ */
const schedule = [
  { title: "Skeletal System", meta: "Lesson • Class", tone: "brand" as const, icon: "skeleton" as const },
  { title: "Neuroanatomy", meta: "Group • Test", tone: "peach" as const, icon: "brain" as const },
  { title: "Cardiovascular System", meta: "Group • Test", tone: "brand" as const, icon: "heart" as const },
  { title: "Respiratory System", meta: "Lesson • Test", tone: "lilac" as const, icon: "lungs" as const },
];

/* ------------------------------------------------------------------ */
/*  Courses you're taking                                              */
/* ------------------------------------------------------------------ */
const taking = [
  {
    title: "Advanced Neuroanatomy",
    tutor: "with Dr. Michael Andrews",
    remaining: "8h 45 min",
    progress: 45,
    tone: "lilac" as const,
    icon: "brain-side" as const,
  },
  {
    title: "Regional Anatomy: Thorax",
    tutor: "with Dr. Natalia Verner",
    remaining: "10h 12 min",
    progress: 75,
    tone: "peach" as const,
    icon: "body-lateral" as const,
  },
];

function Drop({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-[10px] font-medium text-ink/70 transition-colors duration-300 hover:border-brand-deep/50 hover:text-ink"
    >
      {label}
      <ChevronDown className="size-3" strokeWidth={2.4} />
    </button>
  );
}

export default function MainColumn() {
  const [hovered, setHovered] = useState<number | null>(null);
  const activeBar = hovered ?? 3;

  return (
    <div className="space-y-6">
      {/* ---------------- New Courses ---------------- */}
      <Section>
        <Heading title="New Courses">
          <a
            href="#/courses"
            className="group inline-flex items-center gap-1 text-[10px] font-medium text-mute transition-colors duration-300 hover:text-ink"
          >
            View All
            <ChevronRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Heading>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {courses.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.25, delay: 0 } }}
              className="group rounded-[20px] border border-ink/[0.07] bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:border-brand-deep/30 hover:shadow-[0_26px_50px_-26px_rgba(27,29,24,0.4)]"
            >
              <div className="flex items-start gap-3">
                <Tile tone={c.tone} className="size-[42px] rounded-[13px]">
                  <AnatomyIcon name={c.icon} className="size-[19px]" />
                </Tile>
                <div className="min-w-0">
                  <h3 className="truncate text-[13px] font-semibold leading-tight">{c.title}</h3>
                  <p className="mt-1 text-[9.5px] text-mute">{c.lessons}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-ink/[0.07] pt-3">
                <div>
                  <p className="text-[8.5px] font-medium uppercase tracking-[0.14em] text-mute">
                    Rate
                  </p>
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold">
                    <Star className="size-3 fill-brand-deep text-brand-deep" />
                    {c.rate}
                  </p>
                </div>
                <div>
                  <p className="text-[8.5px] font-medium uppercase tracking-[0.14em] text-mute">
                    Type
                  </p>
                  <p className="mt-1.5 truncate text-[11px] font-medium">{c.type}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* ---------------- Activity + Schedule ---------------- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Section className="rounded-[22px] border border-ink/[0.07] bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[15px] font-semibold tracking-[-0.01em]">Hours Activity</h2>
              <p className="mt-2 flex items-center gap-2 text-[9.5px] text-mute">
                <span className="rounded-full bg-brand px-2 py-[3px] text-[8.5px] font-semibold text-ink">
                  +12%
                </span>
                Increase than last week
              </p>
            </div>
            <Drop label="Weekly" />
          </div>

          <div className="mt-5 flex gap-3">
            <div className="flex flex-col justify-between pb-[18px] text-[9px] font-medium text-mute">
              {["8h", "6h", "4h", "2h", "1h"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            <div className="relative flex-1">
              <div className="absolute inset-x-0 top-0 flex flex-col justify-between" style={{ height: CHART_H }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-px w-full bg-ink/[0.07]" />
                ))}
              </div>

              <div className="flex items-end gap-1.5" style={{ height: CHART_H }}>
                {week.map((b, i) => {
                  const h = (b.hours / MAX_H) * CHART_H;
                  const isActive = activeBar === i;
                  return (
                    <div
                      key={b.day}
                      className="relative flex h-full flex-1 items-end justify-center"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {isActive && (
                        <div
                          className={`pointer-events-none absolute z-10 ${
                            i >= week.length - 2
                              ? "right-0"
                              : i <= 1
                                ? "left-0"
                                : "left-1/2 -translate-x-1/2"
                          }`}
                          style={{ bottom: h + 12 }}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="whitespace-nowrap rounded-[12px] bg-ink px-2.5 py-1.5 text-center shadow-[0_16px_30px_-16px_rgba(27,29,24,0.7)]"
                          >
                            <p className="text-[10.5px] font-semibold leading-none text-white">
                              {b.time}
                            </p>
                            <p className="mt-1 text-[8px] leading-none text-white/60">{b.date}</p>
                          </motion.div>
                        </div>
                      )}
                      <motion.span
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.07 }}
                        className="w-[9px] origin-bottom rounded-full transition-colors duration-300"
                        style={{
                          height: h,
                          backgroundColor: isActive ? "#58cc02" : "#1b1d18",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-2.5 flex gap-1.5">
                {week.map((b) => (
                  <span
                    key={b.day}
                    className="flex-1 text-center text-[9px] font-medium text-mute"
                  >
                    {b.day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          delay={0.08}
          className="flex flex-col rounded-[22px] border border-ink/[0.07] bg-white p-5"
        >
          <Heading title="Daily Schedule" />
          <ul className="mt-3 flex flex-1 flex-col justify-between">
            {schedule.map((s) => (
              <li key={s.title}>
                <a
                  href="#"
                  className="group flex items-center gap-3 rounded-[15px] p-2 transition-colors duration-300 hover:bg-paper"
                >
                  <Tile tone={s.tone} className="size-[38px] rounded-[12px]">
                    <AnatomyIcon name={s.icon} className="size-[17px]" />
                  </Tile>
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-semibold leading-tight">{s.title}</p>
                    <p className="mt-[3px] truncate text-[9px] text-mute">{s.meta}</p>
                  </div>
                  <span className="ml-auto grid size-7 shrink-0 place-items-center rounded-full bg-paper text-mute transition-all duration-300 group-hover:bg-brand group-hover:text-ink">
                    <ChevronRight className="size-3.5" strokeWidth={2.2} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* ---------------- Courses you're taking ---------------- */}
      <Section>
        <Heading title="Course You're Taking">
          <div className="flex items-center gap-2">
            <Drop label="Active" />
            <button
              type="button"
              aria-label="Add a course"
              className="grid size-8 place-items-center rounded-full bg-brand text-ink transition-all duration-300 hover:rotate-90 hover:bg-brand-deep"
            >
              <Plus className="size-4" strokeWidth={2.6} />
            </button>
          </div>
        </Heading>

        <div className="mt-4 space-y-3">
          {taking.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.25, delay: 0 } }}
              className="group flex items-center gap-3.5 rounded-[18px] border border-ink/[0.07] bg-white p-3.5 transition-[border-color,box-shadow] duration-300 hover:border-brand-deep/30 hover:shadow-[0_26px_50px_-28px_rgba(27,29,24,0.4)]"
            >
              <Tile tone={c.tone} className="size-[46px] rounded-[15px]">
                <AnatomyIcon name={c.icon} className="size-5" />
              </Tile>

              <div className="min-w-0">
                <h3 className="truncate text-[12.5px] font-semibold leading-tight">{c.title}</h3>
                <p className="mt-1 truncate text-[9.5px] text-mute">{c.tutor}</p>
              </div>

              <div className="ml-auto flex items-center gap-4 sm:gap-6">
                <div className="hidden text-right sm:block">
                  <p className="text-[8.5px] font-medium uppercase tracking-[0.14em] text-mute">
                    Remaining
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium">{c.remaining}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Ring value={c.progress} size={34} />
                  <span className="w-8 text-[11px] font-semibold tabular-nums">
                    {c.progress}%
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>
    </div>
  );
}
