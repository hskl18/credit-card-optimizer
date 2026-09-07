import type { CatalogCard, RewardRule } from "@/lib/cards/types";
import { conditionalRuleCategories, rotatingRuleCategories } from "./categories";
import { formatDollars, formatRate, programFor } from "./value";

/** A plain flat-rate card with no fee, the bar every bonus card has to clear. */
const flatCardPer100 = 2;

export function formatRuleCategory(category: string) {
  if (category === "all_other") return "everyday spending";
  const acronyms: Record<string, string> = { ev: "EV", us: "U.S." };
  return category
    .split("_")
    .map((word) => acronyms[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Everything a reader needs to turn this card's rates into money, computed. */
export function cardGuide(card: CatalogCard) {
  const program = programFor(card.rewardCurrency);
  const headline = bestRule(card.rewardRules.filter((rule) => rule.category !== "all_other"));
  // Break-even and the ladder use a rate you can hit with ordinary spending, not
  // a portal-only rate nobody puts thousands of dollars a year through.
  const everyday =
    bestRule(
      card.rewardRules.filter((rule) => rule.category !== "all_other" && !isPortalOnly(rule))
    ) ??
    card.rewardRules.find((rule) => rule.category === "all_other") ??
    headline;

  // What each redemption path is worth at that everyday rate. A flat cash-back
  // rate is the same however you redeem, so those paths collapse to one row.
  const allPaths = program.paths.map((path) => ({
    label: path.label,
    cents: path.cents,
    per100: everyday ? ratePer100(everyday, path.cents) : path.cents
  }));
  const varies = new Set(allPaths.map((path) => path.per100)).size > 1;
  const ladder = varies ? allPaths : [allPaths[allPaths.length - 1]];
  const best = ladder[0];
  const floor = ladder[ladder.length - 1];

  // Some issuers pay a "percent" that is really transferable points. The catalog
  // stores the published percent, so say plainly what a pairing card unlocks.
  const asPoints =
    program.pairing && everyday && everyday.rateType.includes("percent")
      ? {
          pairing: program.pairing,
          cents: program.paths[0].cents,
          per100: everyday.rate * program.paths[0].cents
        }
      : undefined;

  return {
    program,
    ladder,
    headline,
    everyday,
    varies,
    asPoints,
    /** How much better the best path is than the effortless one. */
    upside: floor.per100 > 0 ? best.per100 / floor.per100 : 1,
    breakEven: {
      best: breakEvenSpend(card.annualFee, best.per100),
      floor: breakEvenSpend(card.annualFee, floor.per100)
    },
    rules: houseRules(card)
  };
}

function bestRule(rules: RewardRule[]) {
  if (!rules.length) return undefined;
  const cents = 1.5; // A middle valuation, only used to rank rules against each other.
  return [...rules].sort((a, b) => ratePer100(b, cents) - ratePer100(a, cents))[0];
}

function isPortalOnly(rule: RewardRule) {
  return /\b(booked|purchased) through\b|\bportal\b/.test(rule.notes.toLowerCase());
}

function ratePer100(rule: RewardRule, cents: number) {
  return rule.rateType.includes("percent") ? rule.rate : rule.rate * cents;
}

/** Yearly bonus-category spend needed before the fee is paid off. */
function breakEvenSpend(annualFee: number, per100: number) {
  if (annualFee === 0) return 0;
  const edge = per100 - flatCardPer100;
  if (edge <= 0) return null;
  return Math.round((annualFee * 100) / edge);
}

function houseRules(card: CatalogCard) {
  const notes = card.rewardRules.map((rule) => rule.notes.toLowerCase()).join(" ");
  const ruleCategories = card.rewardRules.map((rule) => rule.category);
  const rules: { label: string; body: string }[] = [];

  if (ruleCategories.some((category) => rotatingRuleCategories.has(category))) {
    rules.push({
      label: "Every quarter",
      body: "Activate the new bonus categories. Forget once and that quarter pays the base rate."
    });
  } else if (ruleCategories.some((category) => conditionalRuleCategories.has(category))) {
    rules.push({
      label: "Pick one category",
      body: "The bonus only lands on the category you select. Point it at whatever you spend most on."
    });
  }

  if (/\bcaps?\b|\bcapped\b/.test(notes)) {
    rules.push({
      label: "Watch the cap",
      body: "The bonus stops at a spending cap and drops to the base rate. Put the overflow on another card."
    });
  }

  if (/\b(booked|purchased) through\b|\bportal\b/.test(notes)) {
    rules.push({
      label: "Book it right",
      body: "The top rate only applies when you book through the issuer's own travel site."
    });
  }

  if (notes.includes("excludes")) {
    rules.push({
      label: "Excluded merchants",
      body: "Superstores and wholesale clubs usually do not count as the bonus category."
    });
  }

  return rules;
}

export { flatCardPer100, formatDollars, formatRate };
