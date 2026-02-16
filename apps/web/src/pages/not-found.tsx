import { Trans } from '@lingui/react/macro'
import { Button } from '@r/ui/primitives/button'
import { Link } from '@/router'

export function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-6">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center">
        <div className="text-7xl font-semibold tracking-tight text-muted-foreground">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">
            <Trans>页面不存在</Trans>
          </h1>
          <p className="text-sm text-muted-foreground">
            <Trans>你访问的页面已被移除或暂时不可用</Trans>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild>
            <Link to="/">
              <Trans>返回首页</Trans>
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/chat">
              <Trans>前往聊天</Trans>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
