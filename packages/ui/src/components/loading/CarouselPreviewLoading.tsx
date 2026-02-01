'use client'

import { motion } from 'motion/react'
import { Skeleton } from '../ui/skeleton'

interface CarouselPreviewLoadingProps {
  type?: 'image' | 'video' | 'mixed'
  className?: string
}

function CarouselPreviewLoading({
  type = 'mixed',
  className,
}: CarouselPreviewLoadingProps) {
  const label
    = type === 'image'
      ? '正在生成图片预览'
      : type === 'video'
        ? '正在生成视频预览'
        : '正在生成多模态预览'

  const cardLabels
    = type === 'image'
      ? ['草图', '细化中', '配色中', '风格调整']
      : type === 'video'
        ? ['镜头规划', '关键帧生成', '运动补帧', '渲染输出']
        : ['构思中', '生成中', '调整中', '导出中']

  return (
    <div
      className={
        className
        ?? 'pointer-events-none flex h-64 w-full items-center justify-center'
      }
    >
      <div className="relative flex h-full w-full max-w-3xl items-center justify-center overflow-hidden rounded-xl border bg-background/90 shadow-lg">
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-60"
          animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage:
              'linear-gradient(120deg,hsl(var(--muted)) 0%,hsl(var(--primary)/0.25) 40%,hsl(var(--muted)) 80%)',
            backgroundSize: '220% 100%',
          }}
        />

        <div className="pointer-events-none absolute inset-10 rounded-full bg-gradient-to-tr from-primary/15 via-transparent to-primary/10 blur-3xl" />

        <div className="relative flex gap-4 px-6">
          {[0, 1, 2, 3].map((index) => {
            const delay = index * 0.15
            const offset = index - 1.5

            return (
              <motion.div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="relative aspect-[4/5] w-32 overflow-hidden rounded-lg border border-white/10 bg-background/80 backdrop-blur"
                initial={{ opacity: 0, y: 12, rotate: offset * 1.5 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: offset * 1.5,
                  boxShadow:
                    '0 18px 45px rgba(15,23,42,0.45),0 0 0 1px rgba(255,255,255,0.04)',
                }}
                transition={{
                  delay,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 180,
                  damping: 26,
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-80"
                  animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'linear',
                    delay,
                  }}
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg,hsl(var(--muted)) 0%,hsl(var(--primary)/0.25) 35%,hsl(var(--muted)) 70%)',
                    backgroundSize: '210% 100%',
                  }}
                />
                <div className="relative flex h-full flex-col justify-between p-2 text-[10px] text-muted-foreground">
                  <span className="inline-flex max-w-[5.25rem] items-center gap-1 rounded-full bg-background/80 px-1.5 py-0.5 text-[9px] font-medium">
                    <span className="size-1.5 rounded-full bg-primary/70" />
                    {cardLabels[index] ?? '处理中'}
                  </span>
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-1.5 w-10 rounded-full bg-primary/35" />
                    <Skeleton className="h-1 w-6 rounded-full bg-muted-foreground/35" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="pointer-events-none absolute bottom-3 left-4 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-medium text-foreground">
            {label}
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map(index => (
              <motion.span
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="inline-flex h-1.5 w-1.5 rounded-full bg-primary/70"
                animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.7] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: index * 0.14,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { CarouselPreviewLoading }
