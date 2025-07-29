import React from 'react'
import { Button, ButtonProps } from 'react-native-paper'
import { StyleProp, ViewStyle } from 'react-native'
import { useAppTheme } from '@/components/app-theme'

export interface SontineButtonProps extends Omit<ButtonProps, 'mode'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export function SontineButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  style,
  children,
  ...props
}: SontineButtonProps) {
  const { theme, colors, spacing, borderRadius } = useAppTheme()

  const getButtonStyle = (): StyleProp<ViewStyle> => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.lg,
      minHeight: size === 'sm' ? 36 : size === 'md' ? 44 : 52,
      paddingHorizontal: size === 'sm' ? spacing.md : size === 'md' ? spacing.lg : spacing.xl,
    }

    if (fullWidth) {
      baseStyle.width = '100%'
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
        }
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.secondary,
        }
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.primary,
        }
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        }
      case 'gradient':
        return {
          ...baseStyle,
          backgroundColor: colors.primary, // Fallback, gradient will be handled separately
        }
      default:
        return baseStyle
    }
  }

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'gradient':
        return colors.onPrimary
      case 'outline':
      case 'ghost':
        return colors.primary
      default:
        return colors.onPrimary
    }
  }

  const getMode = (): ButtonProps['mode'] => {
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'gradient':
        return 'contained'
      case 'outline':
        return 'outlined'
      case 'ghost':
        return 'text'
      default:
        return 'contained'
    }
  }

  return (
    <Button
      mode={getMode()}
      style={[getButtonStyle(), style]}
      textColor={getTextColor()}
      theme={theme}
      {...props}
    >
      {children}
    </Button>
  )
}
