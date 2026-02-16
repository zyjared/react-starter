import { Trans } from '@lingui/react/macro'
import { Button } from '@r/ui/primitives/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@r/ui/primitives/card'
import { Link } from '@/router'

export function Home() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          <Trans>欢迎使用 React Starter</Trans>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          <Trans>一个注重效率的 React 起步模板</Trans>
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link to="/chat">
              <Trans>进入聊天</Trans>
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/settings">
              <Trans>查看设置</Trans>
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <Trans>核心能力</Trans>
            </CardTitle>
            <CardDescription>
              <Trans>主题、路由、国际化已准备就绪</Trans>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <Trans>下一步</Trans>
            </CardTitle>
            <CardDescription>
              <Trans>在 pages 中新增页面并接入路由</Trans>
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-muted-foreground">
            <Trans>保持布局一致，功能扩展更顺畅</Trans>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
