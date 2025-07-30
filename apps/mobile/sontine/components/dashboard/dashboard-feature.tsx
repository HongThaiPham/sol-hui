import React from 'react'
import { ScrollView, View, RefreshControl, StyleSheet } from 'react-native'
import { useAppTheme, type AppTheme } from '@/components/app-theme'
import { OverviewCards } from './overview-cards'
import { QuickActions } from './quick-actions'
import { ActivityFeed } from './activity-feed'
import { ReputationDisplay } from './reputation-display'
import { GradientBackground } from '@/components/ui/gradient-background'

const getStyles = ({ spacing, colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      height: 160,
      position: 'relative',
    },
    headerContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.lg,
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

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }, [])

  const styles = React.useMemo(() => getStyles(theme), [theme])

  return (
    <View style={styles.container}>
      {/* Header with gradient background */}
      <View style={styles.header}>
        <GradientBackground variant="full-spectrum" />
        <View style={styles.headerContent}>
          <ReputationDisplay />
        </View>
      </View>

      {/* Main content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
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
      </ScrollView>
    </View>
  )
}
