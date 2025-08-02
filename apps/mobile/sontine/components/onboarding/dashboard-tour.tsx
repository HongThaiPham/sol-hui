import React, { useEffect } from 'react'
import { useOnboardingTour, TourStep } from '@/hooks/use-onboarding-tour'
import { OnboardingTooltip } from './onboarding-tooltip'
import { useOnboarding } from '@/hooks/use-onboarding'

const dashboardTourSteps: TourStep[] = [
  {
    id: 'welcome-dashboard',
    title: 'Welcome to Your Dashboard',
    description: 'This is your main hub where you can see your tontine activities, balance, and quick actions.',
  },
  {
    id: 'wallet-balance',
    title: 'Your Wallet Balance',
    description: 'Here you can see your current SOL balance and recent transaction history.',
  },
  {
    id: 'quick-actions',
    title: 'Quick Actions',
    description: 'Use these buttons to quickly browse tontines, create groups, or access your wallet.',
  },
  {
    id: 'active-tontines',
    title: 'Active Tontines',
    description: 'View and manage your active tontine participations. Track contributions and payouts here.',
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description: 'Use the bottom tabs to navigate between Home, Tontines, Profile, and Settings.',
  },
]

interface DashboardTourProps {
  autoStart?: boolean
}

export function DashboardTour({ autoStart = false }: DashboardTourProps) {
  const { isOnboardingCompleted } = useOnboarding()
  const {
    isActive,
    currentStep,
    startTour,
    nextStep,
    skipTour,
  } = useOnboardingTour()

  useEffect(() => {
    if (autoStart && isOnboardingCompleted) {
      // Start tour after a short delay to allow UI to settle
      const timer = setTimeout(() => {
        startTour(dashboardTourSteps)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [autoStart, isOnboardingCompleted, startTour])

  if (!isActive || !currentStep) {
    return null
  }

  return (
    <OnboardingTooltip
      visible={isActive}
      title={currentStep.title}
      description={currentStep.description}
      targetPosition={currentStep.targetPosition}
      onNext={nextStep}
      onSkip={skipTour}
      nextButtonText="Next"
      showSkip={true}
    />
  )
}

// Hook to start dashboard tour manually
export function useDashboardTour() {
  const { startTour } = useOnboardingTour()
  
  const startDashboardTour = () => {
    startTour(dashboardTourSteps)
  }
  
  return { startDashboardTour }
}
