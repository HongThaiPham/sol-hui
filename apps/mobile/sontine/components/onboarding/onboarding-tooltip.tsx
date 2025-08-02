import React from 'react'
import { View, Modal, TouchableOpacity, Dimensions } from 'react-native'
import { AppText } from '@/components/app-text'
import { SontineButton } from '@/components/ui/sontine-button'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'
import { AppHeading } from '../ui/typography'

const { width, height } = Dimensions.get('window')

interface OnboardingTooltipProps {
  visible: boolean
  title: string
  description: string
  targetPosition?: {
    x: number
    y: number
    width: number
    height: number
  }
  onNext: () => void
  onSkip: () => void
  showSkip?: boolean
  nextButtonText?: string
}

export function OnboardingTooltip({
  visible,
  title,
  description,
  targetPosition,
  onNext,
  onSkip,
  showSkip = true,
  nextButtonText = 'Got it',
}: OnboardingTooltipProps) {
  const { spacing, colors } = useAppTheme()

  if (!visible) return null

  const tooltipPosition = targetPosition
    ? {
        top: targetPosition.y + targetPosition.height + spacing.md,
        left: Math.max(spacing.md, Math.min(targetPosition.x, width - 300 - spacing.md)),
      }
    : {
        top: height / 2 - 100,
        left: spacing.lg,
      }

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      {/* Overlay */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Highlight target area */}
        {targetPosition && (
          <View
            style={{
              position: 'absolute',
              top: targetPosition.y - 4,
              left: targetPosition.x - 4,
              width: targetPosition.width + 8,
              height: targetPosition.height + 8,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: colors.primary,
              backgroundColor: 'transparent',
            }}
          />
        )}

        {/* Tooltip */}
        <View
          style={{
            position: 'absolute',
            ...tooltipPosition,
            maxWidth: width - spacing.lg * 2,
            zIndex: 1000,
          }}
        >
          <SontineCard variant="elevated">
            <SontineCardContent style={{ padding: spacing.lg }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: spacing.md,
                }}
              >
                <UiIconSymbol
                  name="lightbulb.fill"
                  size={20}
                  color={colors.primary}
                  style={{ marginRight: spacing.sm }}
                />
                <AppHeading
                  variant="titleSmall"
                  style={{
                    color: colors.onSurface,
                    flex: 1,
                  }}
                >
                  {title}
                </AppHeading>
                {showSkip && (
                  <TouchableOpacity onPress={onSkip}>
                    <UiIconSymbol
                      name="xmark.circle.fill"
                      size={20}
                      color={colors.onSurface}
                      style={{ opacity: 0.5 }}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  opacity: 0.8,
                  marginBottom: spacing.lg,
                  lineHeight: 20,
                }}
              >
                {description}
              </AppText>

              <SontineButton variant="primary" onPress={onNext} style={{ width: '100%' }}>
                {nextButtonText}
              </SontineButton>
            </SontineCardContent>
          </SontineCard>

          {/* Arrow pointing to target */}
          {targetPosition && (
            <View
              style={{
                position: 'absolute',
                top: -8,
                left: Math.min(100, (width - spacing.lg * 2) / 2 - 8),
                width: 0,
                height: 0,
                borderLeftWidth: 8,
                borderRightWidth: 8,
                borderBottomWidth: 8,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: colors.surface,
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  )
}
