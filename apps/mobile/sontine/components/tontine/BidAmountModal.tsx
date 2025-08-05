import React, { useState } from 'react'
import { View, Modal, Pressable, Dimensions } from 'react-native'
import { AppText } from '@/components/app-text'
import { AppHeading } from '@/components/ui/typography'
import { SontineButton } from '@/components/ui/sontine-button'
import { SontineCard, SontineCardContent } from '@/components/ui/sontine-card'
import { SontineInput } from '@/components/ui/sontine-input'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { useAppTheme, type AppTheme } from '@/components/app-theme'

const { width } = Dimensions.get('window')

interface BidAmountModalProps {
  visible: boolean
  onClose: () => void
  onConfirm: (bidAmount: number) => void
  currency?: string
  isLoading?: boolean
}

const getStyles = ({ spacing }: AppTheme) => ({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: spacing.lg,
  },
  modalContainer: {
    width: width - spacing.lg * 2,
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: spacing.lg,
  },
  closeButton: {
    minWidth: 32,
    minHeight: 32,
    padding: 0,
  },
  content: {
    gap: spacing.lg,
  },
  inputContainer: {
    gap: spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row' as const,
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
})

export function BidAmountModal({
  visible,
  onClose,
  onConfirm,
  currency = 'USDC',
  isLoading = false,
}: BidAmountModalProps) {
  const theme = useAppTheme()
  const { colors } = theme
  const [bidAmount, setBidAmount] = useState('')
  const [error, setError] = useState('')

  const styles = React.useMemo(() => getStyles(theme), [theme])

  const handleConfirm = () => {
    const amount = parseFloat(bidAmount)

    // Validation
    if (!bidAmount.trim()) {
      setError('Please enter a bid amount')
      return
    }

    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount greater than 0')
      return
    }

    // Clear error and confirm
    setError('')
    onConfirm(amount)
  }

  const handleClose = () => {
    setBidAmount('')
    setError('')
    onClose()
  }

  if (!visible) return null

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalContainer}>
            <SontineCard variant="elevated" padding="lg">
              <SontineCardContent>
                <View style={styles.header}>
                  <AppHeading variant="titleMedium">Place Your Bid</AppHeading>
                </View>

                <View style={styles.content}>
                  <AppText variant="bodySmall" style={{ color: colors.onSurface, opacity: 0.7 }}>
                    Enter the amount you want to bid for this round. Higher bids have better chances of being selected.
                  </AppText>

                  <View style={styles.inputContainer}>
                    <SontineInput
                      label={`Bid Amount`}
                      placeholder="0.00"
                      value={bidAmount}
                      onChangeText={(text) => {
                        setBidAmount(text)
                        if (error) setError('')
                      }}
                      keyboardType="numeric"
                      error={!!error}
                      helperText={error}
                    />
                  </View>

                  <View style={styles.buttonContainer}>
                    <SontineButton variant="outline" onPress={handleClose} style={styles.button} disabled={isLoading}>
                      Cancel
                    </SontineButton>
                    <SontineButton
                      variant="primary"
                      onPress={handleConfirm}
                      style={styles.button}
                      disabled={isLoading}
                      loading={isLoading}
                    >
                      {isLoading ? 'Placing Bid...' : 'Place Bid'}
                    </SontineButton>
                  </View>
                </View>
              </SontineCardContent>
            </SontineCard>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
