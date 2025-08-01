# 📱 Sontine Mobile App

> **Tontine Meets Blockchain** - A React Native mobile application for decentralized rotating savings groups built on Solana blockchain.

## 🎯 Overview

Sontine Mobile App is a comprehensive mobile solution that brings traditional tontine (rotating savings) groups to the blockchain. Built with React Native and Expo, it provides a modern, secure, and user-friendly interface for managing tontine groups on the Solana network.

## 🏗️ Architecture & Design System

### **🎨 Brand Identity**

- **Primary Color**: `#00B49F` (Teal)
- **Secondary Color**: `#14F1B2` (Bright Teal)
- **Accent Color**: `#134158` (Navy Blue)
- **Typography**: Pixeloid Sans (custom pixel font)
- **Theme**: Material Design 3 with Sontine branding

### **📱 Navigation Architecture**

#### **Sontine Mobile App Navigation Architecture**

```mermaid
graph TD
    A[Sign In] --> B[Main App]

    B --> C[🏠 Home Tab]
    B --> D[💰 Tontines Tab]
    B --> E[👤 Profile Tab]

    C --> C1[Dashboard]
    C --> C2[Notifications]

    D --> D1[My Tontines]
    D --> D2[Browse Groups]
    D --> D3[Create Tontine]

    D1 --> D1a[Active Groups]
    D1 --> D1b[Completed Groups]
    D1 --> D1c[Pending Groups]

    D2 --> D2a[Filter & Search]
    D2 --> D2b[Group Details]
    D2 --> D2c[Join Application]

    D3 --> D3a[Group Setup]
    D3 --> D3b[Member Invitation]
    D3 --> D3c[Smart Contract Deploy]

    E --> E1[Profile Overview]
    E --> E2[Wallet Management]
    E --> E3[Transaction History]
    E --> E4[Reputation Score]
    E --> E5[Settings]

    E2 --> E2a[Balance View]
    E2 --> E2b[Send/Receive]
    E2 --> E2c[Token Management]

    style A fill:#00B49F,stroke:#134158,color:#fff
    style B fill:#14F1B2,stroke:#134158,color:#000
    style C fill:#C5FFF8,stroke:#00B49F
    style D fill:#C5FFF8,stroke:#00B49F
    style E fill:#C5FFF8,stroke:#00B49F
```

## 📂 Project Structure

```mermaid
graph LR
    A[apps/mobile/sontine/] --> B[app/]
    A --> C[components/]
    A --> D[constants/]
    A --> E[hooks/]
    A --> F[utils/]

    B --> B1["(tabs)/"]
    B --> B2[_layout.tsx]
    B --> B3[sign-in.tsx]

    B1 --> B1a[home/]
    B1 --> B1b[tontines/]
    B1 --> B1c[profile/]

    C --> C1[dashboard/]
    C --> C2[tontine/]
    C --> C3[ui/]
    C --> C4[app-providers.tsx]

    C1 --> C1a[dashboard-feature.tsx]
    C1 --> C1b[overview-cards.tsx]
    C1 --> C1c[quick-actions.tsx]
    C1 --> C1d[activity-feed.tsx]

    C2 --> C2a[tontine-card.tsx]
    C2 --> C2b[tontine-list.tsx]
    C2 --> C2c[tontines-feature.tsx]

    C3 --> C3a[sontine-button.tsx]
    C3 --> C3b[sontine-card.tsx]
    C3 --> C3c[sontine-input.tsx]
    C3 --> C3d[gradient-background.tsx]

    style A fill:#00B49F,color:#fff
    style B fill:#14F1B2,color:#000
    style C fill:#14F1B2,color:#000
    style B1 fill:#C5FFF8,color:#000
    style C1 fill:#C5FFF8,color:#000
    style C2 fill:#C5FFF8,color:#000
    style C3 fill:#C5FFF8,color:#000
```

## 🎯 Core Features

### **🏠 Home Tab - Dashboard**

- **Overview Cards**: Active tontines, total contributed, next payout, pending contributions
- **Quick Actions**: Browse tontines, create group, access wallet
- **Activity Feed**: Recent transactions, group updates, notifications
- **Reputation Display**: User score with star rating system
- **Notifications**: Bidding alerts, contribution reminders, payout notifications

