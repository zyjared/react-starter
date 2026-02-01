'use client'

import { cn } from '@r/ui/lib/utils'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import * as React from 'react'

function Separator({ ref, className, orientation = 'horizontal', decorative = true, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root> & { ref?: React.RefObject<React.ComponentRef<typeof SeparatorPrimitive.Root> | null> }) {
  return (
    <SeparatorPrimitive.Root
      aria-orientation={orientation}
      className={cn(
        'shrink-0 touch-manipulation bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px',
        className,
      )}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      ref={ref}
      {...props}
    />
  )
}

export { Separator }
