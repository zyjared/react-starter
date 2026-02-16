import { useAuthStore } from '@kit/features/auth'
import { redirect } from 'react-router'

export function authMiddleware() {
  const user = useAuthStore.getState().user
  if (!user) {
    // throw redirect('/login')
  }
}

export function guestMiddleware() {
  const user = useAuthStore.getState().user
  if (user) {
    throw redirect('/')
  }
}
