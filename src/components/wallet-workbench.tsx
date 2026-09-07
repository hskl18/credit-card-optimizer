"use client";

import { useEffect, useMemo, useState } from "react";
import { BestList } from "@/components/best-list";
import { CardArt } from "@/components/card-art";
import { SpendEditor, useSpend } from "@/components/spend-editor";
import { ValuationSwitch, useValuation } from "@/components/valuation-switch";
import type { CatalogCard } from "@/lib/cards/types";
import { bestByCategory } from "@/lib/recommendation/recommend";
import { annualValue, formatNet } from "@/lib/recommendation/spend";

const storageKey = "card-compass-wallet";

export function WalletWorkbench({ cards }: { cards: CatalogCard[] }) {
  const [wallet, setWallet] = useState<string[]>([]);
  const [restored, setRestored] = useState(false);
  const [query, setQuery] = useState("");
  const [primeMember, setPrimeMember] = useState(false);
  const [valuation, setValuation] = useValuation();
  const [spend, setSpend] = useSpend();

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
      if (Array.isArray(stored)) {
        setWallet(stored.filter((slug) => cards.some((card) => card.slug === slug)));
      }
    } catch {
      // A corrupt entry just starts an empty wallet.
    }
    setRestored(true);
  }, [cards]);

  useEffect(() => {
    // Only write after the restore pass, otherwise the empty initial state wins.
    if (restored) window.localStorage.setItem(storageKey, JSON.stringify(wallet));
  }, [restored, wallet]);

  const owned = cards.filter((card) => wallet.includes(card.slug));

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];

    return cards
      .filter((card) => !wallet.includes(card.slug))
      .filter((card) => `${card.name} ${card.issuer}`.toLowerCase().includes(needle))
      .slice(0, 6);
  }, [cards, query, wallet]);

  return (
    <>
      <h1 className="sr-only">Your wallet, and the best card to use in each category</h1>
      <div className="head">
        <span className="label">Wallet</span>
        <span className="label">{owned.length} cards</span>
      </div>

      <div className="tools">
        <input
          aria-label="Add a card"
          className="input"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Add a card"
          type="search"
          value={query}
        />
      </div>

      {matches.length ? (
        <div className="rows">
          {matches.map((card) => (
            <button
              className="row"
              key={card.slug}
              onClick={() => {
                setWallet((current) => [...current, card.slug]);
                setQuery("");
              }}
              type="button"
            >
              <CardArt card={card} size="sm" />
              <span className="row-main">
                <span className="label">{card.issuer}</span>
                <span className="title">{card.name}</span>
              </span>
              <span className="row-end">Add</span>
            </button>
          ))}
        </div>
      ) : null}

      <div className="rows">
        {owned.map((card) => (
          <div className="row" key={card.slug}>
            <CardArt card={card} size="sm" />
            <span className="row-main">
              <span className="title">{card.name}</span>
              <span className="row-sub">
                {formatNet(annualValue(card, spend, valuation))} a year after its fee
              </span>
            </span>
            <button
              aria-label={`Remove ${card.name}`}
              className="x"
              onClick={() => setWallet((current) => current.filter((slug) => slug !== card.slug))}
              type="button"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <ValuationSwitch onChange={setValuation} valuation={valuation} />
      <SpendEditor onChange={setSpend} spend={spend} />
      <div className="head">
        <span className="label">Your best card</span>
        <span className="label">Back per $100</span>
      </div>
      {wallet.includes("prime-visa") ? (
        <label className="check">
          <input
            checked={primeMember}
            onChange={(event) => setPrimeMember(event.target.checked)}
            type="checkbox"
          />
          Amazon Prime member
        </label>
      ) : null}
      {owned.length ? (
        <BestList rows={bestByCategory(owned, { primeMember, valuation })} />
      ) : (
        <p className="empty">No cards yet.</p>
      )}
    </>
  );
}
