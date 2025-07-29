import React from 'react'
import { View, ViewProps } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useAppTheme } from '@/components/app-theme'

export interface GradientBackgroundProps {
  variant?: 'teal-mint' | 'navy-teal' | 'dark-teal' | 'mint-light'
  children?: React.ReactNode
  style?: ViewProps['style']
}

export function GradientBackground({ variant = 'teal-mint', children, style }: GradientBackgroundProps) {
  const { colors } = useAppTheme()

  const getGradientColors = () => {
    switch (variant) {
      case 'teal-mint':
        return [colors.primary, colors.secondary] // #00B49F to #14F1B2
      case 'navy-teal':
        return ['#134158', colors.primary] // Navy to teal
      case 'dark-teal':
        return ['#0E151A', colors.primary] // Dark to teal
      case 'mint-light':
        return [colors.secondary, colors.surfaceVariant] // #14F1B2 to #C5FFF8
      default:
        return [colors.primary, colors.secondary]
    }
  }

  const getGradientDirection = () => {
    // 135 degrees equivalent to { x: 0, y: 0 } to { x: 1, y: 1 }
    return {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    }
  }

  return (
    <LinearGradient colors={getGradientColors()} {...getGradientDirection()} style={[{ flex: 1 }, style]}>
      {children}
    </LinearGradient>
  )
}

// Utility component for gradient overlays
export function GradientOverlay({
  variant = 'teal-mint',
  opacity = 0.1,
  style,
}: GradientBackgroundProps & { opacity?: number }) {
  return (
    <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, style]}>
      <GradientBackground variant={variant} style={{ opacity }} />
    </View>
  )
}
