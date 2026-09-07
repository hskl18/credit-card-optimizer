import type { CatalogCard } from "@/lib/cards/types";
import { categories, pickRuleCategories, rotatingRuleCategories } from "./categories";
import { dollarsPer100, type Valuation } from "./value";

export const spendBuckets = [
  { id: "dining", label: "Dining" },
  { id: "groceries", label: "Groceries" },
  { id: "gas", label: "Gas" },
  { id: "travel", label: "Travel" },
  { id: "general", label: "Everything else" }
] as const;

export type SpendProfile = Record<(typeof spendBuckets)[number]["id"], number>;

export const spendSource = {
  label: "BLS Consumer Expenditure Survey",
  url: "https://www.bls.gov/cex/"
};

/**
 * Monthly card spend, anchored on the BLS Consumer Expenditure Survey and cut
 * down to what people actually put on a card. Every field is editable.
 */
export const defaultSpend: SpendProfile = {
  dining: 320,
  groceries: 480,
  gas: 200,
  travel: 200,
  general: 800
};

export function monthlyTotal(spend: SpendProfile) {
  return spendBuckets.reduce((total, bucket) => total + spend[bucket.id], 0);
}

/**
 * What one card returns in a year if it carried all of this spend, minus its
 * annual fee. Opt-in bonuses count once, because you only get to pick one.
 */
export function annualValue(card: CatalogCard, spend: SpendProfile, valuation: Valuation) {
  const rateFor = (ruleCategories: readonly string[]) => {
    const rates = card.rewardRules
      .filter((rule) => ruleCategories.includes(rule.category))
      .map((rule) => dollarsPer100(rule.rate, rule.rateType, card.rewardCurrency, valuation));
    return rates.length ? Math.max(...rates) : 0;
  };

  const base = rateFor(["all_other"]);
  const picked = rateFor([...pickRuleCategories]);
  const rotating = rateFor([...rotatingRuleCategories]);

  let rewards = 0;
  const optInGains: number[] = [];

  for (const bucket of spendBuckets) {
    const category = categories.find((item) => item.id === bucket.id);
    if (!category) continue;

    const yearly = spend[bucket.id] * 12;
    const earned = rateFor(category.matchingRules) || base;
    rewards += (yearly * earned) / 100;

    if (bucket.id === "general") continue;
    // A picked category runs all year; a rotating one runs a single quarter.
    optInGains.push((yearly * Math.max(0, picked - earned)) / 100);
    optInGains.push((yearly * 0.25 * Math.max(0, rotating - earned)) / 100);
  }

  return rewards + Math.max(0, ...optInGains) - card.annualFee;
}

export function formatNet(dollars: number) {
  const rounded = Math.round(dollars);
  return `${rounded < 0 ? "−" : "+"}$${Math.abs(rounded).toLocaleString("en-US")}`;
}
