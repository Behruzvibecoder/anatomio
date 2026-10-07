import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { AvatarTone } from "./components/kit";

/* ------------------------------------------------------------------ */
/*  types                                                              */
/* ------------------------------------------------------------------ */
export type Notif = {
  id: number;
  group: "Today" | "Earlier";
  kind: "message" | "assignment" | "class" | "result" | "offer" | "reply";
  title: string;
  sub: string;
  time: string;
  unread: boolean;
};

export type Msg = {
  id: number;
  from: "me" | "them";
  text?: string;
  file?: { name: string; size: string };
};

export type Convo = {
  id: string;
  name: string;
  tone: AvatarTone;
  time: string;
  preview: string;
  unread: number;
  online: boolean;
  lastSeen: string;
  messages: Msg[];
};

export type Post = {
  id: number;
  name: string;
  tone: AvatarTone;
  time: string;
  text: string;
  likes: number;
  comments: number;
  liked: boolean;
  own?: boolean;
};

export type EventTone = "lime" | "lilac" | "peach" | "mint";

export type CalEvent = {
  id: number;
  title: string;
  short?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  tone: EventTone;
  label: string;
};

export type Profile = {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string | null;
};

export type Prefs = {
  email: boolean;
  push: boolean;
  reminders: boolean;
  promos: boolean;
  dark: boolean;
};

/* ------------------------------------------------------------------ */
/*  seed data (taken from the design screens)                          */
/* ------------------------------------------------------------------ */
const seedNotifs: Notif[] = [
  { id: 1, group: "Today", kind: "message", title: "Micheal Andrew sent you a message", sub: "“Sure, see you at the class!”", time: "10 min ago", unread: true },
  { id: 2, group: "Today", kind: "assignment", title: "New assignment: Methods of data", sub: "Due 02 July, 10:30 AM", time: "1 hour ago", unread: true },
  { id: 3, group: "Today", kind: "class", title: "Design System class starts soon", sub: "Today at 10:00 AM", time: "3 hours ago", unread: false },
  { id: 4, group: "Earlier", kind: "result", title: "Market Research completed", sub: "You scored 92%", time: "Yesterday", unread: false },
  { id: 5, group: "Earlier", kind: "offer", title: "Premium offer for you", sub: "Get lifetime membership 30% off", time: "Mon", unread: false },
  { id: 6, group: "Earlier", kind: "reply", title: "Natalia Varman replied to your comment", sub: "Community · Typography tips", time: "Sun", unread: false },
];

const seedConvos: Convo[] = [
  {
    id: "micheal",
    name: "Micheal Andrew",
    tone: "peach",
    time: "10:24",
    preview: "Sure, see you at the class!",
    unread: 2,
    online: true,
    lastSeen: "Online",
    messages: [
      { id: 1, from: "them", text: "Hi Taylor! Did you finish the Typography lesson?" },
      { id: 2, from: "me", text: "Yes, just submitted the assignment 👍" },
      { id: 3, from: "them", text: "Great. Next class is Design System at 10:00" },
      { id: 4, from: "me", text: "Sure, see you at the class!" },
      { id: 5, from: "them", file: { name: "Design_System.pdf", size: "2.4 MB" } },
    ],
  },
  {
    id: "natalia",
    name: "Natalia Varman",
    tone: "violet",
    time: "09:12",
    preview: "Please check the assignment",
    unread: 0,
    online: true,
    lastSeen: "Online",
    messages: [
      { id: 1, from: "them", text: "Hi Taylor, have you seen the new brief for Methods of data?" },
      { id: 2, from: "me", text: "Not yet — opening it now." },
      { id: 3, from: "them", text: "Please check the assignment" },
    ],
  },
  {
    id: "group",
    name: "Design Group",
    tone: "blue",
    time: "Yesterday",
    preview: "Anna: New files uploaded",
    unread: 5,
    online: false,
    lastSeen: "12 members",
    messages: [
      { id: 1, from: "them", text: "Anna: Quick reminder — critique session is on Thursday." },
      { id: 2, from: "me", text: "Thanks, I'll bring my layouts." },
      { id: 3, from: "them", text: "Anna: New files uploaded" },
    ],
  },
  {
    id: "john",
    name: "John Carter",
    tone: "rose",
    time: "Yesterday",
    preview: "Thanks for the feedback 🙌",
    unread: 0,
    online: false,
    lastSeen: "Last seen 2h ago",
    messages: [
      { id: 1, from: "me", text: "Left a few comments on your Color Style board, John." },
      { id: 2, from: "them", text: "Thanks for the feedback 🙌" },
    ],
  },
  {
    id: "anna",
    name: "Anna Lee",
    tone: "mint",
    time: "Mon",
    preview: "Can we reschedule?",
    unread: 0,
    online: false,
    lastSeen: "Last seen yesterday",
    messages: [
      { id: 1, from: "me", text: "Hi Anna, are we still on for Thursday?" },
      { id: 2, from: "them", text: "Can we reschedule?" },
    ],
  },
  {
    id: "support",
    name: "Support Team",
    tone: "lime",
    time: "Sun",
    preview: "Your ticket was resolved",
    unread: 0,
    online: true,
    lastSeen: "Online",
    messages: [
      { id: 1, from: "me", text: "Hi, I can't download my course certificate." },
      { id: 2, from: "them", text: "Thanks for reaching out — we're on it." },
      { id: 3, from: "them", text: "Your ticket was resolved" },
    ],
  },
];

