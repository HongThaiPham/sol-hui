import React from 'react'
import { View, ScrollView, StatusBar } from 'react-native'
import { useRouter } from 'expo-router'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { ProfileHeader } from '@/components/profile/profile-header'
import { useAppTheme } from '@/components/app-theme'

// Mock user data
const mockUser = {
  name: 'Leo Pham',
  email: 'hongthaipro@gmail.com',
  walletAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  reputation: 4.6,
  totalTransactions: 47,
  successRate: 98.5,
  memberSince: 'June 2023',
  totalContributed: 1250.75,
  totalReceived: 890.5,
  activeTontines: 3,
}

export default function ProfileScreen() {
  const { spacing, colors } = useAppTheme()
  const router = useRouter()

  const menuItems = [
    {
      title: 'Account Overview',
      description: 'View wallet balance and details',
      icon: 'person.crop.circle.fill',
      route: '/(tabs)/profile/account',
      color: colors.primary,
    },
    {
      title: 'Send USDC',
      description: 'Transfer USDC to other wallets',
      icon: 'paperplane.fill',
      route: '/(tabs)/profile/send',
      color: '#10B981',
    },
    {
      title: 'Receive USDC',
      description: 'Get your wallet address to receive',
      icon: 'square.and.arrow.down.fill',
      route: '/(tabs)/profile/receive',
      color: '#3B82F6',
    },
    {
      title: 'Request Airdrop',
      description: 'Get test USDC for development',
      icon: 'gift.fill',
      route: '/(tabs)/profile/airdrop',
      color: '#F59E0B',
    },
    {
      title: 'Wallet Management',
      description: 'Advanced wallet features',
      icon: 'wallet.pass.fill',
      route: '/(tabs)/profile/wallet',
      color: colors.primary,
    },
    {
      title: 'Transaction History',
      description: 'View all your transactions',
      icon: 'list.bullet',
      route: '/(tabs)/profile/history',
      color: '#8B5CF6',
    },
    {
      title: 'Reputation Score',
      description: 'View your reputation details',
      icon: 'star.fill',
      route: '/(tabs)/profile/reputation',
      color: '#FFD700',
    },
    {
      title: 'Settings',
      description: 'App preferences and security',
      icon: 'gearshape.fill',
      route: '/(tabs)/profile/settings',
      color: '#6B7280',
    },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Set status bar to match header background */}
      <StatusBar backgroundColor="#00B49F" barStyle="light-content" />

      {/* Profile Header */}
      <ProfileHeader />

      {/* Scrollable Content */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: spacing.xl }}>
        {/* Menu Items */}
        <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.md }}>
          {menuItems.map((item, index) => (
            <SontineCard key={index} variant="default" padding="none" style={{ marginBottom: spacing.sm }}>
              <SontineCardContent>
                <SontineButton
                  variant="ghost"
                  size="lg"
                  fullWidth
                  onPress={() => router.push(item.route as any)}
                  style={{
                    justifyContent: 'flex-start',
                    paddingHorizontal: 0,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: `${item.color}20`,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: spacing.md,
                      }}
                    >
                      <UiIconSymbol name={item.icon as any} size={20} color={item.color} />
                    </View>

                    <View style={{ flex: 1 }}>
                      <AppText
                        variant="titleSmall"
                        style={{
                          color: colors.onSurface,

                          marginBottom: spacing.xs / 2,
                        }}
                      >
                        {item.title}
                      </AppText>
                      <AppText
                        variant="bodySmall"
                        style={{
                          color: colors.onSurface,
                          opacity: 0.7,
                        }}
                      >
                        {item.description}
                      </AppText>
                    </View>

                    <UiIconSymbol name="arrow.right" size={16} color={colors.onSurface} style={{ opacity: 0.5 }} />
                  </View>
                </SontineButton>
              </SontineCardContent>
            </SontineCard>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
