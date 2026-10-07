import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Menu, Search, X } from "lucide-react";
import Sidebar from "./components/Sidebar";
import { Logo } from "./components/ui";
import { avatarFallback } from "./components/kit";
import { go, routes, usePage, type PageKey } from "./router";
import { StoreProvider, useStore } from "./store";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Classes from "./pages/Classes";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Calendars from "./pages/Calendars";
import Community from "./pages/Community";
import Atlas from "./pages/Atlas";
import Settings from "./pages/Settings";

function View({ page }: { page: PageKey }) {
  switch (page) {
    case "courses":
      return <Courses />;
    case "classes":
      return <Classes />;
    case "messages":
      return <Messages />;
    case "notifications":
      return <Notifications />;
    case "calendars":
      return <Calendars />;
    case "community":
      return <Community />;
    case "atlas":
      return <Atlas />;
    case "settings":
      return <Settings />;
    default:
      return <Dashboard />;
  }
}

function Shell() {
  const page = usePage();
  const { profile, query, setQuery, toastMsg } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const label = routes.find((r) => r.key === page)?.label ?? "Dashboard";
  const first = profile.name.trim().split(" ")[0] || "there";

  useEffect(() => {
    document.title = page === "dashboard" ? "Anatomio — Dashboard" : `${label} — Anatomio`;
  }, [page, label]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    go("courses");
  };

  const searchInput = (extra: string) => (
    <input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search courses"
      className={`rounded-full border border-ink/[0.08] bg-white pl-11 pr-4 text-[11px] text-ink outline-none transition-all duration-300 placeholder:text-mute hover:border-brand-deep/40 focus:border-brand-deep/60 focus:ring-4 focus:ring-brand/40 ${extra}`}
    />
  );

  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <div className="mx-auto flex w-full max-w-[1520px] gap-6 p-4 sm:p-5 lg:gap-7 lg:p-7">
        {/* desktop rail */}
        <Sidebar
          page={page}
          className="nice-scroll sticky top-7 hidden h-[calc(100vh-56px)] overflow-y-auto lg:flex"
        />

        {/* mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                key="scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-[2px] lg:hidden"
              />
              <motion.div
                key="drawer"
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "tween", duration: 0.32, ease: "easeOut" }}
                className="fixed inset-y-0 left-0 z-50 p-3 lg:hidden"
              >
                <Sidebar
                  page={page}
                  className="nice-scroll flex h-full overflow-y-auto"
                  onNavigate={() => setMenuOpen(false)}
                />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* content */}
        <div className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="grid size-11 shrink-0 place-items-center rounded-2xl bg-ink text-white transition-colors duration-300 hover:bg-ink-soft lg:hidden"
            >
              <Menu className="size-5" />
            </button>

            <a href="#/" className="shrink-0 lg:hidden" aria-label="Anatomio home">
              <Logo className="size-9" />
            </a>

            <motion.h1
              key={page}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="order-last w-full min-w-0 text-[26px] font-bold leading-[1.15] tracking-[-0.025em] sm:order-none sm:w-auto sm:flex-1 sm:text-[29px] xl:text-[34px]"
            >
              {page === "dashboard" ? (
                <>
                  Welcome back {first}{" "}
                  <span
                    className="inline-block animate-wave text-[0.82em]"
                    role="img"
                    aria-label="waving hand"
                  >
                    👋
                  </span>
                </>
              ) : (
                label
              )}
            </motion.h1>

            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
              <form role="search" onSubmit={submitSearch} className="relative hidden lg:block">
                <label>
                  <span className="sr-only">Search courses</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-mute" />
                  {searchInput("h-11 w-[210px] focus:w-[250px] xl:w-[236px] xl:focus:w-[260px]")}
                </label>
              </form>

              <button
                type="button"
                aria-label="Search courses"
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen((s) => !s)}
                className="grid size-11 place-items-center rounded-full border border-ink/[0.08] bg-white text-ink transition-colors duration-300 hover:border-brand-deep/50 lg:hidden"
              >
                <Search className="size-4" />
              </button>

              <a href="#/settings" aria-label="Open your profile settings" className="rounded-full">
                <img
                  src={profile.avatar ?? avatarFallback}
                  alt={profile.name}
                  width="44"
                  height="44"
                  className="size-11 rounded-full object-cover ring-[3px] ring-white transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.onerror = null;
                    el.src = avatarFallback;
                  }}
                />
              </a>
            </div>
          </header>

          {/* mobile search row */}
          <AnimatePresence initial={false}>
            {searchOpen && (
              <motion.form
                key="m-search"
                role="search"
                onSubmit={submitSearch}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden lg:hidden"
              >
                <label className="relative mt-3 block">
                  <span className="sr-only">Search courses</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-mute" />
                  {searchInput("h-11 w-full")}
                </label>
              </motion.form>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.main
              key={page}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
              className="mt-6"
            >
              <View page={page} />
            </motion.main>
          </AnimatePresence>
        </div>
      </div>

      {/* toast */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4"
      >
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              key={toastMsg.id}
              role="status"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center gap-2.5 rounded-full bg-ink py-3 pl-3 pr-5 text-[12.5px] font-medium text-white shadow-[0_24px_44px_-18px_rgba(27,29,24,0.75)]"
            >
              <span className="grid size-6 place-items-center rounded-full bg-brand text-ink">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              {toastMsg.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
