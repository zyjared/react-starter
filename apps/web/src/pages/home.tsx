import { Trans } from '@lingui/react/macro'
import { Tooltip, TooltipContent, TooltipTrigger } from '@r/ui/primitives/tooltip'

export function Home() {
  return (
    <div>
      <Trans>首页</Trans>
      <div>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
