import type { Metadata } from "next";
import { getCatalogMetadata } from "@/lib/cards/catalog";
import { spendSource } from "@/lib/recommendation/spend";
import { valuationNotes, valuationPrograms } from "@/lib/recommendation/value";

export const metadata: Metadata = {
  title: "Info",
  description:
    "How points and cash back become one number, what a point is worth in each program, and where every figure comes from.",
  alternates: { canonical: "/methodology" }
};

const method = [
  ["Value", "Every rate becomes dollars back per $100 spent, so 4x and 6% compare directly."],
  ["Cash out", "Points at the issuer's published cash-out rate. Nothing to plan, nothing to hunt for."],
  [
    "Transfer points",
    "Points moved to airline and hotel partners. A ceiling, not a promise: it needs award space, so every card also shows what it pays cashed out."
  ],
  [
    "Keep after fee",
    "What one card returns in a year if it carried all your spend, minus its annual fee. Edit your spend on the Cards tab to change it."
  ],
  [
    "Opt-in",
    "A category you pick or a rotating quarter is always flagged, and an opt-in card is only credited with one category at a time."
  ],
  ["Wallet", "Your cards stay in this browser. No login, no card numbers, no account linking."]
];

const gaps = [
  ["Not counted", "Statement credits, lounge access, and sign-up bonuses. A premium card can look worse here than it is for you."],
  ["Caps", "Flagged on every rate that has one, but not subtracted, so capped bonuses read high."],
  ["Rotating quarters", "Counted as a single quarter, never a full year."],
  ["Card art", "Downloaded from official issuer pages, badge-free renderings only. One is an Internet Archive snapshot because every current version carries a promotional badge."],
  ["Reverify", "The catalog is a starter set. Citi Custom Cash and Wells Fargo Attune base rates in particular should be checked against the issuer before you act on them."]
];

export default function InfoPage() {
  const catalog = getCatalogMetadata();

  return (
    <>
      <h1 className="sr-only">How this site values points and ranks cards</h1>
      <div className="head">
        <span className="label">How the number works</span>
      </div>
      <div className="rows">
        {method.map(([label, body]) => (
          <div className="row" key={label}>
            <span className="row-main stack">
              <span className="label">{label}</span>
              <span>{body}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="head">
        <span className="label">What a point is worth</span>
        <span className="label">Cents each</span>
      </div>
      {valuationPrograms.map((program) => (
        <div key={program.id}>
          <div className="head">
            <span className="label">{program.label}</span>
          </div>
          {program.paths.map((path) => (
            <div className="rule" key={path.label}>
              <span className="rule-value">
                <span className="money">{path.cents}¢</span>
              </span>
              <span className="stack">
                <span className="title">{path.label}</span>
              </span>
            </div>
          ))}
          {program.note ? <p className="note">{program.note}</p> : null}
        </div>
      ))}

      <div className="head">
        <span className="label">Known gaps</span>
      </div>
      <div className="rows">
        {gaps.map(([label, body]) => (
          <div className="row" key={label}>
            <span className="row-main stack">
              <span className="label">{label}</span>
              <span>{body}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="head">
        <span className="label">Where the numbers come from</span>
      </div>
      <div className="rows">
        <div className="row">
          <span className="row-main stack">
            <span className="label">Rewards and fees</span>
            <span>{catalog.sourcePolicy}</span>
          </span>
        </div>
      </div>
      <div className="links">
        <a href={valuationNotes.travel_source} rel="noreferrer" target="_blank">
          Point valuations
        </a>
        <a href={valuationNotes.paths_source} rel="noreferrer" target="_blank">
          Redemption paths
        </a>
        <a href={spendSource.url} rel="noreferrer" target="_blank">
          {spendSource.label}
        </a>
        {catalog.annualFeeSources.map((url, index) => (
          <a href={url} key={url} rel="noreferrer" target="_blank">
            Annual fees {index + 1}
          </a>
        ))}
      </div>

      <div className="head">
        <span className="label">Last checked</span>
      </div>
      <div className="rows">
        {[
          ["Reward rules", catalog.lastVerified],
          ["Annual fees", catalog.annualFeeVerified],
          ["Point valuations", valuationNotes.last_researched],
          ["Card art", catalog.artLastResearched]
        ].map(([label, date]) => (
          <div className="row" key={label}>
            <span className="row-main">
              <span className="title">{label}</span>
            </span>
            <span className="row-end">{date}</span>
          </div>
        ))}
      </div>

      <p className="note">Not financial advice. Confirm terms with the issuer before applying.</p>
    </>
  );
}
