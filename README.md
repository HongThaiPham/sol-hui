# Sontine - Tontine Meets Blockchain

<div align="center">
  <img src="https://img.shields.io/badge/Solana-Powered-9945FF?style=for-the-badge&logo=solana" alt="Solana Powered" />
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</div>

<div align="center">
  <h3>🌟 Revolutionizing Traditional Tontines with Solana Blockchain 🌟</h3>
  <p><strong>Hụi Gặp Blockchain - Tương Lai Tài Chính Thông Minh</strong></p>
</div>

---

## 🚀 About Sontine

**Sontine** combines the time-tested tradition of tontines (rotating savings and credit associations) with the power of Solana blockchain technology. The name merges "**Solana**" + "**Tontine**" to create a modern, transparent, and globally accessible savings platform.

### ✨ Key Features

- 🔗 **Blockchain-Powered**: Built on Solana for lightning-fast, low-cost transactions
- 🌍 **Global Access**: Participate in tontines worldwide without geographical restrictions
- 🔒 **Transparent & Secure**: Smart contracts ensure fair, automated operations
- 💰 **Low Fees**: Minimal transaction costs (~$0.00025 per transaction)
- 📱 **Multi-Platform**: Available on mobile and web with seamless wallet integration
- 🏆 **Reputation System**: Build trust through consistent participation

---

## 🏗️ Project Structure

This monorepo contains the complete Sontine ecosystem built with modern web and mobile technologies:

### 📱 Applications

- **`apps/web`**: Main landing page built with Next.js 15 and Tailwind CSS
- **`apps/mobile/sontine`**: React Native mobile app with Expo and Solana Mobile integration
- **`apps/mobile/publishing`**: Mobile app publishing and deployment tools

### 📦 Shared Packages

- **`packages/ui`**: Reusable React components with Tailwind CSS
- **`packages/database`**: Prisma-based database package for off-chain data management
- **`packages/sontine-program`**: Solana program client and IDL definitions
- **`packages/eslint-config`**: Shared ESLint configurations
- **`packages/typescript-config`**: TypeScript configurations (including React Native)
- **`packages/tailwind-config`**: Tailwind CSS configurations

---

## 🛠️ Tech Stack

### Frontend (Web)

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom design system
- **Language**: TypeScript 5.8
- **State Management**: TanStack Query (React Query) v5
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Mobile

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **UI Components**: React Native Paper + Custom UI system
- **Fonts**: Pixeloid Sans (Regular & Bold)
- **Solana Integration**: Solana Mobile Wallet Adapter
- **State Management**: TanStack Query (React Query) v5

### Blockchain

- **Network**: Solana Mainnet/Devnet
- **Wallets**: Phantom, Solflare, Backpack, Glow (Mobile Wallet Adapter support)
- **Smart Contracts**: Rust-based Solana programs
- **Currency**: USDC (primary transaction currency)

### Database

- **ORM**: Prisma
- **Database**: PostgreSQL (configurable)
- **Off-chain Data**: User profiles, group metadata, notifications

### Development Tools

- **Monorepo**: Turborepo
- **Package Manager**: Bun (primary), npm (fallback)
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Git
- Solana wallet (Phantom recommended for web, Mobile Wallet Adapter for mobile)
- For mobile development: Expo CLI and Android Studio/Xcode

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/sontine.git
   cd sontine
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up database (optional for web-only development)**

   ```bash
   # Generate Prisma client
   bun run generate

   # Run database migrations
   bun run db:migrate:dev

   # Seed database with sample data
   bun run db:seed
   ```

4. **Start development servers**

   ```bash
   # Start all applications
   bun dev

   # Or start individual apps
   bun run dev:web    # Web app only
   bun run dev:mobile # Mobile app only
   ```

5. **Access applications**
   ```
   http://localhost:3001 - Web app
   Mobile app - Use Expo Go app or simulator
   ```

---

## 📝 Available Scripts

### Development

```bash
bun dev              # Start all apps in development mode
bun build            # Build all apps for production
bun lint             # Run ESLint across all packages
bun check-types      # Run TypeScript type checking
bun format           # Format code with Prettier
```

### Individual Apps

```bash
bun run dev:web      # Start web app only
bun run dev:mobile   # Start mobile app only
bun run build:web    # Build web app only
bun run build:mobile # Build mobile app only
```

### Database Operations

```bash
bun run generate           # Generate Prisma client
bun run db:migrate:dev     # Run database migrations (development)
bun run db:migrate:deploy  # Run database migrations (production)
bun run db:push           # Push schema changes to database
bun run db:seed           # Seed database with sample data
```

### Mobile Development

```bash
cd apps/mobile/sontine
expo start               # Start Expo development server
expo start --android     # Start with Android simulator
expo start --ios         # Start with iOS simulator
expo build               # Build for production
```

---

## 🌐 Deployment

### Web App (Vercel/Netlify)

