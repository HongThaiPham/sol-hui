import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { AppText } from '@/components/app-text'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme, type AppTheme } from '@/components/app-theme'
import { useWalletUi } from '@/components/solana/use-wallet-ui'
import { ellipsify } from '@/utils/ellipsify'

const getStyles = ({ spacing, colors, fontFamily }: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      minHeight: 120,
      backgroundColor: colors.primary, // Same as status bar color
      paddingTop: (StatusBar.currentHeight || 0) + spacing.sm, // Account for status bar
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftSection: {
      flex: 1,
    },
    rightSection: {
      alignItems: 'flex-end',
    },
    welcomeText: {
      color: colors.surface,
      fontFamily: fontFamily.bold,
      marginBottom: spacing.xs,
    },
    userNameText: {
      color: colors.surface,
      fontSize: 18,
      fontFamily: fontFamily.bold,
      opacity: 0.95,
    },
    walletAddressText: {
      color: colors.surface,
      fontSize: 14,
      opacity: 0.8,
      marginTop: spacing.xs / 2,
      fontFamily: fontFamily.mono,
    },
    profileIconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing.lg,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: fontFamily.bold,
      marginBottom: spacing.xs / 2,
    },
    statLabel: {
      color: '#FFFFFF',
      fontSize: 12,
      opacity: 0.8,
    },
  })

// Mock user data
const mockUser = {
  name: 'Leo Pham',
  walletAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  totalContributed: 1250.5,
  activeTontines: 3,
  completedCycles: 12,
}

export function ProfileHeader() {
  const theme = useAppTheme()
  const { account } = useWalletUi()

  const styles = React.useMemo(() => getStyles(theme), [theme])

  // Get wallet address from connected account
  const walletAddress = account?.publicKey?.toString() || ''
  const displayAddress = walletAddress ? ellipsify(walletAddress, 8) : 'No wallet connected'

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          {/* Welcome text */}
          <AppText style={styles.welcomeText}>Welcome user! 👋</AppText>

          {/* User info */}
          <View>
            <AppText style={styles.userNameText}>{mockUser.name}</AppText>
            <AppText style={styles.walletAddressText}>{displayAddress}</AppText>
          </View>
        </View>

        <View style={styles.rightSection}>
          {/* Profile icon */}
          <View style={styles.profileIconContainer}>
            <UiIconSymbol name="person.crop.circle.fill" size={32} color="#FFFFFF" />
          </View>
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <AppText style={styles.statValue}>{mockUser.totalContributed} USDC</AppText>
          <AppText style={styles.statLabel}>Total Contributed</AppText>
        </View>

        <View style={styles.statItem}>
          <AppText style={styles.statValue}>{mockUser.activeTontines}</AppText>
          <AppText style={styles.statLabel}>Active Tontines</AppText>
        </View>
      </View>
    </View>
  )
}
