/* ------------------------------------------------------------------ */
/*  Anatomy icons                                                      */
/* ------------------------------------------------------------------ */
/* 35 line icons from the "Anatomy Icon Set" (see README). They are      */
/* solid silhouettes, so they are painted with a CSS mask: the shape     */
/* shows through in whatever colour the surrounding text uses, exactly   */
/* like the lucide icons they sit next to.                              */

const files = import.meta.glob("../assets/anatomy-icons/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// Inlining the markup as a data URI keeps each icon a little smaller than the
// base64 that a bundled asset file would produce.
const masks: Record<string, string> = {};
for (const [path, markup] of Object.entries(files)) {
  const name = path.slice(path.lastIndexOf("/") + 1, -".svg".length);
  masks[name] = `url("data:image/svg+xml,${encodeURIComponent(markup)}")`;
}

export type AnatomyIconName =
  | "bladder"
  | "blood-cell"
  | "body-lateral"
  | "bone"
  | "brain"
  | "brain-side"
  | "ear"
  | "eye"
  | "eye-lens"
  | "feet"
  | "finger"
  | "foot"
  | "hair"
  | "hand"
  | "head"
  | "head-brain"
  | "heart"
  | "intestine"
  | "joints"
  | "kidney"
  | "leg"
  | "lips"
  | "liver"
  | "lungs"
  | "mouth"
  | "muscle"
  | "nose"
  | "nose-full"
  | "reproductive"
  | "skeleton"
  | "spine"
  | "spleen"
  | "stomach"
  | "throat"
  | "tooth";

export function AnatomyIcon({
  name,
  className = "size-[18px]",
}: {
  name: AnatomyIconName;
  className?: string;
}) {
  const mask = masks[name];
  if (!mask) return null;
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
