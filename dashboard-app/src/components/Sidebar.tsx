import {
  LayoutDashboard,
  BookOpen,
  Layers3,
  MessageSquare,
  Bell,
  CalendarDays,
  Users,
  Settings,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "./ui";
import { hrefFor, routes, type PageKey } from "../router";
import { useStore } from "../store";

const icons: Record<PageKey, LucideIcon> = {
  dashboard: LayoutDashboard,
  courses: BookOpen,
  classes: Layers3,
  messages: MessageSquare,
  notifications: Bell,
  calendars: CalendarDays,
  community: Users,
  settings: Settings,
};

export default function Sidebar({
  page,
  className = "",
  onNavigate,
}: {
  page: PageKey;
  className?: string;
  onNavigate?: () => void;
}) {
  const { unread, toast } = useStore();

  return (
    <aside
      className={`w-[236px] shrink-0 flex-col rounded-[22px] bg-ink p-4 text-white ${className}`}
    >
      {/* brand */}
      <a href="#/" onClick={onNavigate} className="flex items-center gap-2.5 px-1.5 py-2">
        <Logo className="size-9" />
        <span className="text-[18px] font-semibold tracking-[-0.02em]">Eduplex</span>
      </a>

      {/* nav */}
      <nav className="mt-5 space-y-1 pb-6" aria-label="Main">
        {routes.map(({ key, label }) => {
          const Icon = icons[key];
          const isActive = page === key;
          const badge = key === "notifications" ? unread : 0;
          return (
            <a
              key={key}
              href={hrefFor(key)}
              aria-current={isActive ? "page" : undefined}
              onClick={onNavigate}
              className={`group flex w-full items-center gap-3 rounded-full px-3.5 py-2.5 text-[12.5px] transition-all duration-300 ${
                isActive
                  ? "bg-brand font-semibold text-ink shadow-[0_12px_26px_-14px_rgba(216,242,79,0.9)]"
                  : "font-medium text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon
                className="size-[18px] transition-transform duration-300 group-hover:scale-110"
                strokeWidth={2}
              />
              <span>{label}</span>
              {badge > 0 ? (
                <span
                  className={`ml-auto grid size-[19px] place-items-center rounded-full text-[9px] font-semibold ${
                    isActive ? "bg-ink text-brand" : "bg-brand text-ink"
                  }`}
                >
                  {badge}
                  <span className="sr-only"> unread</span>
                </span>
              ) : null}
            </a>
          );
        })}
      </nav>

      {/* mobile app promo */}
      <div className="relative mt-auto overflow-hidden rounded-[20px] bg-brand pt-[104px]">
        <img
          src="images/app-art.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-2 top-1 h-[112px] w-[calc(100%-16px)] object-contain mix-blend-multiply"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="relative flex items-end justify-between gap-2 p-3.5">
          <p className="text-[12px] font-semibold leading-[1.35] text-ink">
            Download our
            <br />
            mobile app
          </p>
          <button
            type="button"
            aria-label="Download the Eduplex mobile app"
            onClick={() => toast("The mobile app is coming soon")}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-brand transition-all duration-300 hover:rotate-45 hover:bg-ink-soft"
          >
            <ArrowUpRight className="size-4" strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </aside>
  );
}
