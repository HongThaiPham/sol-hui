import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineActionButton, SontineButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'
import { useGetGroup, USDC_DECIMALS, CURRENCY_SYMBOL } from '@/hooks/use-sontine-porgram'
import { MembersTab } from '@/components/tontine/MembersTab'

export default function TontineDetailScreen() {
  const { spacing, colors } = useAppTheme()
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'activity'>('overview')

  // Get group data from blockchain using the id as group address
  const groupAddress = Array.isArray(id) ? id[0] : id || ''
  const { data: groupData, isLoading, error } = useGetGroup(groupAddress)

  // If loading, show loading state
  if (isLoading) {
    return (
      <AppPage>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: spacing.xl,
          }}
        >
          <AppText variant="titleMedium" style={{ color: colors.onSurface }}>
            Loading group data...
          </AppText>
        </View>
      </AppPage>
    )
  }

  // If error or no data, show error state
  if (error || !groupData) {
    return (
      <AppPage>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: spacing.xl,
          }}
        >
          <AppText variant="titleMedium" style={{ color: colors.error }}>
            Failed to load group data
          </AppText>
          <AppText
            variant="bodyMedium"
            style={{
              color: colors.onSurface,
              opacity: 0.7,
              marginTop: spacing.sm,
              textAlign: 'center',
            }}
          >
            {error?.message || 'Group not found'}
          </AppText>
        </View>
      </AppPage>
    )
  }

  // Transform blockchain data to display format
  const contributionAmount = groupData.contributionAmount.toNumber() / 10 ** USDC_DECIMALS
  const totalAmount = contributionAmount * groupData.maxMembers
  const progress = 50 // TODO: Calculate actual progress based on current cycle

  return (
    <AppPage>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: spacing.xl,
        }}
      >
        {/* Header */}
        <View
          style={{
            padding: spacing.md,
            backgroundColor: colors.primary,
          }}
        >
          <AppText
            variant="titleLarge"
            style={{
              color: colors.onPrimary,
              fontWeight: 'bold',
              marginBottom: spacing.xs,
            }}
          >
            Group #{groupData.groupId.toString()}
          </AppText>

          <AppText
            variant="bodyMedium"
            style={{
              color: colors.onPrimary,
              opacity: 0.9,
              marginBottom: spacing.md,
            }}
          >
            {groupData.selectionMethod.random ? 'Random Selection' : 'Auction Based'} Tontine Group
          </AppText>

          {/* Quick Stats */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <AppText
                variant="titleMedium"
                style={{
                  color: colors.onPrimary,
                  fontWeight: 'bold',
                }}
              >
                {totalAmount.toFixed(2)} {CURRENCY_SYMBOL}
              </AppText>
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onPrimary,
                  opacity: 0.8,
                }}
              >
                Total Pool
              </AppText>
            </View>

            <View style={{ alignItems: 'center' }}>
              <AppText
                variant="titleMedium"
                style={{
                  color: colors.onPrimary,
                  fontWeight: 'bold',
                }}
              >
                1/{groupData.maxMembers}
              </AppText>
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onPrimary,
                  opacity: 0.8,
                }}
              >
                Rounds
              </AppText>
            </View>

            <View style={{ alignItems: 'center' }}>
              <AppText
                variant="titleMedium"
                style={{
                  color: colors.onPrimary,
                  fontWeight: 'bold',
                }}
              >
                {groupData.currentMembers}
              </AppText>
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onPrimary,
                  opacity: 0.8,
                }}
              >
                Members
              </AppText>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <View
          style={{
            padding: spacing.md,
            backgroundColor: colors.surface,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: spacing.xs,
            }}
          >
            <AppText
              variant="bodyMedium"
              style={{
                color: colors.onSurface,
                fontWeight: '600',
              }}
            >
              Progress
            </AppText>
            <AppText
              variant="bodyMedium"
              style={{
                color: colors.onSurface,
                fontWeight: '600',
              }}
            >
              {Math.round(progress)}%
            </AppText>
          </View>

          <View
            style={{
              height: 8,
              backgroundColor: colors.outline,
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: colors.primary,
              }}
            />
          </View>
        </View>

        {/* Action Buttons */}
        {groupData.selectionMethod.auction && (
          <View
            style={{
              padding: spacing.md,
              backgroundColor: colors.surface,
            }}
          >
            <SontineActionButton
              variant="primary"
              onPress={() => {
                /* Handle bidding */
              }}
              icon="chart-bell-curve-cumulative"
            >
              Submit Bid
            </SontineActionButton>
          </View>
        )}

        {/* Tab Navigation */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.surface,
            paddingHorizontal: spacing.md,
          }}
        >
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'members', label: 'Members' },
            { key: 'activity', label: 'Activity' },
          ].map((tab) => (
            <SontineButton
              key={tab.key}
              variant={activeTab === tab.key ? 'primary' : 'ghost'}
              size="sm"
              style={{ flex: 1, marginHorizontal: spacing.xs }}
              onPress={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </SontineButton>
          ))}
        </View>

        {/* Tab Content */}
        <View style={{ padding: spacing.md }}>
          {activeTab === 'overview' && (
            <View>
              <SontineCard variant="elevated" padding="md" style={{ marginBottom: spacing.md }}>
                <SontineCardContent>
                  <AppText
                    variant="titleMedium"
                    style={{
                      color: colors.onSurface,
                      fontWeight: 'bold',
                      marginBottom: spacing.md,
                    }}
                  >
                    Contract Details
                  </AppText>

                  <View style={{ gap: spacing.sm }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.7 }}>
                        Organizer
                      </AppText>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                        {groupData.admin.toBase58().slice(0, 8)}...
                      </AppText>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.7 }}>
                        Contribution Amount
                      </AppText>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                        {contributionAmount.toFixed(2)} {CURRENCY_SYMBOL}
                      </AppText>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.7 }}>
                        Max Members
                      </AppText>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                        {groupData.maxMembers}
                      </AppText>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.7 }}>
                        Min Members to Start
                      </AppText>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                        {groupData.minMembersToStart}
                      </AppText>
                    </View>
                  </View>
                </SontineCardContent>
              </SontineCard>
            </View>
          )}

          {activeTab === 'members' && <MembersTab groupAddress={groupAddress} />}

          {activeTab === 'activity' && (
            <View>
              <SontineCard variant="default" padding="md">
                <SontineCardContent>
                  <View style={{ alignItems: 'center', padding: spacing.md }}>
                    <AppText
                      variant="titleMedium"
                      style={{
                        color: colors.onSurface,
                        fontWeight: 'bold',
                        marginBottom: spacing.sm,
                      }}
                    >
                      Group Created
                    </AppText>
                    <AppText
                      variant="bodyMedium"
                      style={{
                        color: colors.onSurface,
                        opacity: 0.8,
                        textAlign: 'center',
                      }}
                    >
                      Group ID: {groupData.groupId.toString()}
                    </AppText>
                    <AppText
                      variant="bodySmall"
                      style={{
                        color: colors.onSurface,
                        opacity: 0.6,
                        textAlign: 'center',
                        marginTop: spacing.xs,
                      }}
                    >
                      Activity history will be available once the group becomes active
                    </AppText>
                  </View>
                </SontineCardContent>
              </SontineCard>
            </View>
          )}
        </View>
      </ScrollView>
    </AppPage>
  )
}
