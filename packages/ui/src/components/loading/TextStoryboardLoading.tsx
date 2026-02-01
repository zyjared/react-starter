'use client'

import { motion } from 'motion/react'
import { Skeleton } from '../ui/skeleton'

interface TextStoryboardLoadingProps {
  mode?: 'prompt-to-image' | 'prompt-to-video' | 'inverse-prompt'
  className?: string
}

const modeTitle: Record<Required<TextStoryboardLoadingProps>['mode'], string> = {
  'prompt-to-image': '提示词转为画面中',
  'prompt-to-video': '提示词转为视频中',
  'inverse-prompt': '从内容中反推出提示词',
}

function TextStoryboardLoading({
  mode = 'prompt-to-image',
  className,
}: TextStoryboardLoadingProps) {
  const steps
    = mode === 'inverse-prompt'
      ? ['分析主体风格', '识别构图镜头', '抽取关键词', '生成提示词']
      : ['理解语义约束', '构建视觉草图', '填充细节风格', '准备最终输出']

  return (
    <div
      className={
        className
        ?? 'relative h-14 md:h-16 overflow-hidden rounded-lg border bg-background/80 px-3 py-2 text-[11px]'
      }
    >
      <div className="flex h-full items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs font-medium text-foreground">
            {modeTitle[mode]}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-1 text-muted-foreground">
            {steps.map((step, index) => (
              <span
                key={step}
                className="max-w-[4.5rem] truncate"
              >
                {index > 0 ? `· ${step}` : step}
              </span>
            ))}
          </div>
        </div>
        <div className="flex w-20 flex-col items-end gap-1">
          <div className="flex gap-1">
            {[0, 1, 2].map(index => (
              <motion.span
                key={index}
                className="inline-flex h-1.5 w-1.5 rounded-full bg-primary/60"
                animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.7] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: index * 0.12,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
          <Skeleton className="h-1.5 w-full rounded-full bg-primary/30" />
        </div>
      </div>
    </div>
  )
}

export { TextStoryboardLoading }
