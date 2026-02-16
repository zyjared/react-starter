'use client'

import { cn } from '@r/ui/lib/utils'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import * as React from 'react'

function ScrollArea({ ref, className, children, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & { ref?: React.RefObject<React.ComponentRef<typeof ScrollAreaPrimitive.Root> | null> }) {
  return (
    <ScrollAreaPrimitive.Root
      className={cn('relative touch-manipulation', className)}
      data-slot="scroll-area"
      ref={ref}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className="size-full touch-manipulation rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50"
        data-slot="scroll-area-viewport"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({ ref, className, orientation = 'vertical', ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & { ref?: React.RefObject<React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> | null> }) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      aria-orientation={orientation}
      className={cn(
        'flex touch-none select-none p-px transition-colors',
        orientation === 'vertical'
        && 'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal'
        && 'h-2.5 flex-col border-t border-t-transparent',
        className,
      )}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      ref={ref}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        aria-hidden="true"
        className="relative flex-1 rounded-full bg-border"
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
