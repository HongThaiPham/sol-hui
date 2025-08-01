import React from 'react'
import { View, ViewProps } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useAppTheme } from '@/components/app-theme'

export interface GradientBackgroundProps {
  variant?: 'primary-accent' | 'navy-primary' | 'dark-primary' | 'accent-light' | 'full-spectrum' | 'subtle-mint'
  children?: React.ReactNode
  style?: ViewProps['style']
}

export function GradientBackground({ variant = 'primary-accent', children, style }: GradientBackgroundProps) {
  const { colors } = useAppTheme()

  const getGradientColors = () => {
    switch (variant) {
      case 'primary-accent':
        return [colors.primary, colors.secondary] // Green to bright mint
      case 'navy-primary':
        return ['#134158', colors.primary] // Navy to green
      case 'dark-primary':
        return ['#0E151A', colors.primary] // Darkest to green
      case 'accent-light':
        return [colors.secondary, '#8DFFF0'] // Bright mint to light mint
      case 'full-spectrum':
        return ['#0E151A', '#134158', colors.primary, colors.secondary, '#8DFFF0'] // Full gradient
      case 'subtle-mint':
        return ['#8DFFF0', '#C5FFF8'] // Light mint to lightest mint
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
