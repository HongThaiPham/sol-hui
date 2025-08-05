import React from 'react'
import { View } from 'react-native'
import { SontineActionButton } from '@/components/ui/sontine-button'
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
  collectionProgress: number
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
  collectionProgress,
}: RoundActionsProps) {
  const { spacing, colors } = useAppTheme()

  const shouldShowContributeButton =
    isUserMember && isCurrentRound && isGroupStarted && isRoundActive && !hasUserContributed

  console.log({
    isUserMember,
    isCurrentRound,
    hasUserContributed,
    isGroupStarted,
    isRoundActive,
  })

  const shouldShowBidButton =
    isAuctionMethod && isCurrentRound && isRoundActive && hasUserContributed && collectionProgress == 100

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
