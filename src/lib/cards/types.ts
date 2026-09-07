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
  annualFee: number;
  rewardCurrency: string;
  bestFor: string[];
  rewardRules: RewardRule[];
  sourceUrls: string[];
  art?: {
    publicPath: string;
    sourcePage: string;
    pixelWidth: number;
    pixelHeight: number;
  };
};

export type SpendingCategory = {
  id: string;
  label: string;
  matchingRules: string[];
};
