import type { RouteObject } from 'react-router'
import { AppLayout } from '@/layout/default'
import { Chat } from '@/pages/chat'
import { Home } from '@/pages/home'
import { Login } from '@/pages/login'
import { NotFound } from '@/pages/not-found'
import { authMiddleware, guestMiddleware } from './middleware'

export const routes: RouteObject[] = [
  {
    path: '/login',
    middleware: [guestMiddleware],
    Component: Login,
  },
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
