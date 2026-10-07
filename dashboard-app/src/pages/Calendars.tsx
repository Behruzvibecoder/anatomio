import { useMemo, useState, useEffect, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { AnatomyIcon } from "../components/anatomy-icon";
import { useStore, type CalEvent, type EventTone } from "../store";

/* ------------------------------------------------------------------ */
/*  helpers                                                            */
/* ------------------------------------------------------------------ */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const pad = (n: number) => String(n).padStart(2, "0");
const keyOf = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (k: string) => {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const fmtDate = (k: string) => {
  const d = parse(k);
  return `${DAY[d.getDay()]}, ${d.getDate()} ${MON[d.getMonth()]}`;
};
const fmtTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${pad(h % 12 === 0 ? 12 : h % 12)}:${pad(m)} ${h >= 12 ? "PM" : "AM"}`;
};

// The design is set on 16 Aug 2023.
const TODAY = new Date(2023, 7, 16);
const TODAY_KEY = keyOf(TODAY);

const toneStyle: Record<EventTone, { bg: string; bar: string }> = {
  lime: { bg: "#a5ed6e", bar: "#a5ed6e" },
  lilac: { bg: "#e4dcfb", bar: "#cdbdf6" },
  peach: { bg: "#ffe0d0", bar: "#ffc4a8" },
  mint: { bg: "#d6f3e2", bar: "#a9e1c2" },
};

const categories: { label: string; tone: EventTone }[] = [
  { label: "Lecture", tone: "peach" },
  { label: "Workshop", tone: "lilac" },
  { label: "Quiz", tone: "mint" },
  { label: "Focus time", tone: "lime" },
];

/* ------------------------------------------------------------------ */
/*  page                                                               */
/* ------------------------------------------------------------------ */
export default function Calendars() {
  const { events, setEvents, toast } = useStore();
  const [cursor, setCursor] = useState({ y: 2023, m: 7 });
  const [modalDate, setModalDate] = useState<string | null>(null);

  const cells = useMemo(() => {
    const lead = new Date(cursor.y, cursor.m, 1).getDay();
    const days = new Date(cursor.y, cursor.m + 1, 0).getDate();
    const total = Math.ceil((lead + days) / 7) * 7;
    return Array.from({ length: total }, (_, i) => new Date(cursor.y, cursor.m, i - lead + 1));
  }, [cursor]);

  const byDay = useMemo(() => {
    const map = new Map<string, CalEvent[]>();
    [...events]
      .sort((a, b) => a.time.localeCompare(b.time))
      .forEach((e) => map.set(e.date, [...(map.get(e.date) ?? []), e]));
    return map;
  }, [events]);

  const upcoming = useMemo(
    () =>
      events
        .filter((e) => e.date >= TODAY_KEY)
        .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
        .slice(0, 6),
    [events],
  );

  const step = (dir: number) =>
    setCursor(({ y, m }) => {
      const d = new Date(y, m + dir, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const isCurrent = cursor.y === TODAY.getFullYear() && cursor.m === TODAY.getMonth();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_296px]">
      {/* ---------------- month grid ---------------- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-[24px] bg-white p-4 sm:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[22px] font-bold tracking-[-0.02em] sm:text-[24px]">
            {MONTHS[cursor.m]}, {cursor.y}
          </h2>
          <div className="flex items-center gap-2">
            {!isCurrent && (
              <button
                type="button"
                onClick={() => setCursor({ y: TODAY.getFullYear(), m: TODAY.getMonth() })}
                className="mr-1 rounded-full bg-brand-soft px-3.5 py-2 text-[11.5px] font-semibold text-brand-ink transition-colors hover:bg-brand"
              >
                Today
              </button>
            )}
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => step(-1)}
              className="grid size-9 place-items-center rounded-full bg-[#eef0e7] transition-all duration-300 hover:bg-brand active:scale-95"
            >
              <ChevronLeft className="size-4" strokeWidth={2.4} />
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => step(1)}
              className="grid size-9 place-items-center rounded-full bg-[#eef0e7] transition-all duration-300 hover:bg-brand active:scale-95"
            >
              <ChevronRight className="size-4" strokeWidth={2.4} />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-1.5 sm:gap-2">
          {DAY.map((d) => (
            <span key={d} className="pl-1 text-[11px] font-medium text-mute sm:pl-2 sm:text-[12px]">
              <span className="sm:hidden">{d[0]}</span>
              <span className="hidden sm:inline">{d}</span>
            </span>
          ))}
        </div>

        <div key={`${cursor.y}-${cursor.m}`} className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-2">
          {cells.map((d, idx) => {
            const k = keyOf(d);
            const inMonth = d.getMonth() === cursor.m;
            const isToday = k === TODAY_KEY;
            const list = byDay.get(k) ?? [];
            const shown = list.slice(0, 2);
            const more = list.length - shown.length;

            return (
              <motion.button
                key={k}
                type="button"
                onClick={() => setModalDate(k)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: Math.min(idx, 20) * 0.012 }}
                aria-label={`${fmtDate(k)}${list.length ? `, ${list.length} event${list.length > 1 ? "s" : ""}` : ""}. Add an event`}
                className={`group relative flex min-h-[62px] flex-col rounded-[14px] p-1.5 text-left transition-colors duration-300 sm:min-h-[96px] sm:rounded-[16px] sm:p-2 lg:min-h-[116px] ${
                  isToday ? "bg-sprout ring-1 ring-brand-deep/40" : "bg-fog hover:bg-[#eef0e7]"
                }`}
              >
                <span className="flex items-center justify-between px-1">
                  <span
                    className={`text-[12px] sm:text-[14px] ${isToday ? "font-bold" : "font-medium"} ${
                      inMonth ? "text-ink" : "text-[#c3c7ba]"
                    }`}
                  >
                    {d.getDate()}
                  </span>
                  <Plus className="hidden size-3.5 text-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block" />
                </span>

                {/* desktop chips */}
                <span className="mt-1.5 hidden flex-col gap-1 sm:flex">
                  {shown.map((e) => (
                    <span
                      key={e.id}
                      className="flex items-center gap-1.5 truncate rounded-[8px] px-2 py-[5px] text-[11px] font-semibold leading-none"
                      style={{ backgroundColor: toneStyle[e.tone].bg }}
                    >
                      {e.icon ? <AnatomyIcon name={e.icon} className="size-[11px]" /> : null}
                      <span className="truncate">{e.short ?? e.title}</span>
                    </span>
                  ))}
                  {more > 0 && <span className="px-1 text-[10.5px] font-medium text-mute">+{more} more</span>}
                </span>

                {/* mobile dots */}
                <span className="mt-auto flex gap-1 px-1 pb-0.5 sm:hidden">
                  {list.slice(0, 3).map((e) => (
                    <span key={e.id} className="size-1.5 rounded-full" style={{ backgroundColor: toneStyle[e.tone].bar }} />
                  ))}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* ---------------- upcoming ---------------- */}
      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
        className="flex flex-col rounded-[24px] bg-white p-5"
      >
        <h2 className="text-[19px] font-bold tracking-[-0.015em]">Upcoming Events</h2>

        <ul className="mt-4 space-y-2.5">
          {upcoming.length === 0 && (
            <li className="rounded-[16px] bg-fog p-5 text-center text-[13px] text-mute">
              Nothing planned. Add your first event below.
            </li>
          )}
          <AnimatePresence initial={false}>
            {upcoming.map((e) => (
              <motion.li
                key={e.id}
                layout
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.3 }}
                className="group flex overflow-hidden rounded-[16px] bg-fog transition-shadow duration-300 hover:shadow-[0_16px_28px_-20px_rgba(27,29,24,0.5)]"
              >
                <span className="w-1.5 shrink-0" style={{ backgroundColor: toneStyle[e.tone].bar }} />
                <div className="min-w-0 p-3.5 pl-3.5">
                  <p className="flex items-center gap-2 text-[14.5px] font-bold leading-tight">
                    {e.icon ? <AnatomyIcon name={e.icon} className="size-[15px] shrink-0" /> : null}
                    <span className="truncate">{e.title}</span>
                  </p>
                  <p className="mt-1.5 text-[12px] text-mute">
                    {fmtDate(e.date)} · {fmtTime(e.time)}
                  </p>
                  <span
                    className="mt-2 inline-block rounded-full px-2.5 py-[3px] text-[10.5px] font-semibold"
                    style={{ backgroundColor: toneStyle[e.tone].bg }}
                  >
                    {e.label}
                  </span>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <button
          type="button"
          onClick={() => setModalDate(TODAY_KEY)}
          className="mt-5 flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-brand text-[13px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_16px_28px_-14px_rgba(70,163,2,0.95)]"
        >
          <Plus className="size-4" strokeWidth={2.6} />
          Add Event
        </button>
      </motion.aside>

      <AnimatePresence>
        {modalDate && (
          <AddEventModal
            key="modal"
            date={modalDate}
            onClose={() => setModalDate(null)}
            onSave={(ev) => {
              setEvents((p) => [...p, { ...ev, id: Date.now() }]);
              const d = parse(ev.date);
              setCursor({ y: d.getFullYear(), m: d.getMonth() });
              setModalDate(null);
              toast(`Added “${ev.title}” on ${fmtDate(ev.date)}`);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  modal                                                              */
/* ------------------------------------------------------------------ */
function AddEventModal({
  date,
  onClose,
  onSave,
}: {
  date: string;
  onClose: () => void;
  onSave: (e: Omit<CalEvent, "id">) => void;
}) {
  const [title, setTitle] = useState("");
  const [d, setD] = useState(date);
  const [time, setTime] = useState("09:00");
  const [cat, setCat] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !d) return;
    onSave({ title: title.trim(), date: d, time, tone: categories[cat].tone, label: categories[cat].label });
  };

  const input =
    "mt-1.5 h-12 w-full rounded-[14px] bg-fog px-4 text-[14px] outline-none transition-shadow duration-300 focus:ring-4 focus:ring-brand/40";

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] grid place-items-center p-4"
    >
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={onClose} />
      <motion.form
        role="dialog"
        aria-modal="true"
        aria-label="Add event"
        onSubmit={submit}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative w-full max-w-[420px] rounded-[26px] bg-white p-6 shadow-[0_40px_80px_-30px_rgba(27,29,24,0.6)]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-bold tracking-[-0.015em]">Add event</h3>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full bg-fog transition-colors hover:bg-brand-soft"
          >
            <X className="size-4" />
          </button>
        </div>

        <label className="mt-5 block text-[12px] font-medium text-mute">
          Title
          <input
            autoFocus
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Portfolio review"
            className={input}
          />
        </label>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="block text-[12px] font-medium text-mute">
            Date
            <input type="date" required value={d} onChange={(e) => setD(e.target.value)} className={input} />
          </label>
          <label className="block text-[12px] font-medium text-mute">
            Time
            <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} className={input} />
          </label>
        </div>

        <fieldset className="mt-4">
          <legend className="text-[12px] font-medium text-mute">Category</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((c, i) => (
              <button
                key={c.label}
                type="button"
                aria-pressed={cat === i}
                onClick={() => setCat(i)}
                className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-300 ${
                  cat === i ? "ring-2 ring-ink ring-offset-2" : "opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: toneStyle[c.tone].bg }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="h-12 flex-1 rounded-full bg-ink text-[13px] font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            Save event
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-12 rounded-full bg-fog px-6 text-[13px] font-semibold transition-colors hover:bg-[#eef0e7]"
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </motion.div>,
    document.body,
  );
}
