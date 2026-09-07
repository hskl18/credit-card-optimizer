import { describe, expect, it } from "vitest";
import { getCatalogCards } from "./catalog";

describe("card artwork", () => {
  const cards = getCatalogCards();

  it("resolves a public path for every card with approved artwork", () => {
    const bySlug = new Map(cards.map((card) => [card.slug, card]));

    expect(bySlug.get("chase-sapphire-preferred")?.art?.publicPath).toBe(
      "/card-art/chase-sapphire-preferred.png"
    );
    expect(bySlug.get("citi-custom-cash")?.art?.publicPath).toBe(
      "/card-art/citi-custom-cash.webp"
    );
  });

  it("carries source pixel dimensions so nothing renders upscaled", () => {
    for (const card of cards) {
      if (!card.art) continue;
      expect(card.art.pixelWidth).toBeGreaterThan(0);
      expect(card.art.pixelHeight).toBeGreaterThan(0);
      expect(card.art.sourcePage).toMatch(/^https:\/\//);
    }
  });
});
