import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  Box,
  Camera,
  Code2,
  Database,
  Film,
  Layers,
  MousePointerClick,
  Palette,
  PenLine,
  SearchX,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Avatar, EmptyState, Select, Tabs, type AvatarTone } from "../components/kit";
import { useStore } from "../store";

const thumb = {
  peach: "#ffe3d4",
  mint: "#d9f4e3",
  lilac: "#e4dcfb",
  violet: "#dccbf7",
  rose: "#ffd6d6",
  sun: "#fff1b8",
} as const;

type Course = {
  id: number;
  title: string;
  lessons: number;
  hours: string;
  rating: number;
  tutor: string;
  tutorTone: AvatarTone;
  progress: number;
  color: keyof typeof thumb;
  icon: LucideIcon;
};

// The first six are the cards from the design; the last three are finished
// courses so the "Completed" filter has something real to show.
const courses: Course[] = [
  { id: 1, title: "Content Writing", lessons: 12, hours: "6h 30m", rating: 4.8, tutor: "Micheal Andrew", tutorTone: "peach", progress: 60, color: "peach", icon: PenLine },
  { id: 2, title: "Usability Testing", lessons: 15, hours: "6h 30m", rating: 5.0, tutor: "Micheal Andrew", tutorTone: "peach", progress: 30, color: "mint", icon: MousePointerClick },
  { id: 3, title: "Photography", lessons: 8, hours: "6h 30m", rating: 4.6, tutor: "Micheal Andrew", tutorTone: "peach", progress: 85, color: "lilac", icon: Camera },
  { id: 4, title: "3D Design Course", lessons: 24, hours: "6h 30m", rating: 4.9, tutor: "Micheal Andrew", tutorTone: "peach", progress: 45, color: "violet", icon: Box },
  { id: 5, title: "Development Basics", lessons: 18, hours: "6h 30m", rating: 4.7, tutor: "Micheal Andrew", tutorTone: "peach", progress: 75, color: "rose", icon: Code2 },
  { id: 6, title: "Data Research", lessons: 10, hours: "6h 30m", rating: 4.5, tutor: "Micheal Andrew", tutorTone: "peach", progress: 20, color: "sun", icon: Database },
  { id: 7, title: "UI Fundamentals", lessons: 20, hours: "9h 10m", rating: 4.9, tutor: "Natalia Varman", tutorTone: "violet", progress: 100, color: "mint", icon: Layers },
  { id: 8, title: "Brand Identity", lessons: 16, hours: "7h 45m", rating: 4.7, tutor: "Anna Lee", tutorTone: "mint", progress: 100, color: "lilac", icon: Palette },
  { id: 9, title: "Motion Design", lessons: 12, hours: "5h 20m", rating: 4.6, tutor: "John Carter", tutorTone: "rose", progress: 100, color: "peach", icon: Film },
];

type Tab = "all" | "active" | "completed" | "saved";
type Sort = "newest" | "rating" | "progress";

const tabs: { value: Tab; label: string }[] = [
  { value: "all", label: "All Courses" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "saved", label: "Saved" },
];

const sorts: { value: Sort; label: string }[] = [
  { value: "newest", label: "Sort: Newest" },
  { value: "rating", label: "Sort: Top rated" },
  { value: "progress", label: "Sort: Progress" },
];

