import React from 'react'
import { View, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'
import { Tontine } from './tontine-list'
import { CURRENCY_SYMBOL } from '@/hooks/use-sontine-porgram'
import { SontineActionButton } from '../ui/sontine-button'
import { Button } from 'react-native-paper'

interface TontineCardProps {
  tontine: Tontine
  style?: StyleProp<ViewStyle>
}

export function TontineCard({ tontine, style }: TontineCardProps) {
  const { spacing, colors } = useAppTheme()
  const router = useRouter()

  const getStatusColor = () => {
    switch (tontine.status) {
      case 'active':
        return colors.primary // Green
      case 'pending':
        return '#134158' // Navy blue
      case 'completed':
        return '#14F1B2' // Bright mint
      default:
        return colors.primary
    }
  }

  const getStatusIcon = () => {
    switch (tontine.status) {
      case 'active':
        return 'checkmark.circle.fill'
      case 'pending':
        return 'clock.fill'
      case 'completed':
        return 'trophy.fill'
      default:
        return 'checkmark.circle.fill'
    }
  }

  const progress = (tontine.currentRound / tontine.totalRounds) * 100

  return (
    <Button mode="text" onPress={() => router.push(`/(tabs)/tontines/${tontine.id}`)}>
      <SontineCard padding="md" style={{ width: '100%' }}>
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

              {/* <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                }}
              >
                {tontine.description}
              </AppText> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: `${getStatusColor()}20`,
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs,
                borderRadius: 12,
              }}
            >
              <UiIconSymbol name={getStatusIcon() as any} size={14} color={getStatusColor()} />
              <AppText
                variant="bodySmall"
                style={{
                  color: getStatusColor(),
                  fontWeight: '600',
                  marginLeft: spacing.xs,
                  textTransform: 'capitalize',
                }}
              >
                {tontine.status}
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
                Per Round
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
                Round {tontine.currentRound} of {tontine.totalRounds}
              </AppText>
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                }}
              >
                {Math.round(progress)}%
              </AppText>
            </View>

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
                  backgroundColor: getStatusColor(),
                }}
              />
            </View>
          </View>

          {/* Action Indicators */}
          {tontine.status === 'active' && (
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
        </SontineCardContent>
      </SontineCard>
    </Button>
  )
}
