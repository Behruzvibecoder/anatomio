import { useEffect, useRef, useState, type RefObject } from "react";
import { products, sizes, type Colorway, type Product } from "../data";
import ShoeImage from "./ShoeImage";
import { PlayButton } from "./Showcase";
import {
  BagIcon,
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronDown,
  FacebookIcon,
  InstagramIcon,
  MenuIcon,
  NikeSwoosh,
  SearchIcon,
  TwitterIcon,
} from "./Icons";

type HeroProps = {
  productIndex: number;
  colorIndex: number;
  size: string;
  cartCount: number;
  bagPop: boolean;
  onProductIndex: (i: number) => void;
  onColorIndex: (i: number) => void;
  onSize: (s: string) => void;
  onBuy: () => void;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenSizeGuide: () => void;
  onOpenFilm: () => void;
  onNav: (id: string) => void;
};

export default function Hero({
  productIndex,
  colorIndex,
  size,
  cartCount,
  bagPop,
  onProductIndex,
  onColorIndex,
  onSize,
  onBuy,
  onOpenCart,
  onOpenMenu,
  onOpenSearch,
  onOpenSizeGuide,
  onOpenFilm,
  onNav,
}: HeroProps) {
  const product = products[productIndex];
  const safeColor = Math.min(colorIndex, product.colors.length - 1);
  const color = product.colors[safeColor];

  const [sizeOpen, setSizeOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [imgKey, setImgKey] = useState(0);
  const sizeRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImgKey((k) => k + 1);
  }, [color.image, color.filter]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (sizeRef.current && !sizeRef.current.contains(e.target as Node)) setSizeOpen(false);
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) setColorOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const prev = () => onProductIndex((productIndex - 1 + products.length) % products.length);
  const next = () => onProductIndex((productIndex + 1) % products.length);

  return (
    <section className="hero-shell relative flex min-h-svh flex-col overflow-hidden">
      <Header
        cartCount={cartCount}
        bagPop={bagPop}
        onOpenCart={onOpenCart}
        onOpenMenu={onOpenMenu}
        onOpenSearch={onOpenSearch}
        onNav={onNav}
      />

      <div className="hero-main relative flex min-h-0 flex-1 flex-col gap-2 px-5 pb-3 sm:px-8 lg:px-0 lg:pb-0">
        <div className="hero-word watermark absolute inset-0 z-0 flex items-center justify-center overflow-hidden" aria-hidden>
          <span>NIKE</span>
        </div>

        {/* Copy */}
        <div className="hero-copy relative z-10 mt-5 shrink-0 animate-from-left">
          <p className="hero-adapt text-adapt leading-[0.9]">{product.name}</p>
          <p className="hero-self mt-1.5 font-medium tracking-[0.3em] text-white">
            {product.subtitle}
          </p>
          <p className="hero-tagline mt-3 max-w-[260px] leading-relaxed text-white/40">{product.tagline}</p>

          <div className="mt-6 lg:mt-14">
            <PlayButton onClick={onOpenFilm} />
          </div>
        </div>

        {/* Shoe */}
        <div className="hero-product relative z-10 flex min-h-0 flex-1 items-center justify-center py-1 lg:py-0 animate-shoe-in delay-2">
          <div className="hero-product-stage relative w-full max-w-[1120px]">
            <div className="pointer-events-none absolute left-1/2 top-[62%] h-24 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-cyan/15 blur-3xl sm:h-32" />
            <div className="pointer-events-none absolute left-[36%] top-[44%] h-20 w-36 -translate-x-1/2 rounded-full bg-magenta/15 blur-3xl" />
            <div className="animate-float relative">
              <ShoeImage
                key={imgKey}
                src={color.image}
                alt={`${product.model} in ${color.name}`}
                colorFilter={color.filter}
                eager
                className="hero-shoe shoe-tilt mx-auto max-h-[36vh] w-[96%] max-w-none select-none object-contain sm:max-h-[44vh] sm:w-[88%]"
              />
            </div>
          </div>
        </div>

        {/* Buy */}
        <BuyPanel
          product={product}
          color={color}
          colorIndex={safeColor}
          size={size}
          sizeOpen={sizeOpen}
          sizeRef={sizeRef}
          colorOpen={colorOpen}
          colorRef={colorRef}
          onToggleSize={() => {
            setColorOpen(false);
            setSizeOpen((v) => !v);
          }}
          onToggleColor={() => {
            setSizeOpen(false);
            setColorOpen((v) => !v);
          }}
          onColorIndex={(i) => {
            onColorIndex(i);
            setColorOpen(false);
          }}
          onSize={(s) => {
            onSize(s);
            setSizeOpen(false);
          }}
          onBuy={onBuy}
          onOpenSizeGuide={onOpenSizeGuide}
        />
      </div>

      <HeroBar productIndex={productIndex} onPrev={prev} onNext={next} onDot={onProductIndex} />
    </section>
  );
}

