import {
  DarkTheme as reactNavigationDark,
  DefaultTheme as reactNavigationLight,
  ThemeProvider,
} from '@react-navigation/native'
import { PropsWithChildren } from 'react'
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper'
import { useColorScheme } from '@/hooks/use-color-scheme'
import merge from 'deepmerge'

const { LightTheme, DarkTheme } = adaptNavigationTheme({ reactNavigationLight, reactNavigationDark })

// Sontine Brand Colors
const SontineColors = {
  primary: '#00B49F', // Main teal
  primaryLight: '#14F1B2', // Bright teal
  primaryDark: '#134158', // Navy blue
  secondary: '#14F1B2', // Bright teal accent
  tertiary: '#134158', // Navy blue
  surface: '#FFFFFF', // Clean white
  surfaceVariant: '#C5FFF8', // Light mint
  background: '#FFFFFF', // White background
  backgroundVariant: '#F8FFFE', // Very light mint
  onPrimary: '#FFFFFF', // White text on primary
  onSecondary: '#000000', // Black text on secondary
  onSurface: '#0E151A', // Dark text on surface
  onBackground: '#0E151A', // Dark text on background
  outline: '#E0F2F1', // Light outline
  outlineVariant: '#C5FFF8', // Mint outline
  error: '#DC2626', // Error red
  success: '#10B981', // Success green
  warning: '#F59E0B', // Warning amber
}

// Custom Sontine Light Theme
const SontineThemeLight = merge(MD3LightTheme, LightTheme, {
  colors: {
    ...MD3LightTheme.colors,
    ...SontineColors,
    primary: SontineColors.primary,
    onPrimary: SontineColors.onPrimary,
    primaryContainer: SontineColors.surfaceVariant,
    onPrimaryContainer: SontineColors.primaryDark,
    secondary: SontineColors.secondary,
    onSecondary: SontineColors.onSecondary,
    secondaryContainer: SontineColors.backgroundVariant,
    onSecondaryContainer: SontineColors.primaryDark,
    tertiary: SontineColors.tertiary,
    onTertiary: SontineColors.onPrimary,
    surface: SontineColors.surface,
    onSurface: SontineColors.onSurface,
    surfaceVariant: SontineColors.surfaceVariant,
    onSurfaceVariant: SontineColors.primaryDark,
    background: SontineColors.background,
    onBackground: SontineColors.onBackground,
    outline: SontineColors.outline,
    outlineVariant: SontineColors.outlineVariant,
    error: SontineColors.error,
  },
})

// Custom Sontine Dark Theme
const SontineThemeDark = merge(MD3DarkTheme, DarkTheme, {
  colors: {
    ...MD3DarkTheme.colors,
    primary: SontineColors.primary,
    onPrimary: SontineColors.onPrimary,
    primaryContainer: SontineColors.primaryDark,
    onPrimaryContainer: SontineColors.surfaceVariant,
    secondary: SontineColors.secondary,
    onSecondary: SontineColors.onSecondary,
    tertiary: SontineColors.tertiary,
    surface: '#1A1A1A',
    onSurface: '#FFFFFF',
    surfaceVariant: '#2A2A2A',
    background: '#121212',
    onBackground: '#FFFFFF',
    outline: '#404040',
    error: SontineColors.error,
  },
})

export function useAppTheme() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const theme = isDark ? SontineThemeDark : SontineThemeLight
  return {
    colorScheme,
    isDark,
    theme,
    colors: theme.colors,
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      xxl: 24,
    },
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
      },
    },
  }
}

export function AppTheme({ children }: PropsWithChildren) {
  const { theme } = useAppTheme()

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </PaperProvider>
  )
}
