import { redirect } from 'react-router'
import { useAuthStore } from '@/features/auth'

export function authMiddleware() {
  const user = useAuthStore.getState().user
  if (!user) {
    throw redirect('/login')
  }
}

export function guestMiddleware() {
  const user = useAuthStore.getState().user
  if (user) {
    throw redirect('/')
  }
}
