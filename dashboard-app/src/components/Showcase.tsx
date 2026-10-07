import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type Colorway, type Product } from "../data";
import {
  COURT_SRC as COURT,
  FILM_DURATION as DURATION,
  SHOE_SRC as SHOE,
  courtLevel as courtAmt,
  endTitles as titles,
  laceLevel as laceAmt,
  ledLevel as ledAmt,
  liveCues as cues,
  makeParticles as particlesOf,
  ramp as rampT,
  sampleCam as camAt,
  stepSquash as squashAt,
  gate as gateT,
} from "../film";
import ShoeImage from "./ShoeImage";
import { CloseIcon } from "./Icons";

export function PlayButton({
  onClick,
  label = "Play the Adapt film",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button type="button" onClick={onClick} className="play-btn group" aria-label={label}>
      <span className="play-btn__ring" aria-hidden />
      <span className="play-btn__ring play-btn__ring--2" aria-hidden />
      <span className="play-btn__core" aria-hidden>
        <svg viewBox="0 0 12 14" className="h-3 w-3 translate-x-[1px]" fill="currentColor" aria-hidden>
          <path d="M0 0l12 7-12 7z" />
        </svg>
      </span>
      <span className="play-btn__label">WATCH FILM</span>
    </button>
  );
}

export function ProductFilm({
  open,
  product,
  color,
  onClose,
  onBuy,
}: {
  open: boolean;
  product: Product;
  color: Colorway;
  onClose: () => void;
  onBuy: () => void;
}) {
  const [playing, setPlaying] = useState(true);
  const [done, setDone] = useState(false);
  const [t, setT] = useState(0);

  const raf = useRef<number | null>(null);
  const last = useRef(0);
  const elapsed = useRef(0);
  const productRef = useRef<HTMLDivElement | null>(null);
  const blackRef = useRef<HTMLDivElement | null>(null);
  const studioRef = useRef<HTMLDivElement | null>(null);
  const courtRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const rimM = useRef<HTMLDivElement | null>(null);
  const rimC = useRef<HTMLDivElement | null>(null);
  const sheenRef = useRef<HTMLDivElement | null>(null);
  const laceRef = useRef<SVGSVGElement | null>(null);
  const ledsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLParagraphElement | null>(null);

  const particles = useMemo(() => particlesOf(52), []);

  const reset = useCallback(() => {
    elapsed.current = 0;
    setT(0);
    setDone(false);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    reset();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;

    const apply = (norm: number) => {
      const cam = camAt(norm);
      const squash = squashAt(norm);
      const court = courtAmt(norm);
      const lace = laceAmt(norm);
      const under = Math.max(
        gateT(norm, 0.0, 0.16, 0.04) * 0.9,
        ledAmt(norm, 0) * 0.35 + ledAmt(norm, 1) * 0.45 + ledAmt(norm, 2) * 0.7,
        gateT(norm, 0.76, 0.86, 0.04) * 0.55,
        squash * 0.8
      );

      if (productRef.current) {
        const sy = 1 - squash * 0.07;
        productRef.current.style.opacity = String(cam.opacity);
        productRef.current.style.filter = `blur(${cam.blur}px) brightness(${0.35 + cam.light * 0.75}) saturate(${0.85 + cam.light * 0.2})`;
        productRef.current.style.transform = `translate(${cam.x}%, ${cam.y}%) rotateY(${cam.spin}deg) rotate(${cam.rot}deg) scale(${cam.scale}, ${cam.scale * sy})`;
      }

      if (blackRef.current) {
        const dark = 1 - rampT(norm, 0.02, 0.12);
        blackRef.current.style.opacity = String(dark);
      }
      if (studioRef.current) {
        studioRef.current.style.opacity = String(rampT(norm, 0.04, 0.14));
      }
      if (courtRef.current) {
        courtRef.current.style.opacity = String(court);
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = String(under);
        glowRef.current.style.transform = `translate(-50%, 0) scale(${1 + under * 0.45}, 1)`;
      }
      if (rimM.current) {
        rimM.current.style.opacity = String(0.15 + gateT(norm, 0.76, 1, 0.05) * 0.7 + gateT(norm, 0.2, 0.3, 0.04) * 0.5);
      }
      if (rimC.current) {
        rimC.current.style.opacity = String(0.12 + under * 0.7 + gateT(norm, 0.76, 1, 0.05) * 0.45);
      }
      if (sheenRef.current) {
        const sheen = gateT(norm, 0.2, 0.3, 0.03);
        sheenRef.current.style.opacity = String(sheen);
        sheenRef.current.style.transform = `translateX(${(norm - 0.2) * 480}%)`;
      }
      if (laceRef.current) {
        laceRef.current.style.opacity = String(gateT(norm, 0.4, 0.56, 0.03));
        const paths = laceRef.current.querySelectorAll("path");
        paths.forEach((p) => {
          (p as SVGPathElement).style.strokeDashoffset = String((1 - lace) * 220);
        });
      }
      ledsRef.current.forEach((el, i) => {
        if (!el) return;
        const lv = ledAmt(norm, i);
        el.style.opacity = String(lv);
        el.style.transform = `scale(${0.6 + lv * 0.7})`;
      });

      const title = titles.find((c) => norm >= c.from && norm < c.to);
      if (titleRef.current) {
        titleRef.current.style.opacity = title ? "1" : "0";
        const span = titleRef.current.querySelector("[data-title]") as HTMLElement | null;
        if (span && title) {
          span.textContent = title.line;
          span.classList.toggle("is-self", title.line === "SELF-LACING");
          span.classList.toggle("is-price", title.line.startsWith("$"));
        }
      }
      const cue = cues.find((c) => norm >= c.from && norm < c.to);
      if (cueRef.current) {
        cueRef.current.textContent = cue?.kicker ?? "";
        cueRef.current.style.opacity = cue?.kicker ? "1" : "0";
      }
    };

    apply(elapsed.current / DURATION);
    if (!playing || done) return;
    last.current = performance.now();

    const tick = (now: number) => {
      elapsed.current += now - last.current;
      last.current = now;
      if (elapsed.current >= DURATION) {
        elapsed.current = DURATION;
        apply(1);
        setT(1);
        setDone(true);
        setPlaying(false);
        return;
      }
      const norm = elapsed.current / DURATION;
      apply(norm);
      setT(norm);
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [open, playing, done]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        if (done) reset();
        else setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, done, reset]);

  if (!open) return null;

  return (
    <div className="film" role="dialog" aria-modal="true" aria-label="Adapt BB commercial">
      <div ref={studioRef} className="film__studio" aria-hidden />
      <div ref={courtRef} className="film__court" aria-hidden>
        <img src={COURT} alt="" />
      </div>
      <div ref={rimM} className="film__rim film__rim--m" aria-hidden />
      <div ref={rimC} className="film__rim film__rim--c" aria-hidden />
      <div className="film__particles" aria-hidden>
        {particles.map((p, i) => (
          <span
            key={i}
            className={playing ? "" : "is-paused"}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              animationDuration: `${p.d}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="film__vignette" aria-hidden />
      <div ref={blackRef} className="film__black" aria-hidden />

      <header className="film__top">
        <div className="film__bars" aria-hidden>
          <span className="film__bar">
            <span className="film__barFill" style={{ transform: `scaleX(${t})` }} />
          </span>
        </div>
        <button type="button" className="film__close" onClick={onClose} aria-label="Close film">
          <CloseIcon />
        </button>
      </header>

      <div className="film__stage">
        <div ref={glowRef} className="film__floorGlow" aria-hidden />

        <div className="film__stageInner">
          <div ref={productRef} className="film__product">
            <div className="film__shoeWrap">
              <ShoeImage
                src={SHOE}
                alt={`${product.model} in ${color.name}`}
                colorFilter={color.filter}
                eager
                shadow={false}
                className="film__shoeImg"
              />
              <div className="film__reflection" aria-hidden>
                <ShoeImage
                  src={SHOE}
                  alt=""
                  colorFilter={color.filter}
                  eager
                  shadow={false}
                  className="film__shoeImg"
                />
              </div>
              <div ref={sheenRef} className="film__sheen" aria-hidden />
              <span ref={(el) => { ledsRef.current[0] = el; }} className="film__led film__led--1" />
              <span ref={(el) => { ledsRef.current[1] = el; }} className="film__led film__led--2" />
              <span ref={(el) => { ledsRef.current[2] = el; }} className="film__led film__led--3" />
              <svg
                ref={laceRef}
                className="film__laces"
                viewBox="0 0 400 220"
                fill="none"
                aria-hidden
              >
                <path d="M168 42c18 22 28 48 30 78" />
                <path d="M186 40c14 24 22 52 22 82" />
                <path d="M204 44c10 26 16 54 14 84" />
                <path d="M154 58c22 18 40 44 48 74" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <p ref={cueRef} className="film__liveCue" />

      <div ref={titleRef} className="film__titles" aria-live="polite">
        <span data-title className="film__titleLine" />
      </div>

      <footer className="film__controls">
        <button
          type="button"
          className="film__ctrl"
          onClick={() => (done ? reset() : setPlaying((p) => !p))}
          aria-label={done ? "Replay" : playing ? "Pause" : "Play"}
        >
          {done ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 12a8 8 0 1 1-2.6-5.9" strokeLinecap="round" />
              <path d="M20 4v4h-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : playing ? (
            <svg viewBox="0 0 12 14" className="h-3.5 w-3.5" fill="currentColor">
              <rect x="0" y="0" width="4" height="14" rx="1" />
              <rect x="8" y="0" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 14" className="h-3.5 w-3.5 translate-x-[1px]" fill="currentColor">
              <path d="M0 0l12 7-12 7z" />
            </svg>
          )}
        </button>
        <p className="film__meta">
          {product.model} · 20s
        </p>
        <button
          type="button"
          onClick={() => {
            onBuy();
            onClose();
          }}
          className="film__buy"
        >
          BUY NOW — ${product.price}
        </button>
      </footer>
    </div>
  );
}
