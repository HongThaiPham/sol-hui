import React, { useState, useMemo } from 'react'
import { ScrollView, View, Alert } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineInput } from '@/components/ui/sontine-input'
import { SontineButton, SontineActionButton } from '@/components/ui/sontine-button'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { useAppTheme } from '@/components/app-theme'
import { useSontineProgram } from '@/hooks/use-sontine-porgram'
import { SelectionMethod, CycleDuration, AuctionConfig } from '@/utils/sontine.type'
import { HeaderTitleWithIcon } from '@/components/ui/header-title-with-icon'

// Helper functions to create proper enum values
const createSelectionMethod = (method: 'fixedOrder' | 'random' | 'auction'): SelectionMethod => {
  return { [method]: {} } as SelectionMethod
}

const createCycleDuration = (duration: 'weekly' | 'monthly' | 'custom', customDays?: number): CycleDuration => {
  if (duration === 'custom' && customDays) {
    return { custom: { duration: customDays } } as unknown as CycleDuration
  }
  return { [duration]: {} } as unknown as CycleDuration
}

const getStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { spacing, colors, borderRadius } = theme
  return {
    container: {
      padding: spacing.sm,
      paddingBottom: spacing.xl,
    },
    sectionTitle: {
      color: colors.onSurface,
      marginBottom: spacing.sm,
    },
    sectionDescription: {
      color: colors.onSurface,
      opacity: 0.7,
      marginBottom: spacing.md,
    },
    optionButton: {
      // flex: 1,
    },
    optionRow: {
      // flexDirection: 'row' as const,
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    inputRow: {
      flexDirection: 'row' as const,
      gap: spacing.sm,
    },
    inputHalf: {
      flex: 1,
    },
    auctionConfigContainer: {
      padding: spacing.md,
      borderRadius: borderRadius.lg,
      marginTop: spacing.md,
    },
    summaryItem: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      paddingVertical: spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: colors.outline + '20',
    },
    summaryItemLast: {
      borderBottomWidth: 0,
    },
  }
}

