'use client'

import { cn } from '@r/ui/lib/utils'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import * as React from 'react'

function Avatar({ ref, className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root> & { ref?: React.RefObject<React.ComponentRef<typeof AvatarPrimitive.Root> | null> }) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        'relative flex size-8 shrink-0 touch-manipulation overflow-hidden rounded-full focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className,
      )}
      data-slot="avatar"
      ref={ref}
      {...props}
    />
  )
}

function AvatarImage({ ref, className, loading, decoding, draggable, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image> & { ref?: React.RefObject<React.ComponentRef<typeof AvatarPrimitive.Image> | null> }) {
  return (
    <AvatarPrimitive.Image
      alt={(props as any).alt ?? ''}
      className={cn('aspect-square size-full', className)}
      data-slot="avatar-image"
      decoding={decoding ?? 'async'}
      draggable={draggable ?? false}
      loading={loading ?? 'lazy'}
      ref={ref}
      {...props}
    />
  )
}

function AvatarFallback({ ref, className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback> & { ref?: React.RefObject<React.ComponentRef<typeof AvatarPrimitive.Fallback> | null> }) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-muted',
        className,
      )}
      data-slot="avatar-fallback"
      ref={ref}
      {...props}
    />
  )
}

export { Avatar, AvatarFallback, AvatarImage }
