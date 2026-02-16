import type { LayoutConfig } from './types'

import { getStrictContext } from '@/lib/get-strict-context'

interface LayoutContextProps extends LayoutConfig {
}

const [LayoutProvider, useLayout]
  = getStrictContext<LayoutContextProps>('LayoutContext')

export {
  LayoutProvider,
  useLayout,
}
