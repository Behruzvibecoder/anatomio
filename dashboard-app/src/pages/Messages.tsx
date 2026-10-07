import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Download, FileText, Search, Send } from "lucide-react";
import { Avatar } from "../components/kit";
import { useStore } from "../store";

export default function Messages() {
  const { convos, setConvos, toast } = useStore();
  const [activeId, setActiveId] = useState(convos[0].id);
  const [open, setOpen] = useState(false); // mobile: list <-> chat
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  const active = convos.find((c) => c.id === activeId) ?? convos[0];
  const needle = q.trim().toLowerCase();
  const list = convos.filter((c) => `${c.name} ${c.preview}`.toLowerCase().includes(needle));

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [active.id, active.messages.length]);

  const select = (id: string) => {
    setActiveId(id);
    setOpen(true);
    setConvos((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  const send = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setConvos((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? { ...c, preview: text, time: "Now", messages: [...c.messages, { id: Date.now(), from: "me", text }] }
          : c,
      ),
    );
    setDraft("");
  };

  const height = "h-[calc(100svh-150px)] min-h-[540px] lg:h-[calc(100vh-124px)]";

  return (
    <div className={`grid grid-cols-1 gap-5 lg:grid-cols-[340px_minmax(0,1fr)] ${height}`}>
      {/* ---------------- conversation list ---------------- */}
      <section
        aria-label="Conversations"
        className={`min-h-0 flex-col rounded-[24px] bg-white p-3.5 ${open ? "hidden lg:flex" : "flex"}`}
      >
        <label className="relative block">
          <span className="sr-only">Search messages</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-mute" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search messages"
            className="h-11 w-full rounded-full bg-[#f3f4ee] pl-11 pr-4 text-[13px] outline-none transition-shadow duration-300 placeholder:text-mute focus:ring-4 focus:ring-brand/40"
          />
        </label>

        <ul className="nice-scroll -mr-1 mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
          {list.length === 0 && (
            <li className="px-3 py-10 text-center text-[13px] text-mute">No conversations match “{q}”.</li>
          )}
          {list.map((c, i) => {
            const isActive = c.id === active.id;
            return (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <button
                  type="button"
                  onClick={() => select(c.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex w-full items-center gap-3 rounded-[18px] p-3 text-left transition-colors duration-300 ${
                    isActive ? "bg-sprout" : "hover:bg-fog"
                  }`}
                >
                  <span className="relative">
                    <Avatar name={c.name} tone={c.tone} className="size-12 text-[13px]" />
                    {c.online && (
                      <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-[#46a302]" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-[14.5px] font-bold leading-tight">{c.name}</span>
                      <span className="shrink-0 text-[11px] text-mute">{c.time}</span>
                    </span>
                    <span className="mt-1 flex items-center justify-between gap-2">
                      <span className="truncate text-[12.5px] text-mute">{c.preview}</span>
                      {c.unread > 0 && (
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-[10.5px] font-bold">
                          {c.unread}
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </section>

      {/* ---------------- chat ---------------- */}
      <section
        aria-label={`Chat with ${active.name}`}
        className={`min-h-0 flex-col rounded-[24px] bg-white ${open ? "flex" : "hidden lg:flex"}`}
      >
        <header className="mx-4 flex items-center gap-3 border-b border-ink/[0.07] py-4 sm:mx-6">
          <button
            type="button"
            aria-label="Back to conversations"
            onClick={() => setOpen(false)}
            className="grid size-9 place-items-center rounded-full bg-fog transition-colors hover:bg-brand-soft lg:hidden"
          >
            <ChevronLeft className="size-4" />
          </button>
          <Avatar name={active.name} tone={active.tone} className="size-12 text-[13px]" />
          <div>
            <h2 className="text-[16px] font-bold leading-tight">{active.name}</h2>
            <p
              className={`mt-1 flex items-center gap-1.5 text-[12px] font-medium ${
                active.online ? "text-[#46a302]" : "text-mute"
              }`}
            >
              {active.online && <span className="size-2 rounded-full bg-[#46a302]" />}
              {active.lastSeen}
            </p>
          </div>
        </header>

        <div ref={scroller} className="nice-scroll min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-5 sm:px-6">
          {active.messages.map((m) => (
            <motion.div
              key={`${active.id}-${m.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            >
              {m.file ? (
                <div className="flex items-center gap-3 rounded-[18px] bg-[#e4dcfb] p-4 pr-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-white/70">
                    <FileText className="size-5 text-lilac-ink" strokeWidth={1.9} />
                  </span>
                  <div className="pr-2">
                    <p className="text-[13.5px] font-bold">{m.file.name}</p>
                    <p className="mt-0.5 text-[12px] text-ink/60">{m.file.size}</p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Download ${m.file.name}`}
                    onClick={() => toast(`Downloading ${m.file?.name}…`)}
                    className="grid size-9 place-items-center rounded-full bg-white/70 transition-all duration-300 hover:bg-white hover:shadow-md"
                  >
                    <Download className="size-4" />
                  </button>
                </div>
              ) : (
                <p
                  className={`max-w-[82%] rounded-[18px] px-4 py-3 text-[13.5px] leading-[1.5] sm:max-w-[70%] ${
                    m.from === "me"
                      ? "rounded-br-md bg-ink text-white"
                      : "rounded-bl-md bg-[#f4f5f0] text-ink"
                  }`}
                >
                  {m.text}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <form onSubmit={send} className="flex items-center gap-3 p-4 sm:px-6 sm:pb-6">
          <label className="flex-1">
            <span className="sr-only">Type a message</span>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message..."
              className="h-[52px] w-full rounded-full bg-[#f3f4ee] px-5 text-[13.5px] outline-none transition-shadow duration-300 placeholder:text-mute focus:ring-4 focus:ring-brand/40"
            />
          </label>
          <button
            type="submit"
            aria-label="Send message"
            className="grid size-[52px] shrink-0 place-items-center rounded-full bg-brand transition-all duration-300 hover:scale-105 hover:bg-brand-deep hover:shadow-[0_14px_26px_-12px_rgba(70,163,2,0.95)] active:scale-95"
          >
            <Send className="size-[18px] -translate-x-px translate-y-px" strokeWidth={2.2} />
          </button>
        </form>
      </section>
    </div>
  );
}
