import artManifestJson from "../../../data/card-art-sources.json";
import catalogJson from "../../../data/card-catalog-v0.json";
import { cardArtManifestSchema, catalogSchema } from "./schema";
import type { CatalogCard } from "./types";

const catalog = catalogSchema.parse(catalogJson);
const artManifest = cardArtManifestSchema.parse(artManifestJson);

const artBySlug = new Map(
  artManifest.assets
    .filter((asset) => asset.status === "approved")
    .flatMap((asset) => {
      const filename = asset.local_path?.split("/").at(-1);
      if (!filename || !asset.pixel_width || !asset.pixel_height) return [];
      return [
        [
          asset.card_slug,
          {
            publicPath: `/card-art/${filename}`,
            sourcePage: asset.source_page,
            pixelWidth: asset.pixel_width,
            pixelHeight: asset.pixel_height
          }
        ] as const
      ];
    })
);

export function getCatalogMetadata() {
  return {
    lastVerified: catalog.metadata.last_verified,
    sourcePolicy: catalog.metadata.canonical_source_policy,
    annualFeeVerified: catalog.metadata.annual_fee_last_verified,
    annualFeeSources: catalog.metadata.annual_fee_sources,
    artLastResearched: artManifest.metadata.last_researched
  };
}

export function getCatalogCards(): CatalogCard[] {
  return catalog.cards.map((card) => ({
    issuer: card.issuer,
    issuerSlug: slugify(card.issuer),
    name: card.name,
    slug: card.slug,
    applicationStatus: card.application_status,
    annualFee: card.annual_fee,
    rewardCurrency: card.reward_currency,
    bestFor: card.best_for,
    rewardRules: card.reward_rules.map((rule) => ({
      category: rule.category,
      rate: rule.rate,
      rateType: rule.rate_type,
      notes: rule.notes
    })),
    sourceUrls: card.source_urls,
    art: artBySlug.get(card.slug)
  }));
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
