import { useRouter } from 'expo-router'
import { useWalletUi } from '@/components/solana/use-wallet-ui'
import { AccountFeatureReceive } from '@/components/account/account-feature-receive'
import { AppView } from '@/components/app-view'

export default function ProfileReceive() {
  const router = useRouter()
  const { account } = useWalletUi()

  if (!account) {
    return router.replace('/(tabs)/profile')
  }

  return (
    <AppView style={{ flex: 1, padding: 16 }}>
      <AccountFeatureReceive address={account.publicKey} />
    </AppView>
  )
}