### **💰 Tontines Tab - Core Functionality**

- **My Tontines Management**:
  - Active groups with contribution status
  - Pending applications
  - Completed tontines history
  - Progress tracking with visual indicators
- **Browse & Discovery**:
  - Search and filter available tontines
  - Group details with member profiles
  - Application process with requirements
- **Create New Tontines**:
  - Multi-step creation wizard
  - Smart contract deployment
  - Member invitation system
  - Financial configuration

### **👤 Profile Tab - Account Management**

- **Wallet Integration**:
  - SOL balance display
  - Send/receive functionality
  - Transaction history
- **Reputation System**:
  - Score calculation and display
  - Achievement badges
  - Performance metrics
- **Settings & Preferences**:
  - Notification preferences
  - Security settings
  - App configuration

## 🧩 Component Architecture

```mermaid
graph TB
    subgraph "Base UI Components"
        A[SontineButton]
        B[SontineCard]
        C[SontineInput]
        D[GradientBackground]
    end

    subgraph "Feature Components"
        E[TontineCard]
        F[OverviewCards]
        G[ActivityFeed]
        H[ReputationDisplay]
    end

    subgraph "Screen Components"
        I[DashboardFeature]
        J[TontinesFeature]
        K[ProfileFeature]
    end

    subgraph "Provider Layer"
        L[AppTheme]
        M[SolanaProvider]
        N[AuthProvider]
        O[ClusterProvider]
    end

    A --> E
    B --> E
    B --> F
    A --> G
    D --> I
    E --> J
    F --> I
    G --> I
    H --> I

    L --> I
    L --> J
    L --> K
    M --> I
    M --> J
    N --> I
    O --> M

    style A fill:#00B49F,color:#fff
    style B fill:#00B49F,color:#fff
    style C fill:#00B49F,color:#fff
    style D fill:#00B49F,color:#fff
    style E fill:#14F1B2,color:#000
    style F fill:#14F1B2,color:#000
    style G fill:#14F1B2,color:#000
    style H fill:#14F1B2,color:#000
```

### **Component Details**

- **SontineButton**: 5 variants (primary, secondary, outline, ghost, gradient)
- **SontineCard**: 4 variants (default, elevated, outlined, gradient)
- **SontineInput**: Styled input with validation and helper text
- **GradientBackground**: 4 gradient variants for branding
- **TontineCard**: Rich card displaying tontine information
- **OverviewCards**: Dashboard summary widgets
- **ActivityFeed**: Transaction and update timeline
- **ReputationDisplay**: User score visualization

## 🎨 Design Specifications

### **Color Palette**

```typescript
const SontineColors = {
  primary: '#00B49F', // Main teal
  primaryLight: '#14F1B2', // Bright teal
  primaryDark: '#134158', // Navy blue
  surface: '#FFFFFF', // Clean white
  surfaceVariant: '#C5FFF8', // Light mint
  background: '#F8FFFE', // Very light mint
}
```

### **Spacing System**

```typescript
const spacing = {
  xs: 4, // Tight spacing
  sm: 8, // Small spacing
  md: 16, // Medium spacing
  lg: 24, // Large spacing
  xl: 32, // Extra large spacing
  xxl: 48, // Extra extra large spacing
}
```

### **Typography Scale**

- **headlineLarge**: 32px, Bold
- **titleLarge**: 24px, Bold
- **titleMedium**: 20px, Bold
- **bodyLarge**: 16px, Regular
- **bodyMedium**: 14px, Regular
- **bodySmall**: 12px, Regular

## 🔧 Technical Stack

### **Core Technologies**

- **React Native**: 0.79.5
- **Expo SDK**: 53
- **TypeScript**: Strict mode enabled
- **Expo Router**: File-based navigation

### **UI Framework**

- **React Native Paper**: Material Design 3 components
- **Expo Linear Gradient**: Gradient backgrounds
- **React Native SVG**: Vector graphics

### **Solana Integration**

- **@solana/web3.js**: Solana JavaScript SDK
- **@solana-mobile/mobile-wallet-adapter-protocol**: Mobile wallet integration
- **@solana/spl-token**: SPL token support

### **State Management**

- **@tanstack/react-query**: Server state management
- **React Context**: Local state management

