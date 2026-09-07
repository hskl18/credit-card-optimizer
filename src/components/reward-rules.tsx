"use client";

import { useValuation } from "@/components/valuation-switch";
import type { CatalogCard } from "@/lib/cards/types";
import { formatRuleCategory } from "@/lib/recommendation/advice";
import { dollarsPer100, formatDollars, formatRate } from "@/lib/recommendation/value";

export function RewardRules({ card }: { card: CatalogCard }) {
  const [valuation] = useValuation();

  return (
    <div>
      {card.rewardRules.map((rule) => (
        <div className="rule" key={rule.category}>
          <span className="rule-value">
            <span className="money">
              {formatDollars(
                dollarsPer100(rule.rate, rule.rateType, card.rewardCurrency, valuation)
              )}
            </span>
            <span className="label">{formatRate(rule.rate, rule.rateType)}</span>
          </span>
          <span className="stack">
            <span className="title">{formatRuleCategory(rule.category)}</span>
            <p>{rule.notes}</p>
          </span>
        </div>
      ))}
    </div>
  );
}

