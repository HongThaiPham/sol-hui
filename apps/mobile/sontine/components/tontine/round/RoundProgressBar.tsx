import React from 'react'
import { View } from 'react-native'
import { AppText } from '@/components/app-text'
import { useAppTheme } from '@/components/app-theme'

interface RoundProgressBarProps {
  title: string
  progress: number
  progressColor: string
  subtitle?: string
  height?: number
}

export function RoundProgressBar({ 
  title, 
  progress, 
  progressColor, 
  subtitle, 
  height = 8 
}: RoundProgressBarProps) {
  const { spacing, colors } = useAppTheme()

  return (
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
          {title}
        </AppText>
        <AppText
          variant="bodyMedium"
          style={{
            color: colors.onSurface,
            fontWeight: '600',
          }}
        >
          {subtitle || `${Math.round(progress)}%`}
        </AppText>
      </View>

      <View
        style={{
          height,
          backgroundColor: colors.outline,
          borderRadius: height / 2,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${Math.min(progress, 100)}%`,
            backgroundColor: progressColor,
          }}
        />
      </View>
    </View>
  )
}
