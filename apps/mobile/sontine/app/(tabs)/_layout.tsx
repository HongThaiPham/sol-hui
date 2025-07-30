import { Tabs } from 'expo-router'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00B49F', // Sontine primary color
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          paddingBottom: 4,
          height: 60,
        },
      }}
    >
      {/* The index redirects to the home screen */}
      <Tabs.Screen name="index" options={{ tabBarItemStyle: { display: 'none' } }} />

      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <UiIconSymbol size={24} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="tontines"
        options={{
          title: 'Tontines',
          tabBarIcon: ({ color }) => <UiIconSymbol size={24} name="person.3.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UiIconSymbol size={24} name="person.crop.circle.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <UiIconSymbol size={24} name="gearshape.fill" color={color} />,
        }}
      />

      {/* Hide account and demo tabs since they're moved to stacks */}
      <Tabs.Screen name="account" options={{ tabBarItemStyle: { display: 'none' } }} />
      <Tabs.Screen name="demo" options={{ tabBarItemStyle: { display: 'none' } }} />
    </Tabs>
  )
}
