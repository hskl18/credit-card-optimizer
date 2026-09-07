import type { MetadataRoute } from "next";
import { getCatalogCards, getCatalogMetadata } from "@/lib/cards/catalog";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(getCatalogMetadata().lastVerified);
  const routes = ["", "/cards", "/wallet", "/methodology"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    priority: path === "" ? 1 : 0.8
  }));

  const cards = getCatalogCards().map((card) => ({
    url: `${siteUrl}/cards/${card.slug}`,
    lastModified,
    priority: 0.6
  }));

  return [...routes, ...cards];
}
