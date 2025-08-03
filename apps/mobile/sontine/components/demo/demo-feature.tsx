import { AppView } from '@/components/app-view'
import { AppHeading } from '@/components/ui/typography'
import { AppText } from '@/components/app-text'
import { DemoFeatureSignMessage } from './demo-feature-sign-message'
import { ColorPaletteDemo } from './color-palette-demo'
import { FontDemo } from './font-demo'
import { TypographyDemo } from './typography-demo'
import { useWalletUi } from '@/components/solana/use-wallet-ui'
import { PublicKey } from '@solana/web3.js'
import { ScrollView, View, Alert } from 'react-native'
import { useAppTheme } from '@/components/app-theme'
import { SontineButton } from '@/components/ui/sontine-button'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useOnboarding } from '@/hooks/use-onboarding'
import { useDashboardTour } from '@/components/onboarding/dashboard-tour'
import * as React from 'react'

export function DemoFeature() {
  const { account } = useWalletUi()
  const { spacing, colors } = useAppTheme()
  const { resetOnboarding, isOnboardingCompleted } = useOnboarding()
  const { startDashboardTour } = useDashboardTour()

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: spacing.md }}>
        <AppHeading variant="titleMedium" style={{ marginBottom: spacing.md }}>
          Demo page
        </AppHeading>
        <AppHeading fontType="sans" style={{ marginBottom: spacing.lg }}>
          Start building your features here.
        </AppHeading>

        {/* Onboarding Reset Section */}
        <SontineCard variant="default" style={{ marginBottom: spacing.xl }}>
          <SontineCardContent style={{ padding: spacing.lg }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: spacing.md,
              }}
            >
              <UiIconSymbol
                name="arrow.clockwise.circle.fill"
                size={24}
                color={colors.primary}
                style={{ marginRight: spacing.md }}
              />
              <AppHeading variant="titleMedium" style={{ color: colors.onSurface }}>
                Onboarding Controls
              </AppHeading>
            </View>

            <AppText
              variant="bodyMedium"
              style={{
                color: colors.onSurface,
                opacity: 0.7,
                marginBottom: spacing.md,
              }}
            >
              Reset the onboarding flow to test the first-time user experience.
            </AppText>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: spacing.md,
              }}
            >
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onSurface,
                  opacity: 0.6,
                  marginRight: spacing.sm,
                }}
              >
                Status:
              </AppText>
              <View
                style={{
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                  borderRadius: 12,
                  backgroundColor: isOnboardingCompleted ? colors.primary + '20' : colors.secondary + '20',
                }}
              >
                <AppText
                  variant="bodySmall"
                  style={{
                    color: isOnboardingCompleted ? colors.primary : colors.secondary,
                  }}
                >
                  {isOnboardingCompleted ? 'Completed' : 'Not Completed'}
                </AppText>
              </View>
            </View>

            <View style={{ gap: spacing.md }}>
              <SontineButton
                variant="outline"
                onPress={() => {
                  Alert.alert(
                    'Reset Onboarding',
                    'This will reset the onboarding flow and show it again when you restart the app. Continue?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Reset',
                        style: 'destructive',
                        onPress: async () => {
                          await resetOnboarding()
                          Alert.alert(
                            'Success',
                            'Onboarding has been reset. Restart the app to see the onboarding flow.',
                          )
                        },
                      },
                    ],
                  )
                }}
                style={{ width: '100%' }}
              >
                Reset Onboarding
              </SontineButton>

              <SontineButton
                variant="primary"
                onPress={() => {
                  startDashboardTour()
                  Alert.alert('Dashboard Tour Started', 'Navigate to the Home tab to see the interactive tour.')
                }}
                style={{ width: '100%' }}
              >
                Start Dashboard Tour
              </SontineButton>
            </View>
          </SontineCardContent>
        </SontineCard>

        <View style={{ marginBottom: spacing.xl }}>
          <DemoFeatureSignMessage address={account?.publicKey as PublicKey} />
        </View>

        <View style={{ marginBottom: spacing.xl }}>
          <TypographyDemo />
        </View>

        <View style={{ marginBottom: spacing.xl }}>
          <FontDemo />
        </View>

        <ColorPaletteDemo />
      </View>
    </ScrollView>
  )
}
