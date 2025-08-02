import React from 'react'
import { FlatList, View } from 'react-native'
import { TontineCard } from './tontine-card'
import { AppText } from '@/components/app-text'
import { useAppTheme } from '@/components/app-theme'

export interface Tontine {
  id: string
  name: string
  description: string
  totalAmount: number
  contributionAmount: number
  members: number
  currentRound: number
  totalRounds: number
  nextContribution: string | null
  status: 'active' | 'pending' | 'completed'
  myTurn: boolean
  biddingOpen: boolean
}

// Mock tontine data
const mockTontines = {
  active: [
    {
      id: '1',
      name: 'Family Savings Group',
      description: 'Monthly savings for family goals',
      totalAmount: 450,
      contributionAmount: 15,
      members: 30,
      currentRound: 12,
      totalRounds: 30,
      nextContribution: '2024-02-15',
      status: 'active' as const,
      myTurn: false,
      biddingOpen: true,
    },
    {
      id: '2',
      name: 'Investment Club',
      description: 'High-yield investment tontine',
      totalAmount: 1200,
      contributionAmount: 40,
      members: 30,
      currentRound: 8,
      totalRounds: 30,
      nextContribution: '2024-02-20',
      status: 'active' as const,
      myTurn: true,
      biddingOpen: false,
    },
    {
      id: '3',
      name: 'Crypto Enthusiasts',
      description: 'For crypto lovers and HODLers',
      totalAmount: 750,
      contributionAmount: 25,
      members: 30,
      currentRound: 5,
      totalRounds: 30,
      nextContribution: '2024-02-25',
      status: 'active' as const,
      myTurn: false,
      biddingOpen: false,
    },
  ],
  pending: [
    {
      id: '4',
      name: 'Startup Founders Circle',
      description: 'Exclusive group for entrepreneurs',
      totalAmount: 3000,
      contributionAmount: 100,
      members: 25,
      currentRound: 0,
      totalRounds: 30,
      nextContribution: '2024-03-01',
      status: 'pending' as const,
      myTurn: false,
      biddingOpen: false,
    },
  ],
  completed: [
    {
      id: '5',
      name: 'Friends Circle',
      description: 'Close friends saving together',
      totalAmount: 600,
      contributionAmount: 20,
      members: 30,
      currentRound: 30,
      totalRounds: 30,
      nextContribution: null,
      status: 'completed' as const,
      myTurn: false,
      biddingOpen: false,
    },
  ],
}

interface TontineListProps {
  filter: 'active' | 'pending' | 'completed'
}

export function TontineList({ filter }: TontineListProps) {
  const { spacing, colors } = useAppTheme()
  const data = mockTontines[filter]

  const renderTontine = ({ item }: { item: Tontine }) => (
    <TontineCard tontine={item} style={{ marginBottom: spacing.md }} />
  )

  if (data.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: spacing.xxl,
        }}
      >
        <AppText
          variant="titleMedium"
          style={{
            color: colors.onSurface,
            opacity: 0.6,
            textAlign: 'center',
          }}
        >
          No {filter} tontines found
        </AppText>
        <AppText
          variant="bodyMedium"
          style={{
            color: colors.onSurface,
            opacity: 0.5,
            textAlign: 'center',
            marginTop: spacing.sm,
          }}
        >
          {filter === 'active' && 'Join or create a tontine to get started'}
          {filter === 'pending' && 'Your pending applications will appear here'}
          {filter === 'completed' && 'Completed tontines will be shown here'}
        </AppText>
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      renderItem={renderTontine}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  )
}
