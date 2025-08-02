import React, { useState } from 'react'
import { ScrollView, View, FlatList } from 'react-native'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineInput } from '@/components/ui/sontine-input'
import { SontineButton } from '@/components/ui/sontine-button'
import { TontineCard } from '@/components/tontine/tontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'
import { Tontine } from '@/components/tontine/tontine-list'

// Mock available tontines
const mockAvailableTontines: Tontine[] = [
  {
    id: 'browse-1',
    name: 'Tech Workers Circle',
    description: 'For software engineers and tech professionals',
    totalAmount: 900,
    contributionAmount: 30,
    members: 25,
    currentRound: 3,
    totalRounds: 30,
    nextContribution: '2024-02-28',
    status: 'active',
    myTurn: false,
    biddingOpen: false,
  },
  {
    id: 'browse-2',
    name: 'Small Business Owners',
    description: 'Supporting local entrepreneurs',
    totalAmount: 1500,
    contributionAmount: 50,
    members: 28,
    currentRound: 1,
    totalRounds: 30,
    nextContribution: '2024-03-05',
    status: 'active',
    myTurn: false,
    biddingOpen: true,
  },
  {
    id: 'browse-3',
    name: 'Students Savings',
    description: 'University students saving together',
    totalAmount: 300,
    contributionAmount: 10,
    members: 30,
    currentRound: 0,
    totalRounds: 30,
    nextContribution: '2024-03-01',
    status: 'pending',
    myTurn: false,
    biddingOpen: false,
  },
]

export default function BrowseTontinesScreen() {
  const { spacing, colors } = useAppTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'low', label: '< 20 SOL' },
    { key: 'medium', label: '20-50 SOL' },
    { key: 'high', label: '> 50 SOL' },
  ]

  const filteredTontines = mockAvailableTontines.filter((tontine) => {
    const matchesSearch =
      tontine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tontine.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'low' && tontine.contributionAmount < 20) ||
      (selectedFilter === 'medium' && tontine.contributionAmount >= 20 && tontine.contributionAmount <= 50) ||
      (selectedFilter === 'high' && tontine.contributionAmount > 50)

    return matchesSearch && matchesFilter
  })

  const renderTontine = ({ item }: { item: Tontine }) => (
    <TontineCard tontine={item} style={{ marginBottom: spacing.md }} />
  )

  return (
    <AppPage>
      <View style={{ flex: 1 }}>
        {/* Search and Filters */}
        <View
          style={{
            padding: spacing.md,
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
            {filters.map((filter) => (
              <SontineButton
                key={filter.key}
                variant={selectedFilter === filter.key ? 'primary' : 'outline'}
                size="sm"
                onPress={() => setSelectedFilter(filter.key as any)}
              >
                {filter.label}
              </SontineButton>
            ))}
          </ScrollView>
        </View>

        {/* Results */}
        <View style={{ flex: 1, padding: spacing.md }}>
          <AppText
            variant="titleMedium"
            style={{
              color: colors.onSurface,
              fontWeight: 'bold',
              marginBottom: spacing.md,
            }}
          >
            Available Tontines ({filteredTontines.length})
          </AppText>

          <FlatList
            data={filteredTontines}
            renderItem={renderTontine}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: spacing.xl }}
          />
        </View>
      </View>
    </AppPage>
  )
}