const seedPosts: Post[] = [
  { id: 1, name: "Natalia Varman", tone: "violet", time: "2h ago", text: "Tips for building a consistent typography scale in UI design. Start with a base size and use a ratio ✨", likes: 128, comments: 34, liked: false },
  { id: 2, name: "Micheal Andrew", tone: "peach", time: "5h ago", text: "Just finished the 3D Design Course! Here is my final render. Thanks everyone for the feedback 🙌", likes: 204, comments: 56, liked: false },
  { id: 3, name: "Anna Lee", tone: "mint", time: "Yesterday", text: "What tools do you use for user research and usability testing? Looking for recommendations.", likes: 67, comments: 41, liked: false },
];

const seedEvents: CalEvent[] = [
  { id: 1, title: "Design System", date: "2023-08-03", time: "10:00", tone: "peach", label: "Lecture" },
  { id: 2, title: "Typography", date: "2023-08-08", time: "11:30", tone: "lilac", label: "Workshop" },
  { id: 3, title: "Quiz", date: "2023-08-10", time: "14:00", tone: "mint", label: "Quiz" },
  { id: 4, title: "Visual Design", date: "2023-08-16", time: "09:00", tone: "lime", label: "Lecture" },
  { id: 5, title: "Photography", date: "2023-08-17", time: "11:00", tone: "lilac", label: "Workshop" },
  { id: 6, title: "Assignment due", short: "Assignment", date: "2023-08-22", time: "10:30", tone: "peach", label: "Deadline" },
  { id: 7, title: "Live Class", date: "2023-08-24", time: "14:30", tone: "mint", label: "Live" },
  { id: 8, title: "Final Exam", short: "Exam", date: "2023-08-29", time: "09:00", tone: "peach", label: "Exam" },
];

/* ------------------------------------------------------------------ */
/*  context                                                            */
/* ------------------------------------------------------------------ */
type Setter<T> = Dispatch<SetStateAction<T>>;

interface Store {
  notifs: Notif[];
  setNotifs: Setter<Notif[]>;
  unread: number;
  convos: Convo[];
  setConvos: Setter<Convo[]>;
  posts: Post[];
  setPosts: Setter<Post[]>;
  events: CalEvent[];
  setEvents: Setter<CalEvent[]>;
  following: string[];
  setFollowing: Setter<string[]>;
  savedCourses: number[];
  setSavedCourses: Setter<number[]>;
  profile: Profile;
  setProfile: Setter<Profile>;
  prefs: Prefs;
  setPrefs: Setter<Prefs>;
  language: string;
  setLanguage: Setter<string>;
  query: string;
  setQuery: Setter<string>;
  toast: (text: string) => void;
  toastMsg: { id: number; text: string } | null;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [notifs, setNotifs] = useState(seedNotifs);
  const [convos, setConvos] = useState(seedConvos);
  const [posts, setPosts] = useState(seedPosts);
  const [events, setEvents] = useState(seedEvents);
  const [following, setFollowing] = useState<string[]>([]);
  const [savedCourses, setSavedCourses] = useState<number[]>([2, 4, 6]);
  const [profile, setProfile] = useState<Profile>({
    name: "Taylor Morgan",
    email: "taylor@eduplex.com",
    phone: "+1 555 012 3456",
    location: "New York, USA",
    avatar: "images/avatar.jpg",
  });
  const [prefs, setPrefs] = useState<Prefs>({
    email: true,
    push: true,
    reminders: true,
    promos: false,
    dark: false,
  });
  const [language, setLanguage] = useState("en-US");
  const [query, setQuery] = useState("");

  const [toastMsg, setToastMsg] = useState<{ id: number; text: string } | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const toast = useCallback((text: string) => {
    window.clearTimeout(timer.current);
    setToastMsg({ id: Date.now(), text });
    timer.current = window.setTimeout(() => setToastMsg(null), 2600);
  }, []);

  const unread = useMemo(() => notifs.filter((n) => n.unread).length, [notifs]);

  const value: Store = {
    notifs,
    setNotifs,
    unread,
    convos,
    setConvos,
    posts,
    setPosts,
    events,
    setEvents,
    following,
    setFollowing,
    savedCourses,
    setSavedCourses,
    profile,
    setProfile,
    prefs,
    setPrefs,
    language,
    setLanguage,
    query,
    setQuery,
    toast,
    toastMsg,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used inside <StoreProvider>");
  return v;
}
