import React from 'react'
import { View, StyleSheet, Text as NativeText } from 'react-native'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { useAppTheme, type AppTheme } from '@/components/app-theme'

const getStyles = ({ spacing, colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: spacing.md,
      gap: spacing.lg,
    },
    sectionTitle: {
      fontSize: 20,

      color: colors.onSurface,
      marginBottom: spacing.md,
    },
    fontSample: {
      marginBottom: spacing.sm,
    },
    fontLabel: {
      fontSize: 12,
      color: colors.onSurface,
      opacity: 0.7,
      marginBottom: spacing.xs,
    },
    fontText: {
      fontSize: 16,
      color: colors.onSurface,
    },
    systemFont: {
      fontFamily: 'System',
    },
    pixeloidSansRegular: {
      fontFamily: 'PixeloidSans-Regular',
    },
    pixeloidSansBold: {
      fontFamily: 'PixeloidSans-Bold',
    },
    pixeloidMono: {
      fontFamily: 'PixeloidMono-Regular',
    },
  })

export function FontDemo() {
  const theme = useAppTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme])

  const sampleText = 'The quick brown fox jumps over the lazy dog'
  const numbersText = '0123456789 !@#$%^&*()'

  return (
    <View style={styles.container}>
      <AppText variant="headlineMedium" style={styles.sectionTitle}>
        Font Demo
      </AppText>

      <SontineCard variant="elevated" padding="md">
        <SontineCardContent>
          <AppText variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Font Family Showcase
          </AppText>

          {/* System Font */}
          <View style={styles.fontSample}>
            <AppText variant="bodySmall" style={styles.fontLabel}>
              System Font (Default)
            </AppText>
            <NativeText style={[styles.fontText, styles.systemFont]}>{sampleText}</NativeText>
            <NativeText style={[styles.fontText, styles.systemFont]}>{numbersText}</NativeText>
          </View>

          {/* PixeloidSans Regular */}
          <View style={styles.fontSample}>
            <AppText variant="bodySmall" style={styles.fontLabel}>
              PixeloidSans-Regular (Primary Font)
            </AppText>
            <NativeText style={[styles.fontText, styles.pixeloidSansRegular]}>{sampleText}</NativeText>
            <NativeText style={[styles.fontText, styles.pixeloidSansRegular]}>{numbersText}</NativeText>
          </View>

          {/* PixeloidSans Bold */}
          <View style={styles.fontSample}>
            <AppText variant="bodySmall" style={styles.fontLabel}>
              PixeloidSans-Bold (Headings)
            </AppText>
            <NativeText style={[styles.fontText, styles.pixeloidSansBold]}>{sampleText}</NativeText>
            <NativeText style={[styles.fontText, styles.pixeloidSansBold]}>{numbersText}</NativeText>
          </View>

          {/* PixeloidMono */}
          <View style={styles.fontSample}>
            <AppText variant="bodySmall" style={styles.fontLabel}>
              PixeloidMono-Regular (Code/Numbers)
            </AppText>
            <NativeText style={[styles.fontText, styles.pixeloidMono]}>{sampleText}</NativeText>
            <NativeText style={[styles.fontText, styles.pixeloidMono]}>{numbersText}</NativeText>
          </View>
        </SontineCardContent>
      </SontineCard>

      <SontineCard variant="primary" padding="md">
        <SontineCardContent>
          <AppText variant="titleMedium" style={{ color: '#FFFFFF', marginBottom: theme.spacing.md }}>
            AppText Component (Smart Font Selection)
          </AppText>

          <AppText variant="displaySmall" style={{ color: '#FFFFFF', marginBottom: theme.spacing.sm }}>
            Display: Uses PixeloidSans-Bold
          </AppText>

          <AppText variant="headlineSmall" style={{ color: '#FFFFFF', marginBottom: theme.spacing.sm }}>
            Headline: Uses PixeloidSans-Bold
          </AppText>

          <AppText variant="titleLarge" style={{ color: '#FFFFFF', marginBottom: theme.spacing.sm }}>
            Title: Uses PixeloidSans-Bold
          </AppText>

          <AppText variant="bodyLarge" style={{ color: '#FFFFFF', marginBottom: theme.spacing.sm }}>
            Body Large: Uses PixeloidSans-Regular
          </AppText>

          <AppText variant="bodyMedium" style={{ color: '#FFFFFF', marginBottom: theme.spacing.sm }}>
            Body Medium: Uses PixeloidSans-Regular
          </AppText>

          <AppText variant="labelLarge" style={{ color: '#FFFFFF' }}>
            Label: Uses PixeloidMono-Regular (for numbers/code)
          </AppText>
        </SontineCardContent>
      </SontineCard>
    </View>
  )
}
