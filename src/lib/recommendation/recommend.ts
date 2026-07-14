import type { CatalogCard, SpendingCategory } from "@/lib/cards/types";

type RecommendationInput = {
  cards: CatalogCard[];
  category: SpendingCategory;
  primeMember?: boolean;
};

export type CardRecommendation = {
  card: CatalogCard;
  displayRate: string;
  reason: string;
  summary: string;
  caveats: string[];
  score: number;
};

export function recommendCards({
  cards,
  category,
  primeMember = false
}: RecommendationInput): CardRecommendation[] {
  return cards
    .map((card) => {
      const rule = findBestRule(card, category);
      if (!rule) return null;

      const caveats = getCaveats(card, rule.category, rule.notes, primeMember);
      const score = rule.rate - caveats.length * 0.15 + categoryBonus(card, category, primeMember);
      const displayRate = formatRate(rule.rate, rule.rateType);

      return {
        card,
        displayRate,
        reason: `${displayRate} from ${rule.category.replaceAll("_", " ")}.`,
        summary: summarizeRule(rule.rate, rule.rateType, rule.notes),
        caveats,
        score
      };
    })
    .filter((item): item is CardRecommendation => Boolean(item))
    .sort((a, b) => b.score - a.score || a.card.name.localeCompare(b.card.name));
}

function findBestRule(card: CatalogCard, category: SpendingCategory) {
  const matches = card.rewardRules.filter((rule) => category.matchingRules.includes(rule.category));
  if (matches.length) {
    return matches.sort((a, b) => b.rate - a.rate)[0];
  }

  return card.rewardRules.find((rule) => rule.category === "all_other");
}

function formatRate(rate: number, rateType: string) {
  if (rateType.includes("percent")) return `${rate}%`;
  return `${rate}x`;
}

function summarizeRule(rate: number, rateType: string, notes: string) {
  const unit = rateType.includes("percent") ? "%" : "x";
  return `${rate}${unit} ${notes.charAt(0).toLowerCase()}${notes.slice(1)}`;
}

function getCaveats(card: CatalogCard, ruleCategory: string, notes: string, primeMember: boolean) {
  const caveats: string[] = [];
  const lowerNotes = notes.toLowerCase();

  if (lowerNotes.includes("activation")) caveats.push("Activation may be required.");
  if (lowerNotes.includes("cap")) caveats.push("Reward cap applies.");
  if (lowerNotes.includes("portal") || lowerNotes.includes("through")) {
    caveats.push("Booking channel requirement applies.");
  }
  if (lowerNotes.includes("excludes")) caveats.push(notes);
  if (card.applicationStatus !== "open") caveats.push("Not open to new applicants.");
  if (ruleCategory === "amazon" && !primeMember) caveats.push("Amazon rate assumes eligible Prime membership.");

  return caveats;
}

function categoryBonus(card: CatalogCard, category: SpendingCategory, primeMember: boolean) {
  if (category.id === "amazon" && card.slug === "prime-visa" && primeMember) return 0.5;
  if (category.id === "dining" && card.slug === "amex-gold") return 0.25;
  if (category.id === "general" && card.slug.includes("double-cash")) return 0.2;
  return 0;
}
