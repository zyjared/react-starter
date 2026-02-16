'use client'

import { cn } from '@r/ui/lib/utils'

import * as React from 'react'

function Table({ ref, className, ...props }: React.ComponentProps<'table'> & { ref?: React.RefObject<HTMLTableElement | null> }) {
  return (
    <div
      className="relative w-full touch-manipulation overflow-auto"
      data-slot="table-wrapper"
    >
      <table
        className={cn('w-full caption-bottom text-sm', className)}
        data-slot="table"
        ref={ref}
        {...props}
      />
    </div>
  )
}

function TableHeader({ ref, className, ...props }: React.ComponentProps<'thead'> & { ref?: React.RefObject<HTMLTableSectionElement | null> }) {
  return (
    <thead
      className={cn('tabular-nums [&_tr]:border-b', className)}
      data-slot="table-header"
      ref={ref}
      {...props}
    />
  )
}

function TableBody({ ref, className, ...props }: React.ComponentProps<'tbody'> & { ref?: React.RefObject<HTMLTableSectionElement | null> }) {
  return (
    <tbody
      className={cn('[&_tr:last-child]:border-0', className)}
      data-slot="table-body"
      ref={ref}
      {...props}
    />
  )
}

function TableFooter({ ref, className, ...props }: React.ComponentProps<'tfoot'> & { ref?: React.RefObject<HTMLTableSectionElement | null> }) {
  return (
    <tfoot
      className={cn(
        'bg-muted/50 font-medium text-foreground tabular-nums',
        className,
      )}
      data-slot="table-footer"
      ref={ref}
      {...props}
    />
  )
}

function TableRow({ ref, className, ...props }: React.ComponentProps<'tr'> & { ref?: React.RefObject<HTMLTableRowElement | null> }) {
  return (
    <tr
      className={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted motion-safe:duration-200',
        className,
      )}
      data-slot="table-row"
      ref={ref}
      {...props}
    />
  )
}

function TableHead({ ref, className, ...props }: React.ComponentProps<'th'> & { ref?: React.RefObject<HTMLTableCellElement | null> }) {
  return (
    <th
      className={cn(
        'h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className,
      )}
      data-slot="table-head"
      ref={ref}
      scope={(props as any).scope ?? 'col'}
      {...props}
    />
  )
}

function TableCell({ ref, className, ...props }: React.ComponentProps<'td'> & { ref?: React.RefObject<HTMLTableCellElement | null> }) {
  return (
    <td
      className={cn('p-4 align-middle tabular-nums', className)}
      data-slot="table-cell"
      ref={ref}
      {...props}
    />
  )
}

function TableCaption({ ref, className, ...props }: React.ComponentProps<'caption'> & { ref?: React.RefObject<HTMLTableCaptionElement | null> }) {
  return (
    <caption
      aria-atomic="true"
      aria-live="polite"
      className={cn('mt-4 text-muted-foreground text-sm', className)}
      data-slot="table-caption"
      ref={ref}
      {...props}
    />
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
}
