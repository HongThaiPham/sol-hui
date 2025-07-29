import React from 'react'
import { ScrollView, View } from 'react-native'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

// Mock reputation data
const mockReputation = {
  score: 4.6,
  maxScore: 5.0,
  level: 'Trusted Member',
  totalTransactions: 47,
  successRate: 98.5,
  onTimePayments: 46,
  completedTontines: 8,
  achievements: [
    { id: '1', title: 'Early Adopter', description: 'One of the first 1000 users', icon: 'star.fill', earned: true },
    { id: '2', title: 'Reliable Member', description: '100% on-time payments', icon: 'checkmark.circle.fill', earned: true },
    { id: '3', title: 'Community Builder', description: 'Created 5+ tontines', icon: 'person.3.fill', earned: false },
    { id: '4', title: 'High Roller', description: 'Participated in 1000+ SOL tontines', icon: 'dollarsign.circle.fill', earned: false },
  ],
  reputationHistory: [
    { date: '2024-01-15', score: 4.6, change: +0.1, reason: 'Successful payout completion' },
    { date: '2024-01-01', score: 4.5, change: +0.2, reason: 'Consistent contributions' },
    { date: '2023-12-15', score: 4.3, change: +0.1, reason: 'Positive member feedback' },
  ]
}

export default function ReputationScreen() {
  const { spacing, colors } = useAppTheme()

  const getStarColor = (index: number) => {
    const fullStars = Math.floor(mockReputation.score)
    const hasHalfStar = mockReputation.score % 1 >= 0.5
    
    if (index < fullStars) {
      return '#FFD700'
    } else if (index === fullStars && hasHalfStar) {
      return '#FFD700'
    } else {
      return colors.outline
    }
  }

  return (
    <AppPage>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          padding: spacing.md,
          paddingBottom: spacing.xl,
        }}
      >
        {/* Reputation Score */}
        <SontineCard variant="elevated" padding="lg" style={{ marginBottom: spacing.lg }}>
          <SontineCardContent>
            <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
              <AppText variant="headlineLarge" style={{ 
                color: colors.onSurface,
                fontWeight: 'bold',
                marginBottom: spacing.sm,
              }}>
                {mockReputation.score}
              </AppText>
              
              <View style={{ 
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: spacing.sm,
              }}>
                {[0, 1, 2, 3, 4].map((index) => (
                  <UiIconSymbol
                    key={index}
                    name="star.fill"
                    size={24}
                    color={getStarColor(index)}
                    style={{ marginLeft: index > 0 ? 4 : 0 }}
                  />
                ))}
              </View>
              
              <AppText variant="titleMedium" style={{ 
                color: colors.primary,
                fontWeight: 'bold',
                marginBottom: spacing.xs,
              }}>
                {mockReputation.level}
              </AppText>
              
              <AppText variant="bodyMedium" style={{ 
                color: colors.onSurface,
                opacity: 0.7,
                textAlign: 'center',
              }}>
                Based on {mockReputation.totalTransactions} transactions with {mockReputation.successRate}% success rate
              </AppText>
            </View>
          </SontineCardContent>
        </SontineCard>

        {/* Stats */}
        <View style={{ 
          flexDirection: 'row',
          gap: spacing.sm,
          marginBottom: spacing.lg,
        }}>
          <SontineCard variant="outlined" padding="md" style={{ flex: 1 }}>
            <SontineCardContent>
              <AppText variant="titleMedium" style={{ 
                color: colors.onSurface,
                fontWeight: 'bold',
                marginBottom: spacing.xs,
              }}>
                {mockReputation.onTimePayments}
              </AppText>
              <AppText variant="bodySmall" style={{ 
                color: colors.onSurface,
                opacity: 0.7,
              }}>
                On-time Payments
              </AppText>
            </SontineCardContent>
          </SontineCard>

          <SontineCard variant="outlined" padding="md" style={{ flex: 1 }}>
            <SontineCardContent>
              <AppText variant="titleMedium" style={{ 
                color: colors.onSurface,
                fontWeight: 'bold',
                marginBottom: spacing.xs,
              }}>
                {mockReputation.completedTontines}
              </AppText>
              <AppText variant="bodySmall" style={{ 
                color: colors.onSurface,
                opacity: 0.7,
              }}>
                Completed Tontines
              </AppText>
            </SontineCardContent>
          </SontineCard>
        </View>

        {/* Achievements */}
        <AppText variant="titleMedium" style={{ 
          color: colors.onSurface,
          fontWeight: 'bold',
          marginBottom: spacing.md,
        }}>
          Achievements
        </AppText>

        {mockReputation.achievements.map((achievement) => (
          <SontineCard 
            key={achievement.id}
            variant="default" 
            padding="md" 
            style={{ 
              marginBottom: spacing.sm,
              opacity: achievement.earned ? 1 : 0.5,
            }}
          >
            <SontineCardContent>
              <View style={{ 
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: achievement.earned ? '#FFD70020' : colors.outline + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.md,
                }}>
                  <UiIconSymbol 
                    name={achievement.icon as any}
                    size={20}
                    color={achievement.earned ? '#FFD700' : colors.outline}
                  />
                </View>
                
                <View style={{ flex: 1 }}>
                  <AppText variant="titleSmall" style={{ 
                    color: colors.onSurface,
                    fontWeight: 'bold',
                    marginBottom: spacing.xs,
                  }}>
                    {achievement.title}
                  </AppText>
                  <AppText variant="bodySmall" style={{ 
                    color: colors.onSurface,
                    opacity: 0.7,
                  }}>
                    {achievement.description}
                  </AppText>
                </View>
                
                {achievement.earned && (
                  <UiIconSymbol 
                    name="checkmark.circle.fill"
                    size={20}
                    color="#10B981"
                  />
                )}
              </View>
            </SontineCardContent>
          </SontineCard>
        ))}

        {/* Reputation History */}
        <AppText variant="titleMedium" style={{ 
          color: colors.onSurface,
          fontWeight: 'bold',
          marginTop: spacing.lg,
          marginBottom: spacing.md,
        }}>
          Recent Changes
        </AppText>

        {mockReputation.reputationHistory.map((entry, index) => (
          <SontineCard key={index} variant="default" padding="md" style={{ marginBottom: spacing.sm }}>
            <SontineCardContent>
              <View style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <View style={{ flex: 1 }}>
                  <AppText variant="titleSmall" style={{ 
                    color: colors.onSurface,
                    fontWeight: 'bold',
                    marginBottom: spacing.xs,
                  }}>
                    {entry.reason}
                  </AppText>
                  <AppText variant="bodySmall" style={{ 
                    color: colors.onSurface,
                    opacity: 0.6,
                  }}>
                    {entry.date}
                  </AppText>
                </View>
                
                <View style={{ alignItems: 'flex-end' }}>
                  <AppText variant="titleSmall" style={{ 
                    color: entry.change > 0 ? '#10B981' : '#DC2626',
                    fontWeight: 'bold',
                  }}>
                    {entry.change > 0 ? '+' : ''}{entry.change}
                  </AppText>
                  <AppText variant="bodySmall" style={{ 
                    color: colors.onSurface,
                    opacity: 0.6,
                  }}>
                    Score: {entry.score}
                  </AppText>
                </View>
              </View>
            </SontineCardContent>
          </SontineCard>
        ))}
      </ScrollView>
    </AppPage>
  )
}
