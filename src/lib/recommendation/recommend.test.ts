import { describe, expect, it } from "vitest";
import { getCatalogCards } from "@/lib/cards/catalog";
import { categories } from "./categories";
import { recommendCards } from "./recommend";

const cards = getCatalogCards();

function category(id: string) {
  const match = categories.find((item) => item.id === id);
  if (!match) throw new Error(`Missing category ${id}`);
  return match;
}

describe("recommendCards", () => {
  it("recommends Amex Gold for dining over Amex Platinum", () => {
    const wallet = cards.filter((card) => ["amex-gold", "amex-platinum"].includes(card.slug));
    const [top] = recommendCards({ cards: wallet, category: category("dining") });

    expect(top.card.slug).toBe("amex-gold");
  });

  it("recommends Citi Double Cash for general spend against weaker fallback cards", () => {
    const wallet = cards.filter((card) =>
      ["chase-sapphire-preferred", "citi-double-cash"].includes(card.slug)
    );
    const [top] = recommendCards({ cards: wallet, category: category("general") });

    expect(top.card.slug).toBe("citi-double-cash");
  });

  it("recommends Prime Visa for Amazon when Prime is eligible", () => {
    const wallet = cards.filter((card) => ["prime-visa", "amex-gold"].includes(card.slug));
    const [top] = recommendCards({ cards: wallet, category: category("amazon"), primeMember: true });

    expect(top.card.slug).toBe("prime-visa");
  });
});
