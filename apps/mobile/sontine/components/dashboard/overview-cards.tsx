import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme, type AppTheme } from '@/components/app-theme'

const getStyles = ({ spacing, colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.sm,
    },
    sectionTitle: {
      marginBottom: spacing.md,
      color: colors.onSurface,
      fontWeight: 'bold',
    },
    cardsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    cardWrapper: {
      width: '48%',
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: spacing.sm,
    },
    cardValue: {
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
    cardTitle: {
      opacity: 0.85,
      fontSize: 12,
    },
  })

// Mock data
const mockData = {
  activeTontines: 3,
  totalContributed: 125.5,
  nextPayout: 450.0,
  pendingContributions: 2,
}

export function OverviewCards() {
  const theme = useAppTheme()

  const cards = [
    {
      title: 'Active Tontines',
      value: mockData.activeTontines.toString(),
      icon: 'person.3.fill',
      variant: 'primary' as const,
      textColor: '#FFFFFF',
    },
    {
      title: 'Total Contributed',
      value: `${mockData.totalContributed} SOL`,
      icon: 'dollarsign.circle.fill',
      variant: 'accent' as const,
      textColor: '#0E151A',
    },
    {
      title: 'Next Payout',
      value: `${mockData.nextPayout} SOL`,
      icon: 'trophy.fill',
      variant: 'mint' as const,
      textColor: '#0E151A',
    },
    {
      title: 'Pending',
      value: mockData.pendingContributions.toString(),
      icon: 'clock.fill',
      variant: 'navy' as const,
      textColor: '#FFFFFF',
    },
  ]

  const styles = React.useMemo(() => getStyles(theme), [theme])

  return (
    <View style={styles.container}>
      <AppText variant="titleMedium" style={styles.sectionTitle}>
        Overview
      </AppText>

      <View style={styles.cardsGrid}>
        {cards.map((card, index) => (
          <View key={index} style={styles.cardWrapper}>
            <SontineCard variant={card.variant} padding="md">
              <SontineCardContent>
                <View style={styles.cardHeader}>
                  <UiIconSymbol name={card.icon as any} size={28} color={card.textColor} />
                </View>

                <AppText variant="headlineMedium" style={[styles.cardValue, { color: card.textColor }]}>
                  {card.value}
                </AppText>

                <AppText variant="bodySmall" style={[styles.cardTitle, { color: card.textColor }]}>
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
