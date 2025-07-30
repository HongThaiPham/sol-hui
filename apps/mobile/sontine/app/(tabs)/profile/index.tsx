import React from 'react'
import { ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { GradientBackground } from '@/components/ui/gradient-background'
import { useAppTheme } from '@/components/app-theme'

// Mock user data
const mockUser = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
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
    <AppPage>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: spacing.xl }}>
        {/* Profile Header */}
        <View style={{ height: 200, position: 'relative' }}>
          <GradientBackground variant="primary-accent" />
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: spacing.md,
            }}
          >
            {/* Avatar */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.md,
              }}
            >
              <AppText
                variant="headlineLarge"
                style={{
                  color: colors.onPrimary,
                  fontWeight: 'bold',
                }}
              >
                {mockUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AppText>
            </View>

            <AppText
              variant="titleLarge"
              style={{
                color: colors.onPrimary,
                fontWeight: 'bold',
                marginBottom: spacing.xs,
              }}
            >
              {mockUser.name}
            </AppText>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: spacing.xs,
              }}
            >
              {[0, 1, 2, 3, 4].map((index) => (
                <UiIconSymbol
                  key={index}
                  name="star.fill"
                  size={16}
                  color={index < Math.floor(mockUser.reputation) ? '#FFD700' : 'rgba(255, 255, 255, 0.3)'}
                  style={{ marginLeft: index > 0 ? 2 : 0 }}
                />
              ))}
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onPrimary,
                  marginLeft: spacing.sm,
                  fontWeight: 'bold',
                }}
              >
                {mockUser.reputation} ({mockUser.totalTransactions} transactions)
              </AppText>
            </View>

            <AppText
              variant="bodyMedium"
              style={{
                color: colors.onPrimary,
                opacity: 0.9,
              }}
            >
              Member since {mockUser.memberSince}
            </AppText>
          </View>
        </View>

        {/* Stats Cards */}
        <View
          style={{
            marginTop: -spacing.lg,
            paddingHorizontal: spacing.md,
            marginBottom: spacing.lg,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: spacing.sm,
            }}
          >
            <SontineCard variant="elevated" padding="md" style={{ flex: 1 }}>
              <SontineCardContent>
                <AppText
                  variant="titleMedium"
                  style={{
                    color: colors.onSurface,
                    fontWeight: 'bold',
                    marginBottom: spacing.xs,
                  }}
                >
                  {mockUser.totalContributed} USDC
                </AppText>
                <AppText
                  variant="bodySmall"
                  style={{
                    color: colors.onSurface,
                    opacity: 0.7,
                  }}
                >
                  Total Contributed
                </AppText>
              </SontineCardContent>
            </SontineCard>

            <SontineCard variant="elevated" padding="md" style={{ flex: 1 }}>
              <SontineCardContent>
                <AppText
                  variant="titleMedium"
                  style={{
                    color: colors.onSurface,
                    fontWeight: 'bold',
                    marginBottom: spacing.xs,
                  }}
                >
                  {mockUser.totalReceived} USDC
                </AppText>
                <AppText
                  variant="bodySmall"
                  style={{
                    color: colors.onSurface,
                    opacity: 0.7,
                  }}
                >
                  Total Received
                </AppText>
              </SontineCardContent>
            </SontineCard>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ paddingHorizontal: spacing.md }}>
          <AppText
            variant="titleMedium"
            style={{
              color: colors.onSurface,
              fontWeight: 'bold',
              marginBottom: spacing.md,
            }}
          >
            Account Management
          </AppText>

          {menuItems.map((item, index) => (
            <SontineCard key={index} variant="default" padding="md" style={{ marginBottom: spacing.sm }}>
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
                          fontWeight: 'bold',
                          marginBottom: spacing.xs,
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
    </AppPage>
  )
}
