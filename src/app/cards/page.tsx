import type { Metadata } from "next";
import { CardExplorer } from "@/components/card-explorer";
import { getCatalogCards } from "@/lib/cards/catalog";

export const metadata: Metadata = {
  title: "Cards",
  description:
    "All 27 mainstream U.S. credit cards ranked by what you actually keep in a year, after the annual fee.",
  alternates: { canonical: "/cards" }
};

export default function CardsPage() {
  return <CardExplorer cards={getCatalogCards()} />;
}
