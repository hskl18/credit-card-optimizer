import Link from "next/link";
import { CardArt } from "@/components/card-art";
import type { CardRecommendation } from "@/lib/recommendation/recommend";
import type { SpendingCategory } from "@/lib/cards/types";

type BestListProps = {
  rows: { category: SpendingCategory; top: CardRecommendation }[];
};

export function BestList({ rows }: BestListProps) {
  return (
    <div className="rows">
      {rows.map(({ category, top }) => (
        <Link className="row" href={`/cards/${top.card.slug}`} key={category.id}>
          <CardArt card={top.card} size="sm" />
          <span className="row-main">
            <span className="label">{category.label}</span>
            <span className="title">{top.card.name}</span>
            <span className="row-sub">{top.caveats.join(" · ")}</span>
          </span>
          <span className="row-value">
            <span className="money">{top.displayValue}</span>
            <span className="label">{top.displayRate}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
