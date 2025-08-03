import React from 'react'
import { ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

// Mock wallet data
const mockWallet = {
  balance: 125.75,
  address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  recentTransactions: [
    { id: '1', type: 'received', amount: 450, from: 'Friends Circle Payout', date: '2024-01-15', hash: 'abc123...' },
    { id: '2', type: 'sent', amount: 15, to: 'Family Savings Group', date: '2024-01-10', hash: 'def456...' },
    { id: '3', type: 'sent', amount: 25, to: 'Investment Club', date: '2024-01-05', hash: 'ghi789...' },
  ],
}

export default function WalletScreen() {
  const { spacing, colors } = useAppTheme()
  const router = useRouter()

  return (
    <AppPage>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: spacing.md,
          paddingBottom: spacing.xl,
        }}
      >
        {/* Balance Card */}
        <SontineCard variant="elevated" padding="lg" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                  marginBottom: spacing.xs,
                }}
              >
                Total Balance
              </AppText>
              <AppText
                variant="headlineLarge"
                style={{
                  color: colors.onSurface,

                  marginBottom: spacing.md,
                }}
              >
                {mockWallet.balance} SOL
              </AppText>

              <View
                style={{
                  flexDirection: 'row',
                  gap: spacing.md,
                  width: '100%',
                }}
              >
                <SontineButton
                  variant="primary"
                  size="md"
                  style={{ flex: 1 }}
                  onPress={() => {
                    /* Handle send */
                  }}
                >
                  <UiIconSymbol name="arrow.right" size={16} color={colors.onPrimary} />
                  Send
                </SontineButton>

                <SontineButton
                  variant="outline"
                  size="md"
                  style={{ flex: 1 }}
                  onPress={() => {
                    /* Handle receive */
                  }}
                >
                  <UiIconSymbol name="arrow.left" size={16} color={colors.primary} />
                  Receive
                </SontineButton>
              </View>
            </View>
          </SontineCardContent>
        </SontineCard>

        {/* Wallet Address */}
        <SontineCard variant="outlined" padding="md" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <AppText
              variant="titleSmall"
              style={{
                color: colors.onSurface,

                marginBottom: spacing.sm,
              }}
            >
              Wallet Address
            </AppText>
            <AppText
              variant="bodySmall"
              style={{
                color: colors.onSurface,
                opacity: 0.8,
                fontFamily: 'monospace',
              }}
            >
              {mockWallet.address}
            </AppText>
          </SontineCardContent>
        </SontineCard>

        {/* Recent Transactions */}
        <AppText
          variant="titleMedium"
          style={{
            color: colors.onSurface,

            marginBottom: spacing.md,
          }}
        >
          Recent Transactions
        </AppText>

        {mockWallet.recentTransactions.map((tx) => (
          <SontineCard key={tx.id} variant="default" padding="md" style={{ marginBottom: spacing.sm }}>
            <SontineCardContent>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
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
                      backgroundColor: tx.type === 'received' ? '#10B98120' : '#DC262620',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: spacing.md,
                    }}
                  >
                    <UiIconSymbol
                      name={tx.type === 'received' ? 'arrow.left' : 'arrow.right'}
                      size={20}
                      color={tx.type === 'received' ? '#10B981' : '#DC2626'}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <AppText
                      variant="titleSmall"
                      style={{
                        color: colors.onSurface,

                        marginBottom: spacing.xs,
                      }}
                    >
                      {tx.type === 'received' ? tx.from : tx.to}
                    </AppText>
                    <AppText
                      variant="bodySmall"
                      style={{
                        color: colors.onSurface,
                        opacity: 0.6,
                      }}
                    >
                      {tx.date}
                    </AppText>
                  </View>
                </View>

                <AppText
                  variant="titleSmall"
                  style={{
                    color: tx.type === 'received' ? '#10B981' : '#DC2626',
                  }}
                >
                  {tx.type === 'received' ? '+' : '-'}
                  {tx.amount} SOL
                </AppText>
              </View>
            </SontineCardContent>
          </SontineCard>
        ))}

        <SontineButton
          variant="outline"
          size="md"
          fullWidth
          onPress={() => router.push('/(tabs)/profile/history')}
          style={{ marginTop: spacing.md }}
        >
          View All Transactions
        </SontineButton>
      </ScrollView>
    </AppPage>
  )
}
