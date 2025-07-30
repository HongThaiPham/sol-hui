import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { AppText } from '@/components/app-text'
import { SontineButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme, type AppTheme } from '@/components/app-theme'

const getStyles = ({ spacing, colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.sm,
    },
    sectionTitle: {
      marginBottom: spacing.lg,
      color: colors.onSurface,
      fontWeight: 'bold',
    },
    actionsContainer: {
      gap: spacing.md,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
    },
  })

export function QuickActions() {
  const theme = useAppTheme()
  const router = useRouter()

  const actions = [
    {
      title: 'Browse Tontines',
      icon: 'magnifyingglass',
      variant: 'primary' as const,
      iconColor: theme.colors.onPrimary,
      onPress: () => router.push('/(tabs)/tontines/browse'),
    },
    {
      title: 'Create Group',
      icon: 'plus.circle.fill',
      variant: 'accent' as const,
      iconColor: '#0E151A',
      onPress: () => router.push('/(tabs)/tontines/create'),
    },
    {
      title: 'My Wallet',
      icon: 'wallet.pass.fill',
      variant: 'navy' as const,
      iconColor: theme.colors.onPrimary,
      onPress: () => router.push('/(tabs)/profile/wallet'),
    },
  ]

  const styles = React.useMemo(() => getStyles(theme), [theme])

  return (
    <View style={styles.container}>
      <AppText variant="titleMedium" style={styles.sectionTitle}>
        Quick Actions
      </AppText>

      <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <SontineButton
            key={index}
            variant={action.variant}
            size="lg"
            fullWidth
            onPress={action.onPress}
            style={styles.buttonContent}
          >
            <UiIconSymbol name={action.icon as any} size={22} color={action.iconColor} />
            {action.title}
          </SontineButton>
        ))}
      </View>
    </View>
  )
}
