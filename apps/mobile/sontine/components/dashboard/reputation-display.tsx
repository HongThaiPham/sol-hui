import React from 'react'
import { View } from 'react-native'
import { AppText } from '@/components/app-text'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

// Mock reputation data
const mockReputation = {
  score: 4.8,
  maxScore: 5.0,
  level: 'Trusted Member',
  totalTransactions: 47,
  successRate: 98.5,
}

export function ReputationDisplay() {
  const { spacing, colors } = useAppTheme()

  const getStarColor = (index: number) => {
    const fullStars = Math.floor(mockReputation.score)
    const hasHalfStar = mockReputation.score % 1 >= 0.5
    
    if (index < fullStars) {
      return '#FFD700' // Gold for full stars
    } else if (index === fullStars && hasHalfStar) {
      return '#FFD700' // Gold for half star (simplified)
    } else {
      return '#FFFFFF50' // Semi-transparent white for empty stars
    }
  }

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <View style={{ flex: 1 }}>
        <AppText variant="titleMedium" style={{ 
          color: '#FFFFFF',
          fontWeight: 'bold',
          marginBottom: spacing.xs,
        }}>
          Welcome back! 👋
        </AppText>
        
        <AppText variant="bodyMedium" style={{ 
          color: '#FFFFFF',
          opacity: 0.9,
        }}>
          {mockReputation.level}
        </AppText>
      </View>
      
      <View style={{ alignItems: 'flex-end' }}>
        <View style={{ 
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: spacing.xs,
        }}>
          {[0, 1, 2, 3, 4].map((index) => (
            <UiIconSymbol
              key={index}
              name="star.fill"
              size={16}
              color={getStarColor(index)}
              style={{ marginLeft: index > 0 ? 2 : 0 }}
            />
          ))}
          <AppText variant="bodySmall" style={{ 
            color: '#FFFFFF',
            marginLeft: spacing.xs,
            fontWeight: 'bold',
          }}>
            {mockReputation.score}
          </AppText>
        </View>
        
        <AppText variant="bodySmall" style={{ 
          color: '#FFFFFF',
          opacity: 0.8,
        }}>
          {mockReputation.totalTransactions} transactions
        </AppText>
      </View>
    </View>
  )
}
