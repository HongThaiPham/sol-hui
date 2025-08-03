import React, { useRef, useEffect } from 'react'
import { View, Dimensions, Animated, ScrollView } from 'react-native'
import { AppText } from '@/components/app-text'
import { AppHeading } from '@/components/ui/typography'
import { SontineButton } from '@/components/ui/sontine-button'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

const { width } = Dimensions.get('window')

interface OnboardingStep {
  id: number
  title: string
  description: string
  icon: string
  iconColor: string
  action?: {
    label: string
    onPress: () => void
  }
}

interface OnboardingSliderProps {
  steps: OnboardingStep[]
  currentStep: number
  onStepChange: (step: number) => void
}

export function OnboardingSlider({ steps, currentStep, onStepChange }: OnboardingSliderProps) {
  const { spacing, colors } = useAppTheme()
  const slideAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: -currentStep * width,
      duration: 400,
      useNativeDriver: true,
    }).start()
  }, [currentStep, slideAnim])

  const renderStep = (step: OnboardingStep, index: number) => (
    <ScrollView
      key={step.id}
      style={{
        width,
        flex: 1,
      }}
      contentContainerStyle={{
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        minHeight: '100%',
        justifyContent: index === 2 ? 'flex-start' : 'center',
      }}
      showsVerticalScrollIndicator={false}
    >
      <SontineCard variant="elevated" style={{ width: '100%', marginBottom: spacing.lg }}>
        <SontineCardContent style={{ alignItems: 'center', padding: spacing.lg }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: `${step.iconColor}20`,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.md,
            }}
          >
            <UiIconSymbol name={step.icon} size={32} color={step.iconColor} />
          </View>

          <AppHeading
            variant="titleMedium"
            style={{
              textAlign: 'center',
              marginBottom: spacing.sm,
              color: colors.onSurface,
            }}
          >
            {step.title}
          </AppHeading>

          <AppText
            variant="bodyMedium"
            style={{
              textAlign: 'center',
              color: colors.onSurface,
              opacity: 0.8,
              lineHeight: 20,
              marginBottom: spacing.md,
            }}
          >
            {step.description}
          </AppText>

          {step.action && (
            <View style={{ marginTop: spacing.md, width: '100%' }}>
              <SontineButton variant="primary" onPress={step.action.onPress} style={{ width: '100%' }}>
                {step.action.label}
              </SontineButton>
            </View>
          )}
        </SontineCardContent>
      </SontineCard>

      {/* Features Preview for step 2 */}
      {index === 2 && (
        <View style={{ width: '100%', marginTop: spacing.md }}>
          <AppHeading
            variant="titleMedium"
            style={{
              marginBottom: spacing.sm,
              color: colors.onSurface,
            }}
          >
            What you can do:
          </AppHeading>

          {[
            { icon: 'magnifyingglass', title: 'Browse Tontines', desc: 'Find groups that match your savings goals' },
            { icon: 'plus.circle', title: 'Create Groups', desc: 'Start your own tontine with friends or community' },
            {
              icon: 'chart.line.uptrend.xyaxis',
              title: 'Track Progress',
              desc: 'Monitor your contributions and payouts',
            },
          ].map((feature, featureIndex) => (
            <SontineCard key={featureIndex} variant="default" style={{ marginBottom: spacing.sm }}>
              <SontineCardContent
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: spacing.md,
                }}
              >
                <UiIconSymbol
                  name={feature.icon}
                  size={24}
                  color={colors.primary}
                  style={{ marginRight: spacing.md }}
                />
                <View style={{ flex: 1 }}>
                  <AppText
                    variant="titleSmall"
                    style={{
                      color: colors.onSurface,
                      marginBottom: spacing.xs,
                    }}
                  >
                    {feature.title}
                  </AppText>
                  <AppText
                    variant="bodySmall"
                    style={{
                      color: colors.onSurface,
                      opacity: 0.7,
                    }}
                  >
                    {feature.desc}
                  </AppText>
                </View>
              </SontineCardContent>
            </SontineCard>
          ))}
        </View>
      )}
    </ScrollView>
  )

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      <Animated.View
        style={{
          flexDirection: 'row',
          width: width * steps.length,
          transform: [{ translateX: slideAnim }],
        }}
      >
        {steps.map((step, index) => renderStep(step, index))}
      </Animated.View>
    </View>
  )
}
