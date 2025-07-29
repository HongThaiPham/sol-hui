import { Stack } from 'expo-router'
import React from 'react'

export default function HomeLayout() {
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
          headerTitle: 'Dashboard',
          headerStyle: {
            backgroundColor: '#00B49F',
          },
        }} 
      />
      <Stack.Screen 
        name="notifications" 
        options={{ 
          headerTitle: 'Notifications',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  )
}
