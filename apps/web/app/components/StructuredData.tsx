"use client";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sontine",
    alternateName: "Sontine App",
    description:
      "Solana-powered rotating savings and credit associations. Global tontines, local trust.",
    url: "https://sontine.fun",
    logo: "https://sontine.fun/icon-512.svg",
    image: "https://sontine.fun/opengraph-image.svg",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        name: "Sontine Team",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "",
      contactType: "customer service",
      email: "hello@sontine.fun",
      availableLanguage: ["English", "Vietnamese"],
    },
    sameAs: [
      "https://twitter.com/SontineApp",
      "https://discord.gg/sontine",
      "https://github.com/sontine",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "Global",
      addressLocality: "Worldwide",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sontine",
    alternateName: "Sontine - Tontine Meets Blockchain",
    url: "https://sontine.fun",
    description:
      "Join the future of rotating savings with Sontine. Built on Solana blockchain for transparent, automated, and global tontine groups.",
    publisher: {
      "@type": "Organization",
      name: "Sontine",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://sontine.fun/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Sontine",
    description:
      "Solana-powered rotating savings and credit associations platform",
    url: "https://sontine.fun",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser, iOS, Android",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "1.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      category: "Free",
    },
    featureList: [
      "Blockchain-based tontines",
      "Solana integration",
      "Smart contracts",
      "Global accessibility",
      "Transparent transactions",
      "Automated payouts",
      "Multi-language support",
      "Mobile-first design",
    ],
  };

  const financeServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Sontine Tontine Platform",
    description: "Blockchain-powered rotating savings and credit associations",
    provider: {
      "@type": "Organization",
      name: "Sontine",
    },
    serviceType: "Rotating Savings and Credit Association",
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sontine Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Free Tontine Participation",
            description: "Join existing tontine groups for free",
          },
          price: "0",
          priceCurrency: "SOL",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Premium Tontine Features",
            description: "Advanced features for tontine organizers",
          },
          price: "0.1",
          priceCurrency: "SOL",
        },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sontine.fun",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "How It Works",
        item: "https://sontine.fun/how-it-works",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Join Tontine",
        item: "https://sontine.fun/join",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a tontine?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A tontine is a rotating savings and credit association where members contribute regularly to a common fund, and each member receives the total amount in turns.",
        },
      },
      {
        "@type": "Question",
        name: "How does Sontine use blockchain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sontine uses Solana blockchain to create transparent, automated smart contracts that manage tontine contributions and payouts without requiring trust in a central authority.",
        },
      },
      {
        "@type": "Question",
        name: "Is Sontine free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, basic tontine participation is free. Premium features for organizers are available for a small fee in SOL tokens.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financeServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
