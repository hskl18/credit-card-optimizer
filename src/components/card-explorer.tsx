"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CardArt } from "@/components/card-art";
import type { CatalogCard } from "@/lib/cards/types";

type CardExplorerProps = {
  cards: CatalogCard[];
};

export function CardExplorer({ cards }: CardExplorerProps) {
  const [query, setQuery] = useState("");
  const [issuer, setIssuer] = useState("all");

  const issuers = useMemo(
    () => ["all", ...Array.from(new Set(cards.map((card) => card.issuer))).sort()],
    [cards]
  );

  const filteredCards = cards.filter((card) => {
    const searchable = `${card.name} ${card.issuer} ${card.bestFor.join(" ")}`.toLowerCase();
    const matchesQuery = searchable.includes(query.toLowerCase());
    const matchesIssuer = issuer === "all" || card.issuer === issuer;
    return matchesQuery && matchesIssuer;
  });

  return (
    <section className="explorer-shell">
      <div className="filter-bar">
        <label className="search-box">
          <Search size={18} />
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cards, issuers, or categories"
            type="search"
            value={query}
          />
        </label>
        <select
          aria-label="Filter by issuer"
          onChange={(event) => setIssuer(event.target.value)}
          value={issuer}
        >
          {issuers.map((issuerName) => (
            <option key={issuerName} value={issuerName}>
              {issuerName === "all" ? "All issuers" : issuerName}
            </option>
          ))}
        </select>
      </div>

      <div className="cards-grid">
        {filteredCards.map((card) => (
          <Link className="catalog-card" href={`/cards/${card.slug}`} key={card.slug}>
            <CardArt card={card} />
            <div>
              <span>{card.issuer}</span>
              <h2>{card.name}</h2>
              <p>{card.bestFor.slice(0, 4).join(" / ")}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
