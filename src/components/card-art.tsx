import Image from "next/image";
import type { CatalogCard } from "@/lib/cards/types";

type CardArtProps = {
  card: CatalogCard;
  priority?: boolean;
};

export function CardArt({ card, priority = false }: CardArtProps) {
  if (card.art?.publicPath) {
    return (
      <div className="card-art-frame">
        <Image
          alt={`${card.name} card artwork`}
          className="card-art-image"
          height={190}
          loading={priority ? "eager" : "lazy"}
          src={card.art.publicPath}
          width={300}
        />
      </div>
    );
  }

  return (
    <div className="card-art-frame">
      <div className={`card-art-fallback issuer-${card.issuerSlug}`}>
        <span>{card.issuer}</span>
        <strong>{card.name.replace(card.issuer, "").trim() || card.name}</strong>
      </div>
    </div>
  );
}
