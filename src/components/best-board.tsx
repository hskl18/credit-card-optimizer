"use client";

import { BestList } from "@/components/best-list";
import { ValuationSwitch, useValuation } from "@/components/valuation-switch";
import type { CatalogCard } from "@/lib/cards/types";
import { bestByCategory } from "@/lib/recommendation/recommend";
import { valuationNotes } from "@/lib/recommendation/value";

export function BestBoard({ cards }: { cards: CatalogCard[] }) {
  const [valuation, setValuation] = useValuation();

  return (
    <>
      <h1 className="sr-only">The best credit card for every spending category</h1>
      <ValuationSwitch onChange={setValuation} valuation={valuation} />
      <p className="note">
        {valuation === "cash"
          ? "What the points are worth cashed out, at the rate the issuer publishes. Nothing to plan."
          : `Assumes you move points to airline and hotel partners at ${valuationNotes.travel_policy} You have to find award space. If you do not, you get the cash-out number shown under each card.`}
      </p>
      <div className="head">
        <span className="label">Best card by category</span>
        <span className="label">Back per $100</span>
      </div>
      <BestList rows={bestByCategory(cards, { guaranteedOnly: true, valuation })} />
      <p className="note">Nothing here needs a category picked or activated.</p>
    </>
  );
}
