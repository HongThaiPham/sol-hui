import React from 'react'
import { Button, ButtonProps } from 'react-native-paper'
import { StyleProp, ViewStyle } from 'react-native'
import { useAppTheme } from '@/components/app-theme'

export interface SontineButtonProps extends Omit<ButtonProps, 'mode'> {
  variant?: 'primary' | 'accent' | 'navy' | 'mint' | 'outline' | 'ghost'
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
  const { paperTheme, colors, spacing, borderRadius, fontFamily, fontsLoaded } = useAppTheme()

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
      case 'accent':
        return {
          ...baseStyle,
          backgroundColor: colors.secondary, // Bright mint accent
        }
      case 'navy':
        return {
          ...baseStyle,
          backgroundColor: '#134158', // Navy blue
        }
      case 'mint':
        return {
          ...baseStyle,
          backgroundColor: '#8DFFF0', // Light mint
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
      default:
        return baseStyle
    }
  }

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'navy':
        return colors.onPrimary
      case 'accent':
      case 'mint':
        return '#0E151A' // Dark text on light backgrounds
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
      case 'accent':
      case 'navy':
      case 'mint':
        return 'contained'
      case 'outline':
        return 'outlined'
      case 'ghost':
        return 'text'
      default:
        return 'contained'
    }
  }

  const getLabelStyle = () => {
    if (!fontsLoaded) return {}

    return {
      fontFamily: fontFamily.primary, // Sử dụng PixeloidSans-Regular cho button text
      fontSize: size === 'sm' ? 14 : size === 'md' ? 16 : 18,
    }
  }

  return (
    <Button
      mode={getMode()}
      style={[getButtonStyle(), style]}
      textColor={getTextColor()}
      labelStyle={getLabelStyle()}
      theme={paperTheme}
      {...props}
    >
      {children}
    </Button>
  )
}
