import { useEffect, useState } from "react";
import { knockoutDarkBg } from "../lib/knockout";

const SHADOW =
  "drop-shadow(0 34px 44px rgba(0,0,0,0.55)) drop-shadow(0 12px 30px rgba(0,212,255,0.16))";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Colorway recolor filter applied to the shared master render. */
  colorFilter?: string;
  shadow?: boolean;
  eager?: boolean;
};

export default function ShoeImage({
  src,
  alt,
  className = "",
  colorFilter,
  shadow = true,
  eager,
}: Props) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    knockoutDarkBg(src).then((next) => {
      if (live) setUrl(next);
    });
    return () => {
      live = false;
    };
  }, [src]);

  const filter = [colorFilter, shadow ? SHADOW : null].filter(Boolean).join(" ");

  return (
    <img
      src={url ?? src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      style={filter ? { filter } : undefined}
      className={`shoe-img ${url ? "shoe-ready" : "shoe-loading"} ${className}`}
    />
  );
}
