import React, { useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineActionButton, SontineButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'
import {
  useGetGroup,
  USDC_DECIMALS,
  CURRENCY_SYMBOL,
  useMemberAccount,
  useSontineProgram,
} from '@/hooks/use-sontine-porgram'
import { MembersTab } from '@/components/tontine/MembersTab'
import { RoundInfo } from '@/components/tontine/RoundInfo'
import { TontineHeader } from '@/components/tontine/TontineHeader'
import { useAnchorWallet } from '@/hooks/use-anchor-wallet'
import { getGroupStatusInfo } from '@/utils/groupStatus'

import * as Haptics from 'expo-haptics'

export default function TontineDetailScreen() {
  const { spacing, colors } = useAppTheme()
  const { id } = useLocalSearchParams()
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'activity'>('overview')

  // Get group data from blockchain using the id as group address
  const groupAddress = Array.isArray(id) ? id[0] : id || ''
  const { data: groupData, isLoading, error } = useGetGroup(groupAddress)

  // Get current user's wallet and check membership
  const anchorWallet = useAnchorWallet()
  const { joinGroup } = useSontineProgram()
  const currentUserAddress = anchorWallet?.publicKey?.toString() || ''

  // Check if current user is already a member of this group
  const { data: memberAccount, isLoading: memberLoading } = useMemberAccount(groupAddress, currentUserAddress)

  // Determine if user is a member (memberAccount exists and is not null)
  const isUserMember = !!memberAccount

  // Get group status information
  const statusInfo = getGroupStatusInfo(groupData?.status || { forming: {} })

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

  return (
    <AppPage>
      <Stack.Screen
        options={{
          headerTitle: `Tontine #${groupData.groupId.toString()}`,
          headerBackTitle: 'Back',
        }}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: spacing.xl,
        }}
      >
        {/* Header */}
        <TontineHeader
          groupAddress={groupAddress}
          groupData={groupData}
          contributionAmount={contributionAmount}
          totalAmount={totalAmount}
        />

        {/* Membership Status & Join Group */}
        <View
          style={{
            padding: spacing.md,
            backgroundColor: colors.surface,
          }}
        >
          {memberLoading ? (
            <View style={{ alignItems: 'center', padding: spacing.sm }}>
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                }}
              >
                Checking membership status...
              </AppText>
            </View>
          ) : isUserMember ? (
            // User is already a member
            <SontineCard variant="elevated" padding="md">
              <SontineCardContent>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <UiIconSymbol
                    name="checkmark.circle.fill"
                    size={24}
                    color={colors.primary}
                    style={{ marginRight: spacing.sm }}
                  />
                  <AppText
                    variant="titleMedium"
                    style={{
                      color: colors.primary,
                    }}
                  >
                    You are a {groupData.admin.toBase58() === currentUserAddress ? 'Admin' : 'Member'} of this group
                  </AppText>
                </View>
                <AppText
                  variant="bodyMedium"
                  style={{
                    color: colors.onSurface,
                    opacity: 0.8,
                    textAlign: 'center',
                    marginTop: spacing.xs,
                  }}
                >
                  {groupData.admin.toBase58() === currentUserAddress
                    ? 'You can manage the group and view activities'
                    : 'You can participate in contributions and activities'}
                </AppText>
              </SontineCardContent>
            </SontineCard>
          ) : statusInfo.canJoin && anchorWallet ? (
            // User is not a member but can join
            <View>
              <SontineActionButton
                variant="outline"
                onPress={() => {
                  joinGroup.mutate(groupAddress, {
                    onSuccess: () => {
                      Alert.alert('Success', 'Joined group successfully!')
                      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                    },
                    onError: () => {
                      Alert.alert('Error', 'Failed to join group')
                      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                    },
                  })
                }}
                icon="account-group"
                disabled={joinGroup.isPending}
                loading={joinGroup.isPending}
              >
                {joinGroup.isPending ? 'Joining Group...' : 'Join Group'}
              </SontineActionButton>

              {/* Show error message if join failed */}
              {joinGroup.error && (
                <View style={{ marginTop: spacing.sm }}>
                  <AppText
                    variant="bodySmall"
                    style={{
                      color: colors.error,
                      textAlign: 'center',
                    }}
                  >
                    Failed to join group: {joinGroup.error.message}
                  </AppText>
                </View>
              )}
            </View>
          ) : !anchorWallet ? (
            // User needs to connect wallet
            <SontineCard variant="outlined" padding="md">
              <SontineCardContent>
                <View style={{ alignItems: 'center' }}>
                  <UiIconSymbol
                    name="wallet.pass"
                    size={24}
                    color={colors.outline}
                    style={{ marginBottom: spacing.sm }}
                  />
                  <AppText
                    variant="titleMedium"
                    style={{
                      color: colors.onSurface,

                      textAlign: 'center',
                      marginBottom: spacing.xs,
                    }}
                  >
                    Connect Wallet to Join
                  </AppText>
                  <AppText
                    variant="bodyMedium"
                    style={{
                      color: colors.onSurface,
                      opacity: 0.7,
                      textAlign: 'center',
                    }}
                  >
                    Connect your wallet to join this tontine group
                  </AppText>
                </View>
              </SontineCardContent>
            </SontineCard>
          ) : (
            // Group cannot accept new members
            <SontineCard variant="outlined" padding="md">
              <SontineCardContent>
                <View style={{ alignItems: 'center' }}>
                  <UiIconSymbol
                    name={statusInfo.icon as any}
                    size={24}
                    color={statusInfo.color}
                    style={{ marginBottom: spacing.sm }}
                  />
                  <AppText
                    variant="titleMedium"
                    style={{
                      color: colors.onSurface,

                      textAlign: 'center',
                      marginBottom: spacing.xs,
                    }}
                  >
                    Group {statusInfo.label}
                  </AppText>
                  <AppText
                    variant="bodyMedium"
                    style={{
                      color: colors.onSurface,
                      opacity: 0.7,
                      textAlign: 'center',
                    }}
                  >
                    {statusInfo.description}
                  </AppText>
                </View>
              </SontineCardContent>
            </SontineCard>
          )}
        </View>

        {/* Round Information */}
        <View
          style={{
            padding: spacing.md,
            backgroundColor: colors.surface,
          }}
        >
          <RoundInfo
            groupData={groupData}
            isUserMember={isUserMember}
            showActions={true}
            isCurrentRound={true}
            groupAddress={groupAddress}
          />
        </View>

        {/* Tab Navigation */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.surface,
            paddingHorizontal: spacing.md,
          }}
        >
          {[
            { key: 'overview', label: 'Overview', icon: 'info.circle.fill' },
            { key: 'members', label: 'Members', icon: 'person.3.fill' },
            { key: 'activity', label: 'Activity', icon: 'chart.line.uptrend.xyaxis' },
          ].map((tab) => (
            <SontineButton
              key={tab.key}
              variant={activeTab === tab.key ? 'primary' : 'ghost'}
              size="sm"
              style={{ flex: 1, marginHorizontal: spacing.xs }}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <UiIconSymbol
                name={tab.icon as any}
                size={20}
                color={activeTab === tab.key ? colors.onPrimary : colors.primary}
              />
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
