import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { fontClasses } from "../lib/fonts";

export const metadata: Metadata = {
  title: "Sontine - Tontine Meets Blockchain | Solana-Powered Rotating Savings",
  description:
    "Join the future of rotating savings with Sontine. Built on Solana blockchain for transparent, automated, and global tontine groups. Fast, cheap, and secure.",
  keywords:
    "tontine, blockchain, Solana, rotating savings, ROSCA, hụi, cryptocurrency, DeFi",
  authors: [{ name: "Sontine Team" }],
  openGraph: {
    title: "Sontine - Tontine Meets Blockchain",
    description:
      "Solana-powered rotating savings and credit associations. Global tontines, local trust.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sontine - Tontine Meets Blockchain",
    description:
      "Solana-powered rotating savings and credit associations. Global tontines, local trust.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontClasses.variable}>
      <body className={fontClasses.sans}>{children}</body>
    </html>
  );
}
