import React from 'react'
import { TextInput, TextInputProps, HelperText } from 'react-native-paper'
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { useAppTheme } from '@/components/app-theme'

export interface SontineInputProps extends TextInputProps {
  variant?: 'outlined' | 'flat'
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  helperText?: string
  containerStyle?: StyleProp<ViewStyle>
}

export function SontineInput({
  variant = 'outlined',
  size = 'md',
  error = false,
  helperText,
  containerStyle,
  style,
  ...props
}: SontineInputProps) {
  const { paperTheme, colors, spacing, borderRadius } = useAppTheme()

  const getInputStyle = (): StyleProp<TextStyle> => {
    const baseStyle: TextStyle = {
      backgroundColor: variant === 'flat' ? colors.surfaceVariant : 'transparent',
    }

    return baseStyle
  }

  const getInputHeight = () => {
    switch (size) {
      case 'sm':
        return 40
      case 'lg':
        return 56
      default:
        return 48
    }
  }

  return (
    <View style={containerStyle}>
      <TextInput
        mode={variant}
        error={error}
        style={[getInputStyle(), style]}
        theme={{
          ...paperTheme,
          colors: {
            ...paperTheme.colors,
            primary: colors.primary,
            outline: error ? colors.error : colors.outline,
            onSurfaceVariant: colors.onSurface,
          },
        }}
        contentStyle={{
          height: getInputHeight(),
        }}
        outlineStyle={{
          borderRadius: borderRadius.lg,
          borderWidth: 1,
        }}
        {...props}
      />
      {helperText && (
        <HelperText type={error ? 'error' : 'info'} visible={!!helperText} style={{ marginLeft: spacing.xs }}>
          {helperText}
        </HelperText>
      )}
    </View>
  )
}
