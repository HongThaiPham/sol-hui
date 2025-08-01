import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

// Mock transaction history
const mockTransactions = [
  { id: '1', type: 'payout', amount: 450, description: 'Payout from Friends Circle', date: '2024-01-15', status: 'completed' },
  { id: '2', type: 'contribution', amount: 15, description: 'Contribution to Family Savings Group', date: '2024-01-10', status: 'completed' },
  { id: '3', type: 'contribution', amount: 25, description: 'Contribution to Investment Club', date: '2024-01-05', status: 'completed' },
  { id: '4', type: 'bid', amount: 0, description: 'Bid submitted for Crypto Enthusiasts', date: '2024-01-01', status: 'completed' },
  { id: '5', type: 'join', amount: 0, description: 'Joined Startup Founders Circle', date: '2023-12-28', status: 'pending' },
]

export default function TransactionHistoryScreen() {
  const { spacing, colors } = useAppTheme()
  const [filter, setFilter] = useState<'all' | 'contributions' | 'payouts' | 'bids'>('all')

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'contributions', label: 'Contributions' },
    { key: 'payouts', label: 'Payouts' },
    { key: 'bids', label: 'Bids' },
  ]

  const filteredTransactions = mockTransactions.filter(tx => {
    if (filter === 'all') return true
    if (filter === 'contributions') return tx.type === 'contribution'
    if (filter === 'payouts') return tx.type === 'payout'
    if (filter === 'bids') return tx.type === 'bid'
    return true
  })

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payout': return 'trophy.fill'
      case 'contribution': return 'dollarsign.circle.fill'
      case 'bid': return 'chart.line.uptrend.xyaxis'
      case 'join': return 'person.3.fill'
      default: return 'checkmark.circle.fill'
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'payout': return '#10B981'
      case 'contribution': return '#DC2626'
      case 'bid': return '#8B5CF6'
      case 'join': return colors.primary
      default: return colors.primary
    }
  }

  const renderTransaction = ({ item }: { item: typeof mockTransactions[0] }) => (
    <SontineCard variant="default" padding="md" style={{ marginBottom: spacing.sm }}>
      <SontineCardContent>
        <View style={{ 
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: `${getTransactionColor(item.type)}20`,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing.md,
            }}>
              <UiIconSymbol 
                name={getTransactionIcon(item.type) as any}
                size={20}
                color={getTransactionColor(item.type)}
              />
            </View>
            
            <View style={{ flex: 1 }}>
              <AppText variant="titleSmall" style={{ 
                color: colors.onSurface,
                fontWeight: 'bold',
                marginBottom: spacing.xs,
                textTransform: 'capitalize',
              }}>
                {item.type}
              </AppText>
              <AppText variant="bodyMedium" style={{ 
                color: colors.onSurface,
                opacity: 0.8,
                marginBottom: spacing.xs,
              }}>
                {item.description}
              </AppText>
              <AppText variant="bodySmall" style={{ 
                color: colors.onSurface,
                opacity: 0.6,
              }}>
                {item.date}
              </AppText>
            </View>
          </View>
          
          <View style={{ alignItems: 'flex-end' }}>
            {item.amount > 0 && (
              <AppText variant="titleSmall" style={{ 
                color: item.type === 'payout' ? '#10B981' : '#DC2626',
                fontWeight: 'bold',
                marginBottom: spacing.xs,
              }}>
                {item.type === 'payout' ? '+' : '-'}{item.amount} SOL
              </AppText>
            )}
            <View style={{
              paddingHorizontal: spacing.sm,
              paddingVertical: spacing.xs,
              borderRadius: 8,
              backgroundColor: item.status === 'completed' ? '#10B98120' : '#F59E0B20',
            }}>
              <AppText variant="bodySmall" style={{ 
                color: item.status === 'completed' ? '#10B981' : '#F59E0B',
                fontWeight: '600',
                textTransform: 'capitalize',
              }}>
                {item.status}
              </AppText>
            </View>
          </View>
        </View>
      </SontineCardContent>
    </SontineCard>
  )

  return (
    <AppPage>
      <View style={{ flex: 1 }}>
        {/* Filter Tabs */}
        <View style={{ 
          flexDirection: 'row',
          backgroundColor: colors.surface,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          gap: spacing.sm,
        }}>
          {filters.map((filterItem) => (
            <SontineButton
              key={filterItem.key}
              variant={filter === filterItem.key ? 'primary' : 'ghost'}
              size="sm"
              style={{ flex: 1 }}
              onPress={() => setFilter(filterItem.key as any)}
            >
              {filterItem.label}
            </SontineButton>
          ))}
        </View>

        {/* Transaction List */}
        <View style={{ flex: 1, padding: spacing.md }}>
          <AppText variant="titleMedium" style={{ 
            color: colors.onSurface,
            fontWeight: 'bold',
            marginBottom: spacing.md,
          }}>
            Transaction History ({filteredTransactions.length})
          </AppText>
          
          <FlatList
            data={filteredTransactions}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: spacing.xl }}
          />
        </View>
      </View>
    </AppPage>
  )
}
