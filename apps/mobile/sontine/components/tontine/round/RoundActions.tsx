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
  // Admin props
  isAdmin: boolean
  canSelectWinner: boolean
  onSelectWinner: () => void
  isSelectingWinner: boolean
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
  isAdmin,
  canSelectWinner,
  onSelectWinner,
  isSelectingWinner,
}: RoundActionsProps) {
  const { spacing, colors } = useAppTheme()

  const shouldShowContributeButton =
    isUserMember && isCurrentRound && isGroupStarted && isRoundActive && !hasUserContributed

  const shouldShowBidButton = isAuctionMethod && isCurrentRound && isRoundActive

  if (!shouldShowContributeButton && !shouldShowBidButton) {
    return null
  }

  return (
    <View
      style={{
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.outline,
        gap: spacing.md,
      }}
    >
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

      {/* Auction Bid Button */}
      {shouldShowBidButton && (
        <SontineActionButton variant="primary" onPress={onBid} icon="chart-bell-curve-cumulative">
          Submit Bid
        </SontineActionButton>
      )}
    </View>
  )
}