```bash
bun run build:web
# Deploy to Vercel, Netlify, or your preferred platform
```

### Mobile App

```bash
cd apps/mobile/sontine

# Build for Android
expo build:android

# Build for iOS
expo build:ios

# Or use EAS Build (recommended)
eas build --platform android
eas build --platform ios
```

---

## 🎨 Design System

### Brand Colors

- **Primary**: Emerald Green (`#10B981`) - Prosperity & Growth
- **Secondary**: Solana Purple (`#9945FF`) - Blockchain Technology
- **Accent**: Gold (`#F59E0B`) - Wealth & Success
- **Background**: Clean whites and light grays

### Typography

#### Web

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body**: Regular weight (400-500)

#### Mobile

- **Font Family**: Pixeloid Sans (Regular & Bold)
- **Headings**: Pixeloid Sans Bold
- **Body**: Pixeloid Sans Regular
- **Numeric**: Optimized for financial data display

---

## 🔗 Solana Integration

### Supported Wallets

#### Web

- [Phantom](https://phantom.app/) - Recommended for beginners
- [Solflare](https://solflare.com/) - Advanced features
- [Backpack](https://backpack.app/) - Multi-chain support
- [Glow](https://glow.app/) - Mobile-first

#### Mobile

- **Solana Mobile Wallet Adapter** - Universal mobile wallet integration
- **Phantom Mobile** - Native mobile experience
- **Solflare Mobile** - Advanced mobile features

### Smart Contract Features

- **Automated Contribution Collection** - USDC-based contributions
- **Multiple Selection Methods** - Random, auction, or fixed order
- **Transparent Round Management** - On-chain round progression
- **Fair Payout Distribution** - Automated fund distribution
- **Reputation System** - Track participation history
- **Multi-tontine Management** - Join multiple groups simultaneously
- **Real-time Statistics** - Live group and member data

---

## 📱 Mobile App Features

The Sontine mobile app provides a comprehensive tontine management experience:

### Core Features

- **Dashboard** - Overview of your tontine participation and statistics
- **Tontine Management** - Create, join, and manage tontine groups
- **Round Participation** - Contribute funds and participate in winner selection
- **Real-time Updates** - Live notifications and activity feed
- **Wallet Integration** - Seamless USDC transactions via Solana Mobile Wallet Adapter
- **Reputation System** - Build trust through consistent participation
- **Onboarding & Tutorials** - Interactive guides for new users
- **Notifications** - Real-time alerts for contributions, bidding rounds, and payouts

### User Interface

- **Tab Navigation** - Home, Tontines, Profile, Settings
- **Responsive Design** - Optimized for various screen sizes
- **Custom Typography** - Pixeloid Sans font for consistent branding
- **Haptic Feedback** - Enhanced user interaction experience
- **Loading States** - Smooth loading indicators and transitions

### Account Management

- **Profile Management** - User profile and reputation tracking
- **Transaction History** - Complete history of contributions and payouts
- **Wallet Operations** - Send, receive, and airdrop USDC
- **Settings** - App configuration and cluster selection
- **Notifications** - Real-time alerts for contributions, bidding rounds, and payouts

---

## 🌍 Internationalization

### Supported Languages

- **English** - Primary language

---

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`bun lint && bun check-types`)
5. Format your code (`bun format`)
6. Test your changes locally (`bun dev`)
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

### Mobile Development Workflow

1. Set up mobile development environment (Expo CLI, Android Studio/Xcode)
2. Navigate to mobile app (`cd apps/mobile/sontine`)
3. Start Expo development server (`expo start`)
4. Test on device or simulator
5. Follow the general development workflow above

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

### Community

- **Discord**: [Join our community](https://discord.gg/sontine)
- **Twitter**: [@SontineApp](https://twitter.com/SontineApp)
- **Telegram**: [Sontine Global](https://t.me/sontine)

### Documentation

- **User Guide**: [docs.sontine.fun](https://docs.sontine.fun)
- **API Reference**: [api.sontine.fun](https://api.sontine.fun)
- **Developer Portal**: [dev.sontine.fun](https://dev.sontine.fun)

### Contact

- **Email**: hello@sontine.fun
- **Support**: support@sontine.fun
- **Business**: business@sontine.fun

---

<div align="center">
  <p><strong>Built with ❤️ for the global tontine community</strong></p>
  <p>Empowering financial inclusion through blockchain technology</p>

  <br>

  <img src="https://img.shields.io/badge/Made%20with-Solana-9945FF?style=flat-square&logo=solana" alt="Made with Solana" />
  <img src="https://img.shields.io/badge/Powered%20by-Next.js-000000?style=flat-square&logo=next.js" alt="Powered by Next.js" />
  <img src="https://img.shields.io/badge/Styled%20with-Tailwind-38B2AC?style=flat-square&logo=tailwind-css" alt="Styled with Tailwind" />
</div>
