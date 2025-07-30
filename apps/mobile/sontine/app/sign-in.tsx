import React from 'react'
import { router } from 'expo-router'
import { useAuth } from '@/components/auth/auth-provider'
import { AppText } from '@/components/app-text'
import { AppConfig } from '@/constants/app-config'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { SontineButton } from '@/components/ui/sontine-button'
import { LinearGradient } from 'expo-linear-gradient'
import { useAppTheme, type AppTheme } from '@/components/app-theme'

const getStyles = ({ spacing }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.xl,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: spacing.xxl,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: spacing.lg,
    },
    appName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#0E151A',
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      color: '#134158',
      textAlign: 'center',
      opacity: 0.8,
      lineHeight: 22,
    },
    buttonContainer: {
      width: '100%',
      marginTop: spacing.xxl,
    },
    connectButton: {
      paddingVertical: spacing.md,
      borderRadius: 16,
    },
  })

export default function SignIn() {
  const { signIn, isLoading } = useAuth()
  const theme = useAppTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme])

  return (
    <View style={styles.container}>
      {/* Beautiful gradient background from light mint to white */}
      <LinearGradient
        colors={['#8DFFF0', '#C5FFF8', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#134158" />
            </View>
          ) : (
            <View style={styles.contentContainer}>
              {/* Logo and App Info */}
              <View style={styles.logoContainer}>
                <Image source={require('../assets/images/icon.png')} style={styles.logo} />

                <AppText variant="displaySmall" style={styles.appName}>
                  {AppConfig.name}
                </AppText>

                <AppText variant="bodyLarge" style={styles.subtitle}>
                  Decentralized savings circles{'\n'}powered by Solana blockchain
                </AppText>
              </View>

              {/* Connect Wallet Button */}
              <View style={styles.buttonContainer}>
                <SontineButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  style={styles.connectButton}
                  onPress={async () => {
                    await signIn()
                    router.replace('/')
                  }}
                >
                  Connect Wallet
                </SontineButton>
              </View>
            </View>
          )}
        </SafeAreaView>
      </LinearGradient>
    </View>
  )
}
