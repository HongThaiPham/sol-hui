// Fallback for using MaterialIcons on Android and web.
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SymbolViewProps, SymbolWeight } from 'expo-symbols'
import { ComponentProps } from 'react'
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native'

type UiIconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>
export type UiIconSymbolName = keyof typeof MAPPING

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: Record<string, string> = {
  // Existing icons
  'gearshape.fill': 'settings',
  'wallet.pass.fill': 'wallet',
  'ladybug.fill': 'bug-report',

  // Sontine specific icons
  'house.fill': 'home',
  'person.crop.circle.fill': 'account-circle',
  'creditcard.fill': 'credit-card',
  'chart.line.uptrend.xyaxis': 'trending-up',
  'bell.fill': 'notifications',
  'plus.circle.fill': 'add-circle',
  magnifyingglass: 'search',
  'list.bullet': 'list',
  'star.fill': 'star',
  'checkmark.circle.fill': 'check-circle',
  'clock.fill': 'schedule',
  'arrow.right': 'arrow-forward',
  'arrow.left': 'arrow-back',
  'person.3.fill': 'group',
  'dollarsign.circle.fill': 'monetization-on',
  'trophy.fill': 'emoji-events',
  'shield.checkmark.fill': 'verified',
  globe: 'public',
  'heart.fill': 'favorite',
  'moon.fill': 'dark-mode',
  'sun.max.fill': 'light-mode',
  'lock.fill': 'lock',
  'key.fill': 'vpn-key',
  'info.circle.fill': 'info',
  'exclamationmark.triangle.fill': 'warning',
  'xmark.circle.fill': 'cancel',
  'paperplane.fill': 'send',
  'square.and.arrow.down.fill': 'download',
  'square.and.arrow.up.fill': 'upload',
  'network.fill': 'network-check',
  'hand.wave.fill': 'waving-hand',
  'auto-awesome': 'auto-awesome',
  'supervised-user-circle': 'supervised-user-circle',
  'group-add': 'group-add',
  'add.circle.outline': 'add-circle-outline',
}

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function UiIconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: UiIconSymbolName
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
  weight?: SymbolWeight
}) {
  return <MaterialIcons color={color} size={size} name={(MAPPING[name] as any) || name} style={style} />
}
