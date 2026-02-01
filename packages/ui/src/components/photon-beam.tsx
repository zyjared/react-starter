'use client'

import { cn } from '@r/ui/lib/utils'

interface PhotonBeamProps {
  colorBg?: string
  colorLine?: string
  colorSignal?: string
  useColor2?: boolean
  colorSignal2?: string
  useColor3?: boolean
  colorSignal3?: string
  lineCount?: number
  spreadHeight?: number
  spreadDepth?: number
  curveLength?: number
  straightLength?: number
  curvePower?: number
  waveSpeed?: number
  waveHeight?: number
  lineOpacity?: number
  signalCount?: number
  speedGlobal?: number
  trailLength?: number
  bloomStrength?: number
  bloomRadius?: number
  transparentBg?: boolean
  className?: string
}

export default function PhotonBeam(props: PhotonBeamProps = {}) {
  const colorBg = props.colorBg ?? '#020617'
  const colorLine = props.colorLine ?? 'rgba(15,23,42,0.7)'
  const colorSignal = props.colorSignal ?? '#38bdf8'
  const useColor2 = props.useColor2 ?? true
  const colorSignal2 = props.colorSignal2 ?? '#a855f7'
  const useColor3 = props.useColor3 ?? false
  const colorSignal3 = props.colorSignal3 ?? '#22c55e'
  const lineCount = props.lineCount ?? 4
  const lineOpacity = props.lineOpacity ?? 0.55
  const transparentBg = props.transparentBg ?? false

  const lanes = Array.from(
    { length: Math.max(1, Math.min(lineCount, 2)) },
    (_, index) => index,
  )

  const totalLanes = lanes.length

  const getLaneFactor = (lane: number) => {
    if (totalLanes <= 1)
      return 0.5
    return lane / (totalLanes - 1)
  }

  const getLanePath = (lane: number) => {
    const t = getLaneFactor(lane)
    const startY = 40 + t * 36
    const midY1 = 70 + t * 10
    const midY2 = 84
    const endY = 92
    return `M0 ${startY} C 72 ${startY}, 144 ${midY1}, 210 ${midY2} S 300 ${endY}, 336 ${endY}`
  }

  const getLaneSignalY = (lane: number) => {
    const t = getLaneFactor(lane)
    return 40 + t * 36
  }

  const signalColors = [colorSignal]
  if (useColor2)
    signalColors.push(colorSignal2)
  if (useColor3)
    signalColors.push(colorSignal3)

  return (
    <div
      className={cn(
        'relative h-full min-h-[200px] w-full overflow-hidden rounded-2xl',
        props.className,
      )}
      style={transparentBg ? undefined : { background: colorBg }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[-40px] h-60 w-60 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.55),transparent_70%)] blur-3xl" />
        <div className="absolute -right-32 bottom-[-40px] h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.55),transparent_70%)] blur-3xl" />
        <div className="absolute inset-x-0 top-[40%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40" />
      </div>

      <svg
        viewBox="0 0 336 160"
        className="relative h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="photon-line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={colorLine} stopOpacity="0" />
            <stop offset="25%" stopColor={colorLine} stopOpacity={lineOpacity} />
            <stop offset="65%" stopColor={colorLine} stopOpacity={lineOpacity} />
            <stop offset="100%" stopColor={colorLine} stopOpacity="0" />
          </linearGradient>

          {signalColors.map((c, index) => (
            <radialGradient
              key={index}
              id={`photon-signal-grad-${index}`}
              fx="0.2"
              fy="0.5"
            >
              <stop offset="0%" stopColor={c} />
              <stop offset="30%" stopColor={c} stopOpacity="0.95" />
              <stop offset="100%" stopColor={c} stopOpacity="0" />
            </radialGradient>
          ))}

          {lanes.map((lane) => {
            const d = getLanePath(lane)
            return (
              <mask key={lane} id={`photon-lane-mask-${lane}`}>
                <path
                  d={d}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </mask>
            )
          })}
        </defs>

        {lanes.map((lane) => {
          const d = getLanePath(lane)
          return (
            <g key={`lane-bg-${lane}`}>
              <path
                d={d}
                stroke="url(#photon-line-grad)"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )
        })}

        {lanes.map((lane) => {
          const cy = getLaneSignalY(lane)
          return (
            <g key={`lane-signal-${lane}`} mask={`url(#photon-lane-mask-${lane})`}>
              {signalColors.map((_, index) => (
                <circle
                  key={index}
                  className="graph photon-signal"
                  r={18}
                  cx={0}
                  cy={cy}
                  fill={`url(#photon-signal-grad-${index})`}
                  style={{
                    animationDuration: `${3.4 + lane * 0.35 + index * 0.3}s`,
                    animationDelay: `${-(lane * 0.65 + index * 0.4)}s`,
                  }}
                />
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
