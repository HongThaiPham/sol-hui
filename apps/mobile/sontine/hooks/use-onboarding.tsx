import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react'

const ONBOARDING_STORAGE_KEY = 'onboarding-completed'

export interface OnboardingState {
  isOnboardingCompleted: boolean
  isLoading: boolean
  completeOnboarding: () => Promise<void>
  resetOnboarding: () => Promise<void>
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
}

const OnboardingContext = createContext<OnboardingState>({} as OnboardingState)

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }
  return context
}

export function OnboardingProvider({ children }: PropsWithChildren) {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = 4 // Welcome, Connect Wallet, Explore Features, Complete

  useEffect(() => {
    loadOnboardingStatus()
  }, [])

  const loadOnboardingStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY)
      setIsOnboardingCompleted(completed === 'true')
    } catch (error) {
      console.error('Error loading onboarding status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true')
      setIsOnboardingCompleted(true)
      setCurrentStep(0)
    } catch (error) {
      console.error('Error completing onboarding:', error)
    }
  }

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_STORAGE_KEY)
      setIsOnboardingCompleted(false)
      setCurrentStep(0)
    } catch (error) {
      console.error('Error resetting onboarding:', error)
    }
  }

  const value: OnboardingState = {
    isOnboardingCompleted,
    isLoading,
    completeOnboarding,
    resetOnboarding,
    currentStep,
    setCurrentStep,
    totalSteps,
  }

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
}
