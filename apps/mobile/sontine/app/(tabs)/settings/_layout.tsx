import { WalletUiDropdown } from '@/components/solana/wallet-ui-dropdown'
import { Stack } from 'expo-router'
import React from 'react'
import { HeaderTitleWithIcon } from '@/components/ui/header-title-with-icon'

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#00B49F',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {},
        headerRight: () => <WalletUiDropdown />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <HeaderTitleWithIcon title="Settings" iconName="gearshape.fill" />,
        }}
      />
      <Stack.Screen
        name="demo"
        options={{
          headerTitle: () => <HeaderTitleWithIcon title="Demo & Testing" iconName="ladybug.fill" />,
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}
