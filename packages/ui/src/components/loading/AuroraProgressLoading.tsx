'use client'

import { cn } from '@r/ui/lib/utils'
import { motion } from 'motion/react'
import { Skeleton } from '../ui/skeleton'

interface AuroraProgressLoadingProps {
  progress?: number
  label?: string
  subLabel?: string
  className?: string
}

function AuroraProgressLoading({
  progress,
  label,
  subLabel,
  className,
}: AuroraProgressLoadingProps) {
  const clampedProgress
    = typeof progress === 'number'
      ? Math.min(1, Math.max(0, progress))
      : undefined

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white via-slate-50 to-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <motion.div
          className="absolute -left-24 -top-24 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.28),transparent_65%)] blur-2xl"
          animate={{ x: [0, 20, -10, 0], y: [0, 10, -10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-20 -bottom-24 h-44 w-44 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.24),transparent_65%)] blur-2xl"
          animate={{ x: [0, -10, 15, 0], y: [0, -15, 10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative flex h-24 items-center justify-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <motion.div
            className="absolute inset-1 rounded-full border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white shadow-[0_0_0_1px_rgba(148,163,184,0.35)]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0.5 rounded-full bg-[conic-gradient(from_0deg,rgba(129,140,248,0.0),rgba(129,140,248,0.7),rgba(56,189,248,0.0))]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-500/8 via-white to-sky-400/10"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-7 rounded-full border border-indigo-200/60"
            animate={{ opacity: [0.9, 0.6, 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_0_6px_rgba(129,140,248,0.45)]"
            style={{ originX: '50%', originY: '140%' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="relative h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 via-sky-400 to-cyan-300 shadow-[0_10px_30px_rgba(56,189,248,0.45)]"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -2, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="ml-6 flex min-w-0 flex-1 flex-col gap-1 text-xs">
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-medium text-slate-900 shadow-[0_0_0_1px_rgba(148,163,184,0.35)]">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            {label ?? '正在生成内容'}
          </span>
          <span className="line-clamp-2 text-[11px] text-slate-500">
            {subLabel ?? 'AI 正在将你的提示词拆解成结构化视觉指令'}
          </span>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[0, 1, 2].map(index => (
              <motion.span
                key={index}
                className="inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400"
                animate={{ y: [0, -3, 0], opacity: [0.35, 1, 0.6] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: index * 0.12,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
          <span>生成中</span>
        </div>
        {typeof clampedProgress === 'number'
          ? (
              <span className="tabular-nums text-xs text-slate-600">
                {Math.round(clampedProgress * 100)}
                %
              </span>
            )
          : (
              <Skeleton className="h-2 w-10 rounded-full" />
            )}
      </div>

      <div className="relative mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        {typeof clampedProgress === 'number'
          ? (
              <motion.div
                className="relative h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400"
                style={{ width: `${clampedProgress * 100}%` }}
                initial={false}
                animate={{ width: `${clampedProgress * 100}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <motion.div
                  className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_1px_rgba(148,163,184,0.5),0_0_30px_rgba(59,130,246,0.9)]"
                  animate={{ scale: [0.9, 1.05, 0.9] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            )
          : (
              <motion.div
                className="h-full w-1/3 rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400"
                animate={{ x: ['-40%', '110%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
      </div>
    </div>
  )
}

export { AuroraProgressLoading }
