import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { AppText } from '@/components/app-text'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme, type AppTheme } from '@/components/app-theme'

const getStyles = ({ spacing, fontFamily, fontsLoaded }: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      minHeight: 100, // Ensure minimum height
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    leftSection: {
      flex: 1,
    },
    welcomeText: {
      color: '#FFFFFF',
      marginBottom: spacing.xs,
      fontSize: 24,
      ...(fontsLoaded && { fontFamily: fontFamily.bold }),
    },
    levelText: {
      color: '#FFFFFF',
      opacity: 0.9,
      fontSize: 16,
      ...(fontsLoaded && { fontFamily: fontFamily.primary }),
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
      fontSize: 16,
      ...(fontsLoaded && { fontFamily: fontFamily.bold }),
    },
    transactionsText: {
      color: '#FFFFFF',
      opacity: 0.8,
      fontSize: 12,
      ...(fontsLoaded && { fontFamily: fontFamily.primary }),
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing.sm,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      color: '#FFFFFF',
      fontSize: 18,
      ...(fontsLoaded && { fontFamily: fontFamily.bold }),
      marginBottom: spacing.xs / 2,
    },
    statLabel: {
      color: '#FFFFFF',
      opacity: 0.8,
      fontSize: 12,
      ...(fontsLoaded && { fontFamily: fontFamily.primary }),
    },
  })

// Mock reputation data
const mockReputation = {
  score: 4.8,
  maxScore: 5.0,
  level: 'Trusted Member',
  totalTransactions: 47,
  successRate: 98.5,
  totalSaved: 12.5, // USDC
  activePools: 3,
}

export function ReputationDisplay({ scrollY }: { scrollY: Animated.Value }) {
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

  // Improved animated values for smoother scrolling experience
  const welcomeTextSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [24, 20],
    extrapolate: 'clamp',
  })

  const welcomeTextOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.6, 0.8],
    extrapolate: 'clamp',
  })

  const levelTextOpacity = scrollY.interpolate({
    inputRange: [0, 40, 80],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  })

  const levelTextTranslateY = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -10],
    extrapolate: 'clamp',
  })

  const statsOpacity = scrollY.interpolate({
    inputRange: [0, 60, 120],
    outputRange: [1, 0.7, 0],
    extrapolate: 'clamp',
  })

  const statsTranslateY = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  })

  const containerPaddingVertical = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [theme.spacing.lg, theme.spacing.sm],
    extrapolate: 'clamp',
  })

  return (
    <Animated.View style={[styles.container, { paddingVertical: containerPaddingVertical }]}>
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          {/* Welcome text with smooth size and opacity animation */}
          <Animated.Text
            style={[
              styles.welcomeText,
              {
                fontSize: welcomeTextSize,
                opacity: welcomeTextOpacity,
              },
            ]}
          >
            Welcome back! 👋
          </Animated.Text>

          {/* Level text with fade and translate animation */}
          <Animated.View
            style={{
              opacity: levelTextOpacity,
              transform: [{ translateY: levelTextTranslateY }],
            }}
          >
            <AppText style={styles.levelText}>{mockReputation.level}</AppText>
          </Animated.View>
        </View>

        <View style={styles.rightSection}>
          {/* Stars and score display */}
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <UiIconSymbol key={index} name="star.fill" size={16} color={getStarColor(index)} />
            ))}
            <AppText style={styles.scoreText}>{mockReputation.score.toFixed(1)}</AppText>
          </View>
          <AppText style={styles.transactionsText}>{mockReputation.totalTransactions} transactions</AppText>
        </View>
      </View>

      {/* Stats row with smooth fade and translate animation */}
      <Animated.View
        style={[
          styles.statsRow,
          {
            opacity: statsOpacity,
            transform: [{ translateY: statsTranslateY }],
          },
        ]}
      >
        <View style={styles.statItem}>
          <AppText style={styles.statValue}>{mockReputation.totalSaved} USDC</AppText>
          <AppText style={styles.statLabel}>Total Saved</AppText>
        </View>

        <View style={styles.statItem}>
          <AppText style={styles.statValue}>{mockReputation.activePools}</AppText>
          <AppText style={styles.statLabel}>Active Pools</AppText>
        </View>

        <View style={styles.statItem}>
          <AppText style={styles.statValue}>{mockReputation.successRate}%</AppText>
          <AppText style={styles.statLabel}>Success Rate</AppText>
        </View>
      </Animated.View>
    </Animated.View>
  )
}
