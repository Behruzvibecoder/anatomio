import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BellRing, Play, Video } from "lucide-react";
import { Tabs } from "../components/kit";
import { useStore } from "../store";

/* ------------------------------------------------------------------ */
/*  timetable                                                          */
/* ------------------------------------------------------------------ */
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = [9, 10, 11, 12, 13, 14, 15];
const ROW = 80;
const START = 9;

const tone = {
  peach: "#ffe3d4",
  lilac: "#e4dcfb",
  mint: "#d9f4e3",
  sun: "#fff1bd",
} as const;

type Slot = { title: string; day: number; start: number; dur: number; tone: keyof typeof tone };

const slots: Slot[] = [
  { title: "Design System", day: 0, start: 9, dur: 1, tone: "peach" },
  { title: "Typography", day: 1, start: 10, dur: 1.5, tone: "lilac" },
  { title: "Color Style", day: 2, start: 11, dur: 1, tone: "mint" },
  { title: "Visual Design", day: 3, start: 9, dur: 2, tone: "peach" },
  { title: "UX Research", day: 4, start: 12, dur: 1, tone: "lilac" },
  { title: "Photography", day: 0, start: 13, dur: 1.5, tone: "mint" },
  { title: "Usability Test", day: 2, start: 13, dur: 1, tone: "sun" },
];

const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (h: number) => `${pad(Math.floor(h))}:${pad(Math.round((h % 1) * 60))}`;

/* ------------------------------------------------------------------ */
/*  live classes                                                       */
/* ------------------------------------------------------------------ */
type LiveTab = "upcoming" | "live" | "past";

type LiveClass = {
  id: string;
  title: string;
  tutor: string;
  when: string;
  status: "live" | "upcoming" | "past";
  tone: keyof typeof tone;
};

const classes: LiveClass[] = [
  { id: "ds", title: "Design System", tutor: "Micheal Andrew", when: "Today, 10:00 AM", status: "live", tone: "peach" },
  { id: "ty", title: "Typography", tutor: "Natalia Varman", when: "Today, 02:30 PM", status: "upcoming", tone: "lilac" },
  { id: "cs", title: "Color Style", tutor: "John Carter", when: "Tomorrow, 11:00 AM", status: "upcoming", tone: "mint" },
  { id: "vd", title: "Visual Design", tutor: "Anna Lee", when: "Wed, 09:00 AM", status: "upcoming", tone: "peach" },
  { id: "ph", title: "Photography Basics", tutor: "Natalia Varman", when: "Yesterday, 03:00 PM", status: "past", tone: "lilac" },
  { id: "ut", title: "Usability Test", tutor: "John Carter", when: "Mon, 01:00 PM", status: "past", tone: "sun" },
  { id: "wf", title: "Wireframing", tutor: "Anna Lee", when: "Fri, 11:00 AM", status: "past", tone: "mint" },
];

const tabs: { value: LiveTab; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "live", label: "Live now" },
  { value: "past", label: "Past" },
];

