import React from 'react'
import { ScrollView, View } from 'react-native'
import { AppPage } from '@/components/app-page'
import { DashboardFeature } from '@/components/dashboard/dashboard-feature'

export default function HomeScreen() {
  return (
    <AppPage>
      <DashboardFeature />
    </AppPage>
  )
}
