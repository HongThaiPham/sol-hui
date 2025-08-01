import React, { useState } from 'react'
import { ScrollView, View, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineInput } from '@/components/ui/sontine-input'
import { SontineButton } from '@/components/ui/sontine-button'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { useAppTheme } from '@/components/app-theme'

export default function CreateTontineScreen() {
  const { spacing, colors } = useAppTheme()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contributionAmount: '',
    maxMembers: '30',
    duration: '12', // months
    startDate: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tontine name is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.contributionAmount || parseFloat(formData.contributionAmount) <= 0) {
      newErrors.contributionAmount = 'Valid contribution amount is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreate = () => {
    if (validateForm()) {
      Alert.alert(
        'Create Tontine',
        'This will deploy a smart contract on Solana. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Create', 
            onPress: () => {
              // Simulate creation
              Alert.alert('Success', 'Tontine created successfully!', [
                { text: 'OK', onPress: () => router.back() }
              ])
            }
          }
        ]
      )
    }
  }

  return (
    <AppPage>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          padding: spacing.md,
          paddingBottom: spacing.xl,
        }}
      >
        <AppText variant="titleLarge" style={{ 
          color: colors.onSurface,
          fontWeight: 'bold',
          marginBottom: spacing.lg,
          textAlign: 'center',
        }}>
          Create New Tontine
        </AppText>

        <SontineCard variant="elevated" padding="lg" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <AppText variant="titleMedium" style={{ 
              color: colors.onSurface,
              fontWeight: 'bold',
              marginBottom: spacing.md,
            }}>
              Basic Information
            </AppText>

            <SontineInput
              label="Tontine Name"
              placeholder="Enter tontine name"
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              error={!!errors.name}
              helperText={errors.name}
              containerStyle={{ marginBottom: spacing.md }}
            />

            <SontineInput
              label="Description"
              placeholder="Describe your tontine purpose"
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              numberOfLines={3}
              containerStyle={{ marginBottom: spacing.md }}
            />
          </SontineCardContent>
        </SontineCard>

        <SontineCard variant="elevated" padding="lg" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <AppText variant="titleMedium" style={{ 
              color: colors.onSurface,
              fontWeight: 'bold',
              marginBottom: spacing.md,
            }}>
              Financial Settings
            </AppText>

            <SontineInput
              label="Contribution Amount (SOL)"
              placeholder="0.00"
              value={formData.contributionAmount}
              onChangeText={(text) => setFormData(prev => ({ ...prev, contributionAmount: text }))}
              error={!!errors.contributionAmount}
              helperText={errors.contributionAmount}
              keyboardType="numeric"
              containerStyle={{ marginBottom: spacing.md }}
            />

            <SontineInput
              label="Maximum Members"
              placeholder="30"
              value={formData.maxMembers}
              onChangeText={(text) => setFormData(prev => ({ ...prev, maxMembers: text }))}
              keyboardType="numeric"
              containerStyle={{ marginBottom: spacing.md }}
            />

            <SontineInput
              label="Duration (Months)"
              placeholder="12"
              value={formData.duration}
              onChangeText={(text) => setFormData(prev => ({ ...prev, duration: text }))}
              keyboardType="numeric"
            />
          </SontineCardContent>
        </SontineCard>

        <SontineCard variant="outlined" padding="lg" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <AppText variant="titleSmall" style={{ 
              color: colors.onSurface,
              fontWeight: 'bold',
              marginBottom: spacing.sm,
            }}>
              Estimated Costs
            </AppText>
            
            <View style={{ 
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: spacing.xs,
            }}>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                Smart Contract Deployment
              </AppText>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                ~0.01 SOL
              </AppText>
            </View>
            
            <View style={{ 
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: spacing.xs,
            }}>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                Platform Fee
              </AppText>
              <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                1% per round
              </AppText>
            </View>
          </SontineCardContent>
        </SontineCard>

        <SontineButton
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleCreate}
        >
          Create Tontine
        </SontineButton>
      </ScrollView>
    </AppPage>
  )
}
