'use client'

import { cn } from '@r/ui/lib/utils'
import { Skeleton } from '../ui/skeleton'

interface GraphLoadingProps {
  gradientColor?: string
  stepLabel?: string
  currentStep?: number
  totalSteps?: number
  className?: string
}

function Graph({ gradientColor }: { gradientColor: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="336"
      height="126"
      viewBox="0 0 336 126"
      fill="none"
      className="mt-4"
    >
      <path
        d="M0 80C40 40 80 40 120 80S200 120 240 80S296 40 336 80"
        stroke="currentColor"
        strokeWidth="1"
        className="text-muted-foreground/50"
      />
      <g mask="url(#graph-mask-1)">
        <circle
          className="graph graph-light-1"
          cx="0"
          cy="0"
          r="20"
          fill="url(#graph-blue-grad)"
        />
      </g>
      <defs>
        <mask id="graph-mask-1">
          <path
            d="M0 80C40 40 80 40 120 80S200 120 240 80S296 40 336 80"
            strokeWidth="2"
            stroke="white"
          />
        </mask>
        <radialGradient id="graph-blue-grad" fx="1">
          <stop offset="0%" stopColor={gradientColor} />
          <stop offset="20%" stopColor={gradientColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  )
}

function GraphLoading({
  gradientColor = 'rgba(129,140,248,1)',
  stepLabel,
  currentStep,
  totalSteps,
  className,
}: GraphLoadingProps) {
  const hasStepInfo
    = typeof currentStep === 'number' && typeof totalSteps === 'number' && totalSteps > 0

  const effectiveStepLabel = stepLabel
    ?? (hasStepInfo
      ? `正在执行第 ${currentStep} 步，共 ${totalSteps} 步`
      : '正在处理中')

  const progressPercent = hasStepInfo ? Math.round((currentStep / totalSteps) * 100) : undefined

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-3 rounded-2xl border bg-card/70 p-4 shadow-sm',
        'sm:flex-row sm:items-stretch',
        className,
      )}
    >
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {effectiveStepLabel}
            </span>
          </div>
          {typeof progressPercent === 'number' && (
            <span className="tabular-nums text-[11px] text-muted-foreground">
              {progressPercent}
              %
            </span>
          )}
        </div>

        <div className="mt-2 flex items-end gap-4">
          <div className="flex-1">
            <Graph gradientColor={gradientColor} />
          </div>
        </div>
      </div>

    </div>
  )
}

export { GraphLoading }
