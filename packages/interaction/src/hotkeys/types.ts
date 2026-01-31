export type HotkeyScope = 'global' | 'canvas' | 'timeline'

export interface HotkeyConfig {
  combo: string
  scope: HotkeyScope
  description?: string
  handler: () => void
}

