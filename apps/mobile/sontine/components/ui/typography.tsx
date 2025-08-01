import React from 'react'
import { AppText, AppTextProps } from '@/components/app-text'

// Specialized components cho các use cases cụ thể

// Heading components - luôn dùng Sans Bold
export function AppHeading({ children, ...props }: AppTextProps) {
  return (
    <AppText fontType="sans" {...props}>
      {children}
    </AppText>
  )
}

// Number/Price components - luôn dùng Mono
export function AppNumber({ children, ...props }: AppTextProps) {
  return (
    <AppText fontType="mono" numeric {...props}>
      {children}
    </AppText>
  )
}

// Code/Address components - luôn dùng Mono
export function AppCode({ children, ...props }: AppTextProps) {
  return (
    <AppText fontType="mono" variant="bodySmall" {...props}>
      {children}
    </AppText>
  )
}

// Body text components - luôn dùng Sans Regular
export function AppBody({ children, ...props }: AppTextProps) {
  return (
    <AppText fontType="sans" {...props}>
      {children}
    </AppText>
  )
}

// Label components - dùng Mono cho consistency
export function AppLabel({ children, ...props }: AppTextProps) {
  return (
    <AppText fontType="mono" variant="labelMedium" {...props}>
      {children}
    </AppText>
  )
}

// Specialized components cho Solana/Crypto
export function SolAmount({ amount, ...props }: { amount: number | string } & Omit<AppTextProps, 'children'>) {
  return <AppNumber {...props}>{typeof amount === 'number' ? amount.toLocaleString() : amount} USDC</AppNumber>
}

export function WalletAddress({
  address,
  short = true,
  ...props
}: { address: string; short?: boolean } & Omit<AppTextProps, 'children'>) {
  const displayAddress = short && address.length > 16 ? `${address.slice(0, 8)}...${address.slice(-8)}` : address

  return <AppCode {...props}>{displayAddress}</AppCode>
}

export function TransactionId({ txId, ...props }: { txId: string } & Omit<AppTextProps, 'children'>) {
  const shortTxId = `${txId.slice(0, 8)}...${txId.slice(-8)}`

  return (
    <AppCode variant="bodySmall" {...props}>
      {shortTxId}
    </AppCode>
  )
}

// Tontine specific components
export function TontineAmount({
  amount,
  currency = 'USDC',
  ...props
}: { amount: number; currency?: string } & Omit<AppTextProps, 'children'>) {
  return (
    <AppNumber {...props}>
      {amount.toLocaleString()} {currency}
    </AppNumber>
  )
}

export function TontineCount({
  count,
  label,
  ...props
}: { count: number; label: string } & Omit<AppTextProps, 'children'>) {
  return (
    <AppNumber {...props}>
      {count} {label}
    </AppNumber>
  )
}

// Status components
export function StatusText({ status, ...props }: { status: string } & Omit<AppTextProps, 'children'>) {
  return (
    <AppText fontType="sans" variant="labelSmall" {...props}>
      {status.toUpperCase()}
    </AppText>
  )
}

// Date/Time components - dùng Mono cho consistency
export function DateText({
  date,
  format = 'short',
  ...props
}: { date: Date | string; format?: 'short' | 'long' } & Omit<AppTextProps, 'children'>) {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const formatted = format === 'short' ? dateObj.toLocaleDateString() : dateObj.toLocaleString()

  return (
    <AppText fontType="mono" variant="bodySmall" {...props}>
      {formatted}
    </AppText>
  )
}
