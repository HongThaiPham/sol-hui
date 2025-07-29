import React from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import { useAppTheme } from '@/components/app-theme'
import { OverviewCards } from './overview-cards'
import { QuickActions } from './quick-actions'
import { ActivityFeed } from './activity-feed'
import { ReputationDisplay } from './reputation-display'
import { GradientBackground } from '@/components/ui/gradient-background'

export function DashboardFeature() {
  const { spacing } = useAppTheme()
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRefreshing(false)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {/* Header with gradient background */}
      <View style={{ height: 120, position: 'relative' }}>
        <GradientBackground variant="teal-mint" />
        <View style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          justifyContent: 'flex-end',
          paddingHorizontal: spacing.md,
          paddingBottom: spacing.md,
        }}>
          <ReputationDisplay />
        </View>
      </View>

      {/* Main content */}
      <ScrollView
        style={{ flex: 1, backgroundColor: '#F8FFFE' }}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Overview Cards */}
        <View style={{ 
          marginTop: -spacing.lg, // Overlap with header
          paddingHorizontal: spacing.md,
          marginBottom: spacing.lg,
        }}>
          <OverviewCards />
        </View>

        {/* Quick Actions */}
        <View style={{ 
          paddingHorizontal: spacing.md,
          marginBottom: spacing.lg,
        }}>
          <QuickActions />
        </View>

        {/* Activity Feed */}
        <View style={{ 
          paddingHorizontal: spacing.md,
        }}>
          <ActivityFeed />
        </View>
      </ScrollView>
    </View>
  )
}
