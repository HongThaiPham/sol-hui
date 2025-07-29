import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { fontClasses } from "../lib/fonts";
import { PWAInstaller } from "./components/PWAInstaller";
import { StructuredData } from "./components/StructuredData";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#00B49F",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sontine.fun"),
  title: {
    default:
      "Sontine - Tontine Meets Blockchain | Solana-Powered Rotating Savings",
    template: "%s | Sontine - Blockchain Tontines",
  },
  description:
    "Join the future of rotating savings with Sontine. Built on Solana blockchain for transparent, automated, and global tontine groups. Fast, cheap, and secure financial inclusion for everyone.",
  keywords: [
    "tontine",
    "blockchain",
    "Solana",
    "rotating savings",
    "ROSCA",
    "hụi",
    "cryptocurrency",
    "DeFi",
    "financial inclusion",
    "savings group",
    "peer-to-peer finance",
    "smart contracts",
    "Web3",
    "decentralized finance",
    "community savings",
    "mutual aid",
    "cooperative finance",
    "digital tontine",
    "crypto savings",
    "blockchain finance",
  ],
  authors: [{ name: "Sontine Team", url: "https://sontine.fun" }],
  creator: "Sontine Team",
  publisher: "Sontine",
  category: "Finance",
  classification: "Financial Technology",

  // Favicon and Icons
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
    other: [
      {
        rel: "icon",
        url: "/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        rel: "icon",
        url: "/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  },

  // PWA Manifest
  manifest: "/manifest.json",

  openGraph: {
    title:
      "Sontine - Tontine Meets Blockchain | Solana-Powered Rotating Savings",
    description:
      "Join the future of rotating savings with Sontine. Built on Solana blockchain for transparent, automated, and global tontine groups. Fast, cheap, and secure financial inclusion for everyone.",
    type: "website",
    locale: "en_US",
    siteName: "Sontine",
    url: "https://sontine.fun",
    images: [
      {
        url: "/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Sontine - Tontine Meets Blockchain on Solana",
        type: "image/svg+xml",
      },
      {
        url: "/icon-512.svg",
        width: 512,
        height: 512,
        alt: "Sontine Logo",
        type: "image/svg+xml",
      },
    ],
    emails: ["hello@sontine.fun"],
    phoneNumbers: [],
    faxNumbers: [],
    countryName: "Global",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Sontine - Tontine Meets Blockchain | Solana-Powered Rotating Savings",
    description:
      "Join the future of rotating savings with Sontine. Built on Solana blockchain for transparent, automated, and global tontine groups. Fast, cheap, and secure financial inclusion for everyone.",
    images: [
      {
        url: "/twitter-image.svg",
        alt: "Sontine - Tontine Meets Blockchain on Solana",
        width: 1200,
        height: 600,
      },
    ],
    creator: "@SontineApp",
    site: "@SontineApp",
  },

  // PWA specific
  applicationName: "Sontine",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sontine",
  },

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      me: ["hello@sontine.fun", "https://twitter.com/SontineApp"],
    },
  },

  // Additional meta tags
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Sontine",
    "msapplication-TileColor": "#00B49F",
    "msapplication-config": "/browserconfig.xml",

    // SEO enhancements
    "format-detection": "telephone=no",
    "theme-color": "#00B49F",
    "color-scheme": "light",
    "supported-color-schemes": "light",

    // Open Graph additional
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/svg+xml",

    // Twitter additional
    "twitter:image:width": "1200",
    "twitter:image:height": "600",
    "twitter:image:type": "image/svg+xml",

    // Business info
    "business:contact_data:street_address": "Global",
    "business:contact_data:locality": "Worldwide",
    "business:contact_data:region": "Global",
    "business:contact_data:postal_code": "00000",
    "business:contact_data:country_name": "Global",
    "business:contact_data:email": "hello@sontine.fun",
    "business:contact_data:website": "https://sontine.fun",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontClasses.variable}>
      <head>
        <StructuredData />
      </head>
      <body className={fontClasses.sans}>
        {children}
        <PWAInstaller />
      </body>
    </html>
  );
}
