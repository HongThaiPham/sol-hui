import React, { useState } from 'react'
import { ScrollView, View, Switch, Alert } from 'react-native'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

export default function SettingsScreen() {
  const { spacing, colors } = useAppTheme()

  const [settings, setSettings] = useState({
    notifications: true,
    biddingAlerts: true,
    contributionReminders: true,
    payoutNotifications: true,
    biometricAuth: false,
    darkMode: false,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          /* Handle sign out */
        },
      },
    ])
  }

  const settingSections = [
    {
      title: 'Notifications',
      items: [
        {
          key: 'notifications' as const,
          title: 'Push Notifications',
          description: 'Receive notifications for important updates',
          icon: 'bell.fill',
        },
        {
          key: 'biddingAlerts' as const,
          title: 'Bidding Alerts',
          description: 'Get notified when bidding rounds start',
          icon: 'chart.line.uptrend.xyaxis',
        },
        {
          key: 'contributionReminders' as const,
          title: 'Contribution Reminders',
          description: 'Reminders for upcoming contributions',
          icon: 'clock.fill',
        },
        {
          key: 'payoutNotifications' as const,
          title: 'Payout Notifications',
          description: 'Get notified when you receive payouts',
          icon: 'trophy.fill',
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          key: 'biometricAuth' as const,
          title: 'Biometric Authentication',
          description: 'Use fingerprint or face ID to unlock app',
          icon: 'shield.checkmark.fill',
        },
      ],
    },
    {
      title: 'Appearance',
      items: [
        {
          key: 'darkMode' as const,
          title: 'Dark Mode',
          description: 'Use dark theme for the app',
          icon: 'moon.fill',
        },
      ],
    },
  ]

  return (
    <AppPage>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: spacing.md,
          paddingBottom: spacing.xl,
        }}
      >
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={{ marginBottom: spacing.lg }}>
            <AppText
              variant="titleMedium"
              style={{
                color: colors.onSurface,

                marginBottom: spacing.md,
              }}
            >
              {section.title}
            </AppText>

            <SontineCard variant="elevated" padding="none">
              {section.items.map((item, itemIndex) => (
                <View key={item.key}>
                  <SontineCardContent style={{ padding: spacing.md }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
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
                            backgroundColor: `${colors.primary}20`,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: spacing.md,
                          }}
                        >
                          <UiIconSymbol name={item.icon as any} size={20} color={colors.primary} />
                        </View>

                        <View style={{ flex: 1 }}>
                          <AppText
                            variant="titleSmall"
                            style={{
                              color: colors.onSurface,

                              marginBottom: spacing.xs,
                            }}
                          >
                            {item.title}
                          </AppText>
                          <AppText
                            variant="bodySmall"
                            style={{
                              color: colors.onSurface,
                              opacity: 0.7,
                            }}
                          >
                            {item.description}
                          </AppText>
                        </View>
                      </View>

                      <Switch
                        value={settings[item.key]}
                        onValueChange={() => toggleSetting(item.key)}
                        trackColor={{ false: colors.outline, true: colors.primary }}
                        thumbColor={settings[item.key] ? colors.onPrimary : colors.surface}
                      />
                    </View>
                  </SontineCardContent>

                  {itemIndex < section.items.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colors.outline,
                        marginLeft: spacing.md + 40 + spacing.md,
                        marginRight: spacing.md,
                      }}
                    />
                  )}
                </View>
              ))}
            </SontineCard>
          </View>
        ))}

        {/* App Info */}
        <SontineCard variant="outlined" padding="md" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <AppText
              variant="titleSmall"
              style={{
                color: colors.onSurface,

                marginBottom: spacing.sm,
              }}
            >
              App Information
            </AppText>

            <View style={{ gap: spacing.sm }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.7 }}>
                  Version
                </AppText>
                <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                  1.0.0
                </AppText>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.7 }}>
                  Build
                </AppText>
                <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                  2024.01.15
                </AppText>
              </View>
            </View>
          </SontineCardContent>
        </SontineCard>

        {/* Sign Out */}
        <SontineButton
          variant="outline"
          size="lg"
          fullWidth
          onPress={handleSignOut}
          style={{
            borderColor: '#DC2626',
          }}
        >
          <AppText style={{ color: '#DC2626', fontWeight: 'bold' }}>Sign Out</AppText>
        </SontineButton>
      </ScrollView>
    </AppPage>
  )
}
