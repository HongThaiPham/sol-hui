import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { AppHeading } from '@/components/ui/typography'
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
      // flexDirection: 'row',
      // alignItems: 'center',
      // justifyContent: 'center',
      // gap: spacing.sm,
    },
  })

export function QuickActions() {
  const theme = useAppTheme()
  const router = useRouter()

  const actions = [
    {
      title: 'Browse Tontines',
      icon: 'clipboard-search-outline',
      variant: 'primary' as const,
      iconColor: theme.colors.onPrimary,
      onPress: () => router.push('/(tabs)/tontines/browse'),
    },
    {
      title: 'Create Group',
      icon: 'account-group',
      variant: 'accent' as const,
      iconColor: '#0E151A',
      onPress: () => router.push('/create-group'),
    },
    {
      title: 'My Wallet',
      icon: 'wallet',
      variant: 'navy' as const,
      iconColor: theme.colors.onPrimary,
      onPress: () => router.push('/(tabs)/profile/wallet'),
    },
  ]

  const styles = React.useMemo(() => getStyles(theme), [theme])

  return (
    <View style={styles.container}>
      <AppHeading variant="titleMedium" style={styles.sectionTitle}>
        Quick Actions
      </AppHeading>

      <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <SontineButton
            key={index}
            variant={action.variant}
            size="md"
            fullWidth
            onPress={action.onPress}
            style={styles.buttonContent}
            icon={action.icon}
          >
            {action.title}
          </SontineButton>
        ))}
      </View>
    </View>
  )
}
