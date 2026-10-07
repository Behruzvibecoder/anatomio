import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { AnatomyIcon, type AnatomyIconName } from "../components/anatomy-icon";
import { EmptyState, Tabs } from "../components/kit";
import { useStore } from "../store";

/* ------------------------------------------------------------------ */
/*  the atlas                                                          */
/* ------------------------------------------------------------------ */
/* Every icon in the Anatomy Icon Set, grouped the way an anatomy       */
/* course would group it, with the system it belongs to.                */
/* ------------------------------------------------------------------ */

type System = "all" | "skeletal" | "organs" | "nervous" | "external";

type Entry = { name: AnatomyIconName; label: string; system: Exclude<System, "all"> };

const entries: Entry[] = [
  { name: "skeleton", label: "Skeleton", system: "skeletal" },
  { name: "bone", label: "Bone", system: "skeletal" },
  { name: "spine", label: "Vertebral column", system: "skeletal" },
  { name: "joints", label: "Joints", system: "skeletal" },
  { name: "tooth", label: "Tooth", system: "skeletal" },

  { name: "heart", label: "Heart", system: "organs" },
  { name: "lungs", label: "Lungs", system: "organs" },
  { name: "kidney", label: "Kidney", system: "organs" },
  { name: "liver", label: "Liver", system: "organs" },
  { name: "stomach", label: "Stomach", system: "organs" },
  { name: "intestine", label: "Intestine", system: "organs" },
  { name: "spleen", label: "Spleen", system: "organs" },
  { name: "bladder", label: "Bladder", system: "organs" },
  { name: "throat", label: "Throat", system: "organs" },
  { name: "reproductive", label: "Reproductive system", system: "organs" },

  { name: "brain", label: "Brain", system: "nervous" },
  { name: "brain-side", label: "Brain, lateral", system: "nervous" },
  { name: "head-brain", label: "Head and brain", system: "nervous" },
  { name: "muscle", label: "Muscle", system: "nervous" },
  { name: "blood-cell", label: "Blood cell", system: "nervous" },

  { name: "head", label: "Head", system: "external" },
  { name: "body-lateral", label: "Body, lateral", system: "external" },
  { name: "eye", label: "Eye", system: "external" },
  { name: "eye-lens", label: "Eye lens", system: "external" },
  { name: "ear", label: "Ear", system: "external" },
  { name: "nose", label: "Nose", system: "external" },
  { name: "nose-full", label: "Nose, front", system: "external" },
  { name: "mouth", label: "Mouth", system: "external" },
  { name: "lips", label: "Lips", system: "external" },
  { name: "hair", label: "Hair", system: "external" },
  { name: "hand", label: "Hand", system: "external" },
  { name: "finger", label: "Finger", system: "external" },
  { name: "leg", label: "Leg", system: "external" },
  { name: "foot", label: "Foot", system: "external" },
  { name: "feet", label: "Feet", system: "external" },
];

const tabs: { value: System; label: string }[] = [
  { value: "all", label: "All" },
  { value: "skeletal", label: "Skeletal" },
  { value: "organs", label: "Organs" },
  { value: "nervous", label: "Nervous & tissue" },
  { value: "external", label: "External" },
];

export default function Atlas() {
  const { query, setQuery } = useStore();
  const [tab, setTab] = useState<System>("all");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (tab !== "all" && e.system !== tab) return false;
      if (q && !`${e.label} ${e.name} ${e.system}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [tab, query]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Tabs id="atlas" items={tabs} value={tab} onChange={setTab} />
        <p className="ml-auto text-[12px] text-mute">
          {list.length} of {entries.length} illustrations
        </p>
      </div>

      {query.trim() && (
        <p className="mt-4 text-[12.5px] text-mute">
          {list.length} result{list.length === 1 ? "" : "s"} for “
          <span className="font-semibold text-ink">{query}</span>” ·{" "}
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
          title="No illustrations here"
          text="Try another system or clear your search to see the whole set."
          action={
            <button
              type="button"
              onClick={() => {
                setTab("all");
                setQuery("");
              }}
              className="rounded-full bg-ink px-5 py-2.5 text-[12px] font-semibold text-white transition-colors duration-300 hover:bg-ink-soft"
            >
              Show everything
            </button>
          }
        />
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {list.map((e, i) => (
            <motion.article
              key={e.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(i, 8) * 0.04 }}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
              className="group rounded-[20px] border border-ink/[0.07] bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:border-brand-deep/30 hover:shadow-[0_24px_46px_-26px_rgba(27,29,24,0.42)]"
            >
              <span className="grid h-[86px] place-items-center rounded-[14px] bg-brand-soft text-brand-ink transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                <AnatomyIcon
                  name={e.name}
                  className="size-[42px] transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <h3 className="mt-3 truncate text-[12.5px] font-semibold leading-tight">{e.label}</h3>
              <p className="mt-1 text-[9.5px] capitalize text-mute">{e.system}</p>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
