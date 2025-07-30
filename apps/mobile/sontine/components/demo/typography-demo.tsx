import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { useAppTheme, type AppTheme } from '@/components/app-theme'
import {
  AppHeading,
  AppBody,
  AppNumber,
  AppCode,
  AppLabel,
  SolAmount,
  WalletAddress,
  TransactionId,
  TontineAmount,
  TontineCount,
  StatusText,
  DateText,
} from '@/components/ui/typography'

const getStyles = ({ spacing, colors }: AppTheme) => StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.onSurface,
  },
  demoSection: {
    gap: spacing.sm,
  },
  demoItem: {
    paddingVertical: spacing.xs,
  },
  label: {
    fontSize: 12,
    color: colors.onSurface,
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
})

export function TypographyDemo() {
  const theme = useAppTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme])

  return (
    <View style={styles.container}>
      <AppHeading variant="headlineMedium" style={styles.sectionTitle}>
        Typography System Demo
      </AppHeading>

      {/* Headings */}
      <SontineCard variant="elevated" padding="md">
        <SontineCardContent>
          <AppHeading variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Headings (PixeloidSans-Bold)
          </AppHeading>
          
          <View style={styles.demoSection}>
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={styles.label}>Display Large</AppBody>
              <AppHeading variant="displayLarge">Welcome to Sontine</AppHeading>
            </View>
            
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={styles.label}>Headline Medium</AppBody>
              <AppHeading variant="headlineMedium">Dashboard Overview</AppHeading>
            </View>
            
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={styles.label}>Title Large</AppBody>
              <AppHeading variant="titleLarge">Quick Actions</AppHeading>
            </View>
          </View>
        </SontineCardContent>
      </SontineCard>

      {/* Body Text */}
      <SontineCard variant="accent" padding="md">
        <SontineCardContent>
          <AppHeading variant="titleMedium" style={{ color: '#0E151A', marginBottom: theme.spacing.md }}>
            Body Text (PixeloidSans-Regular)
          </AppHeading>
          
          <View style={styles.demoSection}>
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={[styles.label, { color: '#0E151A', opacity: 0.7 }]}>Body Large</AppBody>
              <AppBody variant="bodyLarge" style={{ color: '#0E151A' }}>
                This is body large text used for main content and descriptions.
              </AppBody>
            </View>
            
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={[styles.label, { color: '#0E151A', opacity: 0.7 }]}>Body Medium</AppBody>
              <AppBody variant="bodyMedium" style={{ color: '#0E151A' }}>
                Body medium text for secondary content and UI elements.
              </AppBody>
            </View>
          </View>
        </SontineCardContent>
      </SontineCard>

      {/* Numbers & Data */}
      <SontineCard variant="primary" padding="md">
        <SontineCardContent>
          <AppHeading variant="titleMedium" style={{ color: '#FFFFFF', marginBottom: theme.spacing.md }}>
            Numbers & Data (PixeloidMono-Regular)
          </AppHeading>
          
          <View style={styles.demoSection}>
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={[styles.label, { color: '#FFFFFF', opacity: 0.8 }]}>SOL Amount</AppBody>
              <SolAmount amount={1250.75} variant="headlineSmall" style={{ color: '#FFFFFF' }} />
            </View>
            
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={[styles.label, { color: '#FFFFFF', opacity: 0.8 }]}>Tontine Amount</AppBody>
              <TontineAmount amount={500} variant="titleLarge" style={{ color: '#FFFFFF' }} />
            </View>
            
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={[styles.label, { color: '#FFFFFF', opacity: 0.8 }]}>Count</AppBody>
              <TontineCount count={12} label="Active Tontines" variant="titleMedium" style={{ color: '#FFFFFF' }} />
            </View>
            
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={[styles.label, { color: '#FFFFFF', opacity: 0.8 }]}>Pure Number</AppBody>
              <AppNumber variant="headlineMedium" style={{ color: '#FFFFFF' }}>
                42,069
              </AppNumber>
            </View>
          </View>
        </SontineCardContent>
      </SontineCard>

      {/* Technical Data */}
      <SontineCard variant="navy" padding="md">
        <SontineCardContent>
          <AppHeading variant="titleMedium" style={{ color: '#FFFFFF', marginBottom: theme.spacing.md }}>
            Technical Data (PixeloidMono-Regular)
          </AppHeading>
          
          <View style={styles.demoSection}>
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={[styles.label, { color: '#FFFFFF', opacity: 0.8 }]}>Wallet Address</AppBody>
              <WalletAddress 
                address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" 
                style={{ color: '#FFFFFF' }}
              />
            </View>
            
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={[styles.label, { color: '#FFFFFF', opacity: 0.8 }]}>Transaction ID</AppBody>
              <TransactionId 
                txId="5VfYmGC9L2VTAhBjEhd4KpDskrz3VkSJMxHoYgSrHQAa" 
                style={{ color: '#FFFFFF' }}
              />
            </View>
            
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={[styles.label, { color: '#FFFFFF', opacity: 0.8 }]}>Code/Hash</AppBody>
              <AppCode style={{ color: '#FFFFFF' }}>
                0x1a2b3c4d5e6f
              </AppCode>
            </View>
            
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={[styles.label, { color: '#FFFFFF', opacity: 0.8 }]}>Date/Time</AppBody>
              <DateText date={new Date()} format="long" style={{ color: '#FFFFFF' }} />
            </View>
          </View>
        </SontineCardContent>
      </SontineCard>

      {/* Status & Labels */}
      <SontineCard variant="mint" padding="md">
        <SontineCardContent>
          <AppHeading variant="titleMedium" style={{ color: '#0E151A', marginBottom: theme.spacing.md }}>
            Status & Labels
          </AppHeading>
          
          <View style={styles.demoSection}>
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={[styles.label, { color: '#0E151A', opacity: 0.7 }]}>Status Text</AppBody>
              <StatusText status="active" style={{ color: '#0E151A' }} />
            </View>
            
            <View style={styles.demoItem}>
              <AppBody variant="bodySmall" style={[styles.label, { color: '#0E151A', opacity: 0.7 }]}>Label</AppBody>
              <AppLabel style={{ color: '#0E151A' }}>
                CONTRIBUTION AMOUNT
              </AppLabel>
            </View>
          </View>
        </SontineCardContent>
      </SontineCard>
    </View>
  )
}
