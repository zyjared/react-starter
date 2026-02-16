import { delay, http, HttpResponse } from 'msw'

const API_BASE = '/api'

const MOCK_USER = {
  id: 'user_1',
  name: 'Demo User',
  email: 'demo@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  role: 'user',
  locale: 'en-US',
}

let isAuthenticated = true

export const handlers = [
  // Auth
  http.post(`${API_BASE}/auth/login`, async () => {
    await delay(500)
    isAuthenticated = true
    return HttpResponse.json({
      token: 'mock_jwt_token',
      user: MOCK_USER,
    })
  }),

  http.get(`${API_BASE}/auth/session`, async () => {
    await delay(300)
    if (!isAuthenticated) {
      return new HttpResponse(null, { status: 401 })
    }
    return HttpResponse.json({
      token: 'mock_jwt_token',
      user: MOCK_USER,
    })
  }),

  http.post(`${API_BASE}/auth/logout`, async () => {
    await delay(300)
    isAuthenticated = false
    return HttpResponse.json({ success: true })
  }),

  // Users
  http.get(`${API_BASE}/users/me`, async () => {
    await delay(300)
    if (!isAuthenticated) {
      return new HttpResponse(null, { status: 401 })
    }
    return HttpResponse.json(MOCK_USER)
  }),

  http.get(`${API_BASE}/users`, async () => {
    await delay(500)
    return HttpResponse.json({
      items: [
        MOCK_USER,
        {
          id: 'user_2',
          name: 'Alice Smith',
          email: 'alice@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
          role: 'admin',
        },
        {
          id: 'user_3',
          name: 'Bob Jones',
          email: 'bob@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
          role: 'user',
        },
      ],
      total: 3,
    })
  }),

  http.get(`${API_BASE}/users/:id`, async ({ params }) => {
    await delay(300)
    const { id } = params
    if (id === 'me' || id === MOCK_USER.id) {
      return HttpResponse.json(MOCK_USER)
    }
    return HttpResponse.json({
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
      role: 'user',
    })
  }),

  http.patch(`${API_BASE}/users/:id`, async ({ params, request }) => {
    await delay(500)
    const body = await request.json() as any
    return HttpResponse.json({
      ...MOCK_USER,
      ...body,
      id: params.id,
    })
  }),
]
