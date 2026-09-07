import { z } from "zod";

export const rewardRuleSchema = z.object({
  category: z.string(),
  rate: z.number(),
  rate_type: z.string(),
  notes: z.string()
});

export const cardSchema = z.object({
  issuer: z.string(),
  name: z.string(),
  slug: z.string(),
  application_status: z.string(),
  annual_fee: z.number().nonnegative(),
  reward_currency: z.string(),
  best_for: z.array(z.string()),
  reward_rules: z.array(rewardRuleSchema),
  source_urls: z.array(z.string().url())
});

export const catalogSchema = z.object({
  metadata: z.object({
    name: z.string(),
    last_verified: z.string(),
    annual_fee_last_verified: z.string(),
    annual_fee_sources: z.array(z.string().url()),
    canonical_source_policy: z.string(),
    coverage_note: z.string()
  }),
  cards: z.array(cardSchema)
});

export const cardArtManifestSchema = z.object({
  metadata: z.object({
    last_researched: z.string(),
    policy: z.string(),
    maximum_rendered_width_css_px: z.number().int().positive(),
    maximum_rendered_height_css_px: z.number().int().positive(),
    target_device_pixel_ratio: z.number().positive()
  }),
  assets: z.array(
    z.object({
      card_slug: z.string(),
      source_page: z.string().url(),
      image_url: z.string().url(),
      // Absent when the asset is withheld: the source is still on record.
      local_path: z.string().optional(),
      pixel_width: z.number().int().positive().optional(),
      pixel_height: z.number().int().positive().optional(),
      status: z.enum([
        "approved",
        "needs_higher_resolution",
        "withheld_promotional_badge"
      ]),
      note: z.string().optional()
    })
  )
});
