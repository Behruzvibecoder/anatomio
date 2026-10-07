import { useState } from "react";
import appStandIn from "../assets/app-art.svg";
import premiumStandIn from "../assets/premium-art.svg";

/* ------------------------------------------------------------------ */
/*  Dashboard artwork                                                  */
/* ------------------------------------------------------------------ */
/*  The dashboard was laid out around two illustrations that never      */
/*  reached the repository:                                            */
/*                                                                    */
/*    public/images/app-art.png      the mobile-app tile (light, 1:1)   */
/*    public/images/premium-art.png  the dark promo card (dark, wide)   */
/*                                                                    */
/*  Drop the real files in under those names — no code change, no       */
/*  rebuild of the layout needed — and they replace the bundled SVG     */
/*  stand-ins automatically.                                           */
/* ------------------------------------------------------------------ */

const sources = {
  app: { real: "images/app-art.png", standIn: appStandIn },
  premium: { real: "images/premium-art.png", standIn: premiumStandIn },
} as const;

export function Artwork({
  name,
  className = "",
}: {
  name: keyof typeof sources;
  className?: string;
}) {
  const { real, standIn } = sources[name];
  const [src, setSrc] = useState<string>(real);

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      onError={() => setSrc((current) => (current === real ? standIn : current))}
    />
  );
}
