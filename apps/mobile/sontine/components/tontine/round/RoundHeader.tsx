import React from 'react'
import { View } from 'react-native'
import { AppText } from '@/components/app-text'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

interface RoundStatus {
  status: string
  color: string
  icon: string
}

interface RoundHeaderProps {
  displayRoundNumber: number
  totalRounds: number
  cycleDuration: any
  roundStatus: RoundStatus
  isUserMember: boolean
  isCurrentRound: boolean
  hasUserContributed: boolean
}

export function RoundHeader({
  displayRoundNumber,
  totalRounds,
  cycleDuration,
  roundStatus,
  isUserMember,
  isCurrentRound,
  hasUserContributed,
}: RoundHeaderProps) {
  const { spacing, colors } = useAppTheme()
  const shouldShowContributedMessage = isUserMember && isCurrentRound && hasUserContributed

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
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}
    >
      <View>
        <AppText
          variant="titleMedium"
          style={{
            color: colors.onSurface,
          }}
        >
          Round {displayRoundNumber} of {totalRounds}
        </AppText>
        <AppText
          variant="bodyMedium"
          style={{
            color: colors.onSurface,
            opacity: 0.7,
            marginTop: spacing.xs,
          }}
        >
          {formatCycleDuration(cycleDuration)} cycle
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
          variant="bodySmall"
          style={{
            color: roundStatus.color,
            fontWeight: '600',
          }}
        >
          {shouldShowContributedMessage ? 'Contributed' : roundStatus.status}
        </AppText>
      </View>
    </View>
  )
}
