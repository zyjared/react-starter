'use client'

import { cn } from '@r/ui/lib/utils'
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'
import * as React from 'react'

type AspectRatioProps = React.ComponentProps<typeof AspectRatioPrimitive.Root>

function AspectRatio({ ref, className, ...props }: AspectRatioProps & { ref?: React.RefObject<React.ComponentRef<typeof AspectRatioPrimitive.Root> | null> }) {
  return (
    <AspectRatioPrimitive.Root
      className={cn('touch-manipulation', className)}
      data-slot="aspect-ratio"
      ref={ref}
      {...props}
    />
  )
}

export { AspectRatio }
