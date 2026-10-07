/* ------------------------------------------------------------------ */
/*  Anatomy icons                                                      */
/* ------------------------------------------------------------------ */
/* 35 line icons from the "Anatomy Icon Set" (see README). They are      */
/* solid silhouettes, so they are painted with a CSS mask: the shape     */
/* shows through in whatever colour the surrounding text uses, exactly   */
/* like the lucide icons they sit next to.                              */

const files = import.meta.glob("../assets/anatomy-icons/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

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
  const url = files[`../assets/anatomy-icons/${name}.svg`];
  if (!url) return null;
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: `url(${url})`,
        WebkitMaskImage: `url(${url})`,
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
