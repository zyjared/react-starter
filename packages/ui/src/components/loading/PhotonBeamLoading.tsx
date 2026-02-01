import { cn } from '@r/ui/lib/utils'
import PhotonBeam from '../photon-beam'

export function PhotonBeamLoading({ className }: { className?: string }) {
  return (
    <div className={cn('h-[200px] w-90 relative overflow-hidden rounded-lg border', className)}>
      <PhotonBeam
        lineCount={8}
        transparentBg
        colorLine="#7c3aed"
        colorSignal="#a855f7"
        useColor2
        colorSignal2="#c4b5fd"
        useColor3
        colorSignal3="#f9a8d4"
        lineOpacity={0.6}
        bloomStrength={0.7}
        bloomRadius={0.25}
      />
    </div>
  )
}
