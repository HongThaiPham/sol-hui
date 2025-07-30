import { Text, TextProps } from 'react-native-paper'
import { Text as NativeText } from 'react-native'
import { useAppTheme } from './app-theme'

export interface AppTextProps extends TextProps<NativeText> {
  fontType?: 'sans' | 'mono' | 'auto' // Cho phép override font type
  numeric?: boolean // Đánh dấu text chứa số/data
}

export function AppText({ variant, style, fontType = 'auto', numeric = false, ...rest }: AppTextProps) {
  const { fontFamily, fontsLoaded } = useAppTheme()

  // Logic thông minh để chọn font
  const getFontFamily = () => {
    if (!fontsLoaded) return {}

    // Override manual
    if (fontType === 'mono') return { fontFamily: fontFamily.mono }
    if (fontType === 'sans') {
      // Chọn bold hoặc regular dựa trên variant
      const isBoldVariant = variant?.includes('display') || variant?.includes('headline') || variant?.includes('title')
      return { fontFamily: isBoldVariant ? fontFamily.bold : fontFamily.primary }
    }

    // Auto selection logic
    if (fontType === 'auto') {
      // Sử dụng mono cho:
      // - Text có numeric flag
      // - Label variants (thường chứa numbers/codes)
      // - Text chứa nhiều số
      if (numeric || variant?.includes('label')) {
        return { fontFamily: fontFamily.mono }
      }

      // Sử dụng Sans Bold cho headings
      if (variant?.includes('display') || variant?.includes('headline') || variant?.includes('title')) {
        return { fontFamily: fontFamily.bold }
      }

      // Mặc định Sans Regular cho body text
      return { fontFamily: fontFamily.primary }
    }

    return { fontFamily: fontFamily.primary }
  }

  return <Text variant={variant} style={[getFontFamily(), style]} {...rest} />
}
