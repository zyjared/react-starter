import type { VariantProps } from 'class-variance-authority'
import { cn } from '@r/ui/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import * as React from 'react'
import { Separator } from './separator'

function ItemGroup({ ref, className, ...props }: React.ComponentProps<'div'> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      className={cn(
        'group/item-group flex touch-manipulation flex-col',
        className,
      )}
      data-slot="item-group"
      ref={ref}
      role="list"
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn('my-0', className)}
      data-slot="item-separator"
      orientation="horizontal"
      {...props}
    />
  )
}

const itemVariants = cva(
  'group/item flex touch-manipulation flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-safe:duration-200 [a]:transition-colors [a]:hover:bg-accent/50',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-border',
        muted: 'bg-muted/50',
      },
      size: {
        default: 'gap-4 p-4',
        sm: 'gap-2.5 px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Item({ ref, className, variant = 'default', size = 'default', asChild = false, ...props }: React.ComponentProps<'div'>
  & VariantProps<typeof itemVariants> & { asChild?: boolean } & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      className={cn(itemVariants({ variant, size }), className)}
      data-size={size}
      data-slot="item"
      data-variant={variant}
      ref={ref}
      role="listitem"
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: 'size-8 rounded-sm border bg-muted [&_svg:not([class*=\'size-\'])]:size-4',
        image:
          'size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function ItemMedia({ ref, className, variant = 'default', ...props }: React.ComponentProps<'div'> & VariantProps<typeof itemMediaVariants> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      className={cn(itemMediaVariants({ variant }), className)}
      data-slot="item-media"
      data-variant={variant}
      ref={ref}
      {...props}
    />
  )
}

function ItemContent({ ref, className, ...props }: React.ComponentProps<'div'> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none',
        className,
      )}
      data-slot="item-content"
      ref={ref}
      {...props}
    />
  )
}

function ItemTitle({ ref, className, ...props }: React.ComponentProps<'div'> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      className={cn(
        'flex w-fit items-center gap-2 font-medium text-sm leading-snug',
        className,
      )}
      data-slot="item-title"
      ref={ref}
      {...props}
    />
  )
}

function ItemDescription({ ref, className, ...props }: React.ComponentProps<'p'> & { ref?: React.RefObject<HTMLParagraphElement | null> }) {
  return (
    <p
      className={cn(
        'line-clamp-2 text-balance font-normal text-muted-foreground text-sm tabular-nums leading-normal',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      data-slot="item-description"
      ref={ref}
      {...props}
    />
  )
}

function ItemActions({ ref, className, ...props }: React.ComponentProps<'div'> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      className={cn('flex items-center gap-2', className)}
      data-slot="item-actions"
      ref={ref}
      {...props}
    />
  )
}

function ItemHeader({ ref, className, ...props }: React.ComponentProps<'div'> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className,
      )}
      data-slot="item-header"
      ref={ref}
      {...props}
    />
  )
}

function ItemFooter({ ref, className, ...props }: React.ComponentProps<'div'> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className,
      )}
      data-slot="item-footer"
      ref={ref}
      {...props}
    />
  )
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
}
