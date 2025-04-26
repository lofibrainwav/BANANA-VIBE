import { NextRequest } from 'next/server'
import { GET, POST } from '../route'
import { prisma } from '@/lib/prisma'

// Mock prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    vibe: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

describe('Vibes API', () => {
  const mockVibe = {
    id: '1',
    title: 'Test Vibe',
    content: 'Test Content',
    mood: 'happy',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/vibes', () => {
    it('returns all vibes for a user', async () => {
      const mockVibes = [mockVibe]
      ;(prisma.vibe.findMany as jest.Mock).mockResolvedValueOnce(mockVibes)

      const request = new NextRequest('http://localhost:3000/api/vibes')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockVibes)
      expect(prisma.vibe.findMany).toHaveBeenCalledWith({
        where: { userId: expect.any(String) },
        orderBy: { createdAt: 'desc' },
      })
    })

    it('handles database errors gracefully', async () => {
      ;(prisma.vibe.findMany as jest.Mock).mockRejectedValueOnce(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/vibes')
      const response = await GET(request)

      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ error: 'Failed to fetch vibes' })
    })
  })

  describe('POST /api/vibes', () => {
    it('creates a new vibe', async () => {
      const requestBody = {
        title: 'New Vibe',
        content: 'New Content',
        mood: 'happy',
      }
      ;(prisma.vibe.create as jest.Mock).mockResolvedValueOnce({
        ...mockVibe,
        ...requestBody,
      })

      const request = new NextRequest('http://localhost:3000/api/vibes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data).toMatchObject(requestBody)
      expect(prisma.vibe.create).toHaveBeenCalledWith({
        data: {
          ...requestBody,
          userId: expect.any(String),
        },
      })
    })

    it('validates required fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/vibes', {
        method: 'POST',
        body: JSON.stringify({}),
      })
      const response = await POST(request)

      expect(response.status).toBe(400)
      expect(await response.json()).toEqual({
        error: 'Title, content, and mood are required',
      })
    })

    it('handles database errors gracefully', async () => {
      const requestBody = {
        title: 'New Vibe',
        content: 'New Content',
        mood: 'happy',
      }
      ;(prisma.vibe.create as jest.Mock).mockRejectedValueOnce(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/vibes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })
      const response = await POST(request)

      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ error: 'Failed to create vibe' })
    })
  })
}) 