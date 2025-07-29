// External Assets
export const EXTERNAL_ASSETS = {
  SMH_LOGO:
    "https://cdn.prod.website-files.com/685357732354043b88fbf118/68633775110b5e798b5ad243_smh_logo_col2.svg",
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: "Sontine",
  TAGLINE: "Tontine Meets Blockchain",
  TAGLINE_VI: "Hụi Gặp Blockchain - Tương Lai Tài Chính Thông Minh",
  DESCRIPTION:
    "Join the future of rotating savings with Sontine. Built on Solana blockchain for transparent, automated, and global tontine groups.",
} as const;

// Social Links
export const SOCIAL_LINKS = {
  TWITTER: "https://twitter.com/SontineApp",
  DISCORD: "https://discord.gg/sontine",
  GITHUB: "https://github.com/sontine",
  EMAIL: "hello@sontine.fun",
  SUPPORT: "support@sontine.fun",
  BUSINESS: "business@sontine.fun",
} as const;

// Solana Configuration
export const SOLANA_CONFIG = {
  NETWORK: "mainnet-beta",
  RPC_ENDPOINT: "https://api.mainnet-beta.solana.com",
  AVERAGE_FEE: "$0.00025",
  TPS: "65,000",
  BLOCK_TIME: "400ms",
} as const;

// Supported Wallets
export const SUPPORTED_WALLETS = [
  "Phantom",
  "Solflare",
  "Backpack",
  "Glow",
] as const;

// Pricing Tiers
export const PRICING_TIERS = {
  FREE: {
    NAME: "Free",
    PRICE: "0",
    CURRENCY: "SOL",
    PERIOD: "forever",
  },
  PREMIUM: {
    NAME: "Premium",
    PRICE: "0.1",
    CURRENCY: "SOL",
    PERIOD: "per month",
  },
  ORGANIZER: {
    NAME: "Organizer",
    PRICE: "0.5",
    CURRENCY: "SOL",
    PERIOD: "per month",
  },
} as const;

// Font Configuration
export const FONT_CONFIG = {
  PIXEL_SIZES: {
    XS: "9px",
    SM: "18px",
    BASE: "36px",
    LG: "72px",
    XL: "144px",
  },
} as const;

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 0.8,
  VERY_SLOW: 1.2,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: "640px",
  MD: "768px",
  LG: "1024px",
  XL: "1280px",
  "2XL": "1536px",
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  BETA_ACCESS: true,
  FONT_DEMO: false,
  DARK_MODE: false,
  MULTI_LANGUAGE: true,
} as const;
