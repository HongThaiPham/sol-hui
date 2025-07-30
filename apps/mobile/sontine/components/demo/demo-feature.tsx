import { AppView } from '@/components/app-view'
import { AppText } from '@/components/app-text'
import { DemoFeatureSignMessage } from './demo-feature-sign-message'
import { ColorPaletteDemo } from './color-palette-demo'
import { useWalletUi } from '@/components/solana/use-wallet-ui'
import { PublicKey } from '@solana/web3.js'
import { ScrollView, View } from 'react-native'
import { useAppTheme } from '@/components/app-theme'
import * as React from 'react'

export function DemoFeature() {
  const { account } = useWalletUi()
  const { spacing } = useAppTheme()

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: spacing.md }}>
        <AppText variant="titleMedium" style={{ marginBottom: spacing.md }}>
          Demo page
        </AppText>
        <AppText style={{ marginBottom: spacing.lg }}>Start building your features here.</AppText>

        <View style={{ marginBottom: spacing.xl }}>
          <DemoFeatureSignMessage address={account?.publicKey as PublicKey} />
        </View>

        <ColorPaletteDemo />
      </View>
    </ScrollView>
  )
}
