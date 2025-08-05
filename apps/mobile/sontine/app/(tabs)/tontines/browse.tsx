import React, { useState, useMemo } from 'react'
import { ScrollView, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineInput } from '@/components/ui/sontine-input'
import { SontineButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { TontineCard } from '@/components/tontine/tontine-card'
import { useAppTheme } from '@/components/app-theme'
import { Tontine } from '@/components/tontine/tontine-list'
import { USDC_DECIMALS, useSontineProgram } from '@/hooks/use-sontine-porgram'
import { getGroupStatusInfo, type GroupStatus } from '@/utils/groupStatus'

// Helper function to convert Group account data to Tontine format
const convertGroupToTontine = (groupAccount: any): Tontine => {
  const group = groupAccount.account

  // Ensure we have valid data
  if (!group) {
    throw new Error('Invalid group account data')
  }

  // Convert status from GroupStatus enum to string
  const getStatusString = (status: any): 'active' | 'pending' | 'completed' => {
    if (typeof status === 'object') {
      if (status.active !== undefined) return 'active'
      if (status.forming !== undefined) return 'pending'
      if (status.completed !== undefined) return 'completed'
      if (status.paused !== undefined) return 'pending'
      if (status.cancelled !== undefined) return 'pending'
    }
    // Fallback based on numeric values
    switch (status) {
      case 0:
        return 'pending' // Forming
      case 1:
        return 'active' // Active
      case 2:
        return 'pending' // Paused
      case 3:
        return 'completed' // Completed
      case 4:
        return 'pending' // Cancelled
      default:
        return 'pending'
    }
  }

  // Convert contribution amount from lamports to USDC
  const contributionAmount = Number(group.contributionAmount || 0) / Math.pow(10, USDC_DECIMALS)

  // Calculate total amount (contribution * max members)
  const totalAmount = contributionAmount * (group.maxMembers || 0)

  // Generate a descriptive name based on group properties
  const getGroupName = (groupId: string, selectionMethod: any): string => {
    let methodName = 'Unknown'

    if (typeof selectionMethod === 'object' && selectionMethod !== null) {
      if (selectionMethod.auction !== undefined) methodName = 'Auction'
      else if (selectionMethod.random !== undefined) methodName = 'Random'
      else if (selectionMethod.fixedOrder !== undefined) methodName = 'Fixed Order'
      else methodName = Object.keys(selectionMethod)[0] || 'Unknown'
    } else if (typeof selectionMethod === 'number') {
      switch (selectionMethod) {
        case 0:
          methodName = 'Auction'
          break
        case 1:
          methodName = 'Random'
          break
        case 2:
          methodName = 'Fixed Order'
          break
        default:
          methodName = 'Unknown'
      }
    }

    // const shortId = groupId.length > 4 ? groupId.slice(-4) : groupId
    return `# ${groupId} (${methodName})`
  }

  // Generate description based on group properties
  const getGroupDescription = (maxMembers: number, contributionAmount: number, currentMembers: number): string => {
    const memberText =
      currentMembers === maxMembers ? `${maxMembers} members` : `${currentMembers}/${maxMembers} members`
    return `${memberText} • ${contributionAmount.toFixed(2)} USDC per round`
  }

  return {
    id: groupAccount.publicKey.toString(),
    name: getGroupName(group.groupId.toString(), group.selectionMethod),
    description: getGroupDescription(group.maxMembers, contributionAmount, group.currentMembers),
    totalAmount,
    contributionAmount,
    members: group.currentMembers,
    currentRound: group.currentRound,
    totalRounds: group.totalRounds,
    nextContribution: null, // We don't have this data from the group account
    status: getStatusString(group.status),
    myTurn: false, // We don't have this data from the group account
    biddingOpen: group.selectionMethod?.auction !== undefined && getStatusString(group.status) === 'active',
    gid: group.groupId.toString(),
  }
}

export default function BrowseTontinesScreen() {
  const { spacing, colors } = useAppTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'forming' | 'active' | 'completed' | 'paused' | 'cancelled'
  >('all')

  // Use the hook to get group accounts
  const { groupAccounts } = useSontineProgram()

  const filters = [
    { key: 'all', label: 'All Groups', icon: 'list.bullet' },
    { key: 'forming', label: 'Forming', icon: 'group-add' },
    { key: 'active', label: 'Active', icon: 'add.circle.outline' },
    { key: 'completed', label: 'Completed', icon: 'workspace-premium' },
    { key: 'paused', label: 'Paused', icon: 'pause-circle' },
    { key: 'cancelled', label: 'Cancelled', icon: 'cancel' },
  ]

  // Convert group accounts to tontine format and apply filters
  const availableTontines = useMemo(() => {
    if (!groupAccounts.data) return []
    return groupAccounts.data.map(convertGroupToTontine)
  }, [groupAccounts.data])

  const filteredTontines = useMemo(() => {
    return availableTontines.filter((tontine) => {
      const matchesSearch =
        tontine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tontine.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Convert tontine status to group status format for filtering
      const getGroupStatusFromTontine = (status: string): GroupStatus => {
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

      const groupStatus = getGroupStatusFromTontine(tontine.status)
      const statusInfo = getGroupStatusInfo(groupStatus)

      const matchesFilter = selectedFilter === 'all' || statusInfo.status === selectedFilter

      return matchesSearch && matchesFilter
    })
  }, [availableTontines, searchQuery, selectedFilter])

  const renderTontine = ({ item }: { item: Tontine }) => (
    <TontineCard tontine={item} style={{ marginBottom: spacing.md }} />
  )

  return (
    <AppPage>
      <View style={{ flex: 1 }}>
        {/* Search and Filters */}
        <View
          style={{
            padding: spacing.sm,
            backgroundColor: colors.surface,
          }}
        >
          <SontineInput
            placeholder="Search tontines groups..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ marginBottom: spacing.md }}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
            {filters.map((filter) => {
              const isSelected = selectedFilter === filter.key

              // Get status color for non-'all' filters
              const getFilterColor = (key: string) => {
                if (key === 'all') return colors.primary
                const statusMap: Record<string, GroupStatus> = {
                  forming: { forming: {} },
                  active: { active: {} },
                  completed: { completed: {} },
                  paused: { paused: {} },
                  cancelled: { cancelled: {} },
                }
                const status = statusMap[key]
                return status ? getGroupStatusInfo(status).color : colors.primary
              }

              const filterColor = getFilterColor(filter.key)

              return (
                <View
                  key={filter.key}
                  style={{
                    borderColor: isSelected ? filterColor : colors.outline,

                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <SontineButton
                    variant="outline"
                    size="sm"
                    onPress={() => setSelectedFilter(filter.key as any)}
                    style={{
                      backgroundColor: isSelected ? filterColor : 'transparent',
                      borderColor: isSelected ? filterColor : colors.outline,
                      paddingHorizontal: 0,
                      paddingVertical: 0,
                      minWidth: 0,
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <UiIconSymbol
                        name={filter.icon as any}
                        size={16}
                        color={isSelected ? 'white' : filterColor}
                        style={{ marginRight: spacing.xs }}
                      />
                      <AppText
                        variant="bodyMedium"
                        style={{
                          color: isSelected ? 'white' : filterColor,
                        }}
                      >
                        {filter.label}
                      </AppText>
                    </View>
                  </SontineButton>
                </View>
              )
            })}
          </ScrollView>
        </View>

        {/* Results */}
        <View style={{ flex: 1, padding: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.sm, marginBottom: spacing.md }}>
            <AppText
              variant="titleMedium"
              style={{
                color: colors.onSurface,
                flex: 1,
              }}
            >
              {selectedFilter === 'all'
                ? `All Tontines (${filteredTontines.length})`
                : `${filters.find((f) => f.key === selectedFilter)?.label} Groups (${filteredTontines.length})`}
            </AppText>

            {selectedFilter !== 'all' && (
              <View
                style={{
                  backgroundColor:
                    getGroupStatusInfo(
                      selectedFilter === 'forming'
                        ? { forming: {} }
                        : selectedFilter === 'active'
                          ? { active: {} }
                          : selectedFilter === 'completed'
                            ? { completed: {} }
                            : selectedFilter === 'paused'
                              ? { paused: {} }
                              : { cancelled: {} },
                    ).color + '20',
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <UiIconSymbol
                  name={filters.find((f) => f.key === selectedFilter)?.icon as any}
                  size={14}
                  color={
                    getGroupStatusInfo(
                      selectedFilter === 'forming'
                        ? { forming: {} }
                        : selectedFilter === 'active'
                          ? { active: {} }
                          : selectedFilter === 'completed'
                            ? { completed: {} }
                            : selectedFilter === 'paused'
                              ? { paused: {} }
                              : { cancelled: {} },
                    ).color
                  }
                />
              </View>
            )}
          </View>

          {groupAccounts.isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={colors.primary} />
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                  marginTop: spacing.md,
                }}
              >
                Loading tontine groups...
              </AppText>
            </View>
          ) : groupAccounts.error ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.error,
                  textAlign: 'center',
                  marginBottom: spacing.md,
                }}
              >
                Error loading tontine groups
              </AppText>
              <AppText
                variant="bodySmall"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                  textAlign: 'center',
                }}
              >
                {groupAccounts.error.message}
              </AppText>
            </View>
          ) : filteredTontines.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl }}>
              {selectedFilter !== 'all' && (
                <View
                  style={{
                    backgroundColor:
                      getGroupStatusInfo(
                        selectedFilter === 'forming'
                          ? { forming: {} }
                          : selectedFilter === 'active'
                            ? { active: {} }
                            : selectedFilter === 'completed'
                              ? { completed: {} }
                              : selectedFilter === 'paused'
                                ? { paused: {} }
                                : { cancelled: {} },
                      ).color + '20',
                    padding: spacing.lg,
                    borderRadius: 50,
                    marginBottom: spacing.md,
                  }}
                >
                  <UiIconSymbol
                    name={filters.find((f) => f.key === selectedFilter)?.icon as any}
                    size={32}
                    color={
                      getGroupStatusInfo(
                        selectedFilter === 'forming'
                          ? { forming: {} }
                          : selectedFilter === 'active'
                            ? { active: {} }
                            : selectedFilter === 'completed'
                              ? { completed: {} }
                              : selectedFilter === 'paused'
                                ? { paused: {} }
                                : { cancelled: {} },
                      ).color
                    }
                  />
                </View>
              )}

              <AppText
                variant="titleMedium"
                style={{
                  color: colors.onSurface,
                  textAlign: 'center',
                  marginBottom: spacing.sm,
                }}
              >
                {availableTontines.length === 0
                  ? 'No tontine groups available yet'
                  : selectedFilter === 'all'
                    ? 'No tontines match your search'
                    : `No ${filters.find((f) => f.key === selectedFilter)?.label.toLowerCase()} groups found`}
              </AppText>

              <AppText
                variant="bodyMedium"
                style={{
                  color: colors.onSurface,
                  opacity: 0.7,
                  textAlign: 'center',
                }}
              >
                {availableTontines.length === 0
                  ? 'Create a new group or wait for others to create one'
                  : selectedFilter === 'all'
                    ? 'Try adjusting your search terms'
                    : `Try selecting a different status filter or search for specific groups`}
              </AppText>
            </View>
          ) : (
            <FlatList
              data={filteredTontines}
              renderItem={renderTontine}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: spacing.xl }}
              refreshControl={
                <RefreshControl
                  refreshing={groupAccounts.isRefetching}
                  onRefresh={() => groupAccounts.refetch()}
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                />
              }
            />
          )}
        </View>
      </View>
    </AppPage>
  )
}
