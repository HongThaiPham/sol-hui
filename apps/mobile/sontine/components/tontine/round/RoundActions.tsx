import React from 'react'
import { View } from 'react-native'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineActionButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

interface RoundActionsProps {
  isUserMember: boolean
  isCurrentRound: boolean
  hasUserContributed: boolean
  isGroupStarted: boolean
  isRoundActive: boolean
  isAuctionMethod: boolean
  contributionAmount: number
  currency: string
  onContribute: () => void
  onBid: () => void
  isContributing: boolean
  contributeError?: string | null
}

export function RoundActions({
  isUserMember,
  isCurrentRound,
  hasUserContributed,
  isGroupStarted,
  isRoundActive,
  isAuctionMethod,
  contributionAmount,
  currency,
  onContribute,
  onBid,
  isContributing,
  contributeError,
}: RoundActionsProps) {
  const { spacing, colors } = useAppTheme()

  const shouldShowContributeButton =
    isUserMember && isCurrentRound && isGroupStarted && isRoundActive && !hasUserContributed

  const shouldShowContributedMessage = isUserMember && isCurrentRound && hasUserContributed

  const shouldShowBidButton = isAuctionMethod && isCurrentRound && isRoundActive

  return (
    <View style={{ gap: spacing.sm }}>
      {/* Contribute Button */}
      {shouldShowContributeButton && (
        <SontineActionButton
          variant="primary"
          onPress={onContribute}
          icon="plus-circle"
          disabled={isContributing}
          isLoading={isContributing}
          loadingText="Contributing..."
          loading={isContributing}
        >
          Contribute {contributionAmount.toFixed(2)} {currency}
        </SontineActionButton>
      )}

      {/* Already Contributed Message */}
      {shouldShowContributedMessage && (
        <SontineCard variant="outlined" padding="md">
          <SontineCardContent>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <UiIconSymbol
                name="checkmark.circle.fill"
                size={20}
                color={colors.primary}
                style={{ marginRight: spacing.xs }}
              />
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.primary,
                  fontWeight: '600',
                }}
              >
                You have contributed to this round
              </AppText>
            </View>
          </SontineCardContent>
        </SontineCard>
      )}

      {/* Auction Bid Button */}
      {shouldShowBidButton && (
        <SontineActionButton variant="accent" onPress={onBid} icon="chart-bell-curve-cumulative">
          Submit Bid
        </SontineActionButton>
      )}

      {/* Error Message */}
      {/* {contributeError && (
        <View style={{ marginTop: spacing.sm }}>
          <AppText
            variant="bodySmall"
            style={{
              color: colors.error,
              textAlign: 'center',
            }}
          >
            Failed to contribute, try again later.
          </AppText>
        </View>
      )} */}
    </View>
  )
}
