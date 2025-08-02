import React from 'react'
import { View } from 'react-native'
import { AppText } from '@/components/app-text'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'

export interface HeaderTitleWithIconProps {
  /** The title text to display */
  title: string
  /** SF Symbol icon name (e.g., 'gearshape.fill', 'person.crop.circle.fill') */
  iconName: string
  /** Size of the icon in pixels (default: 20) */
  iconSize?: number
  /** Color of the icon (default: '#FFFFFF') */
  iconColor?: string
  /** Color of the text (default: '#FFFFFF') */
  textColor?: string
  /** Spacing between icon and text in pixels (default: 8) */
  spacing?: number
}

/**
 * A reusable header title component with an icon
 *
 * @example
 * // Basic usage with default white colors
 * <HeaderTitleWithIcon title="Settings" iconName="gearshape.fill" />
 *
 * @example
 * // Custom colors using theme
 * <HeaderTitleWithIcon
 *   title="Profile"
 *   iconName="person.crop.circle.fill"
 *   iconColor={colors.onPrimary}
 *   textColor={colors.onPrimary}
 * />
 *
 * @example
 * // Custom sizing and spacing
 * <HeaderTitleWithIcon
 *   title="Dashboard"
 *   iconName="house.fill"
 *   iconSize={24}
 *   spacing={12}
 * />
 */

export function HeaderTitleWithIcon({
  title,
  iconName,
  iconSize = 20,
  iconColor = '#FFFFFF',
  textColor = '#FFFFFF',
  spacing = 8,
}: HeaderTitleWithIconProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <UiIconSymbol name={iconName as any} size={iconSize} color={iconColor} style={{ marginRight: spacing }} />
      <AppText
        variant="titleMedium"
        style={{
          color: textColor,
        }}
      >
        {title}
      </AppText>
    </View>
  )
}
