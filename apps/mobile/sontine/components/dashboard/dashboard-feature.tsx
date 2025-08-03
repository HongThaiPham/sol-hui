import React from 'react'
import { View, RefreshControl, StyleSheet, Animated, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme, type AppTheme } from '@/components/app-theme'
import { OverviewCards } from './overview-cards'
import { QuickActions } from './quick-actions'
import { ActivityFeed } from './activity-feed'
import { ReputationDisplay } from './reputation-display'
import { GradientBackground } from '@/components/ui/gradient-background'
import { DashboardTour } from '@/components/onboarding/dashboard-tour'

const getStyles = ({ spacing, colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      position: 'relative',
      overflow: 'hidden',
    },
    headerContent: {
      position: 'absolute',
      top: 0, // Start from safe area
      left: 0,
      right: 0,
      bottom: 10, // Minimal bottom space
      justifyContent: 'flex-start',
      paddingTop: spacing.sm,
    },
    safeAreaHeader: {
      backgroundColor: 'transparent',
    },
    scrollView: {
      flex: 1,
      backgroundColor: '#F8FFFE', // Light mint background
    },
    scrollContent: {
      paddingBottom: spacing.xl,
    },
    overviewSection: {
      marginTop: -spacing.xl, // Overlap with header for card elevation effect
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xl,
    },
    quickActionsSection: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xl,
    },
    activitySection: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.lg,
    },
  })

export function DashboardFeature() {
  const theme = useAppTheme()
  const [refreshing, setRefreshing] = React.useState(false)
  const scrollY = React.useRef(new Animated.Value(0)).current

  console.log('DashboardFeature rendering...') // Debug log

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }, [])

  const styles = React.useMemo(() => getStyles(theme), [theme])

  // Animated values for header - compact but sufficient height
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [200, 80], // More compact when collapsed
    extrapolate: 'clamp',
  })

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Set status bar to match header background */}
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

      {/* Animated Header with gradient background */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <GradientBackground variant="full-spectrum" />
        <View style={styles.headerContent}>
          <ReputationDisplay scrollY={scrollY} />
        </View>
      </Animated.View>

      {/* Main content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={8}
      >
        {/* Overview Cards */}
        <View style={styles.overviewSection}>
          <OverviewCards />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <QuickActions />
        </View>

        {/* Activity Feed */}
        <View style={styles.activitySection}>
          <ActivityFeed />
        </View>
      </Animated.ScrollView>

      {/* Dashboard Tour */}
      <DashboardTour />
    </SafeAreaView>
  )
}
