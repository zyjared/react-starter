'use client'

import { cn } from '@r/ui/lib/utils'
import * as LabelPrimitive from '@radix-ui/react-label'

import * as React from 'react'

function Label({ ref, className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root> & { ref?: React.RefObject<React.ComponentRef<typeof LabelPrimitive.Root> | null> }) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'flex min-h-6 touch-manipulation select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        className,
      )}
      data-slot="label"
      ref={ref}
      {...props}
    />
  )
}

export { Label }
