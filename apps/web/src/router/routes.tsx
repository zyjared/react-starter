import type { RouteObject } from 'react-router'
import { Outlet } from 'react-router'
import { AppLayout as AppLayoutComponent } from '@/layouts'
import { Chat } from '@/pages/chat'
import { Home } from '@/pages/home'
import { NotFound } from '@/pages/not-found'
import { authMiddleware } from './middleware'

const AppLayout = () => <AppLayoutComponent><Outlet /></AppLayoutComponent>

export const routes: RouteObject[] = [
  {
    path: '/',
    middleware: [authMiddleware],
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'chat',
        children: [
          {
            index: true,
            Component: Chat,
          },
        ],
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]
