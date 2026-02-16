'use client'

import type {
  GroupImperativeHandle,
  GroupProps,
  PanelImperativeHandle,
  PanelProps,
  SeparatorProps,
} from 'react-resizable-panels'
import { cn } from '@r/ui/lib/utils'
import { GripVerticalIcon } from 'lucide-react'
import * as React from 'react'

import {
  Group,

  Panel,

  Separator,

} from 'react-resizable-panels'

function ResizablePanelGroup({ ref, className, direction, ...props }: GroupProps & { direction?: 'horizontal' | 'vertical' } & { ref?: React.RefObject<GroupImperativeHandle | null> }) {
  return (
    <Group
      className={cn(
        'flex h-full w-full touch-manipulation data-[orientation=vertical]:flex-col',
        className,
      )}
      data-slot="resizable-panel-group"
      groupRef={ref}
      orientation={direction ?? props.orientation}
      {...props}
    />
  )
}

function ResizablePanel({ ref, ...props }: PanelProps & { ref?: React.RefObject<PanelImperativeHandle | null> }) {
  return <Panel data-slot="resizable-panel" panelRef={ref} {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: SeparatorProps & {
  withHandle?: boolean
}) {
  return (
    <Separator
      aria-label={(props as any)['aria-label'] ?? 'Resize panel'}
      className={cn(
        'relative flex w-px touch-manipulation select-none items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=horizontal]:cursor-col-resize data-[orientation=vertical]:cursor-row-resize data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:translate-x-0 data-[orientation=vertical]:after:-translate-y-1/2 [&[data-orientation=vertical]>div]:rotate-90',
        className,
      )}
      data-slot="resizable-handle"
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
          <GripVerticalIcon aria-hidden="true" className="size-2.5" />
        </div>
      )}
    </Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