function Header({
  cartCount,
  bagPop,
  onOpenCart,
  onOpenMenu,
  onOpenSearch,
  onNav,
}: {
  cartCount: number;
  bagPop: boolean;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onNav: (id: string) => void;
}) {
  return (
    <header className="relative z-20 grid grid-cols-2 items-center px-5 pt-5 sm:px-8 md:grid-cols-3 lg:px-10 lg:pt-8 xl:px-14">
      <button
        type="button"
        onClick={() => onNav("top")}
        className="justify-self-start text-magenta transition-opacity hover:opacity-80"
        aria-label="Nike Adapt home"
      >
        <NikeSwoosh className="h-[14px] w-10 sm:h-4 sm:w-12 lg:h-5 lg:w-16" />
      </button>

      <nav className="hidden items-center justify-center gap-7 md:flex lg:gap-9" aria-label="Primary">
        <button type="button" onClick={onOpenSearch} className="icon-btn text-white" aria-label="Search">
          <SearchIcon className="h-[15px] w-[15px]" />
        </button>
        <button type="button" onClick={() => onNav("shop")} className="nav-link">
          MEN
        </button>
        <button type="button" onClick={() => onNav("shop")} className="nav-link">
          WOMEN
        </button>
        <button type="button" onClick={() => onNav("shop")} className="nav-link">
          SHOP
        </button>
        <button type="button" onClick={() => onNav("latest")} className="nav-link">
          LATEST
        </button>
        <button
          type="button"
          onClick={onOpenCart}
          className={`icon-btn relative text-white ${bagPop ? "animate-bag-pop" : ""}`}
          aria-label={`Bag, ${cartCount} items`}
        >
          <BagIcon className="h-[15px] w-[15px]" />
          {cartCount > 0 && <Badge count={cartCount} />}
        </button>
      </nav>

      <div className="flex items-center justify-end gap-5 justify-self-end md:gap-0">
        <button type="button" onClick={onOpenSearch} className="icon-btn text-white md:hidden" aria-label="Search">
          <SearchIcon />
        </button>
        <button
          type="button"
          onClick={onOpenCart}
          className={`icon-btn relative text-white md:hidden ${bagPop ? "animate-bag-pop" : ""}`}
          aria-label={`Bag, ${cartCount} items`}
        >
          <BagIcon />
          {cartCount > 0 && <Badge count={cartCount} />}
        </button>
        <button
          type="button"
          onClick={onOpenMenu}
          className="text-cyan transition-colors hover:text-white"
          aria-label="Open menu"
        >
          <MenuIcon className="h-4 w-6 sm:h-[18px] sm:w-7" />
        </button>
      </div>
    </header>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-magenta px-0.5 text-[9px] font-semibold text-white">
      {count}
    </span>
  );
}