## 🚀 Development Setup

### **Prerequisites**

- Node.js 18+
- Bun package manager
- Expo CLI
- iOS Simulator / Android Emulator

### **Installation**

```bash
# Install dependencies
bun install

# Start development server
bun start

# Run on specific platform
bun ios      # iOS Simulator
bun android  # Android Emulator
bun web      # Web browser
```

### **Available Scripts**

```bash
bun dev          # Start Expo development server
bun build        # Build for production
bun lint         # Run ESLint
bun type-check   # TypeScript type checking
```

## 📱 User Experience Flow

### **Authentication Flow**

```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant W as Wallet
    participant S as Solana

    U->>A: Open App
    A->>U: Show Sign In Screen
    U->>A: Tap Connect
    A->>W: Request Connection
    W->>U: Approve Connection
    W->>A: Return Wallet Info
    A->>S: Verify Wallet
    S->>A: Confirm Identity
    A->>U: Navigate to Dashboard
```

### **Tontine Participation Flow**

```mermaid
flowchart TD
    A[Browse Tontines] --> B{Filter Results}
    B --> C[View Tontine Details]
    C --> D{Check Requirements}
    D -->|✅ Eligible| E[Submit Application]
    D -->|❌ Not Eligible| F[Show Requirements]
    E --> G[Wait for Approval]
    G --> H{Application Status}
    H -->|✅ Approved| I[Join Tontine]
    H -->|❌ Rejected| J[Try Other Groups]
    I --> K[Make Contributions]
    K --> L[Participate in Bidding]
    L --> M[Receive Payouts]
    M --> N[Update Reputation]

    style A fill:#C5FFF8
    style I fill:#14F1B2,color:#000
    style M fill:#00B49F,color:#fff
    style N fill:#134158,color:#fff
```

### **Tontine Creation Flow**

```mermaid
stateDiagram-v2
    [*] --> Setup: Create New Tontine
    Setup --> Configuration: Set Parameters
    Configuration --> Review: Validate Settings
    Review --> Deploy: Deploy Smart Contract
    Deploy --> Invitation: Invite Members
    Invitation --> Management: Monitor Progress
    Management --> Completion: Tontine Ends
    Completion --> [*]

    Setup: 📝 Basic Information
    Configuration: ⚙️ Financial Settings
    Review: 👀 Review & Confirm
    Deploy: 🚀 Blockchain Deployment
    Invitation: 👥 Member Management
    Management: 📊 Active Monitoring
    Completion: 🏆 Final Settlement
```

## 🔐 Security & Trust

### **Wallet Security**

- Mobile Wallet Adapter Protocol integration
- Secure transaction signing
- Biometric authentication support

### **Reputation System**

- On-chain reputation tracking
- Performance-based scoring
- Community feedback integration

### **Smart Contract Integration**

- Automated contribution collection
- Transparent payout distribution
- Dispute resolution mechanisms

## 🎯 Future Enhancements

### **Phase 1: Core Features** ✅

- Basic navigation and UI components
- Tontine management interface
- Wallet integration
- Reputation system

### **Phase 2: Advanced Features** 🚧

- Real-time notifications
- Advanced bidding mechanisms
- Multi-token support
- Social features

### **Phase 3: Ecosystem** 📋

- DeFi integrations
- Cross-chain support
- Governance features
- Analytics dashboard

## 📊 Performance Metrics

### **Target Metrics**

- **App Launch Time**: < 3 seconds
- **Screen Transition**: < 300ms
- **Transaction Confirmation**: < 5 seconds
- **Offline Support**: Basic functionality available

### **User Experience Goals**

- **Intuitive Navigation**: < 3 taps to any feature
- **Clear Information**: All data easily scannable
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: WCAG 2.1 AA compliance

## 🤝 Contributing

### **Development Guidelines**

1. Follow TypeScript strict mode
2. Use existing UI components when possible
3. Maintain consistent naming conventions
4. Write comprehensive tests
5. Document new features

### **Code Style**

- ESLint configuration enforced
- Prettier for code formatting
- Conventional commits for git history

## 📄 License

This project is part of the Sontine ecosystem and follows the main project's licensing terms.

---

**Built with ❤️ by the Sontine Team**
