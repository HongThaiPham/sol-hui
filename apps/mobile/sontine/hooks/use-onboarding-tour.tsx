import { useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TOUR_STORAGE_KEY = 'onboarding-tour-completed'

export interface TourStep {
  id: string
  title: string
  description: string
  targetSelector?: string
  targetPosition?: {
    x: number
    y: number
    width: number
    height: number
  }
  screen?: string
  action?: () => void
}

export interface OnboardingTourState {
  isActive: boolean
  currentStepIndex: number
  currentStep: TourStep | null
  steps: TourStep[]
  startTour: (steps: TourStep[]) => void
  nextStep: () => void
  previousStep: () => void
  skipTour: () => void
  completeTour: () => void
  resetTour: () => Promise<void>
  setTargetPosition: (stepId: string, position: { x: number; y: number; width: number; height: number }) => void
}

export function useOnboardingTour(): OnboardingTourState {
  const [isActive, setIsActive] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [steps, setSteps] = useState<TourStep[]>([])

  const currentStep = steps[currentStepIndex] || null

  const startTour = useCallback((tourSteps: TourStep[]) => {
    setSteps(tourSteps)
    setCurrentStepIndex(0)
    setIsActive(true)
  }, [])

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    } else {
      completeTour()
    }
  }, [currentStepIndex, steps.length])

  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }, [currentStepIndex])

  const skipTour = useCallback(() => {
    setIsActive(false)
    setCurrentStepIndex(0)
    setSteps([])
  }, [])

  const completeTour = useCallback(async () => {
    try {
      await AsyncStorage.setItem(TOUR_STORAGE_KEY, 'true')
      setIsActive(false)
      setCurrentStepIndex(0)
      setSteps([])
    } catch (error) {
      console.error('Error completing tour:', error)
    }
  }, [])

  const resetTour = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(TOUR_STORAGE_KEY)
      setIsActive(false)
      setCurrentStepIndex(0)
      setSteps([])
    } catch (error) {
      console.error('Error resetting tour:', error)
    }
  }, [])

  const setTargetPosition = useCallback((stepId: string, position: { x: number; y: number; width: number; height: number }) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId 
          ? { ...step, targetPosition: position }
          : step
      )
    )
  }, [])

  return {
    isActive,
    currentStepIndex,
    currentStep,
    steps,
    startTour,
    nextStep,
    previousStep,
    skipTour,
    completeTour,
    resetTour,
    setTargetPosition,
  }
}
