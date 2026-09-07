import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardArt } from "@/components/card-art";
import { CardValue } from "@/components/card-value";
import { RewardRules } from "@/components/reward-rules";
import { getCatalogCards } from "@/lib/cards/catalog";
import { siteUrl } from "@/lib/site";
import { CardGuide } from "@/components/card-guide";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCatalogCards().map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = getCatalogCards().find((item) => item.slug === slug);
  if (!card) return { title: "Card not found" };

  const fee = card.annualFee ? `a $${card.annualFee} annual fee` : "no annual fee";
  const description = `${card.name} has ${fee}. Every reward rate in dollars per $100, the value of ${card.rewardCurrency} on each redemption path, and how to get the most out of it.`;

  return {
    title: card.name,
    description,
    alternates: { canonical: `/cards/${card.slug}` },
    openGraph: {
      type: "article",
      title: card.name,
      description,
      url: `/cards/${card.slug}`
    }
  };
}

export default async function CardDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const card = getCatalogCards().find((item) => item.slug === slug);

  if (!card) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: card.name,
    category: "Credit card",
    url: `${siteUrl}/cards/${card.slug}`,
    provider: { "@type": "Organization", name: card.issuer },
    feesAndCommissionsSpecification: card.annualFee
      ? `$${card.annualFee} annual fee`
      : "No annual fee"
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Static, built from the catalog at build time.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Link className="back" href="/cards">
        ← Cards
      </Link>

      <div className="hero-art">
        <CardArt card={card} priority size="lg" />
      </div>

      <div className="block stack">
        <span className="label">{card.issuer}</span>
        <h1 className="title">{card.name}</h1>
        <p className="lead">{card.bestFor.join(", ")}</p>
        <p className="lead">
          {card.rewardCurrency}
          {card.applicationStatus === "open" ? "" : " · Closed to new applicants"}
        </p>
      </div>

      <CardValue card={card} />

      <CardGuide card={card} />

      <div className="head">
        <span className="label">Rewards</span>
        <span className="label">Back per $100</span>
      </div>
      <RewardRules card={card} />

      <div className="head">
        <span className="label">Sources</span>
      </div>
      <div className="links">
        {card.sourceUrls.map((url, index) => (
          <a href={url} key={url} rel="noreferrer" target="_blank">
            Issuer {index + 1}
          </a>
        ))}
        {card.art ? (
          <a href={card.art.sourcePage} rel="noreferrer" target="_blank">
            Artwork
          </a>
        ) : null}
      </div>
    </>
  );
}