export default function CreateGroupScreen() {
  const theme = useAppTheme()
  const { spacing, colors } = theme
  const styles = useMemo(() => getStyles(theme), [theme])
  const router = useRouter()
  const { createGroup } = useSontineProgram()

  const [formData, setFormData] = useState({
    contributionAmount: '100',
    maxMembers: '10',
    minMembersToStart: '5',
    selectionMethod: 'fixedOrder' as 'fixedOrder' | 'random' | 'auction',
    cycleDuration: 'monthly' as 'weekly' | 'monthly' | 'custom',
    customDurationDays: '',
    // Auction config (only used when selectionMethod is 'auction')
    auctionDuration: '86400', // 24 hours in seconds
    minBidIncrement: '100', // 1% in basis points
    maxInterestRate: '2000', // 20% in basis points
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.contributionAmount || parseFloat(formData.contributionAmount) <= 0) {
      newErrors.contributionAmount = 'Valid contribution amount is required (in USDC)'
    }

    const maxMembers = parseInt(formData.maxMembers)
    if (!maxMembers || maxMembers < 2 || maxMembers > 255) {
      newErrors.maxMembers = 'Max members must be between 2 and 255'
    }

    const minMembers = parseInt(formData.minMembersToStart)
    if (!minMembers || minMembers < 2 || minMembers > maxMembers) {
      newErrors.minMembersToStart = `Min members must be between 2 and ${maxMembers}`
    }

    if (formData.cycleDuration === 'custom') {
      const customDays = parseInt(formData.customDurationDays)
      if (!customDays || customDays < 1) {
        newErrors.customDurationDays = 'Custom duration must be at least 1 day'
      }
    }

    if (formData.selectionMethod === 'auction') {
      const auctionDuration = parseInt(formData.auctionDuration)
      if (!auctionDuration || auctionDuration < 3600) {
        // At least 1 hour
        newErrors.auctionDuration = 'Auction duration must be at least 1 hour (3600 seconds)'
      }

      const minBidIncrement = parseInt(formData.minBidIncrement)
      if (!minBidIncrement || minBidIncrement < 1 || minBidIncrement > 10000) {
        newErrors.minBidIncrement = 'Min bid increment must be between 0.01% and 100%'
      }

      const maxInterestRate = parseInt(formData.maxInterestRate)
      if (!maxInterestRate || maxInterestRate < 100 || maxInterestRate > 10000) {
        newErrors.maxInterestRate = 'Max interest rate must be between 1% and 100%'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreate = async () => {
    if (!validateForm()) {
      return
    }

    try {
      const contributionAmountInLamports = Math.floor(parseFloat(formData.contributionAmount)) // Convert USDC to micro-USDC

      let cycleDuration: CycleDuration
      if (formData.cycleDuration === 'custom') {
        cycleDuration = createCycleDuration('custom', parseInt(formData.customDurationDays))
      } else {
        cycleDuration = createCycleDuration(formData.cycleDuration)
      }

      let auctionConfig: AuctionConfig | null = null
      if (formData.selectionMethod === 'auction') {
        auctionConfig = {
          auctionDuration: parseInt(formData.auctionDuration),
          minBidIncrement: parseInt(formData.minBidIncrement),
          maxInterestRate: parseInt(formData.maxInterestRate),
        }
      }
      try {
        await createGroup.mutateAsync({
          selectionMethod: createSelectionMethod(formData.selectionMethod),
          maxMembers: parseInt(formData.maxMembers),
          contributionAmount: contributionAmountInLamports,
          cycleDuration,
          minMembersToStart: parseInt(formData.minMembersToStart),
          auctionConfig,
        })

        Alert.alert('Success', 'Tontine group created successfully!', [{ text: 'OK', onPress: () => router.back() }])
      } catch (error) {}
    } catch (error) {
      console.error('Create group error:', error)
      Alert.alert('Error', 'Failed to create tontine group. Please try again.')
    }
  }

  return (
    <AppPage>
      <Stack.Screen
        options={{
          headerTitle: () => <HeaderTitleWithIcon title="Create Tontine Group" iconName="plus.circle.fill" />,
          headerBackTitle: 'Back',
          headerShown: true,
        }}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        {/* Basic Configuration */}
        <SontineCard variant="elevated" padding="lg" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <AppText variant="titleMedium" style={styles.sectionTitle}>
              Basic Configuration
            </AppText>

            <SontineInput
              label="Contribution Amount (USDC)"
              placeholder="100"
              value={formData.contributionAmount}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, contributionAmount: text }))}
              keyboardType="numeric"
              error={!!errors.contributionAmount}
              helperText={errors.contributionAmount}
              containerStyle={{ marginBottom: spacing.md }}
            />

            <View style={styles.inputRow}>
              <SontineInput
                label="Max Members"
                placeholder="10"
                value={formData.maxMembers}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, maxMembers: text }))}
                keyboardType="numeric"
                error={!!errors.maxMembers}
                helperText={errors.maxMembers}
                containerStyle={styles.inputHalf}
              />

              <SontineInput
                label="Min to Start"
                placeholder="5"
                value={formData.minMembersToStart}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, minMembersToStart: text }))}
                keyboardType="numeric"
                error={!!errors.minMembersToStart}
                helperText={errors.minMembersToStart}
                containerStyle={styles.inputHalf}
              />
            </View>
          </SontineCardContent>
        </SontineCard>

        {/* Selection Method & Cycle Duration */}
        <SontineCard variant="elevated" padding="sm" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <AppText variant="titleMedium" style={styles.sectionTitle}>
              Selection Method
            </AppText>
            <AppText variant="bodyMedium" style={styles.sectionDescription}>
              How should recipients be chosen each round?
            </AppText>

            <View style={styles.optionRow}>
              <SontineButton
                variant={formData.selectionMethod === 'random' ? 'primary' : 'outline'}
                size="sm"
                style={styles.optionButton}
                onPress={() => setFormData((prev) => ({ ...prev, selectionMethod: 'random' }))}
              >
                Random
              </SontineButton>
              <SontineButton
                variant={formData.selectionMethod === 'fixedOrder' ? 'primary' : 'outline'}
                size="sm"
                style={styles.optionButton}
                onPress={() => setFormData((prev) => ({ ...prev, selectionMethod: 'fixedOrder' }))}
              >
                Fixed Order
              </SontineButton>
              <SontineButton
                variant={formData.selectionMethod === 'auction' ? 'primary' : 'outline'}
                size="sm"
                style={styles.optionButton}
                onPress={() => setFormData((prev) => ({ ...prev, selectionMethod: 'auction' }))}
              >
                Auction
              </SontineButton>
              {/* Auction Configuration */}
              {formData.selectionMethod === 'auction' && (
                <View style={styles.auctionConfigContainer}>
                  <AppText variant="titleSmall" style={styles.sectionTitle}>
                    Auction Configuration
                  </AppText>

                  <View style={styles.inputRow}>
                    <SontineInput
                      label="Duration (hours)"
                      placeholder="24"
                      value={
                        formData.auctionDuration ? String(Math.floor(parseInt(formData.auctionDuration) / 3600)) : ''
                      }
                      onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, auctionDuration: String(parseInt(text || '0') * 3600) }))
                      }
                      keyboardType="numeric"
                      error={!!errors.auctionDuration}
                      helperText={errors.auctionDuration}
                      containerStyle={styles.inputHalf}
                    />

                    <SontineInput
                      label="Min Bid (%)"
                      placeholder="1"
                      value={formData.minBidIncrement ? String(parseInt(formData.minBidIncrement) / 100) : ''}
                      onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, minBidIncrement: String(parseFloat(text || '0') * 100) }))
                      }
                      keyboardType="numeric"
                      error={!!errors.minBidIncrement}
                      helperText={errors.minBidIncrement}
                      containerStyle={styles.inputHalf}
                    />
                  </View>

                  <SontineInput
                    label="Max Interest Rate (%)"
                    placeholder="20"
                    value={formData.maxInterestRate ? String(parseInt(formData.maxInterestRate) / 100) : ''}
                    onChangeText={(text) =>
                      setFormData((prev) => ({ ...prev, maxInterestRate: String(parseFloat(text || '0') * 100) }))
                    }
                    keyboardType="numeric"
                    error={!!errors.maxInterestRate}
                    helperText={errors.maxInterestRate}
                  />
                </View>
              )}
            </View>

            {/* Cycle Duration */}
            <AppText variant="titleMedium" style={[styles.sectionTitle, { marginTop: spacing.lg }]}>
              Cycle Duration
            </AppText>
            <AppText variant="bodyMedium" style={styles.sectionDescription}>
              How often should rounds occur?
            </AppText>

            <View style={styles.optionRow}>
              <SontineButton
                variant={formData.cycleDuration === 'weekly' ? 'primary' : 'outline'}
                size="sm"
                style={styles.optionButton}
                onPress={() => setFormData((prev) => ({ ...prev, cycleDuration: 'weekly' }))}
              >
                Weekly
              </SontineButton>
              <SontineButton
                variant={formData.cycleDuration === 'monthly' ? 'primary' : 'outline'}
                size="sm"
                style={styles.optionButton}
                onPress={() => setFormData((prev) => ({ ...prev, cycleDuration: 'monthly' }))}
              >
                Monthly
              </SontineButton>
              {/* <SontineButton
                variant={formData.cycleDuration === 'custom' ? 'primary' : 'outline'}
                size="sm"
                style={styles.optionButton}
                onPress={() => setFormData((prev) => ({ ...prev, cycleDuration: 'custom' }))}
              >
                Custom
              </SontineButton> */}
            </View>

            {/* {formData.cycleDuration === 'custom' && (
              <SontineInput
                label="Custom Duration (days)"
                placeholder="30"
                value={formData.customDurationDays}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, customDurationDays: text }))}
                keyboardType="numeric"
                error={!!errors.customDurationDays}
                helperText={errors.customDurationDays}
                containerStyle={{ marginTop: spacing.md }}
              />
            )} */}
          </SontineCardContent>
        </SontineCard>

        {/* Summary */}
        <SontineCard variant="outlined" padding="lg" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <AppText variant="titleMedium" style={styles.sectionTitle}>
              Summary
            </AppText>

            <View style={styles.summaryItem}>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.8 }}>
                Contribution Amount
              </AppText>
              <AppText variant="titleSmall" style={{ color: colors.primary }}>
                {formData.contributionAmount || '0'} USDC
              </AppText>
            </View>

            <View style={styles.summaryItem}>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.8 }}>
                Members (Max / Min to Start)
              </AppText>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                {formData.maxMembers || '0'} / {formData.minMembersToStart || '0'}
              </AppText>
            </View>

            <View style={styles.summaryItem}>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.8 }}>
                Total Pool Value
              </AppText>
              <AppText variant="titleSmall" style={{ color: colors.primary }}>
                {formData.contributionAmount && formData.maxMembers
                  ? `${parseFloat(formData.contributionAmount) * parseInt(formData.maxMembers)} USDC`
                  : '0 USDC'}
              </AppText>
            </View>

            <View style={styles.summaryItem}>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.8 }}>
                Selection Method
              </AppText>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                {formData.selectionMethod.charAt(0).toUpperCase() + formData.selectionMethod.slice(1)}
              </AppText>
            </View>

            <View style={styles.summaryItem}>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.8 }}>
                Cycle Duration
              </AppText>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                {formData.cycleDuration === 'custom'
                  ? `${formData.customDurationDays || '0'} days`
                  : formData.cycleDuration.charAt(0).toUpperCase() + formData.cycleDuration.slice(1)}
              </AppText>
            </View>

            {/* Auction Configuration Summary */}
            {formData.selectionMethod === 'auction' && (
              <>
                <View style={styles.summaryItem}>
                  <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.8 }}>
                    Auction Duration
                  </AppText>
                  <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                    {formData.auctionDuration
                      ? `${Math.floor(parseInt(formData.auctionDuration) / 3600)} hours`
                      : '0 hours'}
                  </AppText>
                </View>

                <View style={styles.summaryItem}>
                  <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.8 }}>
                    Min Bid Increment
                  </AppText>
                  <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                    {formData.minBidIncrement ? `${parseInt(formData.minBidIncrement) / 100}%` : '0%'}
                  </AppText>
                </View>

                <View style={styles.summaryItem}>
                  <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.8 }}>
                    Max Interest Rate
                  </AppText>
                  <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                    {formData.maxInterestRate ? `${parseInt(formData.maxInterestRate) / 100}%` : '0%'}
                  </AppText>
                </View>
              </>
            )}

            <View style={[styles.summaryItem, styles.summaryItemLast]}>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.8 }}>
                Estimated Duration
              </AppText>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                {(() => {
                  const maxMembers = parseInt(formData.maxMembers) || 0
                  if (maxMembers === 0) return 'N/A'

                  let cycleDays = 0
                  if (formData.cycleDuration === 'weekly') cycleDays = 7
                  else if (formData.cycleDuration === 'monthly') cycleDays = 30
                  else if (formData.cycleDuration === 'custom') cycleDays = parseInt(formData.customDurationDays) || 0

                  const totalDays = maxMembers * cycleDays
                  if (totalDays === 0) return 'N/A'

                  if (totalDays < 30) return `${totalDays} days`
                  else if (totalDays < 365) return `${Math.round(totalDays / 30)} months`
                  else return `${Math.round(totalDays / 365)} years`
                })()}
              </AppText>
            </View>
          </SontineCardContent>
        </SontineCard>

        <SontineActionButton
          variant="primary"
          fullWidth
          onPress={handleCreate}
          isLoading={createGroup.isPending}
          loadingText="Creating Tontine..."
        >
          Create Tontine
        </SontineActionButton>
      </ScrollView>
    </AppPage>
  )
}
