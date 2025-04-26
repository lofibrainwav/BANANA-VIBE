import { Vibe } from '@prisma/client'

export const createTestUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  emailVerified: new Date(),
  image: 'https://example.com/avatar.jpg',
  ...overrides,
})

export const createTestVibe = (overrides = {}): Partial<Vibe> => ({
  id: '1',
  title: 'Test Vibe',
  content: 'This is a test vibe',
  mood: 'happy',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: '1',
  ...overrides,
})

export const createTestVibes = (count: number, overrides = {}): Partial<Vibe>[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    title: `Test Vibe ${i + 1}`,
    content: `This is test vibe ${i + 1}`,
    mood: ['happy', 'calm', 'sad'][i % 3],
    createdAt: new Date(2024, 0, i + 1),
    updatedAt: new Date(2024, 0, i + 1),
    userId: '1',
    ...overrides,
  }))
}

export const createTestSession = (overrides = {}) => ({
  id: '1',
  sessionToken: 'test-session-token',
  userId: '1',
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  ...overrides,
})

export const createTestAccount = (overrides = {}) => ({
  id: '1',
  userId: '1',
  type: 'oauth',
  provider: 'github',
  providerAccountId: '123456',
  refresh_token: 'test-refresh-token',
  access_token: 'test-access-token',
  expires_at: 3600,
  token_type: 'bearer',
  scope: 'read:user',
  id_token: 'test-id-token',
  session_state: 'test-session-state',
  ...overrides,
}) 