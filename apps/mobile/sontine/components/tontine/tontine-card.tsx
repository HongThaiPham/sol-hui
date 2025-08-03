import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import { useRouter } from 'expo-router'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'
import { Tontine } from './tontine-list'
import { CURRENCY_SYMBOL } from '@/hooks/use-sontine-porgram'
import { Button } from 'react-native-paper'
import { getGroupStatusInfo, formatGroupStatus, type GroupStatus } from '@/utils/groupStatus'

interface TontineCardProps {
  tontine: Tontine
  style?: StyleProp<ViewStyle>
}

export function TontineCard({ tontine, style }: TontineCardProps) {
  const { spacing, colors } = useAppTheme()
  const router = useRouter()

  // Convert old status format to new GroupStatus format
  const convertToGroupStatus = (status: string): GroupStatus => {
    switch (status) {
      case 'active':
        return { active: {} }
      case 'pending':
        return { forming: {} }
      case 'completed':
        return { completed: {} }
      default:
        return { forming: {} }
    }
  }

  // Get status information using utility function
  const groupStatus = convertToGroupStatus(tontine.status)
  const statusInfo = getGroupStatusInfo(groupStatus)

  const progress = ((tontine.currentRound + 1) / tontine.totalRounds) * 100

  return (
    <Button mode="text" onPress={() => router.push(`/(tabs)/tontines/${tontine.id}`)}>
      <SontineCard padding="sm" style={{ width: '100%' }}>
        <SontineCardContent>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: spacing.md,
            }}
          >
            <View style={{ flex: 1 }}>
              <AppText
                variant="titleMedium"
                style={{
                  color: colors.onSurface,
                  marginBottom: spacing.xs,
                }}
              >
                {tontine.name}
              </AppText>

              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                }}
              >
                {statusInfo.description}
              </AppText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: `${statusInfo.color}20`,
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs,
                borderRadius: 12,
              }}
            >
              <UiIconSymbol name={statusInfo.icon as any} size={14} color={statusInfo.color} />
              <AppText
                variant="bodySmall"
                style={{
                  color: statusInfo.color,
                  fontWeight: '600',
                  marginLeft: spacing.xs,
                  textTransform: 'capitalize',
                }}
              >
                {statusInfo.label}
              </AppText>
            </View>
          </View>

          {/* Stats */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: spacing.md,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <AppText
                variant="titleSmall"
                style={{
                  color: colors.onSurface,
                }}
              >
                {tontine.totalAmount} {CURRENCY_SYMBOL}
              </AppText>
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onSurface,
                  opacity: 0.6,
                }}
              >
                Total Pool
              </AppText>
            </View>

            <View style={{ alignItems: 'center' }}>
              <AppText
                variant="titleSmall"
                style={{
                  color: colors.onSurface,
                }}
              >
                {tontine.contributionAmount} {CURRENCY_SYMBOL}
              </AppText>
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onSurface,
                  opacity: 0.6,
                }}
              >
                {statusInfo.status === 'forming' ? 'To Join' : 'Per Round'}
              </AppText>
            </View>

            <View style={{ alignItems: 'center' }}>
              <AppText
                variant="titleSmall"
                style={{
                  color: colors.onSurface,
                }}
              >
                {tontine.members}
              </AppText>
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onSurface,
                  opacity: 0.6,
                }}
              >
                Members
              </AppText>
            </View>
          </View>

          {/* Status-specific Information */}
          {!statusInfo.isActive && (
            <View
              style={{
                backgroundColor: `${statusInfo.color}10`,
                padding: spacing.sm,
                borderRadius: 8,
                marginBottom: spacing.md,
                borderLeftWidth: 3,
                borderLeftColor: statusInfo.color,
              }}
            >
              <AppText
                variant="bodySmall"
                style={{
                  color: statusInfo.color,
                  fontWeight: '600',
                }}
              >
                {statusInfo.status === 'forming' && 'Accepting new members'}
                {statusInfo.status === 'completed' && 'All rounds completed successfully'}
                {statusInfo.status === 'paused' && 'Temporarily suspended'}
                {statusInfo.status === 'cancelled' && 'Group has been disbanded'}
              </AppText>
            </View>
          )}

          {/* Progress */}
          <View style={{ marginBottom: spacing.md }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: spacing.xs,
              }}
            >
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                }}
              >
                {statusInfo.isActive
                  ? `Round ${tontine.currentRound + 1} of ${tontine.totalRounds}`
                  : `${tontine.totalRounds} Rounds Total`}
              </AppText>
              {statusInfo.isActive && (
                <AppText
                  variant="bodySmall"
                  style={{
                    color: colors.onSurface,
                    opacity: 0.7,
                  }}
                >
                  {Math.round(progress)}%
                </AppText>
              )}
            </View>

            {statusInfo.isActive && (
              <View
                style={{
                  height: 4,
                  backgroundColor: colors.outline,
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: statusInfo.color,
                  }}
                />
              </View>
            )}
          </View>

          {/* Action Indicators */}
          {statusInfo.isActive && (
            <View
              style={{
                flexDirection: 'row',
                gap: spacing.sm,
              }}
            >
              {tontine.myTurn && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#14F1B220', // Light mint background
                    paddingHorizontal: spacing.sm,
                    paddingVertical: spacing.xs,
                    borderRadius: 8,
                    flex: 1,
                  }}
                >
                  <UiIconSymbol name="trophy.fill" size={14} color="#14F1B2" />
                  <AppText
                    variant="bodySmall"
                    style={{
                      color: '#14F1B2',
                      fontWeight: '600',
                      marginLeft: spacing.xs,
                    }}
                  >
                    Your Turn!
                  </AppText>
                </View>
              )}

              {tontine.biddingOpen && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#13415820', // Navy background
                    paddingHorizontal: spacing.sm,
                    paddingVertical: spacing.xs,
                    borderRadius: 8,
                    flex: 1,
                  }}
                >
                  <UiIconSymbol name="chart.line.uptrend.xyaxis" size={14} color="#134158" />
                  <AppText
                    variant="bodySmall"
                    style={{
                      color: '#134158',
                      fontWeight: '600',
                      marginLeft: spacing.xs,
                    }}
                  >
                    Bidding Open
                  </AppText>
                </View>
              )}
            </View>
          )}

          {/* Status-specific Call to Action */}
          {statusInfo.status === 'forming' && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: `${statusInfo.color}15`,
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs,
                borderRadius: 8,
                marginTop: spacing.sm,
              }}
            >
              <UiIconSymbol name="badge" size={14} color={statusInfo.color} />
              <AppText
                variant="bodySmall"
                style={{
                  color: statusInfo.color,
                  fontWeight: '600',
                  marginLeft: spacing.xs,
                }}
              >
                Join this group
              </AppText>
            </View>
          )}
        </SontineCardContent>
      </SontineCard>
    </Button>
  )
}
