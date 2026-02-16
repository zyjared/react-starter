'use client'

import type { VariantProps } from 'class-variance-authority'
import { cn } from '@r/ui/lib/utils'
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import * as React from 'react'
import { toggleVariants } from './toggle'

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }
>({
  size: 'default',
  variant: 'default',
  spacing: 0,
})

function ToggleGroup({ ref, className, variant, size, spacing = 0, children, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>
  & VariantProps<typeof toggleVariants> & { spacing?: number } & { ref?: React.RefObject<React.ComponentRef<typeof ToggleGroupPrimitive.Root> | null> }) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn(
        'group/toggle-group flex w-fit touch-manipulation items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs',
        className,
      )}
      data-size={size}
      data-slot="toggle-group"
      data-spacing={spacing}
      data-variant={variant}
      ref={ref}
      style={{ '--gap': spacing } as React.CSSProperties}
      {...props}
    >
      <ToggleGroupContext value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({ ref, className, children, variant, size, value, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>
  & VariantProps<typeof toggleVariants> & { ref?: React.RefObject<React.ComponentRef<typeof ToggleGroupPrimitive.Item> | null> }) {
  const context = React.use(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      aria-disabled={(props as any).disabled ? true : undefined}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        'w-auto min-w-0 shrink-0 touch-manipulation px-3 focus:z-10 focus-visible:z-10',
        'data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:first:border-l data-[spacing=0]:first:rounded-l-md',
        className,
      )}
      data-size={context.size || size}
      data-slot="toggle-group-item"
      data-spacing={context.spacing}
      data-variant={context.variant || variant}
      ref={ref}
      type="button"
      value={value}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
