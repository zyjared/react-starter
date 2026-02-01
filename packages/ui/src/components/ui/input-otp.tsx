'use client'

import { cn } from '@r/ui/lib/utils'
import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'

import * as React from 'react'

function InputOTP({ ref, className, containerClassName, ...props }: React.ComponentProps<typeof OTPInput> & { containerClassName?: string } & { ref?: React.RefObject<React.ComponentRef<typeof OTPInput> | null> }) {
  return (
    <OTPInput
      aria-busy={
        typeof (props as any).value === 'string'
        && typeof (props as any).maxLength === 'number'
          ? (props as any).value.length < (props as any).maxLength
              ? true
              : undefined
          : undefined
      }
      aria-disabled={(props as any).disabled ? true : undefined}
      aria-invalid={(props as any)['aria-invalid'] ? true : undefined}
      className={cn('disabled:cursor-not-allowed', className)}
      containerClassName={cn(
        'flex touch-manipulation items-center gap-2 has-disabled:opacity-50',
        containerClassName,
      )}
      data-slot="input-otp"
      ref={ref}
      {...props}
    />
  )
}

function InputOTPGroup({ ref, className, ...props }: React.ComponentProps<'div'> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      className={cn('flex items-center', className)}
      data-slot="input-otp-group"
      ref={ref}
      {...props}
    />
  )
}

function InputOTPSlot({ ref, index, className, ...props }: React.ComponentProps<'div'> & { index: number } & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const inputOTPContext = React.use(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      className={cn(
        'relative flex size-9 items-center justify-center border-input border-y border-r text-sm tabular-nums shadow-xs outline-none transition-[color,box-shadow] first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 motion-safe:duration-200 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40',
        className,
      )}
      data-active={isActive}
      data-slot="input-otp-slot"
      ref={ref}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000 motion-reduce:animate-none" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ref, ...props }: React.ComponentProps<'div'> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div data-slot="input-otp-separator" ref={ref} role="separator" {...props}>
      <MinusIcon aria-hidden="true" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
