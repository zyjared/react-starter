import { createBrowserRouter, matchPath } from 'react-router'
import { routes } from './routes'

export * from 'react-router'

export { routes }

export const router = createBrowserRouter(routes)

export function isActivePath(pattern: string, currentPathname: string) {
  return !!matchPath({
    path: pattern,
    end: pattern === '/',
  }, currentPathname)
}
