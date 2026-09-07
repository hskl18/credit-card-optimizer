import { BestBoard } from "@/components/best-board";
import { getCatalogCards } from "@/lib/cards/catalog";

export default function BestPage() {
  return <BestBoard cards={getCatalogCards()} />;
}
