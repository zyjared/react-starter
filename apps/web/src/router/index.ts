import { createBrowserRouter } from 'react-router'
import { matchPath } from '@/router'

import { routes } from './routes'

export * from 'react-router'

export { routes }

export const router = createBrowserRouter(routes)

export function isActivePath(pattern: string, currentPathname: string) {
  return !!matchPath({
    path: pattern,
    end: pattern === '/', // 根路径需完全匹配，其他路径前缀匹配
  }, currentPathname)
}
