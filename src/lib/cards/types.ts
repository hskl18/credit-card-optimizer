import type { LucideIcon } from "lucide-react";

export type RewardRule = {
  category: string;
  rate: number;
  rateType: string;
  notes: string;
};

export type CatalogCard = {
  issuer: string;
  issuerSlug: string;
  name: string;
  slug: string;
  applicationStatus: string;
  rewardCurrency: string;
  bestFor: string[];
  rewardRules: RewardRule[];
  sourceUrls: string[];
  art?: {
    publicPath: string;
    sourcePage: string;
  };
};

export type SpendingCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  matchingRules: string[];
};
