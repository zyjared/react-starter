import type { UserProfile } from '../model/user.store'
import { client } from '@/shared/api'

const USERS_BASE = '/users'

export interface UserProfileDto {
  id: string
  name: string
  email: string
  avatar?: string | null
  role?: string
  locale?: string
}

export interface UpdateUserProfileRequest {
  name?: string
  avatar?: string
  locale?: string
}

export interface SearchUsersRequest {
  q?: string
  page?: number
  pageSize?: number
}

export interface SearchUsersResponse {
  items: UserProfileDto[]
  total: number
}

function mapUserProfile(dto: UserProfileDto): UserProfile {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    avatar: dto.avatar ?? '',
    role: dto.role,
    locale: dto.locale,
  }
}

export async function getUserProfile(userId: string) {
  const data = await client.get<UserProfileDto>(`${USERS_BASE}/${userId}`)
  return mapUserProfile(data)
}

export async function getMyProfile() {
  const data = await client.get<UserProfileDto>(`${USERS_BASE}/me`)
  return mapUserProfile(data)
}

export async function updateUserProfile(userId: string, payload: UpdateUserProfileRequest) {
  const data = await client.patch<UserProfileDto>(`${USERS_BASE}/${userId}`, payload)
  return mapUserProfile(data)
}

export async function searchUsers(params: SearchUsersRequest) {
  const data = await client.get<SearchUsersResponse>(USERS_BASE, { params })
  return {
    total: data.total,
    items: data.items.map(mapUserProfile),
  }
}