export default function Courses() {
  const { query, setQuery, savedCourses, setSavedCourses, toast } = useStore();
  const [tab, setTab] = useState<Tab>("all");
  const [sort, setSort] = useState<Sort>("newest");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let r = courses.filter((c) => {
      if (tab === "active") return c.progress < 100;
      if (tab === "completed") return c.progress === 100;
      if (tab === "saved") return savedCourses.includes(c.id);
      return true;
    });
    if (q) r = r.filter((c) => `${c.title} ${c.tutor}`.toLowerCase().includes(q));
    r = [...r];
    if (sort === "rating") r.sort((a, b) => b.rating - a.rating);
    if (sort === "progress") r.sort((a, b) => b.progress - a.progress);
    return r;
  }, [tab, sort, query, savedCourses]);

  const toggleSave = (c: Course) => {
    const has = savedCourses.includes(c.id);
    setSavedCourses((p) => (has ? p.filter((i) => i !== c.id) : [...p, c.id]));
    toast(has ? `Removed “${c.title}” from saved` : `Saved “${c.title}”`);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Tabs id="courses" items={tabs} value={tab} onChange={setTab} />
        <Select
          label="Sort courses"
          value={sort}
          onChange={setSort}
          options={sorts}
          className="ml-auto h-10 w-[176px] rounded-full border border-ink/[0.05] bg-white hover:border-brand-deep/40"
        />
      </div>

      {query.trim() && (
        <p className="mt-4 text-[12.5px] text-mute">
          {list.length} result{list.length === 1 ? "" : "s"} for “<span className="font-semibold text-ink">{query}</span>” ·{" "}
          <button
            type="button"
            onClick={() => setQuery("")}
            className="font-semibold text-ink underline decoration-brand-deep decoration-2 underline-offset-4 transition-colors hover:text-brand-ink"
          >
            Clear search
          </button>
        </p>
      )}

      {list.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No courses here yet"
          text={
            tab === "saved"
              ? "Tap the bookmark on any course to keep it handy."
              : "Try another filter or clear your search to see everything."
          }
          action={
            <button
              type="button"
              onClick={() => {
                setTab("all");
                setQuery("");
              }}
              className="rounded-full bg-brand px-5 py-2.5 text-[12.5px] font-semibold transition-colors hover:bg-brand-deep"
            >
              Show all courses
            </button>
          }
        />
      ) : (
        <div key={`${tab}-${sort}`} className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((c, i) => (
            <CourseCard
              key={c.id}
              c={c}
              i={i}
              saved={savedCourses.includes(c.id)}
              onSave={() => toggleSave(c)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseCard({
  c,
  i,
  saved,
  onSave,
}: {
  c: Course;
  i: number;
  saved: boolean;
  onSave: () => void;
}) {
  const Icon = c.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: Math.min(i, 5) * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.25, delay: 0 } }}
      className="group rounded-[24px] border border-ink/[0.05] bg-white p-3.5 transition-[box-shadow,border-color] duration-300 hover:border-brand-deep/30 hover:shadow-[0_28px_50px_-28px_rgba(27,29,24,0.4)]"
    >
      <div
        className="relative grid h-[150px] place-items-center rounded-[18px]"
        style={{ backgroundColor: thumb[c.color] }}
      >
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold">
          <Star className="size-3 fill-ink text-ink" />
          {c.rating.toFixed(1)}
        </span>

        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${c.title} from saved` : `Save ${c.title}`}
          onClick={onSave}
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/80 text-ink transition-all duration-300 hover:scale-110 hover:bg-white"
        >
          <Bookmark className={`size-4 ${saved ? "fill-ink" : ""}`} strokeWidth={2} />
        </button>

        <span className="grid size-[100px] place-items-center rounded-full bg-white transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105">
          <Icon className="size-9 text-ink" strokeWidth={1.7} />
        </span>
      </div>

      <div className="px-1.5 pb-1.5 pt-4">
        <h3 className="text-[17px] font-bold leading-tight tracking-[-0.01em]">{c.title}</h3>
        <p className="mt-1.5 text-[12px] text-mute">
          {c.lessons} Lessons · {c.hours}
        </p>

        <div className="mt-3.5 flex items-center gap-2">
          <Avatar name={c.tutor} tone={c.tutorTone} className="size-6 text-[9px]" />
          <span className="text-[12.5px] font-medium">{c.tutor}</span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div
            role="progressbar"
            aria-valuenow={c.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${c.title} progress`}
            className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#ecefe4]"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${c.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              className="h-full rounded-full bg-[#cfec3f]"
            />
          </div>
          <span className="w-10 text-right text-[12.5px] font-bold tabular-nums">{c.progress}%</span>
        </div>
      </div>
    </motion.article>
  );
}
