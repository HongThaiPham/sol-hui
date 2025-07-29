import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineButton } from '@/components/ui/sontine-button'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme } from '@/components/app-theme'

// Mock tontine detail data
const mockTontineDetail = {
  id: '1',
  name: 'Family Savings Group',
  description: 'Monthly savings for family goals and emergency fund',
  totalAmount: 450,
  contributionAmount: 15,
  members: 30,
  currentRound: 12,
  totalRounds: 30,
  nextContribution: '2024-02-15',
  status: 'active' as const,
  myTurn: false,
  biddingOpen: true,
  organizer: 'John Smith',
  createdDate: '2023-06-15',
  contractAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  members_list: [
    { id: '1', name: 'John Smith', reputation: 4.9, status: 'organizer' },
    { id: '2', name: 'Sarah Johnson', reputation: 4.7, status: 'member' },
    { id: '3', name: 'Mike Chen', reputation: 4.8, status: 'member' },
    { id: '4', name: 'You', reputation: 4.6, status: 'member' },
  ],
  recentActivity: [
    { id: '1', type: 'contribution', user: 'Sarah Johnson', amount: 15, date: '2024-01-15' },
    { id: '2', type: 'payout', user: 'Mike Chen', amount: 450, date: '2024-01-10' },
    { id: '3', type: 'bidding', user: 'System', amount: 0, date: '2024-01-08' },
  ]
}

