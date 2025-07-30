import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { AppText } from '@/components/app-text'
import { SontineButton } from '@/components/ui/sontine-button'
import { TontineList } from './tontine-list'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

export function TontinesFeature() {
  const { spacing, colors } = useAppTheme()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'pending'>('active')

  const tabs = [
    { key: 'active', label: 'Active', count: 3 },
    { key: 'pending', label: 'Pending', count: 1 },
    { key: 'completed', label: 'Completed', count: 5 },
  ]

  return (
    <View style={{ flex: 1 }}>
      {/* Header Actions */}
      <View
        style={{
          flexDirection: 'row',
          gap: spacing.sm,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
          backgroundColor: colors.background,
        }}
      >
        <SontineButton
          variant="primary"
          size="md"
          style={{ flex: 1 }}
          onPress={() => router.push('/(tabs)/tontines/browse')}
        >
          <UiIconSymbol name="magnifyingglass" size={16} color={colors.onPrimary} />
          Browse
        </SontineButton>

        <SontineButton
          variant="accent"
          size="md"
          style={{ flex: 1 }}
          onPress={() => router.push('/(tabs)/tontines/create')}
        >
          <UiIconSymbol name="plus.circle.fill" size={16} color="#0E151A" />
          Create
        </SontineButton>
      </View>

      {/* Tab Navigation */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.surface,
          paddingHorizontal: spacing.md,
          paddingTop: spacing.sm,
        }}
      >
        {tabs.map((tab) => (
          <SontineButton
            key={tab.key}
            variant={activeTab === tab.key ? 'primary' : 'ghost'}
            size="sm"
            style={{
              flex: 1,
              marginHorizontal: spacing.xs,
            }}
            onPress={() => setActiveTab(tab.key as any)}
          >
            {tab.label} ({tab.count})
          </SontineButton>
        ))}
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: spacing.md,
          paddingBottom: spacing.xl,
        }}
      >
        <TontineList filter={activeTab} />
      </ScrollView>
    </View>
  )
}
