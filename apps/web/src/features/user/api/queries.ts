import type { SearchUsersRequest, UpdateUserProfileRequest } from './index'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyProfile, getUserProfile, searchUsers, updateUserProfile } from './index'

export const userKeys = {
  all: ['users'],
  lists: () => [...userKeys.all, 'list'],
  list: (params: SearchUsersRequest) => [...userKeys.lists(), params],
  details: () => [...userKeys.all, 'detail'],
  detail: (id: string) => [...userKeys.details(), id],
  me: () => [...userKeys.all, 'me'],
} as const

export function useMyProfile() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getMyProfile,
  })
}

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
  })
}

export function useSearchUsers(params: SearchUsersRequest) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => searchUsers(params),
  })
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, payload }: { userId: string, payload: UpdateUserProfileRequest }) =>
      updateUserProfile(userId, payload),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) })
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}
