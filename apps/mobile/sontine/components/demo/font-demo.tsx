import React from 'react'
import { View, StyleSheet, Text as NativeText } from 'react-native'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { useAppTheme, type AppTheme } from '@/components/app-theme'

const getStyles = ({ spacing, colors }: AppTheme) => StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
  pixeloidFont: {
    fontFamily: 'PixeloidMono-Regular',
  },
  spaceMonoFont: {
    fontFamily: 'SpaceMono-Regular',
  },
})

export function FontDemo() {
  const theme = useAppTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme])

  const sampleText = "The quick brown fox jumps over the lazy dog"
  const numbersText = "0123456789 !@#$%^&*()"

  return (
    <View style={styles.container}>
      <AppText variant="headlineMedium" style={styles.sectionTitle}>
        Font Demo
      </AppText>

      <SontineCard variant="elevated" padding="md">
        <SontineCardContent>
          <AppText variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Font Comparison
          </AppText>

          {/* System Font */}
          <View style={styles.fontSample}>
            <AppText variant="bodySmall" style={styles.fontLabel}>
              System Font (Default)
            </AppText>
            <NativeText style={[styles.fontText, styles.systemFont]}>
              {sampleText}
            </NativeText>
            <NativeText style={[styles.fontText, styles.systemFont]}>
              {numbersText}
            </NativeText>
          </View>

          {/* PixeloidMono Font */}
          <View style={styles.fontSample}>
            <AppText variant="bodySmall" style={styles.fontLabel}>
              PixeloidMono-Regular (Primary)
            </AppText>
            <NativeText style={[styles.fontText, styles.pixeloidFont]}>
              {sampleText}
            </NativeText>
            <NativeText style={[styles.fontText, styles.pixeloidFont]}>
              {numbersText}
            </NativeText>
          </View>

          {/* SpaceMono Font */}
          <View style={styles.fontSample}>
            <AppText variant="bodySmall" style={styles.fontLabel}>
              SpaceMono-Regular (Mono)
            </AppText>
            <NativeText style={[styles.fontText, styles.spaceMonoFont]}>
              {sampleText}
            </NativeText>
            <NativeText style={[styles.fontText, styles.spaceMonoFont]}>
              {numbersText}
            </NativeText>
          </View>
        </SontineCardContent>
      </SontineCard>

      <SontineCard variant="primary" padding="md">
        <SontineCardContent>
          <AppText variant="titleMedium" style={{ color: '#FFFFFF', marginBottom: theme.spacing.md }}>
            AppText Component (Using PixeloidMono)
          </AppText>
          
          <AppText variant="headlineSmall" style={{ color: '#FFFFFF', marginBottom: theme.spacing.sm }}>
            Headline: {theme.fontsLoaded ? 'Font Loaded ✓' : 'Loading...'}
          </AppText>
          
          <AppText variant="bodyLarge" style={{ color: '#FFFFFF', marginBottom: theme.spacing.sm }}>
            Body Large: This is using the PixeloidMono font
          </AppText>
          
          <AppText variant="bodyMedium" style={{ color: '#FFFFFF', marginBottom: theme.spacing.sm }}>
            Body Medium: Perfect for UI text and descriptions
          </AppText>
          
          <AppText variant="bodySmall" style={{ color: '#FFFFFF' }}>
            Body Small: Great for captions and labels
          </AppText>
        </SontineCardContent>
      </SontineCard>
    </View>
  )
}
