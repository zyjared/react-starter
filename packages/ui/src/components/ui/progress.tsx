'use client'

import { cn } from '@r/ui/lib/utils'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import * as React from 'react'

function Progress({ ref, className, value, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root> & { ref?: React.RefObject<React.ComponentRef<typeof ProgressPrimitive.Root> | null> }) {
  return (
    <ProgressPrimitive.Root
      aria-busy={typeof value === 'number' && value < 100 ? true : undefined}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
        className,
      )}
      data-slot="progress"
      ref={ref}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-transform motion-safe:duration-200"
        data-slot="progress-indicator"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
