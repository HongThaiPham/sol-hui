import React from 'react'
import { ScrollView, View } from 'react-native'
import { AppText } from '@/components/app-text'
import { SettingsAppConfig } from '@/components/settings/settings-app-config'
import { SettingsUiAccount } from '@/components/settings/settings-ui-account'
import { SettingsUiCluster } from '@/components/settings/settings-ui-cluster'
import { AppPage } from '@/components/app-page'
import { SontineButton } from '@/components/ui/sontine-button'
import { SontineCard } from '@/components/ui/sontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'
import { router } from 'expo-router'

export default function TabSettingsScreen() {
  const { spacing, colors } = useAppTheme()

  const settingsSections = [
    {
      title: 'Account & Wallet',
      description: 'Manage your wallet connection and account settings',
      icon: 'person.crop.circle.fill',
      color: colors.primary,
      component: <SettingsUiAccount />,
    },
    {
      title: 'App Configuration',
      description: 'Configure app preferences and behavior',
      icon: 'gearshape.fill',
      color: colors.secondary,
      component: <SettingsAppConfig />,
    },
    {
      title: 'Network & Cluster',
      description: 'Select Solana network and RPC endpoint',
      icon: 'network.fill',
      color: colors.secondary,
      component: <SettingsUiCluster />,
    },
  ]

  const developerTools = [
    {
      title: 'Demo & Testing',
      description: 'Access development tools and component demos',
      icon: 'ladybug.fill',
      color: '#F59E0B',
      onPress: () => router.push('/settings/demo'),
    },
  ]

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: spacing.md, paddingBottom: spacing.xl }}>
        {settingsSections.map((section, index) => (
          <SontineCard key={index} variant="default" padding="none" style={{ marginBottom: spacing.md }}>
            {/* Section Header */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: spacing.lg,
                paddingTop: spacing.lg,
                paddingBottom: spacing.md,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: `${section.color}20`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.md,
                }}
              >
                <UiIconSymbol name={section.icon as any} size={20} color={section.color} />
              </View>
              <View style={{ flex: 1 }}>
                <AppText
                  variant="titleMedium"
                  style={{
                    color: colors.onSurface,
                    fontWeight: 'bold',
                    marginBottom: spacing.xs / 2,
                  }}
                >
                  {section.title}
                </AppText>
                <AppText
                  variant="bodySmall"
                  style={{
                    color: colors.onSurface,
                    opacity: 0.7,
                  }}
                >
                  {section.description}
                </AppText>
              </View>
            </View>

            {/* Section Content */}
            <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>{section.component}</View>
          </SontineCard>
        ))}

        {/* Developer Tools Section */}
        <AppText
          variant="titleLarge"
          style={{
            color: colors.onSurface,
            fontWeight: 'bold',
            marginBottom: spacing.lg,
            marginTop: spacing.lg,
          }}
        >
          Developer Tools
        </AppText>

        {developerTools.map((tool, index) => (
          <SontineCard key={index} variant="default" padding="md" style={{ marginBottom: spacing.md }}>
            <SontineButton
              variant="ghost"
              size="lg"
              fullWidth
              onPress={tool.onPress}
              style={{
                justifyContent: 'flex-start',
                paddingHorizontal: 0,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: `${tool.color}20`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: spacing.md,
                  }}
                >
                  <UiIconSymbol name={tool.icon as any} size={20} color={tool.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <AppText
                    variant="titleSmall"
                    style={{
                      color: colors.onSurface,
                      fontWeight: 'bold',
                      marginBottom: spacing.xs / 2,
                    }}
                  >
                    {tool.title}
                  </AppText>
                  <AppText
                    variant="bodySmall"
                    style={{
                      color: colors.onSurface,
                      opacity: 0.7,
                    }}
                  >
                    {tool.description}
                  </AppText>
                </View>

                <UiIconSymbol name="arrow.right" size={16} color={colors.onSurface} style={{ opacity: 0.5 }} />
              </View>
            </SontineButton>
          </SontineCard>
        ))}

        {/* Footer Info */}
        <View
          style={{
            marginTop: spacing.xl,
            padding: spacing.md,
            backgroundColor: colors.surfaceVariant,
            borderRadius: 12,
          }}
        >
          <AppText
            variant="bodySmall"
            style={{
              color: colors.onSurface,
              opacity: 0.6,
              textAlign: 'center',
              lineHeight: 18,
            }}
          >
            Configure app info and clusters in{' '}
            <AppText style={{ fontWeight: 'bold', color: colors.primary }}>constants/app-config.tsx</AppText>
          </AppText>
        </View>
      </View>
    </ScrollView>
  )
}
