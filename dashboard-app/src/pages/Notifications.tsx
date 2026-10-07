import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  CheckCheck,
  FileText,
  Gift,
  MessageCircle,
  MessageSquare,
  Video,
  type LucideIcon,
} from "lucide-react";
import { avatarTones, EmptyState, Tabs, type AvatarTone } from "../components/kit";
import { useStore, type Notif } from "../store";

const meta: Record<Notif["kind"], { icon: LucideIcon; tone: AvatarTone }> = {
  message: { icon: MessageSquare, tone: "blue" },
  assignment: { icon: FileText, tone: "mint" },
  class: { icon: Video, tone: "peach" },
  result: { icon: Award, tone: "mint" },
  offer: { icon: Gift, tone: "peach" },
  reply: { icon: MessageCircle, tone: "rose" },
};

type Tab = "all" | "unread";

export default function Notifications() {
  const { notifs, setNotifs, unread, toast } = useStore();
  const [tab, setTab] = useState<Tab>("all");

  const visible = notifs.filter((n) => tab === "all" || n.unread);
  const groups = (["Today", "Earlier"] as const)
    .map((g) => ({ name: g, items: visible.filter((n) => n.group === g) }))
    .filter((g) => g.items.length > 0);

  const markRead = (id: number) =>
    setNotifs((p) => p.map((n) => (n.id === id ? { ...n, unread: false } : n)));

  const markAll = () => {
    setNotifs((p) => p.map((n) => ({ ...n, unread: false })));
    toast("All notifications marked as read");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Tabs
          id="notifs"
          value={tab}
          onChange={setTab}
          items={[
            { value: "all", label: "All" },
            { value: "unread", label: `Unread (${unread})` },
          ]}
        />
        <button
          type="button"
          onClick={markAll}
          disabled={unread === 0}
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-[12px] font-semibold text-white transition-all duration-300 hover:bg-ink-soft hover:shadow-[0_14px_26px_-14px_rgba(27,29,24,0.8)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
        >
          <CheckCheck className="size-4 text-brand" strokeWidth={2.2} />
          Mark all as read
        </button>
      </div>

      {groups.length === 0 ? (
        <EmptyState
          icon={CheckCheck}
          title="You're all caught up"
          text="No unread notifications. We'll let you know when something new comes in."
        />
      ) : (
        <div className="mt-6 space-y-6">
          {groups.map((g) => (
            <section key={g.name} aria-label={g.name}>
              <h2 className="text-[15px] font-bold">{g.name}</h2>
              <ul className="mt-3 space-y-2.5">
                {g.items.map((n, i) => {
                  const { icon: Icon, tone } = meta[n.kind];
                  return (
                    <motion.li
                      key={n.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
                    >
                      <button
                        type="button"
                        onClick={() => markRead(n.id)}
                        aria-label={`${n.title}. ${n.unread ? "Unread — press to mark as read." : "Read."}`}
                        className={`group flex w-full items-center gap-4 rounded-[18px] px-4 py-3.5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_-22px_rgba(27,29,24,0.5)] sm:px-5 ${
                          n.unread ? "bg-sprout" : "bg-white"
                        }`}
                      >
                        <span
                          className="grid size-11 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: avatarTones[tone] }}
                        >
                          <Icon className="size-5 text-ink/70" strokeWidth={1.9} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14.5px] font-semibold leading-tight">
                            {n.title}
                          </span>
                          <span className="mt-1 block truncate text-[12.5px] text-mute">{n.sub}</span>
                        </span>

                        <span className="hidden shrink-0 text-[12px] text-mute sm:block">{n.time}</span>
                        <span className="grid size-3 shrink-0 place-items-center">
                          {n.unread && (
                            <>
                              <span className="size-2.5 rounded-full bg-ember" />
                              <span className="sr-only">Unread</span>
                            </>
                          )}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
