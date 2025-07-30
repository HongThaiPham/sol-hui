import { Text, TextProps } from 'react-native-paper'
import { Text as NativeText } from 'react-native'
import { useAppTheme } from './app-theme'

export function AppText({ style, ...rest }: TextProps<NativeText>) {
  const { fontFamily, fontsLoaded } = useAppTheme()

  // Fallback to system font if custom font is not loaded
  const fontFamilyStyle = fontsLoaded ? { fontFamily: fontFamily.primary } : {}

  return <Text style={[fontFamilyStyle, style]} {...rest} />
}
