import React from 'react'
import { View, ScrollView } from 'react-native'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineButton } from '@/components/ui/sontine-button'
import { GradientBackground } from '@/components/ui/gradient-background'
import { useAppTheme } from '@/components/app-theme'

export function ColorPaletteDemo() {
  const { spacing, colors } = useAppTheme()

  const colorPalette = [
    { name: 'Darkest', color: '#0E151A', textColor: '#FFFFFF' },
    { name: 'Navy', color: '#134158', textColor: '#FFFFFF' },
    { name: 'Primary Green', color: '#00B43F', textColor: '#FFFFFF' },
    { name: 'Bright Mint', color: '#14F1B2', textColor: '#0E151A' },
    { name: 'Light Mint', color: '#8DFFF0', textColor: '#0E151A' },
    { name: 'Lightest Mint', color: '#C5FFF8', textColor: '#0E151A' },
  ]

  const gradientVariants = [
    'primary-accent',
    'navy-primary',
    'dark-primary',
    'accent-light',
    'full-spectrum',
    'subtle-mint',
  ]

  const buttonVariants = ['primary', 'accent', 'navy', 'mint', 'outline', 'ghost']
  const cardVariants = ['default', 'elevated', 'outlined', 'primary', 'accent', 'mint', 'navy']

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: spacing.md }}>
      <AppText variant="headlineMedium" style={{ 
        marginBottom: spacing.lg,
        color: colors.onSurface,
        fontWeight: 'bold',
      }}>
        New Color Palette
      </AppText>

      {/* Color Swatches */}
      <View style={{ marginBottom: spacing.xl }}>
        <AppText variant="titleMedium" style={{ 
          marginBottom: spacing.md,
          color: colors.onSurface,
          fontWeight: 'bold',
        }}>
          Color Swatches
        </AppText>
        
        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap',
          gap: spacing.sm,
        }}>
          {colorPalette.map((item, index) => (
            <View key={index} style={{ width: '48%' }}>
              <View style={{
                backgroundColor: item.color,
                padding: spacing.md,
                borderRadius: 12,
                alignItems: 'center',
                minHeight: 80,
                justifyContent: 'center',
              }}>
                <AppText variant="bodyMedium" style={{ 
                  color: item.textColor,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                  {item.name}
                </AppText>
                <AppText variant="bodySmall" style={{ 
                  color: item.textColor,
                  opacity: 0.8,
                  textAlign: 'center',
                  marginTop: spacing.xs,
                }}>
                  {item.color}
                </AppText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Gradient Backgrounds */}
      <View style={{ marginBottom: spacing.xl }}>
        <AppText variant="titleMedium" style={{ 
          marginBottom: spacing.md,
          color: colors.onSurface,
          fontWeight: 'bold',
        }}>
          Gradient Backgrounds
        </AppText>
        
        <View style={{ gap: spacing.sm }}>
          {gradientVariants.map((variant, index) => (
            <View key={index} style={{ height: 80, borderRadius: 12, overflow: 'hidden' }}>
              <GradientBackground variant={variant as any}>
                <View style={{ 
                  flex: 1, 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  paddingHorizontal: spacing.md,
                }}>
                  <AppText variant="titleSmall" style={{ 
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                    {variant}
                  </AppText>
                </View>
              </GradientBackground>
            </View>
          ))}
        </View>
      </View>

      {/* Button Variants */}
      <View style={{ marginBottom: spacing.xl }}>
        <AppText variant="titleMedium" style={{ 
          marginBottom: spacing.md,
          color: colors.onSurface,
          fontWeight: 'bold',
        }}>
          Button Variants
        </AppText>
        
        <View style={{ gap: spacing.sm }}>
          {buttonVariants.map((variant, index) => (
            <SontineButton
              key={index}
              variant={variant as any}
              size="md"
              fullWidth
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)} Button
            </SontineButton>
          ))}
        </View>
      </View>

      {/* Card Variants */}
      <View style={{ marginBottom: spacing.xl }}>
        <AppText variant="titleMedium" style={{ 
          marginBottom: spacing.md,
          color: colors.onSurface,
          fontWeight: 'bold',
        }}>
          Card Variants
        </AppText>
        
        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap',
          gap: spacing.sm,
        }}>
          {cardVariants.map((variant, index) => (
            <View key={index} style={{ width: '48%' }}>
              <SontineCard variant={variant as any} padding="md">
                <SontineCardContent>
                  <AppText variant="bodyMedium" style={{ 
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </AppText>
                  <AppText variant="bodySmall" style={{ 
                    opacity: 0.7,
                    textAlign: 'center',
                    marginTop: spacing.xs,
                  }}>
                    Card variant
                  </AppText>
                </SontineCardContent>
              </SontineCard>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
