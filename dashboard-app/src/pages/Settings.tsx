import { useId, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Camera, Eye, EyeOff, LogOut } from "lucide-react";
import { avatarFallback, Select, Toggle } from "../components/kit";
import { useStore, type Prefs } from "../store";

const languages = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "uz", label: "O‘zbekcha" },
  { value: "ru", label: "Русский" },
  { value: "de", label: "Deutsch" },
];

const prefRows: { key: keyof Prefs; label: string }[] = [
  { key: "email", label: "Email notifications" },
  { key: "push", label: "Push notifications" },
  { key: "reminders", label: "Class reminders" },
  { key: "promos", label: "Promotions" },
  { key: "dark", label: "Dark theme" },
];

export default function Settings() {
  const { profile, setProfile, prefs, setPrefs, language, setLanguage, toast } = useStore();

  const [draft, setDraft] = useState(profile);
  const [pw, setPw] = useState({ current: "", next: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const file = useRef<HTMLInputElement>(null);

  const save = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!draft.name.trim()) errs.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(draft.email)) errs.email = "Enter a valid email address";
    if (pw.next && pw.next.length < 8) errs.next = "Use at least 8 characters";
    if (pw.next && !pw.current) errs.current = "Enter your current password";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setProfile({ ...draft, name: draft.name.trim() });
    toast(pw.next ? "Profile and password updated" : "Profile updated");
    setPw({ current: "", next: "" });
  };

  const cancel = () => {
    setDraft(profile);
    setPw({ current: "", next: "" });
    setErrors({});
    toast("Changes discarded");
  };

  const onPhoto = (f?: File) => {
    if (!f) return;
    setDraft((d) => ({ ...d, avatar: URL.createObjectURL(f) }));
  };

  const setPref = (key: keyof Prefs, value: boolean) => {
    if (key === "dark" && value) {
      toast("Dark theme is coming soon");
      return;
    }
    setPrefs((p) => ({ ...p, [key]: value }));
  };

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_326px]">
      {/* ---------------- profile ---------------- */}
      <motion.form
        onSubmit={save}
        noValidate
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col rounded-[24px] bg-white p-5 sm:p-6 xl:min-h-[calc(100vh-124px)]"
      >
        <h2 className="text-[19px] font-bold tracking-[-0.015em]">Profile</h2>

        <div className="mt-6 flex flex-wrap items-center gap-5">
          <div className="group relative">
            <img
              src={draft.avatar ?? avatarFallback}
              alt={`${draft.name} profile photo`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = avatarFallback;
              }}
              className="size-[92px] rounded-full object-cover ring-4 ring-[#f3f4ee]"
            />
            <button
              type="button"
              aria-label="Change photo"
              onClick={() => file.current?.click()}
              className="absolute inset-0 grid place-items-center rounded-full bg-ink/55 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <Camera className="size-5" />
            </button>
          </div>

          <div className="flex flex-col items-start gap-2">
            <input
              ref={file}
              type="file"
              accept="image/*"
              className="sr-only"
              tabIndex={-1}
              onChange={(e) => onPhoto(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => file.current?.click()}
              className="rounded-full bg-brand px-5 py-2.5 text-[12px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep"
            >
              Change photo
            </button>
            <button
              type="button"
              onClick={() => setDraft((d) => ({ ...d, avatar: null }))}
              className="rounded-full bg-[#f3f4ee] px-5 py-2 text-[11.5px] font-semibold transition-colors duration-300 hover:bg-[#e9ebe1]"
            >
              Remove
            </button>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          <Field label="Full name" value={draft.name} error={errors.name} autoComplete="name" onChange={(v) => setDraft({ ...draft, name: v })} />
          <Field label="Email" type="email" value={draft.email} error={errors.email} autoComplete="email" onChange={(v) => setDraft({ ...draft, email: v })} />
          <Field label="Phone" type="tel" value={draft.phone} autoComplete="tel" onChange={(v) => setDraft({ ...draft, phone: v })} />
          <Field label="Location" value={draft.location} autoComplete="address-level2" onChange={(v) => setDraft({ ...draft, location: v })} />
        </div>

        <h2 className="mt-9 text-[19px] font-bold tracking-[-0.015em]">Password</h2>
        <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          <Field label="Current password" type="password" placeholder="••••••••" value={pw.current} error={errors.current} autoComplete="current-password" onChange={(v) => setPw({ ...pw, current: v })} />
          <Field label="New password" type="password" placeholder="••••••••" value={pw.next} error={errors.next} autoComplete="new-password" onChange={(v) => setPw({ ...pw, next: v })} />
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-10">
          <button
            type="submit"
            className="h-12 rounded-full bg-ink px-8 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-[0_16px_28px_-14px_rgba(27,29,24,0.8)]"
          >
            Save changes
          </button>
          <button
            type="button"
            onClick={cancel}
            className="h-12 rounded-full bg-[#f3f4ee] px-8 text-[13px] font-semibold transition-colors duration-300 hover:bg-[#e9ebe1]"
          >
            Cancel
          </button>
        </div>
      </motion.form>

      {/* ---------------- right column ---------------- */}
      <div className="space-y-5">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.06 }}
          className="rounded-[24px] bg-white p-5"
        >
          <h2 className="text-[19px] font-bold tracking-[-0.015em]">Preferences</h2>
          <ul className="mt-3">
            {prefRows.map((r) => (
              <li key={r.key} className="flex items-center justify-between gap-4 py-3.5">
                <span className="text-[13.5px] font-medium">{r.label}</span>
                <Toggle label={r.label} checked={prefs[r.key]} onChange={(v) => setPref(r.key, v)} />
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
          className="rounded-[24px] bg-white p-5"
        >
          <h2 className="text-[19px] font-bold tracking-[-0.015em]">Language</h2>
          <Select
            label="Language"
            value={language}
            onChange={(v) => {
              setLanguage(v);
              toast(`Language set to ${languages.find((l) => l.value === v)?.label}`);
            }}
            options={languages}
            className="mt-4 h-12 rounded-[16px] bg-fog hover:bg-[#eef0e7]"
          />
        </motion.section>

        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
          onClick={() => toast("You've been signed out (demo)")}
          className="group flex h-14 w-full items-center gap-3 rounded-[20px] bg-ember-soft px-6 text-left text-[14px] font-bold text-ember transition-colors duration-300 hover:bg-ember hover:text-white"
        >
          <LogOut className="size-[18px] transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={2.2} />
          Log out
        </motion.button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPw = type === "password";

  return (
    <div>
      <label htmlFor={id} className="text-[12px] font-medium text-mute">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          type={isPw && show ? "text" : type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={`h-12 w-full rounded-[16px] bg-fog px-4 text-[14px] outline-none transition-shadow duration-300 placeholder:text-mute/70 focus:ring-4 focus:ring-brand/40 ${
            isPw ? "pr-12" : ""
          } ${error ? "ring-2 ring-ember/50" : ""}`}
        />
        {isPw && (
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-mute transition-colors hover:bg-white hover:text-ink"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-[11.5px] font-medium text-ember">{error}</p>}
    </div>
  );
}
