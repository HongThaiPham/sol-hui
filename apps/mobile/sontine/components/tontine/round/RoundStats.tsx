import React from 'react'
import { View } from 'react-native'
import { AppText } from '@/components/app-text'
import { useAppTheme } from '@/components/app-theme'

interface StatItemProps {
  value: string
  label: string
}

function StatItem({ value, label }: StatItemProps) {
  const { spacing, colors } = useAppTheme()

  return (
    <View style={{ alignItems: 'center' }}>
      <AppText
        variant="titleMedium"
        style={{
          color: colors.onSurface,
        }}
      >
        {value}
      </AppText>
      <AppText
        variant="bodySmall"
        style={{
          color: colors.onSurface,
          opacity: 0.7,
        }}
      >
        {label}
      </AppText>
    </View>
  )
}

interface RoundStatsProps {
  contributionAmount: number
  contributorsCount: number
  expectedContributors: number
  collectionProgress: number
  currency: string
}

export function RoundStats({
  contributionAmount,
  contributorsCount,
  expectedContributors,
  collectionProgress,
  currency,
}: RoundStatsProps) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <StatItem value={`${contributionAmount.toFixed(2)} ${currency}`} label="Per Member" />

      <StatItem value={`${contributorsCount}/${expectedContributors}`} label="Contributors" />

      <StatItem value={`${Math.round(collectionProgress)}%`} label="Collected" />
    </View>
  )
}
