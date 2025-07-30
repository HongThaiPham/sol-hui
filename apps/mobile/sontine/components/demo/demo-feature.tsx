import { AppView } from '@/components/app-view'
import { AppHeading } from '@/components/ui/typography'
import { DemoFeatureSignMessage } from './demo-feature-sign-message'
import { ColorPaletteDemo } from './color-palette-demo'
import { FontDemo } from './font-demo'
import { TypographyDemo } from './typography-demo'
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
        <AppHeading variant="titleMedium" style={{ marginBottom: spacing.md }}>
          Demo page
        </AppHeading>
        <AppHeading fontType="sans" style={{ marginBottom: spacing.lg }}>
          Start building your features here.
        </AppHeading>

        <View style={{ marginBottom: spacing.xl }}>
          <DemoFeatureSignMessage address={account?.publicKey as PublicKey} />
        </View>

        <View style={{ marginBottom: spacing.xl }}>
          <TypographyDemo />
        </View>

        <View style={{ marginBottom: spacing.xl }}>
          <FontDemo />
        </View>

        <ColorPaletteDemo />
      </View>
    </ScrollView>
  )
}
