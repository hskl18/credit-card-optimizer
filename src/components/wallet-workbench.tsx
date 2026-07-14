"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import { CardArt } from "@/components/card-art";
import { getCatalogCards } from "@/lib/cards/catalog";
import { categories } from "@/lib/recommendation/categories";
import { recommendCards } from "@/lib/recommendation/recommend";

type WalletWorkbenchProps = {
  compact?: boolean;
  initialWallet: string[];
};

const storageKey = "card-compass-wallet";

export function WalletWorkbench({ compact = false, initialWallet }: WalletWorkbenchProps) {
  const cards = useMemo(() => getCatalogCards(), []);
  const [wallet, setWallet] = useState<string[]>(initialWallet);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("dining");
  const [primeMember, setPrimeMember] = useState(true);

  useEffect(() => {
    const storedWallet = window.localStorage.getItem(storageKey);
    if (storedWallet) {
      const parsed = JSON.parse(storedWallet) as string[];
      setWallet(parsed.filter((slug) => cards.some((card) => card.slug === slug)));
    }
  }, [cards]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(wallet));
  }, [wallet]);

  const ownedCards = cards.filter((card) => wallet.includes(card.slug));
  const availableCards = cards.filter((card) => !wallet.includes(card.slug));
  const category = categories.find((item) => item.id === selectedCategory) ?? categories[0];
  const recommendations = recommendCards({
    cards: ownedCards,
    category,
    primeMember
  });

  const searchMatches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    return availableCards
      .filter((card) => `${card.name} ${card.issuer} ${card.bestFor.join(" ")}`.toLowerCase().includes(normalized))
      .slice(0, 6);
  }, [availableCards, query]);

  return (
    <section className={compact ? "wallet-panel compact-wallet" : "wallet-layout"}>
      <div className="panel wallet-builder">
        <div className="panel-heading">
          <div>
            <h2>Build your wallet</h2>
            <p>Add cards manually. No bank login.</p>
          </div>
        </div>
        <label className="search-box">
          <Search size={18} />
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cards to add"
            type="search"
            value={query}
          />
        </label>

        <div className="add-results">
          {searchMatches.map((card) => (
            <button
              className="add-row"
              key={card.slug}
              onClick={() => setWallet((current) => [...current, card.slug])}
              type="button"
            >
              <CardArt card={card} />
              <span>{card.name}</span>
              <Plus size={18} />
            </button>
          ))}
          {!query.trim() ? (
            <div className="add-empty">
              <Plus size={18} />
              Type a card name to add it
            </div>
          ) : null}
          {query.trim() && !searchMatches.length ? (
            <div className="add-empty">No matching cards left to add.</div>
          ) : null}
        </div>

        <div className="wallet-list-heading">
          <strong>Your cards ({ownedCards.length})</strong>
          <button onClick={() => setWallet([])} type="button">
            Clear all
          </button>
        </div>
        <div className="wallet-list">
          {ownedCards.map((card) => (
            <div className="wallet-row" key={card.slug}>
              <CardArt card={card} />
              <span>{card.name}</span>
              <button
                aria-label={`Remove ${card.name}`}
                onClick={() => setWallet((current) => current.filter((slug) => slug !== card.slug))}
                type="button"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {!ownedCards.length ? <p className="muted-copy">Add at least one card to get recommendations.</p> : null}
        </div>
      </div>

      {!compact ? (
        <div className="panel optimizer-panel">
          <div className="panel-heading">
            <div>
              <h2>Which card should I use?</h2>
              <p>Choose a category and compare your wallet.</p>
            </div>
          </div>
          <div className="category-controls">
            {categories.map((item) => (
              <button
                className={item.id === selectedCategory ? "category-control active" : "category-control"}
                key={item.id}
                onClick={() => setSelectedCategory(item.id)}
                type="button"
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>
          <label className="checkbox-row">
            <input
              checked={primeMember}
              onChange={(event) => setPrimeMember(event.target.checked)}
              type="checkbox"
            />
            Eligible Amazon Prime membership
          </label>

          <div className="recommendation-result">
            {recommendations[0] ? (
              <>
                <CardArt card={recommendations[0].card} priority />
                <div>
                  <span className="soft-pill">{category.label}</span>
                  <h2>Use {recommendations[0].card.name}</h2>
                  <p>{recommendations[0].summary}</p>
                  <strong>{recommendations[0].reason}</strong>
                  {recommendations[0].caveats.length ? (
                    <ul>
                      {recommendations[0].caveats.map((caveat) => (
                        <li key={caveat}>{caveat}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </>
            ) : (
              <p className="muted-copy">Add cards to your wallet first.</p>
            )}
          </div>

          <div className="option-stack">
            {recommendations.slice(1, 5).map((recommendation) => (
              <div className="option-row" key={recommendation.card.slug}>
                <div>
                  <span>{recommendation.card.issuer}</span>
                  <strong>{recommendation.card.name}</strong>
                </div>
                <span className="rate-chip">{recommendation.displayRate}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
