"use client";

import { useEffect, useState } from "react";
import {
  defaultSpend,
  monthlyTotal,
  spendBuckets,
  type SpendProfile
} from "@/lib/recommendation/spend";

const storageKey = "card-compass-spend";

export function useSpend() {
  const [spend, setSpend] = useState<SpendProfile>(defaultSpend);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(storageKey) ?? "null");
      if (stored && typeof stored === "object") {
        const clean = { ...defaultSpend };
        for (const bucket of spendBuckets) {
          const value = Number(stored[bucket.id]);
          if (Number.isFinite(value) && value >= 0) clean[bucket.id] = value;
        }
        setSpend(clean);
      }
    } catch {
      // A corrupt entry just keeps the defaults.
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (restored) window.localStorage.setItem(storageKey, JSON.stringify(spend));
  }, [restored, spend]);

  return [spend, setSpend] as const;
}

export function SpendEditor({
  spend,
  onChange
}: {
  spend: SpendProfile;
  onChange: (next: SpendProfile) => void;
}) {
  return (
    <details className="spend">
      <summary>
        <span className="label">Your monthly spend</span>
        <span className="label">${monthlyTotal(spend).toLocaleString("en-US")} · Edit</span>
      </summary>
      {spendBuckets.map((bucket) => (
        <label className="spend-row" key={bucket.id}>
          <span>{bucket.label}</span>
          <span className="spend-input">
            $
            <input
              min="0"
              onChange={(event) =>
                onChange({ ...spend, [bucket.id]: Math.max(0, Number(event.target.value) || 0) })
              }
              step="10"
              type="number"
              value={spend[bucket.id]}
            />
          </span>
        </label>
      ))}
    </details>
  );
}
