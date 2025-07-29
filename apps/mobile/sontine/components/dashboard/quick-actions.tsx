import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { AppText } from '@/components/app-text'
import { SontineButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

export function QuickActions() {
  const { spacing, colors } = useAppTheme()
  const router = useRouter()

  const actions = [
    {
      title: 'Browse Tontines',
      icon: 'magnifyingglass',
      variant: 'primary' as const,
      onPress: () => router.push('/(tabs)/tontines/browse'),
    },
    {
      title: 'Create Group',
      icon: 'plus.circle.fill',
      variant: 'secondary' as const,
      onPress: () => router.push('/(tabs)/tontines/create'),
    },
    {
      title: 'My Wallet',
      icon: 'wallet.pass.fill',
      variant: 'outline' as const,
      onPress: () => router.push('/(tabs)/profile/wallet'),
    },
  ]

  return (
    <View>
      <AppText variant="titleMedium" style={{ 
        marginBottom: spacing.md,
        color: colors.onSurface,
        fontWeight: 'bold',
      }}>
        Quick Actions
      </AppText>
      
      <View style={{ gap: spacing.sm }}>
        {actions.map((action, index) => (
          <SontineButton
            key={index}
            variant={action.variant}
            size="lg"
            fullWidth
            onPress={action.onPress}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.sm,
            }}
          >
            <UiIconSymbol 
              name={action.icon as any}
              size={20}
              color={
                action.variant === 'outline' ? colors.primary : colors.onPrimary
              }
            />
            {action.title}
          </SontineButton>
        ))}
      </View>
    </View>
  )
}