export default function TontineDetailScreen() {
  const { spacing, colors } = useAppTheme()
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'activity'>('overview')

  const tontine = mockTontineDetail // In real app, fetch by id

  const progress = (tontine.currentRound / tontine.totalRounds) * 100

  return (
    <AppPage>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          paddingBottom: spacing.xl,
        }}
      >
        {/* Header */}
        <View style={{ 
          padding: spacing.md,
          backgroundColor: colors.primary,
        }}>
          <AppText variant="titleLarge" style={{ 
            color: colors.onPrimary,
            fontWeight: 'bold',
            marginBottom: spacing.xs,
          }}>
            {tontine.name}
          </AppText>
          
          <AppText variant="bodyMedium" style={{ 
            color: colors.onPrimary,
            opacity: 0.9,
            marginBottom: spacing.md,
          }}>
            {tontine.description}
          </AppText>

          {/* Quick Stats */}
          <View style={{ 
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <View style={{ alignItems: 'center' }}>
              <AppText variant="titleMedium" style={{ 
                color: colors.onPrimary,
                fontWeight: 'bold',
              }}>
                {tontine.totalAmount} SOL
              </AppText>
              <AppText variant="bodySmall" style={{ 
                color: colors.onPrimary,
                opacity: 0.8,
              }}>
                Total Pool
              </AppText>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <AppText variant="titleMedium" style={{ 
                color: colors.onPrimary,
                fontWeight: 'bold',
              }}>
                {tontine.currentRound}/{tontine.totalRounds}
              </AppText>
              <AppText variant="bodySmall" style={{ 
                color: colors.onPrimary,
                opacity: 0.8,
              }}>
                Rounds
              </AppText>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <AppText variant="titleMedium" style={{ 
                color: colors.onPrimary,
                fontWeight: 'bold',
              }}>
                {tontine.members}
              </AppText>
              <AppText variant="bodySmall" style={{ 
                color: colors.onPrimary,
                opacity: 0.8,
              }}>
                Members
              </AppText>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={{ 
          padding: spacing.md,
          backgroundColor: colors.surface,
        }}>
          <View style={{ 
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: spacing.xs,
          }}>
            <AppText variant="bodyMedium" style={{ 
              color: colors.onSurface,
              fontWeight: '600',
            }}>
              Progress
            </AppText>
            <AppText variant="bodyMedium" style={{ 
              color: colors.onSurface,
              fontWeight: '600',
            }}>
              {Math.round(progress)}%
            </AppText>
          </View>
          
          <View style={{
            height: 8,
            backgroundColor: colors.outline,
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <View style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: colors.primary,
            }} />
          </View>
        </View>

        {/* Action Buttons */}
        {tontine.biddingOpen && (
          <View style={{ 
            padding: spacing.md,
            backgroundColor: colors.surface,
          }}>
            <SontineButton
              variant="primary"
              size="lg"
              fullWidth
              onPress={() => {/* Handle bidding */}}
            >
              <UiIconSymbol name="chart.line.uptrend.xyaxis" size={20} color={colors.onPrimary} />
              Submit Bid
            </SontineButton>
          </View>
        )}

        {/* Tab Navigation */}
        <View style={{ 
          flexDirection: 'row',
          backgroundColor: colors.surface,
          paddingHorizontal: spacing.md,
        }}>
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'members', label: 'Members' },
            { key: 'activity', label: 'Activity' },
          ].map((tab) => (
            <SontineButton
              key={tab.key}
              variant={activeTab === tab.key ? 'primary' : 'ghost'}
              size="sm"
              style={{ flex: 1, marginHorizontal: spacing.xs }}
              onPress={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </SontineButton>
          ))}
        </View>

        {/* Tab Content */}
        <View style={{ padding: spacing.md }}>
          {activeTab === 'overview' && (
            <View>
              <SontineCard variant="elevated" padding="md" style={{ marginBottom: spacing.md }}>
                <SontineCardContent>
                  <AppText variant="titleMedium" style={{ 
                    color: colors.onSurface,
                    fontWeight: 'bold',
                    marginBottom: spacing.md,
                  }}>
                    Contract Details
                  </AppText>
                  
                  <View style={{ gap: spacing.sm }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.7 }}>
                        Organizer
                      </AppText>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                        {tontine.organizer}
                      </AppText>
                    </View>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.7 }}>
                        Created
                      </AppText>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                        {tontine.createdDate}
                      </AppText>
                    </View>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface, opacity: 0.7 }}>
                        Next Contribution
                      </AppText>
                      <AppText variant="bodyMedium" style={{ color: colors.onSurface }}>
                        {tontine.nextContribution}
                      </AppText>
                    </View>
                  </View>
                </SontineCardContent>
              </SontineCard>
            </View>
          )}

          {activeTab === 'members' && (
            <View>
              {tontine.members_list.map((member) => (
                <SontineCard key={member.id} variant="default" padding="md" style={{ marginBottom: spacing.sm }}>
                  <SontineCardContent>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View>
                        <AppText variant="titleSmall" style={{ 
                          color: colors.onSurface,
                          fontWeight: 'bold',
                        }}>
                          {member.name}
                        </AppText>
                        <AppText variant="bodySmall" style={{ 
                          color: colors.onSurface,
                          opacity: 0.7,
                          textTransform: 'capitalize',
                        }}>
                          {member.status}
                        </AppText>
                      </View>
                      
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <UiIconSymbol name="star.fill" size={14} color="#FFD700" />
                        <AppText variant="bodySmall" style={{ 
                          color: colors.onSurface,
                          marginLeft: spacing.xs,
                          fontWeight: '600',
                        }}>
                          {member.reputation}
                        </AppText>
                      </View>
                    </View>
                  </SontineCardContent>
                </SontineCard>
              ))}
            </View>
          )}

          {activeTab === 'activity' && (
            <View>
              {tontine.recentActivity.map((activity) => (
                <SontineCard key={activity.id} variant="default" padding="md" style={{ marginBottom: spacing.sm }}>
                  <SontineCardContent>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View style={{ flex: 1 }}>
                        <AppText variant="titleSmall" style={{ 
                          color: colors.onSurface,
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                        }}>
                          {activity.type}
                        </AppText>
                        <AppText variant="bodyMedium" style={{ 
                          color: colors.onSurface,
                          opacity: 0.8,
                        }}>
                          {activity.user}
                          {activity.amount > 0 && ` - ${activity.amount} SOL`}
                        </AppText>
                        <AppText variant="bodySmall" style={{ 
                          color: colors.onSurface,
                          opacity: 0.6,
                        }}>
                          {activity.date}
                        </AppText>
                      </View>
                    </View>
                  </SontineCardContent>
                </SontineCard>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </AppPage>
  )
}
