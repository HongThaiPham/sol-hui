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

This monorepo contains the complete Sontine ecosystem built with modern web technologies:

### 📱 Applications

- **`apps/web`**: Main landing page built with Next.js 15 and Tailwind CSS
- **`apps/docs`**: Documentation and developer resources

### 📦 Shared Packages

- **`packages/ui`**: Reusable React components with Tailwind CSS
- **`packages/eslint-config`**: Shared ESLint configurations
- **`packages/typescript-config`**: TypeScript configurations
- **`packages/tailwind-config`**: Tailwind CSS configurations

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom design system
- **Language**: TypeScript 5.8
- **State Management**: TanStack Query (React Query) v5
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Blockchain

- **Network**: Solana Mainnet/Devnet
- **Wallets**: Phantom, Solflare, Backpack, Glow
- **Smart Contracts**: Rust-based Solana programs

### Development Tools

- **Monorepo**: Turborepo
- **Package Manager**: npm/bun
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Git
- Solana wallet (Phantom recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/sontine.git
   cd sontine
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   ```
   http://localhost:3001 - Web app
   http://localhost:3000 - Documentation
   ```

---

## 📝 Available Scripts

### Development

```bash
npm run dev          # Start all apps in development mode
npm run build        # Build all apps for production
npm run start        # Start production servers
npm run lint         # Run ESLint across all packages
npm run type-check   # Run TypeScript type checking
```

### Individual Apps

```bash
npm run dev:web      # Start web app only
npm run dev:docs     # Start docs app only
npm run build:web    # Build web app only
npm run build:docs   # Build docs app only
```

---

## 🌐 Deployment

### Web App (Vercel)

```bash
npm run build:web
# Deploy to Vercel, Netlify, or your preferred platform
```

### Environment Variables

Create `.env.local` files in each app directory:

```env
# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_RPC_ENDPOINT=https://api.mainnet-beta.solana.com

# App Configuration
NEXT_PUBLIC_APP_URL=https://sontine.fun
NEXT_PUBLIC_API_URL=https://api.sontine.fun
```

---

## 🎨 Design System

### Brand Colors

- **Primary**: Emerald Green (`#10B981`) - Prosperity & Growth
- **Secondary**: Solana Purple (`#9945FF`) - Blockchain Technology
- **Accent**: Gold (`#F59E0B`) - Wealth & Success
- **Background**: Clean whites and light grays

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body**: Regular weight (400-500)

---

## 🔗 Solana Integration

### Supported Wallets

- [Phantom](https://phantom.app/) - Recommended for beginners
- [Solflare](https://solflare.com/) - Advanced features
- [Backpack](https://backpack.app/) - Multi-chain support
- [Glow](https://glow.app/) - Mobile-first

### Smart Contract Features

- Automated contribution collection
- Transparent bidding system
- Fair payout distribution
- Reputation tracking
- Multi-tontine management

---

## 🌍 Internationalization

### Supported Languages

- **English** - Primary language
- **Vietnamese** - Native tontine ("hụi") community
- **French** - Traditional tontine regions
- **Spanish** - Latin American markets

### Adding New Languages

1. Add translations to `locales/` directory
2. Update `next.config.ts` with new locale
3. Create localized routes and content

---

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint && npm run type-check`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

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
