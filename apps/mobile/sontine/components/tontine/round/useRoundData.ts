import { useMemo } from 'react'
import { useRoundAccount, useMemberAccount, USDC_DECIMALS, useGetGroup } from '@/hooks/use-sontine-porgram'
import { useAnchorWallet } from '@/hooks/use-anchor-wallet'
import { useAppTheme } from '@/components/app-theme'

interface UseRoundDataProps {
  groupAddress: string
  groupData: Awaited<ReturnType<typeof useGetGroup>>['data']
  roundNumber?: number
  isCurrentRound: boolean
}

export function useRoundData({ groupAddress, groupData, roundNumber, isCurrentRound }: UseRoundDataProps) {
  const { colors } = useAppTheme()
  const anchorWallet = useAnchorWallet()

  // Calculate round numbers
  const actualRoundNumber = roundNumber ?? (groupData?.currentRound || 0)

  console.log('actualRoundNumber', groupData?.currentRound)
  const displayRoundNumber = actualRoundNumber + 1 // Display as 1-indexed
  const totalRounds = groupData?.totalRounds || 0
  const roundProgress = (displayRoundNumber / totalRounds) * 100

  // Get round account data
  const { data: roundData, isLoading: roundLoading } = useRoundAccount(groupAddress, actualRoundNumber, isCurrentRound)
  console.log('roundData', roundData)

  // Get member account data to check contribution status
  const currentUserAddress = anchorWallet?.publicKey?.toString() || ''
  const { data: memberData } = useMemberAccount(groupAddress, currentUserAddress)
  console.log('memberData', memberData, groupData?.currentRound, actualRoundNumber)

  // Calculate amounts
  const contributionAmount = Number(groupData?.contributionAmount / 10 ** USDC_DECIMALS)

  const targetAmount = roundData
    ? roundData.targetAmount.toNumber() / 10 ** USDC_DECIMALS
    : contributionAmount * (groupData?.currentMembers || 0)

  const collectedAmount = roundData
    ? Number(roundData.collectedAmount / 10 ** USDC_DECIMALS)
    : Number(groupData?.totalCollected / 10 ** USDC_DECIMALS)

  const collectionProgress = targetAmount > 0 ? (collectedAmount / targetAmount) * 100 : 0

  // Check if current user has contributed to current round
  const hasUserContributed =
    (groupData?.currentRound === actualRoundNumber && memberData?.contributedCurrentRound) || false

  // Determine round status
  const roundStatus = useMemo(() => {
    if (!isCurrentRound && roundNumber !== undefined) {
      if (roundNumber < (groupData?.currentRound || 0)) {
        return { status: 'Completed', color: colors.primary, icon: 'check-circle' }
      }
      if (roundNumber > (groupData?.currentRound || 0)) {
        return { status: 'Upcoming', color: colors.outline, icon: 'punch-clock' }
      }
    }

    // Current round logic
    if (!groupData?.startedAt) {
      return { status: 'Not Started', color: colors.outline, icon: 'punch-clock' }
    }
    if (collectionProgress >= 100) {
      return { status: 'Complete', color: colors.primary, icon: 'check-circle' }
    }
    return { status: 'Active', color: colors.secondary, icon: 'play-circle-fill' }
  }, [isCurrentRound, roundNumber, groupData, collectionProgress, colors])

  // Contributors info
  const contributorsCount = roundData?.contributorsCount || 0
  const expectedContributors = roundData?.expectedContributors || groupData?.currentMembers || 0

  // Check if round is completed and ready for winner selection
  const isRoundCompleted = useMemo(() => {
    if (!roundData || !contributorsCount || contributorsCount < expectedContributors) return false

    const now = Date.now() / 1000 // Current time in seconds
    const endTime = Number(roundData.endTime)

    // Round is completed if:
    // 1. All expected contributors have contributed, OR
    // 2. Time has passed endTime AND at least one person has contributed
    return contributorsCount >= (expectedContributors || 0) || (now >= endTime && contributorsCount > 0)
  }, [roundData, isCurrentRound, contributorsCount, expectedContributors])

  // Check if winner can be selected (round completed and no winner selected yet)
  const canSelectWinner = useMemo(() => {
    if (!roundData || !isRoundCompleted) return false

    // Can select winner if round is completed and no winner has been selected yet
    return !roundData.selectedMember && !roundData.finalized
  }, [roundData, isRoundCompleted])

  // Check if funds can be distributed (winner selected but funds not distributed yet)
  const canDistributeFunds = useMemo(() => {
    if (!roundData || !isCurrentRound) return false

    // Can distribute funds if:
    // 1. Winner has been selected
    // 2. Funds haven't been distributed yet (distributedAmount is 0)
    // 3. Round is not finalized yet
    return !!roundData.selectedMember && Number(roundData.distributedAmount) === 0 && !roundData.finalized
  }, [roundData, isCurrentRound])

  // Check if funds have been distributed
  const fundsDistributed = useMemo(() => {
    if (!roundData) return false
    return Number(roundData.distributedAmount) > 0
  }, [roundData])

  const walletIsWinner = useMemo(() => {
    if (!roundData || !currentUserAddress) return false
    return roundData.selectedMember?.toString() === currentUserAddress
  }, [roundData, currentUserAddress])

  return {
    // Round info
    displayRoundNumber,
    totalRounds,
    roundProgress,
    roundStatus,

    // Amounts
    contributionAmount,
    targetAmount,
    collectedAmount,
    collectionProgress,

    // Contributors
    contributorsCount,
    expectedContributors,

    // User status
    hasUserContributed,

    // Round completion status
    isRoundCompleted,
    canSelectWinner,
    canDistributeFunds,
    fundsDistributed,

    // Loading states
    roundLoading,

    // Raw data
    roundData,
    memberData,
    groupData,
    walletIsWinner,
  }
}
