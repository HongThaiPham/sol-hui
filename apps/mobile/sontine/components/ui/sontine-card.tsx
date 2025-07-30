import React from 'react'
import { Card, CardProps } from 'react-native-paper'
import { StyleProp, ViewStyle } from 'react-native'
import { useAppTheme } from '@/components/app-theme'

export interface SontineCardProps extends CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'primary' | 'accent' | 'mint' | 'navy'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function SontineCard({ variant = 'default', padding = 'md', style, children, ...props }: SontineCardProps) {
  const { paperTheme, colors, spacing, borderRadius, shadows } = useAppTheme()

  const getCardStyle = (): StyleProp<ViewStyle> => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.xl,
      backgroundColor: colors.surface,
    }

    // Apply padding
    if (padding !== 'none') {
      const paddingValue = padding === 'sm' ? spacing.sm : padding === 'md' ? spacing.md : spacing.lg

      baseStyle.padding = paddingValue
    }

    // Apply variant styles
    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          ...shadows.md,
        }
      case 'outlined':
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: colors.outline,
          backgroundColor: colors.surface,
        }
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          ...shadows.sm,
        }
      case 'accent':
        return {
          ...baseStyle,
          backgroundColor: colors.secondary,
          ...shadows.sm,
        }
      case 'mint':
        return {
          ...baseStyle,
          backgroundColor: '#8DFFF0', // Light mint
          ...shadows.sm,
        }
      case 'navy':
        return {
          ...baseStyle,
          backgroundColor: '#134158', // Navy blue
          ...shadows.sm,
        }
      default:
        return {
          ...baseStyle,
          ...shadows.sm,
        }
    }
  }

  return (
    <Card style={[getCardStyle(), style]} theme={paperTheme} {...props}>
      {children}
    </Card>
  )
}

// Card Content Components
export function SontineCardContent({ children, style, ...props }: any) {
  return (
    <Card.Content style={style} {...props}>
      {children}
    </Card.Content>
  )
}

export function SontineCardActions({ children, style, ...props }: any) {
  const { spacing } = useAppTheme()

  return (
    <Card.Actions style={[{ paddingTop: spacing.sm }, style]} {...props}>
      {children}
    </Card.Actions>
  )
}
