"use client";

import { useSpend } from "@/components/spend-editor";
import { useValuation } from "@/components/valuation-switch";
import type { CatalogCard } from "@/lib/cards/types";
import { annualValue, formatNet } from "@/lib/recommendation/spend";

export function CardValue({ card }: { card: CatalogCard }) {
  const [valuation] = useValuation();
  const [spend] = useSpend();
  const net = annualValue(card, spend, valuation);

  return (
    <>
      <div className="head">
        <span className="label">Keep after fee, a year</span>
        <span className="row-value">
          <span className={net < 0 ? "money negative" : "money"}>{formatNet(net)}</span>
          <span className="label">{card.annualFee ? `$${card.annualFee} fee` : "No fee"}</span>
        </span>
      </div>
      <p className="note">
        Against your spend, earn rate only. Credits and sign-up bonuses are not counted.
      </p>
    </>
  );
}
