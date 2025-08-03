import { useMemo } from 'react'
import { useRoundAccount, useMemberAccount, USDC_DECIMALS } from '@/hooks/use-sontine-porgram'
import { useAnchorWallet } from '@/hooks/use-anchor-wallet'
import { useAppTheme } from '@/components/app-theme'

interface UseRoundDataProps {
  groupData: any
  roundNumber?: number
  isCurrentRound: boolean
}

export function useRoundData({ groupData, roundNumber, isCurrentRound }: UseRoundDataProps) {
  const { colors } = useAppTheme()
  const anchorWallet = useAnchorWallet()

  // Calculate round numbers
  const actualRoundNumber = roundNumber !== undefined ? roundNumber : groupData.currentRound
  const displayRoundNumber = actualRoundNumber + 1 // Display as 1-indexed
  const totalRounds = groupData.totalRounds
  const roundProgress = (displayRoundNumber / totalRounds) * 100

  // Get round account data
  const { data: roundData, isLoading: roundLoading } = useRoundAccount(
    groupData.publicKey?.toString() || '',
    actualRoundNumber,
    isCurrentRound
  )

  // Get member account data to check contribution status
  const currentUserAddress = anchorWallet?.publicKey?.toString() || ''
  const { data: memberData } = useMemberAccount(
    groupData.publicKey?.toString() || '',
    currentUserAddress
  )

  // Calculate amounts
  const contributionAmount = groupData.contributionAmount.toNumber() / 10 ** USDC_DECIMALS
  
  const targetAmount = roundData 
    ? roundData.targetAmount.toNumber() / 10 ** USDC_DECIMALS
    : contributionAmount * groupData.currentMembers
  
  const collectedAmount = roundData
    ? roundData.collectedAmount.toNumber() / 10 ** USDC_DECIMALS
    : groupData.totalCollected.toNumber() / 10 ** USDC_DECIMALS

  const collectionProgress = targetAmount > 0 ? (collectedAmount / targetAmount) * 100 : 0

  // Check if current user has contributed to current round
  const hasUserContributed = memberData?.contributedCurrentRound || false

  // Determine round status
  const roundStatus = useMemo(() => {
    if (!isCurrentRound && roundNumber !== undefined) {
      if (roundNumber < groupData.currentRound) {
        return { status: 'Completed', color: colors.primary, icon: 'checkmark.circle.fill' }
      }
      if (roundNumber > groupData.currentRound) {
        return { status: 'Upcoming', color: colors.outline, icon: 'clock' }
      }
    }

    // Current round logic
    if (!groupData.startedAt) {
      return { status: 'Not Started', color: colors.outline, icon: 'clock' }
    }
    if (collectionProgress >= 100) {
      return { status: 'Complete', color: colors.primary, icon: 'checkmark.circle.fill' }
    }
    return { status: 'Active', color: colors.secondary, icon: 'play.circle.fill' }
  }, [isCurrentRound, roundNumber, groupData, collectionProgress, colors])

  // Contributors info
  const contributorsCount = roundData?.contributorsCount || 0
  const expectedContributors = roundData?.expectedContributors || groupData.currentMembers

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
    
    // Loading states
    roundLoading,
    
    // Raw data
    roundData,
    memberData,
    groupData,
  }
}
