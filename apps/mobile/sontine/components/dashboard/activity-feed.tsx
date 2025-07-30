import React from 'react'
import { View, FlatList } from 'react-native'
import { AppText } from '@/components/app-text'
import { AppHeading, AppBody, DateText, TontineAmount } from '@/components/ui/typography'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

// Mock activity data
const mockActivities = [
  {
    id: '1',
    type: 'contribution',
    title: 'Contribution Made',
    description: 'You contributed 15 SOL to "Family Savings Group"',
    timestamp: '2 hours ago',
    icon: 'dollarsign.circle.fill',
    color: '#00B43F', // Primary green
  },
  {
    id: '2',
    type: 'payout',
    title: 'Payout Received',
    description: 'You received 450 SOL from "Friends Circle"',
    timestamp: '1 day ago',
    icon: 'trophy.fill',
    color: '#14F1B2', // Bright mint
  },
  {
    id: '3',
    type: 'joined',
    title: 'Joined Tontine',
    description: 'You joined "Crypto Enthusiasts Group"',
    timestamp: '3 days ago',
    icon: 'person.3.fill',
    color: '#8DFFF0', // Light mint
  },
  {
    id: '4',
    type: 'bidding',
    title: 'Bidding Round',
    description: 'New bidding round started in "Investment Club"',
    timestamp: '5 days ago',
    icon: 'chart.line.uptrend.xyaxis',
    color: '#134158', // Navy blue
  },
]

export function ActivityFeed() {
  const { spacing, colors } = useAppTheme()

  const renderActivity = ({ item }: { item: (typeof mockActivities)[0] }) => (
    <SontineCard variant="default" padding="md" style={{ marginBottom: spacing.sm }}>
      <SontineCardContent>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: spacing.md,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: `${item.color}20`,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UiIconSymbol name={item.icon as any} size={20} color={item.color} />
          </View>

          <View style={{ flex: 1 }}>
            <AppText
              variant="titleSmall"
              style={{
                color: colors.onSurface,
                fontWeight: 'bold',
                marginBottom: spacing.xs,
              }}
            >
              {item.title}
            </AppText>

            <AppText
              variant="bodyMedium"
              style={{
                color: colors.onSurface,
                opacity: 0.8,
                marginBottom: spacing.xs,
              }}
            >
              {item.description}
            </AppText>

            <AppText
              variant="bodySmall"
              style={{
                color: colors.onSurface,
                opacity: 0.6,
              }}
            >
              {item.timestamp}
            </AppText>
          </View>
        </View>
      </SontineCardContent>
    </SontineCard>
  )

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.md,
        }}
      >
        <AppHeading
          variant="titleMedium"
          style={{
            color: colors.onSurface,
            fontWeight: 'bold',
          }}
        >
          Recent Activity
        </AppHeading>

        <AppText
          variant="bodySmall"
          style={{
            color: colors.primary,
            fontWeight: '500',
          }}
        >
          View All
        </AppText>
      </View>

      <FlatList
        data={mockActivities}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
