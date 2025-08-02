import { useConnection } from '@/components/solana/solana-provider'
import { useAnchorWallet } from './use-anchor-wallet'
import * as anchor from '@coral-xyz/anchor'
import { AnchorProvider, Program } from '@coral-xyz/anchor'

import idl from '@/assets/idls/sontine.json'
import { Sontine } from '@/assets/idls/sontine'
import { useMemo } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { CycleDuration, SelectionMethod } from '@/utils/sontine.type'

// Define AuctionConfig type locally since it's not exported from sontine.type
type AuctionConfig = {
  auctionDuration: number
  minBidIncrement: number
  maxInterestRate: number
}

const USDC_MINT = 'A43qEjwWtEkNUzSxd1d9eEe6tDhwR12wFnRdA1gGRvxG'
const USDC_DECIMALS = 6

export function useSontineProgram() {
  const connection = useConnection()
  const anchorWallet = useAnchorWallet()

  // Create provider when wallet is available
  const provider = useMemo(() => {
    if (!anchorWallet) {
      return
    }
    return new AnchorProvider(connection, anchorWallet, {
      preflightCommitment: 'confirmed',
      commitment: 'processed',
    })
  }, [anchorWallet, connection])

  // Initialize program with provider
  const sontineProgram = useMemo(() => {
    if (!provider) {
      console.log('Provider is not available, cannot initialize program')
      return
    }

    // Create program instance with correct argument order
    const program = new Program(idl as unknown as anchor.Idl, provider) as Program<Sontine>

    console.log('Sontine program initialized with ID:', program.programId.toBase58())
    return program
  }, [provider])

  const groupAccounts = useQuery({
    queryKey: ['get-group-accounts'],
    queryFn: async () => {
      if (!sontineProgram) {
        return []
      }

      const accounts = await sontineProgram.account.group.all()
      return accounts
    },
    enabled: !!sontineProgram,
  })

  // Reset counter mutation
  const createGroup = useMutation({
    mutationKey: ['create-group'],
    mutationFn: async (payload: {
      selectionMethod: SelectionMethod
      maxMembers: number
      contributionAmount: number
      cycleDuration: CycleDuration
      minMembersToStart: number
      auctionConfig: AuctionConfig | null
    }) => {
      if (!sontineProgram) {
        throw Error('Counter program not instantiated')
      }

      console.log('Creating group')
      const groupId = new anchor.BN(Math.floor(Math.random() * 1000000))

      console.log({
        yyy: payload.contributionAmount,
        xxx: new anchor.BN(payload.contributionAmount * 10 ** USDC_DECIMALS),
      })

      return await sontineProgram.methods
        .createGroup(
          groupId,
          payload.selectionMethod,
          payload.maxMembers,
          new anchor.BN(payload.contributionAmount * 10 ** USDC_DECIMALS),
          payload.cycleDuration,
          payload.minMembersToStart,
          payload.auctionConfig,
        )
        .accounts({
          admin: anchorWallet?.publicKey,
          mint: USDC_MINT,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
        })
        .rpc()
    },
    onSuccess: async (signature: string) => {
      console.log('Group created:', signature)
      const { value: latestBlockhash } = await connection.getLatestBlockhashAndContext()
      await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')
      await groupAccounts.refetch()
    },
    onError: (error: Error) => {
      console.log('Create group error:', error)
    },
  })

  return {
    sontineProgram,
    groupAccounts,
    createGroup,
  }
}
