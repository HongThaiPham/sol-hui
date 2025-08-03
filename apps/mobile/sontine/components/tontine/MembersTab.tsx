import React from 'react'
import { View } from 'react-native'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'
import { useGroupMembers, useGetGroup } from '@/hooks/use-sontine-porgram'

interface MembersTabProps {
  groupAddress: string
}

export function MembersTab({ groupAddress }: MembersTabProps) {
  const { spacing, colors } = useAppTheme()
  const { data: groupData } = useGetGroup(groupAddress)
  const { data: membersData, isLoading: membersLoading, error: membersError } = useGroupMembers(groupAddress)

  if (membersLoading) {
    return (
      <View>
        <SontineCard variant="default" padding="md">
          <SontineCardContent>
            <View style={{ alignItems: 'center', padding: spacing.md }}>
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                  textAlign: 'center',
                }}
              >
                Loading members...
              </AppText>
            </View>
          </SontineCardContent>
        </SontineCard>
      </View>
    )
  }

  if (membersError) {
    return (
      <View>
        <SontineCard variant="default" padding="md">
          <SontineCardContent>
            <View style={{ alignItems: 'center', padding: spacing.md }}>
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.error,
                  textAlign: 'center',
                }}
              >
                Error loading members
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
                {membersError.message}
              </AppText>
            </View>
          </SontineCardContent>
        </SontineCard>
      </View>
    )
  }

  return (
    <View>
      {/* Group Admin Card */}
      {groupData && (
        <SontineCard variant="default" padding="md" style={{ marginBottom: spacing.sm }}>
          <SontineCardContent>
            <View style={{ padding: spacing.sm }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                <UiIconSymbol name="supervised-user-circle" size={20} color={colors.primary} />
                <AppText
                  variant="titleMedium"
                  style={{
                    color: colors.onSurface,

                    marginLeft: spacing.xs,
                  }}
                >
                  Group Admin
                </AppText>
              </View>

              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  opacity: 0.8,
                  fontFamily: 'monospace',
                }}
              >
                {groupData.admin.toBase58()}
              </AppText>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: spacing.sm,
                  paddingTop: spacing.sm,
                  borderTopWidth: 1,
                  borderTopColor: colors.outline,
                }}
              >
                <AppText
                  variant="bodySmall"
                  style={{
                    color: colors.onSurface,
                    opacity: 0.6,
                  }}
                >
                  Role
                </AppText>
                <AppText
                  variant="bodySmall"
                  style={{
                    color: colors.primary,
                    fontWeight: '600',
                  }}
                >
                  Administrator
                </AppText>
              </View>
            </View>
          </SontineCardContent>
        </SontineCard>
      )}

      {/* Members List */}
      {membersData && membersData.length > 0 ? (
        <>
          <AppText
            variant="titleMedium"
            style={{
              color: colors.onSurface,

              marginBottom: spacing.sm,
              marginLeft: spacing.xs,
            }}
          >
            Members ({membersData.length})
          </AppText>

          {membersData.map((memberAccount, index) => (
            <SontineCard
              key={memberAccount.publicKey.toBase58()}
              variant="default"
              padding="md"
              style={{ marginBottom: spacing.sm }}
            >
              <SontineCardContent>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <AppText
                      variant="titleSmall"
                      style={{
                        color: colors.onSurface,
                      }}
                    >
                      Member #{index + 1}
                    </AppText>
                    <AppText
                      variant="bodyMedium"
                      style={{
                        color: colors.onSurface,
                        opacity: 0.8,
                        fontFamily: 'monospace',
                        fontSize: 12,
                      }}
                    >
                      {memberAccount.publicKey.toBase58()}
                    </AppText>
                    <AppText
                      variant="bodySmall"
                      style={{
                        color: colors.onSurface,
                        opacity: 0.6,
                        marginTop: spacing.xs,
                      }}
                    >
                      Wallet: {memberAccount.account.member.toBase58().slice(0, 8)}...
                    </AppText>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <UiIconSymbol name="person.fill" size={20} color={colors.primary} />
                    <AppText
                      variant="bodySmall"
                      style={{
                        color: colors.primary,
                        fontWeight: '600',
                        marginTop: spacing.xs,
                      }}
                    >
                      Active
                    </AppText>
                  </View>
                </View>
              </SontineCardContent>
            </SontineCard>
          ))}
        </>
      ) : (
        /* No Members Yet */
        <SontineCard variant="default" padding="md">
          <SontineCardContent>
            <View style={{ alignItems: 'center', padding: spacing.md }}>
              <UiIconSymbol name="person.2" size={32} color={colors.onSurface} style={{ opacity: 0.5 }} />
              <AppText
                variant="titleMedium"
                style={{
                  color: colors.onSurface,

                  marginTop: spacing.sm,
                  marginBottom: spacing.xs,
                }}
              >
                No Members Yet
              </AppText>
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                  textAlign: 'center',
                }}
              >
                {groupData
                  ? `Current Members: ${groupData.currentMembers} / ${groupData.maxMembers}`
                  : 'Loading group info...'}
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
                Members will appear here once they join the group
              </AppText>
            </View>
          </SontineCardContent>
        </SontineCard>
      )}
    </View>
  )
}
