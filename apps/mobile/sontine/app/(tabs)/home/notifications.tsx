import React from 'react'
import { FlatList, View } from 'react-native'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'bidding',
    title: 'Bidding Round Started',
    message: 'New bidding round has started in "Family Savings Group". Submit your bid now!',
    timestamp: '5 minutes ago',
    read: false,
    icon: 'chart.line.uptrend.xyaxis',
    color: '#8B5CF6',
  },
  {
    id: '2',
    type: 'contribution',
    title: 'Contribution Due',
    message: 'Your monthly contribution of 15 SOL is due in 2 days for "Investment Club".',
    timestamp: '2 hours ago',
    read: false,
    icon: 'clock.fill',
    color: '#F59E0B',
  },
  {
    id: '3',
    type: 'payout',
    title: 'Payout Received',
    message: 'Congratulations! You received 450 SOL from "Friends Circle".',
    timestamp: '1 day ago',
    read: true,
    icon: 'trophy.fill',
    color: '#10B981',
  },
  {
    id: '4',
    type: 'member',
    title: 'New Member Joined',
    message: 'Sarah Johnson joined your "Crypto Enthusiasts Group".',
    timestamp: '2 days ago',
    read: true,
    icon: 'person.3.fill',
    color: '#00B49F',
  },
  {
    id: '5',
    type: 'system',
    title: 'Reputation Updated',
    message: 'Your reputation score increased to 4.8 stars! Keep up the great work.',
    timestamp: '3 days ago',
    read: true,
    icon: 'star.fill',
    color: '#FFD700',
  },
]

export default function NotificationsScreen() {
  const { spacing, colors } = useAppTheme()

  const renderNotification = ({ item }: { item: (typeof mockNotifications)[0] }) => (
    <SontineCard
      variant="default"
      padding="md"
      style={{
        marginBottom: spacing.sm,
        opacity: item.read ? 0.8 : 1,
      }}
    >
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: spacing.xs,
              }}
            >
              <AppText
                variant="titleSmall"
                style={{
                  color: colors.onSurface,

                  flex: 1,
                }}
              >
                {item.title}
              </AppText>

              {!item.read && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: colors.primary,
                  }}
                />
              )}
            </View>

            <AppText
              variant="bodyMedium"
              style={{
                color: colors.onSurface,
                opacity: 0.8,
                marginBottom: spacing.xs,
              }}
            >
              {item.message}
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
    <AppPage>
      <View style={{ flex: 1, padding: spacing.md }}>
        <FlatList
          data={mockNotifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.xl }}
        />
      </View>
    </AppPage>
  )
}
