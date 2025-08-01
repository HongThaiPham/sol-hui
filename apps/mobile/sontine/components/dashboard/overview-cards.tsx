import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppText } from '@/components/app-text'
import { AppHeading, TontineAmount, TontineCount } from '@/components/ui/typography'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme, type AppTheme } from '@/components/app-theme'

const getStyles = ({ spacing, colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      marginBottom: spacing.xl,
      color: colors.onSurface,
      fontSize: 18,
      fontWeight: '600',
    },
    cardsGrid: {
      gap: spacing.lg,
    },
    cardRow: {
      flexDirection: 'row',
      gap: spacing.lg,
    },
    cardWrapper: {
      flex: 1,
      aspectRatio: 1, // Makes cards square
    },
    card: {
      backgroundColor: colors.surface,
      padding: spacing.lg,
      borderRadius: 16,
      // Square dimensions
      flex: 1,
      justifyContent: 'space-between',
      // Minimal shadow
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    iconContainer: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: colors.primaryContainer,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTitle: {
      fontSize: 13,
      color: colors.onSurface,
      opacity: 0.6,
      fontWeight: '500',
      letterSpacing: 0.3,
      flex: 1,
    },
    cardValue: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.onSurface,
      lineHeight: 32,
    },
  })

// System overview data
const systemData = {
  totalGroups: 1247, // Tổng số group trong hệ thống
  totalFundsRaised: 89432.5, // Tổng số tiền đã huy động (USDC)
  activeMembers: 5683, // Số thành viên đang hoạt động
  completedCycles: 892, // Số chu kỳ đã hoàn thành
}

export function OverviewCards() {
  const theme = useAppTheme()
  const { colors } = theme

  const cards = [
    {
      title: 'Total Groups',
      value: systemData.totalGroups,
      isCurrency: false,
      icon: 'person.3.fill',
      iconColor: colors.primary,
    },
    {
      title: 'Funds Raised',
      value: systemData.totalFundsRaised,
      isCurrency: true,
      icon: 'dollarsign.circle.fill',
      iconColor: colors.secondary,
    },
    {
      title: 'Active Members',
      value: systemData.activeMembers,
      isCurrency: false,
      icon: 'heart.fill',
      iconColor: colors.tertiary,
    },
    {
      title: 'Completed Cycles',
      value: systemData.completedCycles,
      isCurrency: false,
      icon: 'checkmark.circle.fill',
      iconColor: colors.primary,
    },
  ]

  const styles = React.useMemo(() => getStyles(theme), [theme])

  return (
    <View style={styles.container}>
      <AppHeading variant="titleMedium" style={styles.sectionTitle}>
        System Overview
      </AppHeading>

      <View style={styles.cardsGrid}>
        {/* First row */}
        <View style={styles.cardRow}>
          {cards.slice(0, 2).map((card, index) => (
            <View key={index} style={styles.cardWrapper}>
              <View style={styles.card}>
                {/* Header with title and icon */}
                <View style={styles.cardHeader}>
                  <AppText style={styles.cardTitle}>{card.title}</AppText>
                  <View style={styles.iconContainer}>
                    <UiIconSymbol name={card.icon as any} size={18} color={card.iconColor} />
                  </View>
                </View>

                {/* Value */}
                {card.isCurrency ? (
                  <TontineAmount amount={card.value} variant="headlineMedium" style={styles.cardValue} />
                ) : (
                  <TontineCount count={card.value} label="" variant="headlineMedium" style={styles.cardValue} />
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Second row */}
        <View style={styles.cardRow}>
          {cards.slice(2, 4).map((card, index) => (
            <View key={index + 2} style={styles.cardWrapper}>
              <View style={styles.card}>
                {/* Header with title and icon */}
                <View style={styles.cardHeader}>
                  <AppText style={styles.cardTitle}>{card.title}</AppText>
                  <View style={styles.iconContainer}>
                    <UiIconSymbol name={card.icon as any} size={18} color={card.iconColor} />
                  </View>
                </View>

                {/* Value */}
                {card.isCurrency ? (
                  <TontineAmount amount={card.value} variant="headlineMedium" style={styles.cardValue} />
                ) : (
                  <TontineCount count={card.value} label="" variant="headlineMedium" style={styles.cardValue} />
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
