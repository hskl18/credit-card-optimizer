import type { Metadata } from "next";
import { WalletWorkbench } from "@/components/wallet-workbench";
import { getCatalogCards } from "@/lib/cards/catalog";

export const metadata: Metadata = {
  title: "Wallet",
  description:
    "Add the cards you already carry and see which one pays most in every spending category.",
  alternates: { canonical: "/wallet" }
};

export default function WalletPage() {
  return <WalletWorkbench cards={getCatalogCards()} />;
}
