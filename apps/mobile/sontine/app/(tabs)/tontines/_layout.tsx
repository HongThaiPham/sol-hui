import { Stack } from 'expo-router'
import React from 'react'

export default function TontinesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#00B49F',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {},
      }}
    >
      <Stack.Screen
        name="browse"
        options={{
          headerTitle: 'Browse Tontines',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerTitle: 'Create Tontine',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: 'Tontine Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  )
}
