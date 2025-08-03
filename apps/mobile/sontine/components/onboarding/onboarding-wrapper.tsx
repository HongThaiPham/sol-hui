import React from 'react'
import { useOnboarding } from '@/hooks/use-onboarding'
import { OnboardingScreen } from './onboarding-screen'
import { AppSplashController } from '@/components/app-splash-controller'

interface OnboardingWrapperProps {
  children: React.ReactNode
}

export function OnboardingWrapper({ children }: OnboardingWrapperProps) {
  const { isOnboardingCompleted, isLoading } = useOnboarding()

  if (isLoading) {
    return <AppSplashController />
  }

  if (!isOnboardingCompleted) {
    return <OnboardingScreen />
  }

  return <>{children}</>
}
