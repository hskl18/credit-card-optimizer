import { describe, expect, it } from "vitest";
import { getCatalogCards } from "./catalog";

describe("card artwork publication gate", () => {
  it("exposes only artwork that passed the resolution gate", () => {
    const cards = getCatalogCards();
    const bySlug = new Map(cards.map((card) => [card.slug, card]));

    expect(bySlug.get("chase-sapphire-preferred")?.art?.publicPath).toBe(
      "/card-art/chase-sapphire-preferred.png",
    );
    expect(bySlug.get("capital-one-venture-x")?.art?.publicPath).toBe(
      "/card-art/capital-one-venture-x.png",
    );
    expect(bySlug.get("amex-gold")?.art).toBeUndefined();
    expect(bySlug.get("capital-one-savor")?.art).toBeUndefined();
    expect(bySlug.get("citi-double-cash")?.art).toBeUndefined();
  });
});
