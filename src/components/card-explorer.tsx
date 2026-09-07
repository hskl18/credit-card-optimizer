"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CardArt } from "@/components/card-art";
import { SpendEditor, useSpend } from "@/components/spend-editor";
import { ValuationSwitch, useValuation } from "@/components/valuation-switch";
import type { CatalogCard } from "@/lib/cards/types";
import { annualValue, formatNet } from "@/lib/recommendation/spend";

type CardExplorerProps = {
  cards: CatalogCard[];
};

export function CardExplorer({ cards }: CardExplorerProps) {
  const [query, setQuery] = useState("");
  const [issuer, setIssuer] = useState("all");
  const [valuation, setValuation] = useValuation();
  const [spend, setSpend] = useSpend();

  const issuers = useMemo(
    () => Array.from(new Set(cards.map((card) => card.issuer))).sort(),
    [cards]
  );

  const ranked = cards
    .filter((card) => {
      const haystack = `${card.name} ${card.issuer} ${card.bestFor.join(" ")}`.toLowerCase();
      return (
        haystack.includes(query.trim().toLowerCase()) && (issuer === "all" || card.issuer === issuer)
      );
    })
    .map((card) => ({ card, net: annualValue(card, spend, valuation) }))
    .sort((a, b) => b.net - a.net || a.card.name.localeCompare(b.card.name));

  return (
    <>
      <h1 className="sr-only">
        Every mainstream U.S. credit card, ranked by what you keep after the annual fee
      </h1>
      <ValuationSwitch onChange={setValuation} valuation={valuation} />
      <SpendEditor onChange={setSpend} spend={spend} />

      <div className="tools">
        <input
          aria-label="Search cards"
          className="input"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          type="search"
          value={query}
        />
        <select
          aria-label="Issuer"
          className="select"
          onChange={(event) => setIssuer(event.target.value)}
          value={issuer}
        >
          <option value="all">All issuers</option>
          {issuers.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="head">
        <span className="label" aria-live="polite">
          {ranked.length} cards
        </span>
        <span className="label">Keep after fee</span>
      </div>

      {ranked.length ? (
        <div className="rows">
          {ranked.map(({ card, net }) => (
            <Link className="row" href={`/cards/${card.slug}`} key={card.slug}>
              <CardArt card={card} size="sm" />
              <span className="row-main">
                <span className="label">{card.issuer}</span>
                <span className="title">{card.name}</span>
              </span>
              <span className="row-value">
                <span className={net < 0 ? "money negative" : "money"}>{formatNet(net)}</span>
                <span className="label">{card.annualFee ? `$${card.annualFee} fee` : "No fee"}</span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="empty">Nothing found.</p>
      )}

      <p className="note">
        Earn rate only, against your spend above. Statement credits, lounges, and sign-up bonuses
        are not counted, and spending caps are flagged but not subtracted.
      </p>
    </>
  );
}