export default function Classes() {
  const { toast } = useStore();
  const [tab, setTab] = useState<LiveTab>("upcoming");
  const [day, setDay] = useState(2); // Wed
  const [reminded, setReminded] = useState<string[]>([]);

  const list = classes.filter((c) =>
    tab === "upcoming" ? c.status !== "past" : tab === "live" ? c.status === "live" : c.status === "past",
  );

  const remind = (c: LiveClass) => {
    const on = reminded.includes(c.id);
    setReminded((p) => (on ? p.filter((i) => i !== c.id) : [...p, c.id]));
    toast(on ? `Reminder removed for ${c.title}` : `We'll remind you before ${c.title}`);
  };

  return (
    <div>
      <Tabs id="classes" items={tabs} value={tab} onChange={setTab} />

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_326px]">
        {/* ---------------- Weekly timetable ---------------- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-[24px] bg-white p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[20px] font-bold tracking-[-0.015em]">Weekly Timetable</h2>
            <p className="text-[12px] text-mute">Aug 14 – Aug 20, 2023</p>
          </div>

          <div className="nice-scroll mt-6 overflow-x-auto pb-2">
            <div className="min-w-[640px]">
              {/* day header */}
              <div className="ml-[64px] grid grid-cols-5">
                {days.map((d, i) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDay(i)}
                    aria-pressed={day === i}
                    className={`pl-2.5 text-left text-[12.5px] transition-colors duration-300 ${
                      day === i ? "font-bold text-ink" : "font-medium text-mute hover:text-ink"
                    }`}
                  >
                    {d}
                    <span className="mt-1.5 block h-[3px] w-9">
                      {day === i && (
                        <motion.span
                          layoutId="day-underline"
                          className="block h-full w-full rounded-full bg-brand"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>

              {/* grid */}
              <div className="relative mt-3" style={{ height: ROW * (hours.length - 1) + 28 }}>
                {hours.map((h, i) => (
                  <div key={h}>
                    <span
                      className="absolute left-0 text-[12px] text-mute"
                      style={{ top: i * ROW - 8 }}
                    >
                      {pad(h)}:00
                    </span>
                  </div>
                ))}

                <div className="absolute inset-y-0 left-[64px] right-0">
                  {/* active-day wash */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 rounded-[14px] bg-sprout/60 transition-all duration-500"
                    style={{ left: `${day * 20}%`, width: "20%" }}
                  />
                  {hours.map((h, i) => (
                    <div
                      key={h}
                      className="absolute inset-x-0 border-t border-ink/[0.07]"
                      style={{ top: i * ROW }}
                    />
                  ))}

                  {slots.map((s) => (
                    <button
                      key={`${s.title}-${s.day}`}
                      type="button"
                      onClick={() => setDay(s.day)}
                      title={`${s.title} · ${days[s.day]} ${fmt(s.start)}–${fmt(s.start + s.dur)}`}
                      className="absolute overflow-hidden rounded-[14px] p-2.5 text-left transition-all duration-300 hover:z-10 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_-16px_rgba(27,29,24,0.5)]"
                      style={{
                        backgroundColor: tone[s.tone],
                        left: `calc(${s.day * 20}% + 4px)`,
                        width: "calc(20% - 8px)",
                        top: (s.start - START) * ROW + 3,
                        height: s.dur * ROW - 6,
                      }}
                    >
                      <span className="block truncate text-[12.5px] font-bold leading-tight">{s.title}</span>
                      <span className="mt-1 block truncate text-[10.5px] text-ink/50">Lecture · Room 2</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ---------------- Live classes ---------------- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          className="rounded-[24px] bg-white p-5"
        >
          <h2 className="text-[20px] font-bold tracking-[-0.015em]">Live Classes</h2>

          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="mt-4 space-y-3.5"
            >
              {list.length === 0 && (
                <li className="rounded-[18px] bg-fog p-6 text-center text-[13px] text-mute">
                  Nothing live right now. Check back at the next class time.
                </li>
              )}
              {list.map((c) => {
                const on = reminded.includes(c.id);
                return (
                  <li
                    key={c.id}
                    className="rounded-[18px] bg-fog p-3.5 transition-shadow duration-300 hover:shadow-[0_18px_30px_-22px_rgba(27,29,24,0.45)]"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="grid size-10 shrink-0 place-items-center rounded-[12px]"
                        style={{ backgroundColor: tone[c.tone] }}
                      >
                        <Video className="size-[18px] text-ink/70" strokeWidth={1.9} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[14.5px] font-bold leading-tight">{c.title}</p>
                        <p className="mt-1 truncate text-[11.5px] text-mute">{c.tutor}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-[13px] font-medium">{c.when}</p>

                    {c.status === "live" && (
                      <button
                        type="button"
                        onClick={() => toast(`Joining ${c.title}…`)}
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-[11.5px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_14px_24px_-12px_rgba(70,163,2,0.9)]"
                      >
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember opacity-70" />
                          <span className="relative inline-flex size-2 rounded-full bg-ember" />
                        </span>
                        Join Now
                      </button>
                    )}

                    {c.status === "upcoming" && (
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => remind(c)}
                        className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[11.5px] font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                          on ? "bg-brand-soft text-brand-ink" : "bg-ink text-white hover:bg-ink-soft"
                        }`}
                      >
                        {on && <BellRing className="size-3.5" strokeWidth={2.4} />}
                        {on ? "Reminder on" : "Remind me"}
                      </button>
                    )}

                    {c.status === "past" && (
                      <button
                        type="button"
                        onClick={() => toast(`Opening recording of ${c.title}`)}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-[11.5px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-soft"
                      >
                        <Play className="size-3 fill-ink" />
                        Watch recording
                      </button>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </motion.section>
      </div>
    </div>
  );
}
