import React from 'react'
import { View } from 'react-native'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

// Mock data
const mockData = {
  activeTontines: 3,
  totalContributed: 125.5,
  nextPayout: 450.0,
  pendingContributions: 2,
}

export function OverviewCards() {
  const { spacing, colors } = useAppTheme()

  const cards = [
    {
      title: 'Active Tontines',
      value: mockData.activeTontines.toString(),
      icon: 'person.3.fill',
      color: colors.primary,
    },
    {
      title: 'Total Contributed',
      value: `${mockData.totalContributed} SOL`,
      icon: 'dollarsign.circle.fill',
      color: colors.secondary,
    },
    {
      title: 'Next Payout',
      value: `${mockData.nextPayout} SOL`,
      icon: 'trophy.fill',
      color: '#F59E0B', // Warning color
    },
    {
      title: 'Pending',
      value: mockData.pendingContributions.toString(),
      icon: 'clock.fill',
      color: '#DC2626', // Error color
    },
  ]

  return (
    <View>
      <AppText variant="titleMedium" style={{ 
        marginBottom: spacing.md,
        color: colors.onSurface,
        fontWeight: 'bold',
      }}>
        Overview
      </AppText>
      
      <View style={{ 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        gap: spacing.sm,
      }}>
        {cards.map((card, index) => (
          <View key={index} style={{ width: '48%' }}>
            <SontineCard variant="elevated" padding="md">
              <SontineCardContent>
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: spacing.xs,
                }}>
                  <UiIconSymbol 
                    name={card.icon as any}
                    size={24}
                    color={card.color}
                  />
                </View>
                
                <AppText variant="headlineSmall" style={{ 
                  color: colors.onSurface,
                  fontWeight: 'bold',
                  marginBottom: spacing.xs,
                }}>
                  {card.value}
                </AppText>
                
                <AppText variant="bodySmall" style={{ 
                  color: colors.onSurface,
                  opacity: 0.7,
                }}>
                  {card.title}
                </AppText>
              </SontineCardContent>
            </SontineCard>
          </View>
        ))}
      </View>
    </View>
  )
}
