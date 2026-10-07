import { useEffect, useState } from "react";

export type PageKey =
  | "dashboard"
  | "courses"
  | "classes"
  | "messages"
  | "notifications"
  | "calendars"
  | "community"
  | "settings";

export const routes: { key: PageKey; label: string; path: string }[] = [
  { key: "dashboard", label: "Dashboard", path: "" },
  { key: "courses", label: "My Courses", path: "courses" },
  { key: "classes", label: "My Classes", path: "classes" },
  { key: "messages", label: "Messages", path: "messages" },
  { key: "notifications", label: "Notifications", path: "notifications" },
  { key: "calendars", label: "Calendars", path: "calendars" },
  { key: "community", label: "Community", path: "community" },
  { key: "settings", label: "Settings", path: "settings" },
];

export const hrefFor = (key: PageKey) => `#/${routes.find((r) => r.key === key)?.path ?? ""}`;

const read = (): PageKey => {
  const h = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
  return routes.find((r) => r.path === h)?.key ?? "dashboard";
};

export const go = (key: PageKey) => {
  window.location.hash = hrefFor(key);
};

/** Tiny hash router — deep links and the browser back button just work. */
export function usePage(): PageKey {
  const [page, setPage] = useState<PageKey>(read);

  useEffect(() => {
    const onChange = () => {
      setPage(read());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return page;
}
