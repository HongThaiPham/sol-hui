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

// Sontine Brand Colors - Updated with new palette
const SontineColors = {
  // Primary colors from the new palette
  darkest: '#0E151A', // Darkest navy-black
  dark: '#134158', // Navy blue
  primary: '#00B43F', // Green primary
  accent: '#14F1B2', // Bright mint accent
  light: '#8DFFF0', // Light mint
  lightest: '#C5FFF8', // Lightest mint

  // Semantic colors
  surface: '#FFFFFF', // Clean white
  background: '#FFFFFF', // White background
  backgroundVariant: '#F8FFFE', // Very light mint tint

  // Text colors
  onPrimary: '#FFFFFF', // White text on primary
  onSecondary: '#0E151A', // Dark text on secondary
  onSurface: '#0E151A', // Dark text on surface
  onBackground: '#0E151A', // Dark text on background
  onAccent: '#0E151A', // Dark text on accent

  // Utility colors
  outline: '#E0F2F1', // Light outline
  outlineVariant: '#C5FFF8', // Mint outline
  error: '#DC2626', // Error red
  success: '#00B43F', // Success using primary green
  warning: '#F59E0B', // Warning amber
}

// Custom Sontine Light Theme
const SontineThemeLight = merge(MD3LightTheme, LightTheme, {
  colors: {
    ...MD3LightTheme.colors,
    // Primary colors
    primary: SontineColors.primary,
    onPrimary: SontineColors.onPrimary,
    primaryContainer: SontineColors.lightest,
    onPrimaryContainer: SontineColors.dark,

    // Secondary colors using accent
    secondary: SontineColors.accent,
    onSecondary: SontineColors.onAccent,
    secondaryContainer: SontineColors.light,
    onSecondaryContainer: SontineColors.darkest,

    // Tertiary colors using dark navy
    tertiary: SontineColors.dark,
    onTertiary: SontineColors.onPrimary,
    tertiaryContainer: SontineColors.lightest,
    onTertiaryContainer: SontineColors.darkest,

    // Surface colors
    surface: SontineColors.surface,
    onSurface: SontineColors.onSurface,
    surfaceVariant: SontineColors.lightest,
    onSurfaceVariant: SontineColors.dark,

    // Background colors
    background: SontineColors.background,
    onBackground: SontineColors.onBackground,

    // Outline colors
    outline: SontineColors.outline,
    outlineVariant: SontineColors.outlineVariant,

    // Utility colors
    error: SontineColors.error,
    success: SontineColors.success,
    warning: SontineColors.warning,
  },
})

// Custom Sontine Dark Theme
const SontineThemeDark = merge(MD3DarkTheme, DarkTheme, {
  colors: {
    ...MD3DarkTheme.colors,
    // Primary colors
    primary: SontineColors.accent, // Use bright accent in dark mode
    onPrimary: SontineColors.darkest,
    primaryContainer: SontineColors.dark,
    onPrimaryContainer: SontineColors.light,

    // Secondary colors
    secondary: SontineColors.primary,
    onSecondary: SontineColors.onPrimary,
    secondaryContainer: SontineColors.darkest,
    onSecondaryContainer: SontineColors.accent,

    // Tertiary colors
    tertiary: SontineColors.light,
    onTertiary: SontineColors.darkest,
    tertiaryContainer: SontineColors.dark,
    onTertiaryContainer: SontineColors.lightest,

    // Surface colors for dark theme
    surface: '#1A1A1A',
    onSurface: '#FFFFFF',
    surfaceVariant: '#2A2A2A',
    onSurfaceVariant: SontineColors.light,

    // Background colors for dark theme
    background: SontineColors.darkest,
    onBackground: '#FFFFFF',

    // Outline colors for dark theme
    outline: '#404040',
    outlineVariant: '#2A2A2A',

    // Utility colors
    error: SontineColors.error,
    success: SontineColors.success,
    warning: SontineColors.warning,
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

export type AppTheme = ReturnType<typeof useAppTheme>

export function AppTheme({ children }: PropsWithChildren) {
  const { theme } = useAppTheme()

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </PaperProvider>
  )
}
