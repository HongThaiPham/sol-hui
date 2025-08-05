import { Stack } from 'expo-router'
import React from 'react'
import { HeaderTitleWithIcon } from '@/components/ui/header-title-with-icon'

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#00B49F',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontFamily: 'PixeloidSans-Regular',
          fontSize: 16,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="wallet"
        options={{
          headerTitle: () => <HeaderTitleWithIcon title="Wallet" iconName="wallet.pass.fill" />,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          headerTitle: () => <HeaderTitleWithIcon title="Transaction History" iconName="list.bullet" />,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="reputation"
        options={{
          headerTitle: () => <HeaderTitleWithIcon title="Reputation Score" iconName="star.fill" />,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: () => <HeaderTitleWithIcon title="Settings" iconName="gearshape.fill" />,
          headerBackTitle: 'Back',
        }}
      />

      {/* Account screens moved from account tab */}
      <Stack.Screen
        name="account"
        options={{
          headerTitle: () => <HeaderTitleWithIcon title="Account Overview" iconName="person.crop.circle.fill" />,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="send"
        options={{
          headerTitle: () => <HeaderTitleWithIcon title="Send USDC" iconName="paperplane.fill" />,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="receive"
        options={{
          headerTitle: () => <HeaderTitleWithIcon title="Receive USDC" iconName="square.and.arrow.down.fill" />,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="airdrop"
        options={{
          headerTitle: () => <HeaderTitleWithIcon title="Request Airdrop" iconName="gift.fill" />,
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  )
}
