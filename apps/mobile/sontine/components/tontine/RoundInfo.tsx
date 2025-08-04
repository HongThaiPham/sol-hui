import React from 'react'
import { Alert, View } from 'react-native'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineActionButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'
import { useSontineProgram, CURRENCY_SYMBOL, useGetGroup } from '@/hooks/use-sontine-porgram'
import { useAnchorWallet } from '@/hooks/use-anchor-wallet'
import * as Haptics from 'expo-haptics'

// Import sub-components
import { RoundHeader } from './round/RoundHeader'
import { RoundProgressBar } from './round/RoundProgressBar'
import { RoundStats } from './round/RoundStats'
import { RoundActions } from './round/RoundActions'
import { useRoundData } from './round/useRoundData'
import { ellipsify } from '@/utils/ellipsify'

interface RoundInfoProps {
  groupAddress: string
  groupData: Awaited<ReturnType<typeof useGetGroup>>['data']
  roundNumber?: number // If not provided, uses current round
  isUserMember: boolean
  showActions?: boolean // Whether to show action buttons
  isCurrentRound?: boolean // Whether this is the current active round
}

export function RoundInfo({
  groupData,
  roundNumber,
  isUserMember,
  showActions = true,
  isCurrentRound = true,
  groupAddress,
}: RoundInfoProps) {
  const { spacing, colors, fontFamily } = useAppTheme()
  const { contribute, selectWinner, distributeFunds } = useSontineProgram()
  const anchorWallet = useAnchorWallet()

  // Check if current user is admin
  const isAdmin = anchorWallet?.publicKey?.toString() === groupData?.admin.toBase58()

  // Use custom hook to get all round data
  const roundData = useRoundData({
    groupAddress,
    groupData,
    roundNumber,
    isCurrentRound,
  })

  // Handle contribute action
  const handleContribute = () => {
    contribute.mutate(groupAddress, {
      onSuccess: () => {
        Alert.alert('Success', 'Contributed successfully!')
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      },
      onError: () => {
        Alert.alert('Error', 'Failed to contribute')
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      },
    })
  }

  // Handle bid action
  const handleBid = () => {
    // TODO: Implement bidding logic
  }

  // Handle select winner action
  const handleSelectWinner = () => {
    selectWinner.mutate(
      { groupAddress },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Winner selected successfully!')
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        },
        onError: () => {
          Alert.alert('Error', 'Failed to select winner')
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        },
      },
    )
  }

  // Handle distribute funds action
  const handleDistributeFunds = () => {
    distributeFunds.mutate(
      { groupAddress },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Funds distributed successfully!')
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        },
        onError: () => {
          Alert.alert('Error', 'Failed to distribute funds')
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        },
      },
    )
  }

  if (!roundData.roundData) {
    return null
  }

  return (
    <View>
      {/* Round Header */}
      <SontineCard variant="elevated" padding="md" style={{ marginBottom: showActions ? spacing.md : 0 }}>
        <SontineCardContent>
          <RoundHeader
            displayRoundNumber={roundData.displayRoundNumber}
            totalRounds={roundData.totalRounds}
            cycleDuration={groupData?.cycleDuration}
            roundStatus={roundData.roundStatus}
            isUserMember={isUserMember}
            isCurrentRound={isCurrentRound}
            hasUserContributed={roundData.hasUserContributed}
          />

          {/* <RoundProgressBar
            title="Round Progress"
            progress={roundData.roundProgress}
            progressColor={roundData.roundStatus.color}
          /> */}

          <RoundProgressBar
            title="Progress"
            progress={roundData.collectionProgress}
            progressColor={roundData.roundStatus.color}
            // subtitle={
            //   isCurrentRound
            //     ? `${roundData.collectedAmount.toFixed(2)} / ${roundData.targetAmount.toFixed(2)} ${CURRENCY_SYMBOL}`
            //     : `${roundData.targetAmount.toFixed(2)} ${CURRENCY_SYMBOL}`
            // }
            height={6}
          />

          <RoundStats
            contributionAmount={roundData.contributionAmount}
            contributorsCount={roundData?.contributorsCount}
            expectedContributors={roundData?.expectedContributors || 0}
            collectionProgress={roundData.collectionProgress}
            currency={CURRENCY_SYMBOL}
          />

          {/* Action Buttons */}
          {showActions && (
            <RoundActions
              isUserMember={isUserMember}
              isCurrentRound={isCurrentRound}
              hasUserContributed={roundData.hasUserContributed}
              isGroupStarted={!!groupData?.status?.active}
              isRoundActive={roundData.roundStatus.status === 'Active'}
              isAuctionMethod={!!groupData?.selectionMethod.auction}
              contributionAmount={roundData.contributionAmount}
              currency={CURRENCY_SYMBOL}
              onContribute={handleContribute}
              onBid={handleBid}
              isContributing={contribute.isPending}
              contributeError={contribute.error?.message || null}
              isAdmin={isAdmin}
              canSelectWinner={roundData.canSelectWinner}
              onSelectWinner={handleSelectWinner}
              isSelectingWinner={selectWinner.isPending}
            />
          )}

          {/* Admin Round Status Footer */}
          {isAdmin && isCurrentRound && roundData.roundData && (
            <View
              style={{
                marginTop: spacing.md,
                paddingTop: spacing.md,
                borderTopWidth: 1,
                borderTopColor: colors.outline,
                flex: 1,
                gap: spacing.md,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                <UiIconSymbol name="shield-moon" size={16} color={colors.primary} style={{ marginRight: spacing.xs }} />
                <AppText
                  variant="bodySmall"
                  style={{
                    color: colors.primary,
                  }}
                >
                  Result
                </AppText>
              </View>

              <View style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: spacing.xs }}>
                <AppText variant="bodySmall" style={{ color: colors.onSurface, opacity: 0.7 }}>
                  Winner:{' '}
                  {roundData.roundData.selectedMember
                    ? ellipsify(roundData.roundData.selectedMember.toString(), 8)
                    : 'Not Selected'}
                </AppText>
                <AppText variant="bodySmall" style={{ color: colors.onSurface, opacity: 0.7 }}>
                  Funds: {roundData.fundsDistributed ? 'Distributed' : 'Waiting for Distribution'}
                </AppText>
                <AppText variant="bodySmall" style={{ color: colors.onSurface, opacity: 0.7 }}>
                  Status:{' '}
                  {'selecting' in roundData.roundData.status ? 'Winner selected' : 'Waiting for selection winner'}
                </AppText>
              </View>

              {/* Admin Select Winner Action */}
              {isAdmin && isCurrentRound && roundData.canSelectWinner && (
                <SontineActionButton
                  variant="primary"
                  onPress={handleSelectWinner}
                  icon="trophy"
                  disabled={selectWinner.isPending}
                  isLoading={selectWinner.isPending}
                  loadingText="Selecting Winner..."
                  loading={selectWinner.isPending}
                >
                  Select Winner
                </SontineActionButton>
              )}

              {/* Distribute Funds Action - Available to all members */}
              {isUserMember && isCurrentRound && roundData.canDistributeFunds && roundData.walletIsWinner && (
                <SontineActionButton
                  onPress={handleDistributeFunds}
                  icon="piggy-bank"
                  disabled={distributeFunds.isPending}
                  isLoading={distributeFunds.isPending}
                  loadingText="Distributing Funds..."
                  loading={distributeFunds.isPending}
                  size="sm"
                >
                  You are the winner! Claim
                </SontineActionButton>
              )}
            </View>
          )}
        </SontineCardContent>
      </SontineCard>
    </View>
  )
}
