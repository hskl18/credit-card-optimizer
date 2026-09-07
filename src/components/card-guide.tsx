import type { CatalogCard } from "@/lib/cards/types";
import { cardGuide, formatRuleCategory } from "@/lib/recommendation/advice";
import { formatRate } from "@/lib/recommendation/value";

export function CardGuide({ card }: { card: CatalogCard }) {
  const guide = cardGuide(card);
  const { headline, everyday, ladder, breakEven, varies, asPoints } = guide;

  return (
    <>
      <div className="head">
        <span className="label">How to cash in</span>
        <span className="label">
          {everyday ? `Per $100 at ${formatRate(everyday.rate, everyday.rateType)}` : "Per $100"}
        </span>
      </div>
      <div>
        {ladder.map((step, index) => (
          <div className="rule" key={step.label}>
            <span className="rule-value">
              <span className="money">${step.per100.toFixed(2).replace(/\.00$/, "")}</span>
              <span className="label">{step.cents}¢ a point</span>
            </span>
            <span className="stack">
              <span className="title">{step.label}</span>
              {index === 0 && varies ? (
                <p>Best value today, {guide.upside.toFixed(1)}× the easy option below.</p>
              ) : null}
              {!varies ? <p>A flat rate, so how you redeem does not change it.</p> : null}
            </span>
          </div>
        ))}
      </div>
      {varies && guide.program.note ? <p className="note">{guide.program.note}</p> : null}

      <div className="head">
        <span className="label">Worth it when</span>
      </div>
      <div className="rows">
        {asPoints && everyday ? (
          <div className="row">
            <span className="row-main stack">
              <span className="label">It is points, not cash</span>
              <span>
                {card.issuer} pays this card in {guide.program.label}. On its own that is a cent
                each. Hold {asPoints.pairing} as well and the same{" "}
                {formatRate(everyday.rate, everyday.rateType)} transfers at {asPoints.cents}¢, worth
                ${asPoints.per100.toFixed(2).replace(/\.00$/, "")} per $100 instead of $
                {everyday.rate}.
              </span>
            </span>
          </div>
        ) : null}

        {headline ? (
          <div className="row">
            <span className="row-main stack">
              <span className="label">Top rate</span>
              <span>
                {formatRate(headline.rate, headline.rateType)} on{" "}
                {formatRuleCategory(headline.category).toLowerCase()}. {headline.notes}
              </span>
            </span>
          </div>
        ) : null}

        {card.annualFee > 0 ? (
          <div className="row">
            <span className="row-main stack">
              <span className="label">Break even</span>
              <span>
                {breakEven.best === null
                  ? `A plain 2% card with no fee beats this one, whatever you spend.`
                  : `The $${card.annualFee} fee needs $${breakEven.best.toLocaleString("en-US")} a year on ${everyday ? formatRuleCategory(everyday.category).toLowerCase() : "spending"} to beat a no-fee 2% card${
                      breakEven.floor === null
                        ? ", and it never gets there if you only cash points out."
                        : breakEven.floor === breakEven.best
                          ? "."
                          : `, or $${breakEven.floor.toLocaleString("en-US")} if you only cash points out.`
                    } Credits and lounges are not counted.`}
              </span>
            </span>
          </div>
        ) : (
          <div className="row">
            <span className="row-main stack">
              <span className="label">No fee</span>
              <span>Nothing to earn back, so any bonus category is pure upside.</span>
            </span>
          </div>
        )}

        {guide.rules.map((rule) => (
          <div className="row" key={rule.label}>
            <span className="row-main stack">
              <span className="label">{rule.label}</span>
              <span>{rule.body}</span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
