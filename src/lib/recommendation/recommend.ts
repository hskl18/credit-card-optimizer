import type { CatalogCard, RewardRule, SpendingCategory } from "@/lib/cards/types";
import { categories, conditionalRuleCategories } from "./categories";
import { dollarsPer100, formatDollars, formatRate, type Valuation } from "./value";

type RecommendationInput = {
  cards: CatalogCard[];
  category: SpendingCategory;
  primeMember?: boolean;
  valuation?: Valuation;
};

/**
 * category    - a published rule for this exact category, earned automatically.
 * conditional - a rule the holder has to pick or activate first.
 * fallback    - no matching rule, so the card's base rate applies.
 */
export type MatchKind = "category" | "conditional" | "fallback";

export type CardRecommendation = {
  card: CatalogCard;
  /** Dollars back per $100 spent, the number the whole app ranks on. */
  value: number;
  displayValue: string;
  displayRate: string;
  summary: string;
  caveats: string[];
  match: MatchKind;
  score: number;
};

export function recommendCards({
  cards,
  category,
  primeMember = false,
  valuation = "cash"
}: RecommendationInput): CardRecommendation[] {
  return cards
    .map((card) => {
      const found = findBestRule(card, category, valuation);
      if (!found) return null;

      const { rule } = found;
      const caveats = getCaveats(rule, primeMember);
      const value = dollarsPer100(rule.rate, rule.rateType, card.rewardCurrency, valuation);
      // The transfer number is a ceiling, so it never appears without its floor.
      const floor = dollarsPer100(rule.rate, rule.rateType, card.rewardCurrency, "cash");
      if (floor < value) caveats.unshift(`${formatDollars(floor)} if you cash out`);

      return {
        card,
        value,
        displayValue: formatDollars(value),
        displayRate: formatRate(rule.rate, rule.rateType),
        summary: rule.notes,
        caveats,
        match: found.match,
        score: value - caveats.length * 0.25
      };
    })
    .filter((item): item is CardRecommendation => item !== null)
    .sort((a, b) => b.score - a.score || a.card.name.localeCompare(b.card.name));
}

/** The best card for every spending category, ranked over the given cards. */
export function bestByCategory(
  cards: CatalogCard[],
  { primeMember = false, guaranteedOnly = false, valuation = "cash" as Valuation } = {}
) {
  const board = categories.map((category) => ({
    category,
    picks: recommendCards({ cards, category, primeMember, valuation })
  }));

  if (guaranteedOnly) {
    return board
      .map(({ category, picks }) => {
        const top = picks.find((item) => item.match === "category");
        return top ? { category, top } : null;
      })
      .filter((row) => row !== null);
  }

  // An opt-in card only pays its bonus on one category at a time, so each one
  // keeps the single row where it beats the automatic alternative by the most,
  // and no two opt-in cards are sent to the same row.
  // Cards that allow two picks are still held to one, which under-promises.
  const claims: { slug: string; categoryId: string; edge: number }[] = [];
  for (const { category, picks } of board) {
    const rival = picks.find((item) => item.match !== "conditional");
    for (const pick of picks) {
      if (pick.match !== "conditional") continue;
      const edge = pick.score - (rival?.score ?? 0);
      if (edge > 0) claims.push({ slug: pick.card.slug, categoryId: category.id, edge });
    }
  }
  claims.sort((a, b) => b.edge - a.edge || a.slug.localeCompare(b.slug));

  const slots = new Map<string, string>();
  const taken = new Set<string>();
  for (const claim of claims) {
    if (slots.has(claim.slug) || taken.has(claim.categoryId)) continue;
    slots.set(claim.slug, claim.categoryId);
    taken.add(claim.categoryId);
  }

  return board
    .map(({ category, picks }) => {
      const top = picks.find(
        (item) =>
          item.match !== "conditional" || slots.get(item.card.slug) === category.id
      );
      return top ? { category, top } : null;
    })
    .filter((row) => row !== null);
}

function findBestRule(card: CatalogCard, category: SpendingCategory, valuation: Valuation) {
  // Rules are compared by what they are worth, never by their raw number, so a
  // 5x rule cannot beat a 6% rule just because five is smaller than six.
  const highest = (rules: RewardRule[]) =>
    [...rules].sort(
      (a, b) =>
        dollarsPer100(b.rate, b.rateType, card.rewardCurrency, valuation) -
        dollarsPer100(a.rate, a.rateType, card.rewardCurrency, valuation)
    )[0];

  const direct = highest(
    card.rewardRules.filter((rule) => category.matchingRules.includes(rule.category))
  );
  // Opt-in bonuses are merchant-category programs: they cannot cover the base
  // rate, and no issuer offers a single retailer as a category you can pick.
  const optInApplies = category.id !== "general" && category.id !== "amazon";
  const conditional = optInApplies
    ? highest(card.rewardRules.filter((rule) => conditionalRuleCategories.has(rule.category)))
    : undefined;

  const worth = (rule?: RewardRule) =>
    rule ? dollarsPer100(rule.rate, rule.rateType, card.rewardCurrency, valuation) : -1;

  if (direct && worth(direct) >= worth(conditional)) {
    return { rule: direct, match: "category" as const };
  }
  if (conditional) {
    return { rule: conditional, match: "conditional" as const };
  }

  const base = card.rewardRules.find((rule) => rule.category === "all_other");
  return base ? { rule: base, match: "fallback" as const } : null;
}

// Caveats are read out of the rule notes. Move them to structured fields if the
// catalog ever carries caps and booking requirements as data.
function getCaveats(rule: RewardRule, primeMember: boolean) {
  const caveats: string[] = [];
  const notes = rule.notes.toLowerCase();

  if (rule.category === "quarterly_bonus") caveats.push("this quarter only");
  else if (conditionalRuleCategories.has(rule.category)) caveats.push("only if you pick it");

  if (notes.includes("activation")) caveats.push("activate it");
  if (/\bcaps?\b|\bcapped\b/.test(notes)) caveats.push("capped");
  if (/\b(booked|purchased) through\b|\bportal\b/.test(notes)) caveats.push("book via issuer");
  if (notes.includes("excludes")) caveats.push("some merchants out");
  if (!primeMember && (rule.category === "amazon" || rule.category === "whole_foods")) {
    caveats.push("needs Prime");
  }

  return caveats;
}
