import type { ThemePaletteLoaders } from '@kit/ui/components/theme'
import { msg } from '@lingui/core/macro'

export const THEME_PALETTES = [
  {
    text: msg`默认`,
    value: 'default',
  },
  {
    text: msg`极光`,
    value: 'aurora',
  },
  {
    text: msg`雪松`,
    value: 'cedar',
  },
  {
    text: msg`森林`,
    value: 'forest',
  },
  {
    text: msg`冰川`,
    value: 'glacier',
  },
  {
    text: msg`墨岚`,
    value: 'ink',
  },
  {
    text: msg`流明`,
    value: 'lumina',
  },
  {
    text: msg`玫晓`,
    value: 'rosedawn',
  },
  {
    text: msg`落日`,
    value: 'sunset',
  },
]

export const THEME_PALETTE_LOADERS: ThemePaletteLoaders = {
  aurora: () => import('@kit/ui/styles/theme-aurora.css'),
  cedar: () => import('@kit/ui/styles/theme-cedar.css'),
  forest: () => import('@kit/ui/styles/theme-forest.css'),
  glacier: () => import('@kit/ui/styles/theme-glacier.css'),
  ink: () => import('@kit/ui/styles/theme-ink.css'),
  lumina: () => import('@kit/ui/styles/theme-lumina.css'),
  rosedawn: () => import('@kit/ui/styles/theme-rosedawn.css'),
  sunset: () => import('@kit/ui/styles/theme-sunset.css'),
}
