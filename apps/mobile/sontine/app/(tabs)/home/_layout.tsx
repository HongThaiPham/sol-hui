import { Stack } from 'expo-router'
import React from 'react'
import { useAppTheme } from '@/components/app-theme'

export default function HomeLayout() {
  const { colors, fontFamily, fontsLoaded } = useAppTheme()

  const getHeaderTitleStyle = () => {
    if (fontsLoaded) {
      return {
        fontFamily: fontFamily.bold, // Sử dụng PixeloidSans-Bold cho header titles
      }
    }

    return {}
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.onPrimary,
        headerTitleStyle: getHeaderTitleStyle(),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Dashboard',
          headerStyle: {
            backgroundColor: colors.primary,
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
