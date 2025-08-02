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
    sectionTitle: {
      color: colors.onSurface,
      marginBottom: spacing.md,
    },
    optionButton: {
      // flex: 1,
      marginHorizontal: spacing.xs,
    },
    optionRow: {
      // flexDirection: 'row' as const,
      flexDirection: 'column' as const,
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    auctionConfigContainer: {
      padding: spacing.md,
      borderRadius: borderRadius.lg,
      marginTop: spacing.md,
    },
    summaryRow: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      marginBottom: spacing.xs,
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
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: spacing.sm,
          paddingBottom: spacing.xl,
        }}
      >
        <AppText
          variant="titleLarge"
          style={{
            color: colors.onSurface,
            marginBottom: spacing.lg,
            textAlign: 'center',
          }}
        >
          Create New Tontine
        </AppText>

        {/* Basic Configuration */}
        <SontineCard padding="md" style={{ marginBottom: spacing.lg }}>
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

            <SontineInput
              label="Maximum Members"
              placeholder="10"
              value={formData.maxMembers}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, maxMembers: text }))}
              keyboardType="numeric"
              error={!!errors.maxMembers}
              helperText={errors.maxMembers}
              containerStyle={{ marginBottom: spacing.md }}
            />

            <SontineInput
              label="Minimum Members to Start"
              placeholder="5"
              value={formData.minMembersToStart}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, minMembersToStart: text }))}
              keyboardType="numeric"
              error={!!errors.minMembersToStart}
              helperText={errors.minMembersToStart}
            />
          </SontineCardContent>
        </SontineCard>

        {/* Selection Method */}
        <SontineCard variant="elevated" padding="lg" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <AppText variant="titleMedium" style={styles.sectionTitle}>
              Selection Method
            </AppText>

            <AppText
              variant="bodyMedium"
              style={{
                color: colors.onSurface,
                opacity: 0.7,
                marginBottom: spacing.md,
              }}
            >
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
            </View>

            {/* Auction Configuration */}
            {formData.selectionMethod === 'auction' && (
              <View style={styles.auctionConfigContainer}>
                <AppText
                  variant="titleSmall"
                  style={{
                    color: colors.onSurface,
                    marginBottom: spacing.md,
                  }}
                >
                  Auction Configuration
                </AppText>

                <SontineInput
                  label="Auction Duration (seconds)"
                  placeholder="86400"
                  value={formData.auctionDuration}
                  onChangeText={(text) => setFormData((prev) => ({ ...prev, auctionDuration: text }))}
                  keyboardType="numeric"
                  error={!!errors.auctionDuration}
                  helperText={errors.auctionDuration || '24 hours = 86400 seconds'}
                  containerStyle={{ marginBottom: spacing.md }}
                />

                <SontineInput
                  label="Min Bid Increment (basis points)"
                  placeholder="100"
                  value={formData.minBidIncrement}
                  onChangeText={(text) => setFormData((prev) => ({ ...prev, minBidIncrement: text }))}
                  keyboardType="numeric"
                  error={!!errors.minBidIncrement}
                  helperText={errors.minBidIncrement || '100 basis points = 1%'}
                  containerStyle={{ marginBottom: spacing.md }}
                />

                <SontineInput
                  label="Max Interest Rate (basis points)"
                  placeholder="2000"
                  value={formData.maxInterestRate}
                  onChangeText={(text) => setFormData((prev) => ({ ...prev, maxInterestRate: text }))}
                  keyboardType="numeric"
                  error={!!errors.maxInterestRate}
                  helperText={errors.maxInterestRate || '2000 basis points = 20%'}
                />
              </View>
            )}
          </SontineCardContent>
        </SontineCard>

        {/* Cycle Duration */}
        <SontineCard variant="elevated" padding="lg" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <AppText variant="titleMedium" style={styles.sectionTitle}>
              Cycle Duration
            </AppText>

            <AppText
              variant="bodyMedium"
              style={{
                color: colors.onSurface,
                opacity: 0.7,
                marginBottom: spacing.md,
              }}
            >
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
              <SontineButton
                variant={formData.cycleDuration === 'custom' ? 'primary' : 'outline'}
                size="sm"
                style={styles.optionButton}
                onPress={() => setFormData((prev) => ({ ...prev, cycleDuration: 'custom' }))}
              >
                Custom
              </SontineButton>
            </View>

            {formData.cycleDuration === 'custom' && (
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
            )}
          </SontineCardContent>
        </SontineCard>

        {/* Summary */}
        <SontineCard variant="elevated" padding="lg" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <AppText variant="titleMedium" style={styles.sectionTitle}>
              Summary
            </AppText>

            <View style={styles.summaryRow}>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                Total Pool Value
              </AppText>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                {formData.contributionAmount && formData.maxMembers
                  ? `${parseFloat(formData.contributionAmount) * parseInt(formData.maxMembers)} USDC`
                  : '0 USDC'}
              </AppText>
            </View>

            <View style={styles.summaryRow}>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                Selection Method
              </AppText>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                {formData.selectionMethod.charAt(0).toUpperCase() + formData.selectionMethod.slice(1)}
              </AppText>
            </View>

            <View style={styles.summaryRow}>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                Cycle Duration
              </AppText>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                {formData.cycleDuration === 'custom'
                  ? `${formData.customDurationDays} days`
                  : formData.cycleDuration.charAt(0).toUpperCase() + formData.cycleDuration.slice(1)}
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
