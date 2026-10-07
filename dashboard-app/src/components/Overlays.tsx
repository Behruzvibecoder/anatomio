import { useEffect, useMemo, useState } from "react";
import { products, sizeGuide, type Product } from "../data";
import { CloseIcon, NikeSwoosh, SearchIcon } from "./Icons";
import ShoeImage from "./ShoeImage";

export type CartItem = {
  key: string;
  product: Product;
  colorName: string;
  colorHex: string;
  colorFilter?: string;
  image: string;
  size: string;
  qty: number;
};

function useLock(open: boolean) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
}

export function CartDrawer({
  open,
  items,
  onClose,
  onQty,
  onRemove,
  onCheckout,
}: {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
}) {
  useLock(open);
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-black/70 animate-overlay" aria-label="Close bag" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#121214] animate-drawer">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <h2 className="text-sm tracking-[0.28em]">BAG ({items.reduce((s, i) => s + i.qty, 0)})</h2>
          <button type="button" onClick={onClose} className="text-white/70 hover:text-white" aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="mt-16 text-center text-sm text-white/40">Your bag is empty. Lock in a pair.</p>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#1a1a1d]">
                    <ShoeImage
                      src={item.image}
                      alt=""
                      colorFilter={item.colorFilter}
                      shadow={false}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.product.model}</p>
                    <p className="text-xs text-white/40">
                      {item.colorName} · {item.size}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          className="h-6 w-6 rounded border border-white/15 hover:border-cyan"
                          onClick={() => onQty(item.key, Math.max(1, item.qty - 1))}
                        >
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button
                          type="button"
                          className="h-6 w-6 rounded border border-white/15 hover:border-cyan"
                          onClick={() => onQty(item.key, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button type="button" onClick={() => onRemove(item.key)} className="text-[11px] text-white/35 hover:text-magenta">
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm">${item.product.price * item.qty}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-white/8 px-6 py-5">
          <div className="mb-4 flex justify-between text-sm">
            <span className="text-white/45">Subtotal</span>
            <span>${total}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={onCheckout}
            className="w-full rounded-full bg-cyan py-3 text-sm font-semibold tracking-[0.2em] text-black disabled:opacity-30 hover:bg-white transition-colors"
          >
            CHECKOUT
          </button>
        </div>
      </aside>
    </div>
  );
}

export function MenuDrawer({
  open,
  onClose,
  onNav,
}: {
  open: boolean;
  onClose: () => void;
  onNav: (id: string) => void;
}) {
  useLock(open);
  if (!open) return null;
  const links = [
    { id: "shop", label: "Men" },
    { id: "shop", label: "Women" },
    { id: "shop", label: "Shop Adapt" },
    { id: "latest", label: "Latest" },
    { id: "shop", label: "Colorways" },
  ];
  return (
    <div className="fixed inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-black/70 animate-overlay" aria-label="Close menu" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-magenta/30 bg-[#101012] animate-drawer">
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-magenta">
            <NikeSwoosh className="h-4 w-12" />
          </span>
          <button type="button" onClick={onClose} className="text-cyan" aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-6 pt-6">
          {links.map((l) => (
            <button
              key={l.label}
              type="button"
              onClick={() => onNav(l.id)}
              className="py-3 text-left text-2xl font-display italic font-extrabold hover:text-magenta transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <p className="mt-auto px-6 pb-8 text-xs text-white/30">Self-lacing · Court · Unisex</p>
      </aside>
    </div>
  );
}

export function SearchOverlay({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (productIndex: number, colorIndex: number) => void;
}) {
  useLock(open);
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    const rows: {
      pi: number;
      ci: number;
      title: string;
      color: string;
      image: string;
      filter?: string;
      price: number;
    }[] = [];
    products.forEach((p, pi) => {
      const c = p.colors[0];
      const hay = `${p.model} ${c.name} ${p.tagline}`.toLowerCase();
      if (!query || hay.includes(query)) {
        rows.push({
          pi,
          ci: 0,
          title: p.model,
          color: c.name,
          image: c.image,
          filter: c.filter,
          price: p.price,
        });
      }
    });
    return rows;
  }, [q]);

  useEffect(() => {
    if (open) setQ("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 pt-24 animate-overlay">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#141416] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/8 px-4">
          <SearchIcon className="h-4 w-4 text-white/40" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Adapt colorways"
            className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-white/30"
          />
          <button type="button" onClick={onClose} className="text-white/50 hover:text-white" aria-label="Close search">
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <ul className="max-h-80 overflow-y-auto py-2">
          {results.length === 0 && <li className="px-4 py-6 text-sm text-white/35">No matches.</li>}
          {results.map((r) => (
            <li key={`${r.pi}-${r.ci}`}>
              <button
                type="button"
                onClick={() => onSelect(r.pi, r.ci)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5"
              >
                <ShoeImage
                  src={r.image}
                  alt=""
                  colorFilter={r.filter}
                  shadow={false}
                  className="h-12 w-12 rounded-lg bg-[#1a1a1d] object-contain"
                />
                <span className="flex-1">
                  <span className="block text-sm">{r.title}</span>
                  <span className="block text-xs text-white/40">{r.color}</span>
                </span>
                <span className="text-sm text-white/60">${r.price}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  useLock(open);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button type="button" className="absolute inset-0 bg-black/70 animate-overlay" aria-label="Close size guide" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#141416] p-6 animate-fade-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm tracking-[0.28em]">SIZE GUIDE</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-white/60 hover:text-white">
            <CloseIcon />
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] tracking-[0.2em] text-white/40">
              <th className="py-2 text-left font-medium">UK</th>
              <th className="py-2 text-left font-medium">US</th>
              <th className="py-2 text-left font-medium">EU</th>
              <th className="py-2 text-left font-medium">CM</th>
            </tr>
          </thead>
          <tbody>
            {sizeGuide.map((r) => (
              <tr key={r.uk} className="border-t border-white/8">
                <td className="py-2.5">{r.uk}</td>
                <td className="py-2.5 text-white/70">{r.us}</td>
                <td className="py-2.5 text-white/70">{r.eu}</td>
                <td className="py-2.5 text-white/70">{r.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-xs text-white/35">Unisex fit. If you are between sizes, Adapt can micro-adjust — size down for a race fit.</p>
      </div>
    </div>
  );
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-cyan/30 bg-[#121214]/95 px-5 py-2.5 text-xs tracking-[0.18em] text-cyan shadow-[0_0_24px_rgba(0,212,255,0.25)] animate-fade-up">
      {message}
    </div>
  );
}

export function StickyBuy({
  show,
  price,
  onBuy,
}: {
  show: boolean;
  price: number;
  onBuy: () => void;
}) {
  if (!show) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 border-t border-white/10 bg-black/80 backdrop-blur-md lg:hidden animate-fade-up">
      <div className="flex items-center justify-between px-5 py-3">
        <p className="text-lg font-medium">${price}</p>
        <button
          type="button"
          onClick={onBuy}
          className="rounded-full bg-cyan px-6 py-2 text-xs font-semibold tracking-[0.2em] text-black"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}
