import { cn } from '@r/ui/lib/utils'
import * as React from 'react'

function Skeleton({ ref, className, ...props }: React.ComponentProps<'div'> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse rounded-xl bg-accent motion-reduce:animate-none',
        className,
      )}
      data-slot="skeleton"
      ref={ref}
      {...props}
    />
  )
}

export { Skeleton }
