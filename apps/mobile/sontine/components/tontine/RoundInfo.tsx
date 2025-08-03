import React from 'react'
import { View } from 'react-native'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { useAppTheme } from '@/components/app-theme'
import { useSontineProgram, CURRENCY_SYMBOL } from '@/hooks/use-sontine-porgram'

// Import sub-components
import { RoundHeader } from './round/RoundHeader'
import { RoundProgressBar } from './round/RoundProgressBar'
import { RoundStats } from './round/RoundStats'
import { RoundActions } from './round/RoundActions'
import { useRoundData } from './round/useRoundData'

interface RoundInfoProps {
  groupData: any
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
}: RoundInfoProps) {
  const { spacing } = useAppTheme()
  const { contribute } = useSontineProgram()

  // Use custom hook to get all round data
  const roundData = useRoundData({
    groupData,
    roundNumber,
    isCurrentRound,
  })

  // Handle contribute action
  const handleContribute = () => {
    contribute.mutate(groupData.publicKey?.toString() || '')
  }

  // Handle bid action
  const handleBid = () => {
    // TODO: Implement bidding logic
  }

  return (
    <View>
      {/* Round Header */}
      <SontineCard variant="elevated" padding="md" style={{ marginBottom: showActions ? spacing.md : 0 }}>
        <SontineCardContent>
          <RoundHeader
            displayRoundNumber={roundData.displayRoundNumber}
            totalRounds={roundData.totalRounds}
            cycleDuration={groupData.cycleDuration}
            roundStatus={roundData.roundStatus}
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
            contributorsCount={roundData.contributorsCount}
            expectedContributors={roundData.expectedContributors}
            collectionProgress={roundData.collectionProgress}
            currency={CURRENCY_SYMBOL}
          />
        </SontineCardContent>
      </SontineCard>

      {/* Action Buttons */}
      {showActions && (
        <RoundActions
          isUserMember={isUserMember}
          isCurrentRound={isCurrentRound}
          hasUserContributed={roundData.hasUserContributed}
          isGroupStarted={!!groupData.startedAt}
          isRoundActive={roundData.roundStatus.status === 'Active'}
          isAuctionMethod={!!groupData.selectionMethod.auction}
          contributionAmount={roundData.contributionAmount}
          currency={CURRENCY_SYMBOL}
          onContribute={handleContribute}
          onBid={handleBid}
          isContributing={contribute.isPending}
          contributeError={contribute.error?.message || null}
        />
      )}
    </View>
  )
}