function BuyPanel({
  product,
  color,
  colorIndex,
  size,
  sizeOpen,
  sizeRef,
  colorOpen,
  colorRef,
  onToggleSize,
  onToggleColor,
  onColorIndex,
  onSize,
  onBuy,
  onOpenSizeGuide,
}: {
  product: Product;
  color: Colorway;
  colorIndex: number;
  size: string;
  sizeOpen: boolean;
  sizeRef: RefObject<HTMLDivElement | null>;
  colorOpen: boolean;
  colorRef: RefObject<HTMLDivElement | null>;
  onToggleSize: () => void;
  onToggleColor: () => void;
  onColorIndex: (i: number) => void;
  onSize: (s: string) => void;
  onBuy: () => void;
  onOpenSizeGuide: () => void;
}) {
  return (
    <div className="hero-buy-panel relative z-10 shrink-0 lg:flex lg:justify-end animate-from-right delay-3">
      <div className="flex w-full items-end justify-between gap-4 lg:block lg:max-w-[210px]">
        <div className="lg:contents">
          <p className="text-[38px] font-medium leading-none tracking-tight text-white sm:text-[44px] xl:text-[48px]">
            ${product.price}
          </p>

          <div className="mt-4 flex items-start gap-8 sm:gap-10 lg:mt-6">
            {/* Size */}
            <div ref={sizeRef} className="relative">
              <p className="text-[10px] font-medium tracking-[0.28em] text-white/40">SIZE</p>
              <button
                type="button"
                onClick={onToggleSize}
                className="mt-1.5 flex items-center gap-2 text-[13px] text-white transition-colors hover:text-cyan"
                aria-haspopup="listbox"
                aria-expanded={sizeOpen}
              >
                {size}
                <ChevronDown className={`h-2.5 w-2.5 opacity-70 transition-transform ${sizeOpen ? "rotate-180" : ""}`} />
              </button>
              {sizeOpen && (
                <ul
                  role="listbox"
                  className="absolute bottom-full left-0 z-30 mb-2 max-h-56 min-w-[112px] overflow-y-auto rounded-xl border border-white/10 bg-[#1a1a1d] py-1 shadow-2xl lg:bottom-auto lg:top-full lg:mb-0 lg:mt-2"
                >
                  {sizes.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={s === size}
                        onClick={() => onSize(s)}
                        className={`block w-full px-3 py-2 text-left text-[12px] transition-colors ${
                          s === size ? "text-cyan" : "text-white/80 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                  <li className="mt-1 border-t border-white/10">
                    <button
                      type="button"
                      onClick={onOpenSizeGuide}
                      className="block w-full px-3 py-2 text-left text-[11px] tracking-wide text-white/40 hover:text-cyan"
                    >
                      Size guide
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {/* Color */}
            <div ref={colorRef} className="relative">
              <p className="text-[10px] font-medium tracking-[0.28em] text-white/40">COLOR</p>
              <button
                type="button"
                onClick={onToggleColor}
                className="group mt-2 flex items-center gap-2"
                aria-haspopup="listbox"
                aria-expanded={colorOpen}
                aria-label={`Color: ${color.name}`}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full ring-1 ring-white/30 transition-transform group-hover:scale-125"
                  style={{ background: color.hex }}
                />
                <ChevronDown
                  className={`h-2.5 w-2.5 text-white/50 transition-transform ${colorOpen ? "rotate-180" : ""}`}
                />
              </button>
              {colorOpen && (
                <ul
                  role="listbox"
                  className="absolute bottom-full right-0 z-30 mb-2 min-w-[150px] overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1d] py-1 shadow-2xl lg:bottom-auto lg:left-0 lg:right-auto lg:mb-0 lg:mt-2"
                >
                  {product.colors.map((c, i) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={i === colorIndex}
                        onClick={() => onColorIndex(i)}
                        className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[12px] transition-colors ${
                          i === colorIndex ? "text-cyan" : "text-white/80 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span
                          className="h-3 w-3 shrink-0 rounded-full ring-1 ring-white/25"
                          style={{ background: c.hex }}
                        />
                        {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <button type="button" onClick={onBuy} className="buy-now shrink-0 pb-1 text-[14px] sm:text-base lg:mt-8 lg:pb-0">
          BUY NOW
        </button>
      </div>
    </div>
  );
}

function HeroBar({
  productIndex,
  onPrev,
  onNext,
  onDot,
}: {
  productIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
}) {
  const dotColors = ["#ff2bd6", "outline", "#ff2bd6", "#ff2bd6", "#00d4ff"];

  return (
    <div className="hero-footer relative z-20 flex items-center justify-center px-5 pb-5 pt-2 sm:px-8 sm:pb-6 lg:px-10 lg:pb-7 xl:px-14 animate-fade-up delay-5">
      <div className="hero-switcher flex items-center justify-center">
        <button
          type="button"
          onClick={onPrev}
          className="text-magenta transition-transform hover:scale-110"
          aria-label="Previous colorway"
        >
          <ChevronDoubleLeft className="h-3.5 w-7 sm:h-4 sm:w-8" />
        </button>

        <div className="flex items-center gap-3 sm:gap-[14px]" role="tablist" aria-label="Colorways">
          {products.map((p, i) => {
            const active = i === productIndex;
            const c = dotColors[i];
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={p.model}
                onClick={() => onDot(i)}
                className={`rounded-full transition-all duration-300 ${
                  active ? "h-2.5 w-2.5 sm:h-3 sm:w-3" : "h-1.5 w-1.5 opacity-70 hover:opacity-100 sm:h-2 sm:w-2"
                }`}
                style={
                  c === "outline"
                    ? {
                        background: active ? "#fff" : "transparent",
                        boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.85)",
                      }
                    : { background: c as string }
                }
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNext}
          className="text-cyan transition-transform hover:scale-110"
          aria-label="Next colorway"
        >
          <ChevronDoubleRight className="h-3.5 w-7 sm:h-4 sm:w-8" />
        </button>
      </div>

      <div className="hero-social hidden items-center gap-3.5 text-cyan sm:flex">
          <a href="https://facebook.com/nike" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="https://instagram.com/nike" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href="https://x.com/nike" target="_blank" rel="noreferrer" className="social-icon" aria-label="X">
            <TwitterIcon />
          </a>
      </div>
    </div>
  );
}
