import * as React from 'react'
import type { HotkeyConfig } from './types'

function useHotkeys(configs: HotkeyConfig | HotkeyConfig[]) {
  const list = Array.isArray(configs) ? configs : [configs]

  React.useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      const pressed = []

      if (event.metaKey || event.ctrlKey) pressed.push('mod')
      if (event.shiftKey) pressed.push('shift')
      if (event.altKey) pressed.push('alt')

      const key = event.key.toLowerCase()
      if (!['shift', 'alt', 'meta', 'control', 'ctrl'].includes(key)) {
        pressed.push(key)
      }

      const combo = pressed.join('+')
      const target = list.find(item => item.combo === combo)

      if (target) {
        event.preventDefault()
        target.handler()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [list])
}

export { useHotkeys }

