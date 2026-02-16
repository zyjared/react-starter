export interface SignInPayload {
  username: string
  password: string
}

export interface AuthUserDto {
  id: string
  username: string
  avatar: string
}

export interface AuthResponseDto {
  user: AuthUserDto
  token: string
}
