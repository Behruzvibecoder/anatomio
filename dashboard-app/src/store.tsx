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
import type { AnatomyIconName } from "./components/anatomy-icon";

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
  /** draws the subject on the calendar chips and the event list */
  icon?: AnatomyIconName;
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
  { id: 2, group: "Today", kind: "assignment", title: "New assignment: Axial skeleton quiz", sub: "Due 02 July, 10:30 AM", time: "1 hour ago", unread: true },
  { id: 3, group: "Today", kind: "class", title: "Skeletal System class starts soon", sub: "Today at 10:00 AM", time: "3 hours ago", unread: false },
  { id: 4, group: "Earlier", kind: "result", title: "Cardiac cycle report completed", sub: "You scored 92%", time: "Yesterday", unread: false },
  { id: 5, group: "Earlier", kind: "offer", title: "Premium offer for you", sub: "Get lifetime membership 30% off", time: "Mon", unread: false },
  { id: 6, group: "Earlier", kind: "reply", title: "Natalia Varman replied to your comment", sub: "Community · Neuroanatomy tips", time: "Sun", unread: false },
];

const seedConvos: Convo[] = [
  {
    id: "micheal",
    name: "Dr. Micheal Andrew",
    tone: "peach",
    time: "10:24",
    preview: "Sure, see you at the class!",
    unread: 2,
    online: true,
    lastSeen: "Online",
    messages: [
      { id: 1, from: "them", text: "Hi Taylor! Did you finish the Neuroanatomy lesson?" },
      { id: 2, from: "me", text: "Yes, just submitted the assignment 👍" },
      { id: 3, from: "them", text: "Great. Next class is Skeletal System at 10:00" },
      { id: 4, from: "me", text: "Sure, see you at the class!" },
      { id: 5, from: "them", file: { name: "Cranial_bones.pdf", size: "2.4 MB" } },
    ],
  },
  {
    id: "natalia",
    name: "Dr. Natalia Varman",
    tone: "violet",
    time: "09:12",
    preview: "Please check the assignment",
    unread: 0,
    online: true,
    lastSeen: "Online",
    messages: [
      { id: 1, from: "them", text: "Hi Taylor, have you seen the new brief for the skeleton quiz?" },
      { id: 2, from: "me", text: "Not yet — opening it now." },
      { id: 3, from: "them", text: "Please check the assignment" },
    ],
  },
  {
    id: "group",
    name: "Study Group · Anatomy",
    tone: "blue",
    time: "Yesterday",
    preview: "Anna: New files uploaded",
    unread: 5,
    online: false,
    lastSeen: "12 members",
    messages: [
      { id: 1, from: "them", text: "Anna: Quick reminder — lab review is on Thursday." },
      { id: 2, from: "me", text: "Thanks, I'll bring my diagrams." },
      { id: 3, from: "them", text: "Anna: New files uploaded" },
    ],
  },
  {
    id: "john",
    name: "Dr. John Carter",
    tone: "rose",
    time: "Yesterday",
    preview: "Thanks for the feedback 🙌",
    unread: 0,
    online: false,
    lastSeen: "Last seen 2h ago",
    messages: [
      { id: 1, from: "me", text: "Left a few comments on your cardiac cycle diagram, John." },
      { id: 2, from: "them", text: "Thanks for the feedback 🙌" },
    ],
  },
  {
    id: "anna",
    name: "Dr. Anna Lee",
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
  { id: 1, name: "Dr. Natalia Varman", tone: "violet", time: "2h ago", text: "How I memorise the 206 bones: group them by region, then rehearse with spaced repetition ✨", likes: 128, comments: 34, liked: false },
  { id: 2, name: "Dr. Micheal Andrew", tone: "peach", time: "5h ago", text: "Finished the dissection series on the heart today — here is my labelled diagram. Thanks for the feedback 🙌", likes: 204, comments: 56, liked: false },
  { id: 3, name: "Dr. Anna Lee", tone: "mint", time: "Yesterday", text: "Which apps do you use for 3D anatomy models? Looking for recommendations.", likes: 67, comments: 41, liked: false },
];

const seedEvents: CalEvent[] = [
  { id: 1, title: "Skeletal System", date: "2023-08-03", time: "10:00", tone: "peach", label: "Lecture", icon: "skeleton" },
  { id: 2, title: "Neuroanatomy", date: "2023-08-08", time: "11:30", tone: "lilac", label: "Workshop", icon: "brain" },
  { id: 3, title: "Anatomy Quiz", date: "2023-08-10", time: "14:00", tone: "mint", label: "Quiz", icon: "tooth" },
  { id: 4, title: "Cardiovascular System", date: "2023-08-16", time: "09:00", tone: "lime", label: "Lecture", icon: "heart" },
  { id: 5, title: "Histology", date: "2023-08-17", time: "11:00", tone: "lilac", label: "Workshop", icon: "blood-cell" },
  { id: 6, title: "Assignment due", short: "Assignment", date: "2023-08-22", time: "10:30", tone: "peach", label: "Deadline" },
  { id: 7, title: "Live Class", date: "2023-08-24", time: "14:30", tone: "mint", label: "Live", icon: "lungs" },
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

/* The landing page hands the demo visitor over as ?name=…&email=…, so the
   welcome heading can greet whoever just registered. Nothing is stored. */
function signupValue(key: "name" | "email") {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key)?.trim() ?? "";
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [notifs, setNotifs] = useState(seedNotifs);
  const [convos, setConvos] = useState(seedConvos);
  const [posts, setPosts] = useState(seedPosts);
  const [events, setEvents] = useState(seedEvents);
  const [following, setFollowing] = useState<string[]>([]);
  const [savedCourses, setSavedCourses] = useState<number[]>([2, 4, 6]);
  const [profile, setProfile] = useState<Profile>(() => ({
    name: signupValue("name") || "Taylor Morgan",
    email: signupValue("email") || "taylor@anatomio.app",
    phone: "+1 555 012 3456",
    location: "New York, USA",
    avatar: null,
  }));
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
