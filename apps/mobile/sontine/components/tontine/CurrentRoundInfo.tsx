import React from 'react'
import { View } from 'react-native'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineActionButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'
import { useSontineProgram, USDC_DECIMALS, CURRENCY_SYMBOL } from '@/hooks/use-sontine-porgram'
import { useAnchorWallet } from '@/hooks/use-anchor-wallet'

interface CurrentRoundInfoProps {
  groupData: any
  isUserMember: boolean
}

export function CurrentRoundInfo({ groupData, isUserMember }: CurrentRoundInfoProps) {
  const { spacing, colors } = useAppTheme()
  const anchorWallet = useAnchorWallet()
  const { contribute } = useSontineProgram()

  // Calculate round progress
  const currentRound = groupData.currentRound + 1 // Display as 1-indexed
  const totalRounds = groupData.totalRounds
  const roundProgress = (currentRound / totalRounds) * 100

  // Calculate contribution info
  const contributionAmount = groupData.contributionAmount.toNumber() / 10 ** USDC_DECIMALS
  const totalCollected = groupData.totalCollected.toNumber() / 10 ** USDC_DECIMALS
  const targetAmount = contributionAmount * groupData.currentMembers

  // Calculate collection progress for current round
  const collectionProgress = targetAmount > 0 ? (totalCollected / targetAmount) * 100 : 0

  // Determine round status
  const getRoundStatus = () => {
    if (!groupData.startedAt) {
      return { status: 'Not Started', color: colors.outline, icon: 'punch-clock' }
    }
    if (collectionProgress >= 100) {
      return { status: 'Complete', color: colors.primary, icon: 'checkmark.circle.fill' }
    }
    return { status: 'Active', color: colors.secondary, icon: 'play.circle.fill' }
  }

  const roundStatus = getRoundStatus()

  // Format cycle duration
  const formatCycleDuration = (cycleDuration: any) => {
    if (cycleDuration.weekly) return 'Weekly'
    if (cycleDuration.monthly) return 'Monthly'
    if (cycleDuration.custom) {
      const days = cycleDuration.custom.fields[0] / (24 * 60 * 60) // Convert seconds to days
      return `${days} days`
    }
    return 'Unknown'
  }

  return (
    <View>
      {/* Round Header */}
      <SontineCard variant="elevated" padding="md" style={{ marginBottom: spacing.md }}>
        <SontineCardContent>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing.md,
            }}
          >
            <View>
              <AppText
                variant="titleLarge"
                style={{
                  color: colors.onSurface,
                }}
              >
                Round {currentRound} of {totalRounds}
              </AppText>
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                  marginTop: spacing.xs,
                }}
              >
                {formatCycleDuration(groupData.cycleDuration)} cycle
              </AppText>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <UiIconSymbol
                name={roundStatus.icon as any}
                size={20}
                color={roundStatus.color}
                style={{ marginRight: spacing.xs }}
              />
              <AppText
                variant="bodyMedium"
                style={{
                  color: roundStatus.color,
                  fontWeight: '600',
                }}
              >
                {roundStatus.status}
              </AppText>
            </View>
          </View>

          {/* Round Progress Bar */}
          <View style={{ marginBottom: spacing.md }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: spacing.xs,
              }}
            >
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  fontWeight: '600',
                }}
              >
                Round Progress
              </AppText>
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  fontWeight: '600',
                }}
              >
                {Math.round(roundProgress)}%
              </AppText>
            </View>

            <View
              style={{
                height: 8,
                backgroundColor: colors.outline,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  height: '100%',
                  width: `${roundProgress}%`,
                  backgroundColor: colors.primary,
                }}
              />
            </View>
          </View>

          {/* Collection Progress */}
          <View style={{ marginBottom: spacing.md }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: spacing.xs,
              }}
            >
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  fontWeight: '600',
                }}
              >
                Collection Progress
              </AppText>
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  fontWeight: '600',
                }}
              >
                {totalCollected.toFixed(2)} / {targetAmount.toFixed(2)} {CURRENCY_SYMBOL}
              </AppText>
            </View>

            <View
              style={{
                height: 6,
                backgroundColor: colors.outline,
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  height: '100%',
                  width: `${Math.min(collectionProgress, 100)}%`,
                  backgroundColor: colors.secondary,
                }}
              />
            </View>
          </View>

          {/* Round Stats */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center' }}>
              <AppText
                variant="titleMedium"
                style={{
                  color: colors.onSurface,
                }}
              >
                {contributionAmount.toFixed(2)}
              </AppText>
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                }}
              >
                Per Member
              </AppText>
            </View>

            <View style={{ alignItems: 'center' }}>
              <AppText
                variant="titleMedium"
                style={{
                  color: colors.onSurface,
                }}
              >
                {groupData.currentMembers}
              </AppText>
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                }}
              >
                Contributors
              </AppText>
            </View>

            <View style={{ alignItems: 'center' }}>
              <AppText
                variant="titleMedium"
                style={{
                  color: colors.onSurface,
                }}
              >
                {Math.round(collectionProgress)}%
              </AppText>
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                }}
              >
                Collected
              </AppText>
            </View>
          </View>
        </SontineCardContent>
      </SontineCard>

      {/* Action Buttons */}
      <View style={{ gap: spacing.sm }}>
        {/* Contribute Button */}
        {isUserMember && groupData.startedAt && roundStatus.status === 'Active' && (
          <SontineActionButton
            variant="primary"
            onPress={() => {
              contribute.mutate(groupData.publicKey?.toString() || '')
            }}
            icon="plus.circle.fill"
            disabled={contribute.isPending}
            isLoading={contribute.isPending}
            loadingText="Contributing..."
          >
            Contribute {contributionAmount.toFixed(2)} {CURRENCY_SYMBOL}
          </SontineActionButton>
        )}

        {/* Auction Bid Button */}
        {groupData.selectionMethod.auction && roundStatus.status === 'Active' && (
          <SontineActionButton
            variant="accent"
            onPress={() => {
              /* Handle bidding */
            }}
            icon="chart-bell-curve-cumulative"
          >
            Submit Bid
          </SontineActionButton>
        )}

        {/* Error Message */}
        {contribute.error && (
          <View style={{ marginTop: spacing.sm }}>
            <AppText
              variant="bodySmall"
              style={{
                color: colors.error,
                textAlign: 'center',
              }}
            >
              Failed to contribute: {contribute.error.message}
            </AppText>
          </View>
        )}
      </View>
    </View>
  )
}
