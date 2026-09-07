import valuationJson from "../../../data/point-valuations.json";

type Program = {
  id: string;
  label: string;
  cash_cents: number;
  travel_cents: number;
  paths: { label: string; cents: number }[];
  note?: string;
  pairing?: string;
};

/**
 * Shape-checked by scripts/validate-card-art.mjs at build time. Parsing it here
 * would ship a schema validator to every browser for data that never changes.
 */
const valuations = valuationJson as {
  metadata: {
    last_researched: string;
    cash_policy: string;
    travel_policy: string;
    travel_source: string;
    paths_source: string;
  };
  default_program: Program;
  programs: (Program & { currency_match: string })[];
};

/** How a point is cashed in. Changes what every rate is worth. */
export type Valuation = "cash" | "travel";

export const valuationNotes = valuations.metadata;
export const valuationPrograms = [...valuations.programs, valuations.default_program];

/**
 * A reward currency is matched by name because the catalog stores it as prose.
 * Anything unmatched is a fixed-value program worth one cent.
 */
export function programFor(rewardCurrency: string) {
  const currency = rewardCurrency.toLowerCase();
  return (
    valuations.programs.find((item) => currency.includes(item.currency_match)) ??
    valuations.default_program
  );
}

export function centsPerPoint(rewardCurrency: string, valuation: Valuation) {
  const program = programFor(rewardCurrency);
  return valuation === "travel" ? program.travel_cents : program.cash_cents;
}

/** Dollars back per $100 spent, the one unit every card can be compared in. */
export function dollarsPer100(
  rate: number,
  rateType: string,
  rewardCurrency: string,
  valuation: Valuation
) {
  if (rateType.includes("percent")) return rate;
  return rate * centsPerPoint(rewardCurrency, valuation);
}

export function formatDollars(dollars: number) {
  const rounded = Math.round(dollars * 100) / 100;
  return `$${Number.isInteger(rounded) ? rounded : rounded.toFixed(2)}`;
}

export function formatRate(rate: number, rateType: string) {
  return rateType.includes("percent") ? `${rate}%` : `${rate}x`;
}
