import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Heart, MessageCircle } from "lucide-react";
import { Avatar, avatarFallback, type AvatarTone } from "../components/kit";
import { useStore, type Post } from "../store";

const topics = [
  { tag: "UIDesign", posts: 120 },
  { tag: "Typography", posts: 102 },
  { tag: "3DDesign", posts: 84 },
  { tag: "UXResearch", posts: 66 },
  { tag: "Photography", posts: 48 },
];

const members: { name: string; points: number; tone: AvatarTone }[] = [
  { name: "Micheal Andrew", points: 2400, tone: "peach" },
  { name: "Natalia Varman", points: 2050, tone: "violet" },
  { name: "Anna Lee", points: 1700, tone: "mint" },
  { name: "John Carter", points: 1350, tone: "rose" },
];

export default function Community() {
  const { posts, setPosts, following, setFollowing, profile, toast } = useStore();
  const [draft, setDraft] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const publish = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) {
      input.current?.focus();
      return;
    }
    setPosts((p) => [
      { id: Date.now(), name: profile.name, tone: "violet", time: "Just now", text, likes: 0, comments: 0, liked: false, own: true },
      ...p,
    ]);
    setDraft("");
    toast("Your post is live");
  };

  const like = (id: number) =>
    setPosts((p) =>
      p.map((x) => (x.id === id ? { ...x, liked: !x.liked, likes: x.likes + (x.liked ? -1 : 1) } : x)),
    );

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard");
    } catch {
      toast("Copy the link from your address bar");
    }
  };

  const addTag = (tag: string) => {
    setDraft((d) => `${d}${d && !d.endsWith(" ") ? " " : ""}#${tag} `);
    input.current?.focus();
  };

  const toggleFollow = (name: string) => {
    const on = following.includes(name);
    setFollowing((p) => (on ? p.filter((n) => n !== name) : [...p, name]));
    toast(on ? `Unfollowed ${name}` : `You're following ${name}`);
  };

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_326px]">
      {/* ---------------- feed ---------------- */}
      <div className="space-y-4">
        <motion.form
          onSubmit={publish}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex items-center gap-3 rounded-[24px] bg-white p-4 sm:gap-4 sm:p-5"
        >
          <UserAvatar src={profile.avatar} name={profile.name} className="size-11 sm:size-12" />
          <label className="min-w-0 flex-1">
            <span className="sr-only">Share something with the community</span>
            <input
              ref={input}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Share something with the community…"
              className="h-11 w-full rounded-full bg-[#f3f4ee] px-5 text-[13px] outline-none transition-shadow duration-300 placeholder:text-mute focus:ring-4 focus:ring-brand/40 sm:h-12"
            />
          </label>
          <button
            type="submit"
            className={`h-11 shrink-0 rounded-full bg-[#cfec3f] px-6 text-[13px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep sm:h-12 sm:px-8 ${
              draft.trim() ? "" : "opacity-70"
            }`}
          >
            Post
          </button>
        </motion.form>

        {posts.map((p, i) => (
          <PostCard
            key={p.id}
            p={p}
            i={i}
            avatar={profile.avatar}
            onLike={() => like(p.id)}
            onShare={share}
            onComment={() => toast("Comments are opening soon")}
          />
        ))}
      </div>

      {/* ---------------- sidebar widgets ---------------- */}
      <div className="space-y-5">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 }}
          className="rounded-[24px] bg-white p-5"
        >
          <h2 className="text-[19px] font-bold tracking-[-0.015em]">Trending Topics</h2>
          <ul className="mt-3">
            {topics.map((t) => (
              <li key={t.tag} className="border-b border-ink/[0.07] last:border-0">
                <button
                  type="button"
                  onClick={() => addTag(t.tag)}
                  aria-label={`Add #${t.tag} to your post`}
                  className="group flex w-full items-center justify-between py-3.5 text-left"
                >
                  <span className="text-[14px] font-bold transition-colors duration-300 group-hover:text-brand-ink">
                    #{t.tag}
                  </span>
                  <span className="text-[12px] text-mute">{t.posts} posts</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
          className="rounded-[24px] bg-white p-5"
        >
          <h2 className="text-[19px] font-bold tracking-[-0.015em]">Top Members</h2>
          <ul className="mt-4 space-y-4">
            {members.map((m, i) => {
              const on = following.includes(m.name);
              return (
                <li key={m.name} className="flex items-center gap-3">
                  <Avatar name={m.name} tone={m.tone} className="size-[46px] text-[13px]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14.5px] font-bold leading-tight">{m.name}</p>
                    <p className="mt-1 text-[12px] text-mute">{m.points} points</p>
                  </div>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleFollow(m.name)}
                    className={`inline-flex h-8 items-center gap-1 rounded-full px-4 text-[11.5px] font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                      on
                        ? "bg-ink text-white"
                        : i === 0
                          ? "bg-[#cfec3f] hover:bg-brand-deep"
                          : "bg-[#f3f4ee] hover:bg-brand-soft"
                    }`}
                  >
                    {on && <Check className="size-3 text-brand" strokeWidth={3} />}
                    {on ? "Following" : "Follow"}
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.section>
      </div>
    </div>
  );
}

function UserAvatar({ src, name, className }: { src: string | null; name: string; className: string }) {
  return (
    <img
      src={src ?? avatarFallback}
      alt={name}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = avatarFallback;
      }}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  );
}

function PostCard({
  p,
  i,
  avatar,
  onLike,
  onShare,
  onComment,
}: {
  p: Post;
  i: number;
  avatar: string | null;
  onLike: () => void;
  onShare: () => void;
  onComment: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: Math.min(i, 3) * 0.05 }}
      className="rounded-[24px] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_26px_46px_-30px_rgba(27,29,24,0.45)]"
    >
      <header className="flex items-center gap-3">
        {p.own ? (
          <UserAvatar src={avatar} name={p.name} className="size-11" />
        ) : (
          <Avatar name={p.name} tone={p.tone} className="size-11 text-[13px]" />
        )}
        <div>
          <h3 className="text-[14.5px] font-bold leading-tight">{p.name}</h3>
          <p className="mt-1 text-[12px] text-mute">{p.time}</p>
        </div>
      </header>

      <p className="mt-5 text-[14.5px] leading-[1.6]">{p.text}</p>

      <footer className="mt-5 flex items-center gap-6 border-t border-ink/[0.07] pt-4 text-[13px]">
        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          aria-pressed={p.liked}
          aria-label={`${p.liked ? "Unlike" : "Like"} — ${p.likes} likes`}
          onClick={onLike}
          className="group inline-flex items-center gap-2 font-medium"
        >
          <Heart
            className={`size-[17px] transition-all duration-300 group-hover:scale-110 ${
              p.liked ? "fill-ember text-ember" : ""
            }`}
            strokeWidth={2}
          />
          <span className="tabular-nums">{p.likes}</span>
        </motion.button>

        <button
          type="button"
          onClick={onComment}
          aria-label={`Comments — ${p.comments}`}
          className="group inline-flex items-center gap-2 font-medium"
        >
          <MessageCircle className="size-[17px] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
          <span className="tabular-nums">{p.comments}</span>
        </button>

        <button
          type="button"
          onClick={onShare}
          className="group ml-auto inline-flex items-center gap-1.5 font-medium text-mute transition-colors duration-300 hover:text-ink"
        >
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          Share
        </button>
      </footer>
    </motion.article>
  );
}
