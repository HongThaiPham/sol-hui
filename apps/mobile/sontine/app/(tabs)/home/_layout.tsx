import { Stack } from 'expo-router'
import React from 'react'
import { useAppTheme } from '@/components/app-theme'
import { HeaderTitleWithIcon } from '@/components/ui/header-title-with-icon'

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
          headerTitle: () => (
            <HeaderTitleWithIcon
              title="Notifications"
              iconName="bell.fill"
              iconColor={colors.onPrimary}
              textColor={colors.onPrimary}
            />
          ),
          headerBackTitle: 'Back',
          headerShown: true,
        }}
      />
    </Stack>
  )
}
