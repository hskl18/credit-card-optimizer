import { TakedownNotice } from "@/components/takedown-notice";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [];
}

export default async function CardDetailPage({ params }: PageProps) {
  await params;

  return <TakedownNotice requestedSurface="card detail page" />;
}
