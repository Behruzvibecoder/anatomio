import { useCallback, useEffect, useState } from "react";
import Hero from "./components/Hero";
import {
  CartDrawer,
  MenuDrawer,
  SearchOverlay,
  SizeGuide,
  StickyBuy,
  Toast,
  type CartItem,
} from "./components/Overlays";
import {
  Colorways,
  Features,
  FinalCta,
  HowItWorks,
  Marquee,
  SiteFooter,
  Specs,
  TechBanner,
} from "./components/Sections";
import { ProductFilm } from "./components/Showcase";
import { products } from "./data";

export default function App() {
  const [productIndex, setProductIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState("UK 9");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [filmOpen, setFilmOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [bagPop, setBagPop] = useState(false);
  const [sticky, setSticky] = useState(false);

  const product = products[productIndex];
  const color = product.colors[Math.min(colorIndex, product.colors.length - 1)];

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }, []);

  const setProduct = (i: number) => {
    setProductIndex(i);
    setColorIndex(0);
  };

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setMenuOpen(false);
        setSearchOpen(false);
        setSizeOpen(false);
      }
      if (filmOpen) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowLeft") setProduct((productIndex - 1 + products.length) % products.length);
      if (e.key === "ArrowRight") setProduct((productIndex + 1) % products.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [productIndex]);

  const navTo = (id: string) => {
    setMenuOpen(false);
    setSearchOpen(false);
    const el = document.getElementById(id === "top" ? "top" : id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = () => {
    const key = `${product.id}-${color.id}-${size}`;
    setCart((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      return [
        ...prev,
        {
          key,
          product,
          colorName: color.name,
          colorHex: color.hex,
          colorFilter: color.filter,
          image: color.image,
          size,
          qty: 1,
        },
      ];
    });
    setBagPop(true);
    window.setTimeout(() => setBagPop(false), 450);
    showToast("ADDED TO BAG");
  };

  const checkout = () => {
    setCart([]);
    setCartOpen(false);
    showToast("ORDER CONFIRMED — WELCOME TO ADAPT");
  };

  const onSearchSelect = (pi: number, ci: number) => {
    setProductIndex(pi);
    setColorIndex(ci);
    setSearchOpen(false);
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="top" className="min-h-screen bg-black text-white">
      <Hero
        productIndex={productIndex}
        colorIndex={colorIndex}
        size={size}
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        bagPop={bagPop}
        onProductIndex={setProduct}
        onColorIndex={setColorIndex}
        onSize={setSize}
        onBuy={addToCart}
        onOpenCart={() => setCartOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSizeGuide={() => setSizeOpen(true)}
        onOpenFilm={() => setFilmOpen(true)}
        onNav={navTo}
      />

      <Marquee />
      <TechBanner onPlay={() => setFilmOpen(true)} />
      <Features />
      <HowItWorks />
      <Colorways onSelect={onSearchSelect} />
      <Specs />
      <FinalCta product={product} onBuy={addToCart} />
      <SiteFooter />

      <StickyBuy show={sticky} price={product.price} onBuy={addToCart} />

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQty={(key, qty) => setCart((prev) => prev.map((i) => (i.key === key ? { ...i, qty } : i)))}
        onRemove={(key) => setCart((prev) => prev.filter((i) => i.key !== key))}
        onCheckout={checkout}
      />
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} onNav={navTo} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onSelect={onSearchSelect} />
      <SizeGuide open={sizeOpen} onClose={() => setSizeOpen(false)} />
      <ProductFilm
        open={filmOpen}
        product={product}
        color={color}
        onClose={() => setFilmOpen(false)}
        onBuy={addToCart}
      />
      <Toast message={toast} />
    </div>
  );
}
