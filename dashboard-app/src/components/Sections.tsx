import { useEffect, useRef } from "react";
import { FacebookIcon, InstagramIcon, NikeSwoosh } from "./Icons";
import ShoeImage from "./ShoeImage";
import { PlayButton } from "./Showcase";
import { features, products, specs, steps, type Product } from "../data";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.16 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Marquee() {
  const items = ["SELF-LACING", "ADAPTIVE FIT", "GAME READY", "LED INTELLIGENCE", "ZERO LACES", "COURT PROVEN"];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/5 bg-ink-deep py-4">
      <div className="animate-marquee flex w-max gap-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-[11px] tracking-[0.35em] text-white/40">
            {t}
            <span className={i % 2 === 0 ? "text-magenta" : "text-cyan"}>●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechBanner({ onPlay }: { onPlay: () => void }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="reveal relative isolate overflow-hidden">
      <img
        src="/images/court-atmosphere.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 text-center">
        <p className="text-[11px] tracking-[0.4em] text-cyan">THE SYSTEM</p>
        <h2 className="font-display mt-4 text-4xl sm:text-6xl italic font-extrabold tracking-tight">
          The fit that <span className="text-adapt">thinks</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm sm:text-base text-white/55 leading-relaxed">
          Adapt BB doesn’t wait for you to lace up. Motors, sensors, and knit work as one — so the only thing you
          think about is the next play.
        </p>
        <div className="mt-9 flex justify-center">
          <PlayButton onClick={onPlay} label="Play the Adapt film" />
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="latest" ref={ref} className="reveal bg-ink-deep px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-[11px] tracking-[0.4em] text-magenta">ENGINEERED</p>
            <h2 className="font-display mt-2 text-3xl sm:text-5xl italic font-extrabold">Inside Adapt</h2>
          </div>
          <p className="max-w-sm text-sm text-white/45">
            Three systems. One lock-in. Built for athletes who refuse a static fit.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="card-glow overflow-hidden rounded-2xl border border-white/8 bg-[#141416]"
            >
              {f.image ? (
                <div className="h-44 overflow-hidden">
                  <img src={f.image} alt="" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              ) : (
                <div className="h-44 bg-gradient-to-br from-magenta/20 via-[#141416] to-cyan/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full border border-magenta/40 animate-pulse-ring" />
                  </div>
                </div>
              )}
              <div className="p-6">
                <p className="text-[10px] tracking-[0.28em] text-cyan">{f.kicker}</p>
                <h3 className="mt-2 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{f.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="reveal px-6 py-20 sm:py-28 bg-[#101012]">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.4em] text-cyan">PROTOCOL</p>
        <h2 className="font-display mt-2 text-3xl sm:text-5xl italic font-extrabold">
          Four steps to <span className="text-magenta">lock-in</span>
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="group">
              <p className="font-display text-4xl italic font-extrabold text-white/10 group-hover:text-magenta/40 transition-colors">
                {s.n}
              </p>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/45">{s.copy}</p>
              <div className="mt-5 h-px w-12 bg-gradient-to-r from-magenta to-cyan opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Colorways({
  onSelect,
}: {
  onSelect: (productIndex: number, colorIndex: number) => void;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="shop" ref={ref} className="reveal bg-ink-deep px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-12">
          <div>
            <p className="text-[11px] tracking-[0.4em] text-magenta">COLORWAYS</p>
            <h2 className="font-display mt-2 text-3xl sm:text-5xl italic font-extrabold">Pick your pulse</h2>
          </div>
          <p className="text-sm text-white/40">Unisex · Court · Self-lacing</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, pi) => {
            const c = p.colors[0];
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onSelect(pi, 0);
                  document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="card-glow group overflow-hidden rounded-2xl border border-white/8 bg-[#141416] text-left"
              >
                <div className="relative bg-[#121214] aspect-[4/3] overflow-hidden">
                  <ShoeImage
                    src={c.image}
                    alt={`${p.model} ${c.name}`}
                    colorFilter={c.filter}
                    className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-sm font-medium">{p.model}</p>
                    <p className="mt-0.5 text-xs text-white/40">{c.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.hex }} />
                    <span className="text-sm text-white/70">${p.price}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Specs() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="reveal px-6 py-20 sm:py-28 bg-[#101012]">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-[11px] tracking-[0.4em] text-cyan">SPECIFICATIONS</p>
          <h2 className="font-display mt-2 text-3xl sm:text-5xl italic font-extrabold">
            Built like a system, worn like a shoe.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50">
            Adapt BB hides a full mechatronic lace engine in a court-ready silhouette. Charge it. Pair it. Forget it —
            until the game asks for more.
          </p>
        </div>
        <dl className="divide-y divide-white/8 rounded-2xl border border-white/8 bg-[#141416] px-6">
          {specs.map((s) => (
            <div key={s.label} className="flex items-baseline justify-between gap-4 py-4">
              <dt className="text-[11px] tracking-[0.22em] text-white/40">{s.label.toUpperCase()}</dt>
              <dd className="text-sm text-white/85">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function FinalCta({
  product,
  onBuy,
}: {
  product: Product;
  onBuy: () => void;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="reveal relative isolate overflow-hidden">
      <img src="/images/court-atmosphere.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24 sm:py-32">
        <p className="text-[11px] tracking-[0.4em] text-magenta">ADAPT BB</p>
        <h2 className="font-display max-w-xl text-4xl sm:text-6xl italic font-extrabold leading-[0.95]">
          Get the right fit, every game, every step.
        </h2>
        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={onBuy}
            className="rounded-full bg-cyan px-8 py-3 text-sm font-semibold tracking-[0.2em] text-black hover:bg-white hover:shadow-[0_0_30px_rgba(0,212,255,0.45)] transition-all"
          >
            BUY NOW — ${product.price}
          </button>
          <p className="text-sm text-white/45">{product.model}</p>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-black px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-magenta">
            <span className="sr-only">Nike</span>
            <NikeSwoosh className="h-4 w-12" />
          </p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-white/35">
            Adapt is a self-lacing basketball system. This is a design recreation for demonstration — not an official
            Nike store.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm">
          <div className="space-y-2">
            <p className="text-[11px] tracking-[0.28em] text-white/35">EXPLORE</p>
            <a href="#shop" className="block text-white/70 hover:text-cyan transition-colors">
              Shop Adapt
            </a>
            <a href="#latest" className="block text-white/70 hover:text-cyan transition-colors">
              Technology
            </a>
            <a href="#top" className="block text-white/70 hover:text-cyan transition-colors">
              Colorways
            </a>
          </div>
          <div className="space-y-2">
            <p className="text-[11px] tracking-[0.28em] text-white/35">SUPPORT</p>
            <p className="text-white/50">Size guide</p>
            <p className="text-white/50">Charging</p>
            <p className="text-white/50">App pairing</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between gap-4">
        <p className="text-[11px] tracking-wide text-white/25">
          © {new Date().getFullYear()} Adapt Self-Lacing · Recreated concept
        </p>
        <div className="flex items-center gap-3 text-cyan sm:hidden">
          <a href="https://facebook.com/nike" className="social-icon" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="https://instagram.com/nike" className="social-icon" aria-label="Instagram">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
