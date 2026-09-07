"use client";

import { useEffect, useState } from "react";
import type { Valuation } from "@/lib/recommendation/value";

const storageKey = "cco-valuation";

/** How the reader cashes points in. Shared by every screen that shows value. */
export function useValuation() {
  const [valuation, setValuation] = useState<Valuation>("cash");

  useEffect(() => {
    if (window.localStorage.getItem(storageKey) === "travel") setValuation("travel");
  }, []);

  const choose = (next: Valuation) => {
    setValuation(next);
    window.localStorage.setItem(storageKey, next);
  };

  return [valuation, choose] as const;
}

export function ValuationSwitch({
  valuation,
  onChange
}: {
  valuation: Valuation;
  onChange: (next: Valuation) => void;
}) {
  return (
    <div className="switch" role="group" aria-label="How you cash points in">
      {(["cash", "travel"] as const).map((option) => (
        <button
          aria-pressed={valuation === option}
          key={option}
          onClick={() => onChange(option)}
          type="button"
        >
          {option === "cash" ? "Cash out" : "Transfer points"}
        </button>
      ))}
    </div>
  );
}
