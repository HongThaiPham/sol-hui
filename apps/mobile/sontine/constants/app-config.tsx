import { clusterApiUrl } from '@solana/web3.js'
import { Cluster } from '@/components/cluster/cluster'
import { ClusterNetwork } from '@/components/cluster/cluster-network'

export class AppConfig {
  static name = 'Sontine'
  static tagline = 'Tontine Meets Blockchain'
  static description =
    'Join the future of rotating savings with Sontine. Built on Solana blockchain for transparent, automated, and global tontine groups.'
  static uri = 'https://sontine.fun'
  static version = '1.0.0'
  static build = '2024.01.15'

  static clusters: Cluster[] = [
    {
      id: 'solana:devnet',
      name: 'Devnet',
      endpoint: clusterApiUrl('devnet'),
      network: ClusterNetwork.Devnet,
    },
    {
      id: 'solana:testnet',
      name: 'Testnet',
      endpoint: clusterApiUrl('testnet'),
      network: ClusterNetwork.Testnet,
    },
  ]

  static features = {
    notifications: true,
    biometricAuth: true,
    darkMode: true,
    multiLanguage: false,
  }

  static limits = {
    maxTontinesPerUser: 10,
    minContributionAmount: 0.1, // SOL
    maxContributionAmount: 1000, // SOL
    maxMembersPerTontine: 50,
    minMembersPerTontine: 3,
  }
}
