import { useFonts } from 'expo-font'

export function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'PixeloidMono-Regular': require('../assets/fonts/PixeloidMono-Regular.ttf'),
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  return {
    fontsLoaded,
    fontFamily: {
      primary: 'PixeloidMono-Regular',
      mono: 'SpaceMono-Regular',
    },
  }
}
