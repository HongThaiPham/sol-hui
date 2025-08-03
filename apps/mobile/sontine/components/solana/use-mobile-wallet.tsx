import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js'
import { SignInPayload } from '@solana-mobile/mobile-wallet-adapter-protocol'
import { Transaction, TransactionSignature, VersionedTransaction } from '@solana/web3.js'
import { useCallback, useMemo } from 'react'
import { Account, useAuthorization } from './use-authorization'

export function useMobileWallet() {
  const { authorizeSessionWithSignIn, authorizeSession, deauthorizeSessions } = useAuthorization()

  const connect = useCallback(async (): Promise<Account> => {
    return await transact(async (wallet) => {
      return await authorizeSession(wallet)
    })
  }, [authorizeSession])

  const signIn = useCallback(
    async (signInPayload: SignInPayload): Promise<Account> => {
      return await transact(async (wallet) => {
        return await authorizeSessionWithSignIn(wallet, signInPayload)
      })
    },
    [authorizeSessionWithSignIn],
  )

  const disconnect = useCallback(async (): Promise<void> => {
    await deauthorizeSessions()
  }, [deauthorizeSessions])

  const signAndSendTransaction = useCallback(
    async (transaction: Transaction | VersionedTransaction, minContextSlot: number): Promise<TransactionSignature> => {
      return await transact(async (wallet) => {
        await authorizeSession(wallet)
        const signatures = await wallet.signAndSendTransactions({
          transactions: [transaction],
          minContextSlot,
        })
        return signatures[0]
      })
    },
    [authorizeSession],
  )

  const signMessage = useCallback(
    async (message: Uint8Array): Promise<Uint8Array> => {
      return await transact(async (wallet) => {
        const authResult = await authorizeSession(wallet)
        const signedMessages = await wallet.signMessages({
          addresses: [authResult.address],
          payloads: [message],
        })
        return signedMessages[0]
      })
    },
    [authorizeSession],
  )

  const signTransaction = useCallback(
    async <T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> => {
      return await transact(async (wallet) => {
        await authorizeSession(wallet)
        const signedTransactions = await wallet.signTransactions({
          transactions: [transaction],
        })
        return signedTransactions[0]
      })
    },
    [authorizeSession],
  )

  const signAllTransactions = useCallback(
    async <T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]> => {
      return await transact(async (wallet) => {
        await authorizeSession(wallet)
        return await wallet.signTransactions({
          transactions,
        })
      })
    },
    [authorizeSession],
  )

  return useMemo(
    () => ({
      connect,
      signIn,
      disconnect,
      signAndSendTransaction,
      signMessage,
      signTransaction,
      signAllTransactions,
    }),
    [connect, disconnect, signAndSendTransaction, signIn, signMessage, signTransaction, signAllTransactions],
  )
}
