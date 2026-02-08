import type { RouteObject } from 'react-router'
import { AppLayout } from '@/layout/default'
import { AI } from '@/pages/ai'
import { Home } from '@/pages/home'

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: () => <AppLayout />,
    children: [
      {
        index: true,
        Component: Home,

      },
      {
        path: 'ai',
        children: [
          {
            index: true,
            Component: AI,
          },
          // { path: 'chat/:id', element: <div>Chat</div> },
        ],
      },

      {
        path: '*',
        Component: () => <div>404 Not Found</div>,
      },
    ],
  },
]
