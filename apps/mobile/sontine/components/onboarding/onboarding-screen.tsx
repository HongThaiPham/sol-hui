import React, { useRef, useEffect } from 'react'
import { View, Animated } from 'react-native'
import { SontineButton } from '@/components/ui/sontine-button'
import { useAppTheme } from '@/components/app-theme'
import { useOnboarding } from '@/hooks/use-onboarding'
import { useAuth } from '@/components/auth/auth-provider'
import { OnboardingSlider } from './onboarding-slider'

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

export function OnboardingScreen() {
  const { spacing, colors } = useAppTheme()
  const { currentStep, setCurrentStep, totalSteps, completeOnboarding } = useOnboarding()
  const { isAuthenticated, signIn } = useAuth()

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current
  const progressAnim = useRef(new Animated.Value(0)).current
  const dotAnims = useRef(Array.from({ length: totalSteps }, () => new Animated.Value(0))).current

  const steps: OnboardingStep[] = [
    {
      id: 0,
      title: 'Welcome to Sontine',
      description:
        'Join the future of rotating savings with blockchain technology. Create or join tontine groups with complete transparency and automation.',
      icon: 'hand.wave.fill',
      iconColor: colors.primary,
    },
    {
      id: 1,
      title: 'Connect Your Wallet',
      description:
        'Connect your Solana wallet to start participating in tontine groups. Your wallet is your key to secure and transparent transactions.',
      icon: 'wallet.pass.fill',
      iconColor: '#F59E0B',
      action: !isAuthenticated
        ? {
            label: 'Connect Wallet',
            onPress: async () => {
              try {
                await signIn()
                setCurrentStep(2)
              } catch (error) {
                console.error('Failed to connect wallet:', error)
              }
            },
          }
        : undefined,
    },
    {
      id: 2,
      title: 'Explore Features',
      description:
        'Browse existing tontine groups, create your own, or manage your contributions. Everything is transparent and automated on the blockchain.',
      icon: 'auto-awesome',
      iconColor: '#8B5CF6',
    },
    {
      id: 3,
      title: "You're All Set!",
      description:
        'Start your journey with Sontine. Join groups, make contributions, and experience the power of decentralized rotating savings.',
      icon: 'checkmark.circle.fill',
      iconColor: '#10B981',
    },
  ]

  // Animation effect when step changes
  useEffect(() => {
    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: (currentStep + 1) / totalSteps,
      duration: 500,
      useNativeDriver: false,
    }).start()

    // Animate dots
    dotAnims.forEach((dotAnim, index) => {
      Animated.timing(dotAnim, {
        toValue: index === currentStep ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start()
    })
  }, [currentStep, progressAnim, totalSteps, dotAnims])

  const animateStepChange = (callback: () => void) => {
    // Simple fade animation for navigation
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      callback()
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start()
    })
  }

  const handleNext = () => {
    animateStepChange(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        completeOnboarding()
      }
    })
  }

  const handlePrevious = () => {
    animateStepChange(() => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1)
      }
    })
  }

  const handleSkip = () => {
    animateStepChange(() => {
      completeOnboarding()
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Progress Indicator */}
      <View
        style={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.xl,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.md,
          }}
        >
          {/* Dot Indicators */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
            {Array.from({ length: totalSteps }, (_, index) => {
              const dotAnim = dotAnims[index]

              return (
                <Animated.View
                  key={index}
                  style={{
                    width: dotAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [8, 20],
                    }),
                    height: 8,
                    borderRadius: dotAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [4, 10],
                    }),
                    backgroundColor: dotAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [colors.outline, colors.primary],
                    }),
                    opacity: dotAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    }),
                  }}
                />
              )
            })}
          </View>

          <SontineButton variant="ghost" size="sm" onPress={handleSkip}>
            Skip
          </SontineButton>
        </View>
      </View>

      {/* Content */}
      <OnboardingSlider steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />

      {/* Navigation */}
      <View
        style={{
          padding: spacing.lg,
          paddingBottom: spacing.xl,
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.outline,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {currentStep > 0 ? (
            <SontineButton variant="outline" onPress={handlePrevious} style={{ flex: 1, marginRight: spacing.sm }}>
              Previous
            </SontineButton>
          ) : (
            <View style={{ flex: 1, marginRight: spacing.sm }} />
          )}

          <SontineButton variant="primary" onPress={handleNext} style={{ flex: 1, marginLeft: spacing.sm }}>
            {currentStep === totalSteps - 1 ? 'Get Started' : 'Next'}
          </SontineButton>
        </View>
      </View>
    </View>
  )
}
