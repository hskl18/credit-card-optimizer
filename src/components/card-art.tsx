import Image from "next/image";
import type { CatalogCard } from "@/lib/cards/types";

type CardArtProps = {
  card: CatalogCard;
  priority?: boolean;
  size?: "sm" | "lg";
};

/** Mirrors the frames in globals.css so next/image requests a matching size. */
const frames = {
  sm: { width: 80, height: 50 },
  lg: { width: 400, height: 230 }
};

export function CardArt({ card, priority = false, size = "sm" }: CardArtProps) {
  const art = card.art;
  if (!art) {
    return <div className={`art art-${size}`} aria-hidden="true" />;
  }

  const frame = frames[size];
  // Fit the frame, and never render past the source pixels.
  const scale = Math.min(frame.width / art.pixelWidth, frame.height / art.pixelHeight, 1);

  return (
    <div className={`art art-${size}`}>
      <Image
        // Decorative: every call site renders the card name right beside it.
        alt=""
        height={Math.round(art.pixelHeight * scale)}
        priority={priority}
        src={art.publicPath}
        width={Math.round(art.pixelWidth * scale)}
      />
    </div>
  );
}
