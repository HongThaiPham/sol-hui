import { Stack } from 'expo-router'
import React from 'react'

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
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerTitle: 'Profile',
        }} 
      />
      <Stack.Screen 
        name="wallet" 
        options={{ 
          headerTitle: 'Wallet',
          headerBackTitle: 'Back',
        }} 
      />
      <Stack.Screen 
        name="history" 
        options={{ 
          headerTitle: 'Transaction History',
          headerBackTitle: 'Back',
        }} 
      />
      <Stack.Screen 
        name="reputation" 
        options={{ 
          headerTitle: 'Reputation Score',
          headerBackTitle: 'Back',
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          headerTitle: 'Settings',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  )
}
