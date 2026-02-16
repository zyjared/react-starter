'use client'

import { cn } from '@r/ui/lib/utils'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import * as React from 'react'

function Collapsible({ ref, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root> & { ref?: React.RefObject<React.ComponentRef<typeof CollapsiblePrimitive.Root> | null> }) {
  return (
    <CollapsiblePrimitive.Root data-slot="collapsible" ref={ref} {...props} />
  )
}

function CollapsibleTrigger({ ref, className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> & { ref?: React.RefObject<React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleTrigger> | null> }) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      className={cn('touch-manipulation', className)}
      data-slot="collapsible-trigger"
      ref={ref}
      type="button"
      {...props}
    />
  )
}

function CollapsibleContent({ ref, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> & { ref?: React.RefObject<React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleContent> | null> }) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      ref={ref}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
