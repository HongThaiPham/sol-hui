import React, { useState, useEffect, useRef } from 'react'
import { View, Alert, Animated } from 'react-native'
import { AppText } from '@/components/app-text'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'
import { useSontineProgram, CURRENCY_SYMBOL, useGetGroup } from '@/hooks/use-sontine-porgram'
import { useAnchorWallet } from '@/hooks/use-anchor-wallet'
import { Menu, IconButton } from 'react-native-paper'
import * as Haptics from 'expo-haptics'
import { getGroupStatusInfo } from '@/utils/groupStatus'

interface TontineHeaderProps {
  groupData: Awaited<ReturnType<typeof useGetGroup>>['data']
  contributionAmount: number
  totalAmount: number
  groupAddress: string
}

export function TontineHeader({ groupData, contributionAmount, totalAmount, groupAddress }: TontineHeaderProps) {
  const { spacing, colors } = useAppTheme()
  const { startGroup, startRound } = useSontineProgram()
  const anchorWallet = useAnchorWallet()
  const [menuVisible, setMenuVisible] = useState(false)

  // Check if current user is admin
  const isAdmin = anchorWallet?.publicKey?.toString() === groupData?.admin.toBase58()

  // Get group status information
  const statusInfo = getGroupStatusInfo(groupData?.status || { forming: {} })

  // Animation for forming status
  const pulseAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (statusInfo.status === 'forming') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      )
      pulse.start()
      return () => pulse.stop()
    }
  }, [statusInfo.status, pulseAnim])

  const handleStartGroup = () => {
    setMenuVisible(false)

    Alert.alert('Start Group', 'Are you sure you want to start this group? This action cannot be undone.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Start Group',
        style: 'default',
        onPress: () => {
          startGroup.mutate(groupAddress || '', {
            onSuccess: () => {
              Alert.alert('Success', 'Group started successfully!')
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            },
            onError: (error) => {
              Alert.alert('Error', `Failed to start group: ${error.message}`)
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
            },
          })
        },
      },
    ])
  }

  const handleStartRound = () => {
    setMenuVisible(false)

    const nextRoundNumber = (groupData?.currentRound || 0) + 1

    Alert.alert('Start Round', `Start round ${nextRoundNumber}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Start Round',
        style: 'default',
        onPress: () => {
          startRound.mutate(
            {
              groupAddress: groupAddress,
              roundNumber: nextRoundNumber,
            },
            {
              onSuccess: () => {
                Alert.alert('Success', `Round ${nextRoundNumber} started successfully!`)
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
              },
              onError: (error) => {
                Alert.alert('Error', `Failed to start round: ${error.message}`)
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
              },
            },
          )
        },
      },
    ])
  }

  const openMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setMenuVisible(true)
  }

  return (
    <View
      style={{
        padding: spacing.md,
        backgroundColor: colors.primary,
      }}
    >
      {/* Group Title and Admin Menu */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: spacing.xs,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
            <AppText
              variant="titleLarge"
              style={{
                color: colors.onPrimary,
                fontWeight: 'bold',
                marginRight: spacing.sm,
              }}
            >
              Group #{groupData?.groupId.toString()}
            </AppText>

            {/* Small status indicator dot */}
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: statusInfo.color,
                shadowColor: statusInfo.color,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
                elevation: 2,
              }}
            />
          </View>

          {/* Status Badge - Prominent */}
          <Animated.View
            style={{
              backgroundColor: statusInfo.color,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.xs,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginBottom: spacing.sm,
              shadowColor: statusInfo.color,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
              borderWidth: 2,
              borderColor: 'rgba(255, 255, 255, 0.3)',
              transform: [{ scale: statusInfo.status === 'forming' ? pulseAnim : 1 }],
            }}
          >
            <UiIconSymbol name={statusInfo.icon as any} size={14} color="white" style={{ marginRight: spacing.sm }} />
            <AppText
              variant="labelSmall"
              style={{
                color: 'white',
                letterSpacing: 1,
                textShadowColor: 'rgba(0, 0, 0, 0.3)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              {statusInfo.label.toUpperCase()}
            </AppText>
          </Animated.View>

          <AppText
            variant="bodyMedium"
            style={{
              color: colors.onPrimary,
              opacity: 0.9,
              marginBottom: spacing.md,
            }}
          >
            {groupData?.selectionMethod.random ? 'Random Selection' : 'Auction Based'} • {statusInfo.description}
          </AppText>
        </View>

        {/* Admin Menu */}
        {isAdmin && (
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                icon="dots-vertical"
                iconColor={colors.onPrimary}
                size={24}
                onPress={openMenu}
                style={{
                  margin: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
              />
            }
            contentStyle={{
              backgroundColor: colors.surface,
              borderRadius: 8,
            }}
          >
            {statusInfo.canStartGroup && (
              <Menu.Item
                onPress={handleStartGroup}
                title="Start Group"
                leadingIcon="play-circle"
                titleStyle={{ color: colors.onSurface }}
                disabled={startGroup.isPending}
              />
            )}

            {statusInfo.canStartRound && (
              <Menu.Item
                onPress={handleStartRound}
                title="Start Round"
                leadingIcon="timer-play"
                titleStyle={{ color: colors.onSurface }}
              />
            )}

            <Menu.Item
              onPress={() => {
                setMenuVisible(false)
                Alert.alert('Info', 'More admin features coming soon!')
              }}
              title="Group Settings"
              leadingIcon="cog"
              titleStyle={{ color: colors.onSurface }}
            />
          </Menu>
        )}
      </View>

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
            {statusInfo.isActive
              ? `${(groupData?.currentRound || 0) + 1}/${groupData?.totalRounds || groupData?.maxMembers}`
              : `0/${groupData?.totalRounds || groupData?.maxMembers}`}
          </AppText>
          <AppText
            variant="bodySmall"
            style={{
              color: colors.onPrimary,
              opacity: 0.8,
            }}
          >
            {statusInfo.isActive ? 'Current Round' : 'Total Rounds'}
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
            {groupData?.currentMembers}
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

      {/* Admin Action Hint */}
      {isAdmin && statusInfo.canStartGroup && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: spacing.md,
            paddingTop: spacing.sm,
            borderTopWidth: 1,
            borderTopColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <UiIconSymbol name="hand.tap" size={14} color={colors.onPrimary} style={{ marginRight: spacing.xs }} />
          <AppText
            variant="bodySmall"
            style={{
              color: colors.onPrimary,
              opacity: 0.8,
              fontStyle: 'italic',
            }}
          >
            Tap the menu to start this group
          </AppText>
        </View>
      )}
    </View>
  )
}
