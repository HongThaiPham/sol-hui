import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppText } from '@/components/app-text'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme, type AppTheme } from '@/components/app-theme'

const getStyles = ({ spacing }: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: spacing.md,
    },
    leftSection: {
      flex: 1,
    },
    welcomeText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      marginBottom: spacing.xs,
      fontSize: 18,
    },
    levelText: {
      color: '#FFFFFF',
      opacity: 0.9,
      fontSize: 14,
    },
    rightSection: {
      alignItems: 'flex-end',
    },
    starsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.xs,
    },
    scoreText: {
      color: '#FFFFFF',
      marginLeft: spacing.sm,
      fontWeight: 'bold',
      fontSize: 14,
    },
    transactionsText: {
      color: '#FFFFFF',
      opacity: 0.8,
      fontSize: 12,
    },
  })

// Mock reputation data
const mockReputation = {
  score: 4.8,
  maxScore: 5.0,
  level: 'Trusted Member',
  totalTransactions: 47,
  successRate: 98.5,
}

export function ReputationDisplay() {
  const theme = useAppTheme()

  const getStarColor = (index: number) => {
    const fullStars = Math.floor(mockReputation.score)
    const hasHalfStar = mockReputation.score % 1 >= 0.5

    if (index < fullStars) {
      return '#FFD700' // Gold for full stars
    } else if (index === fullStars && hasHalfStar) {
      return '#FFD700' // Gold for half star (simplified)
    } else {
      return '#FFFFFF40' // Semi-transparent white for empty stars
    }
  }

  const styles = React.useMemo(() => getStyles(theme), [theme])

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <AppText variant="titleMedium" style={styles.welcomeText}>
          Welcome back! 👋
        </AppText>

        <AppText variant="bodyMedium" style={styles.levelText}>
          {mockReputation.level}
        </AppText>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.starsContainer}>
          {[0, 1, 2, 3, 4].map((index) => (
            <UiIconSymbol
              key={index}
              name="star.fill"
              size={18}
              color={getStarColor(index)}
              style={{ marginLeft: index > 0 ? 2 : 0 }}
            />
          ))}
          <AppText variant="bodySmall" style={styles.scoreText}>
            {mockReputation.score}
          </AppText>
        </View>

        <AppText variant="bodySmall" style={styles.transactionsText}>
          {mockReputation.totalTransactions} transactions
        </AppText>
      </View>
    </View>
  )
}
