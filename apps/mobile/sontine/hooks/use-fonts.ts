import { useFonts } from 'expo-font'

export function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'PixeloidMono-Regular': require('../assets/fonts/PixeloidMono-Regular.ttf'),
    'PixeloidSans-Regular': require('../assets/fonts/PixeloidSans-Regular.ttf'),
    'PixeloidSans-Bold': require('../assets/fonts/PixeloidSans-Bold.ttf'),
  })

  return {
    fontsLoaded,
    fontFamily: {
      primary: 'PixeloidSans-Regular', // Sử dụng Sans Regular làm primary
      bold: 'PixeloidSans-Bold', // Sans Bold cho headings
      mono: 'PixeloidMono-Regular', // Mono cho code/numbers
    },
  }
}
