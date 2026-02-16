import type { LucideProps } from 'lucide-react'

import { cn } from '@r/ui/lib/utils'
import { Loader2Icon } from 'lucide-react'

function Spinner({ className, ...props }: Omit<LucideProps, 'ref'>) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }
