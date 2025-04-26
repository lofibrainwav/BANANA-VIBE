import { NextRequest } from 'next/server'
import { GET, PUT, DELETE } from '../route'
import { prisma } from '@/lib/prisma'

// Mock prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    vibe: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

describe('Individual Vibe API', () => {
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

  describe('GET /api/vibes/[id]', () => {
    it('returns a specific vibe', async () => {
      ;(prisma.vibe.findUnique as jest.Mock).mockResolvedValueOnce(mockVibe)

      const request = new NextRequest('http://localhost:3000/api/vibes/1')
      const response = await GET(request, { params: { id: '1' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockVibe)
      expect(prisma.vibe.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      })
    })

    it('returns 404 for non-existent vibe', async () => {
      ;(prisma.vibe.findUnique as jest.Mock).mockResolvedValueOnce(null)

      const request = new NextRequest('http://localhost:3000/api/vibes/999')
      const response = await GET(request, { params: { id: '999' } })

      expect(response.status).toBe(404)
      expect(await response.json()).toEqual({ error: 'Vibe not found' })
    })

    it('handles database errors gracefully', async () => {
      ;(prisma.vibe.findUnique as jest.Mock).mockRejectedValueOnce(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/vibes/1')
      const response = await GET(request, { params: { id: '1' } })

      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ error: 'Failed to fetch vibe' })
    })
  })

  describe('PUT /api/vibes/[id]', () => {
    it('updates a vibe', async () => {
      const updateData = {
        title: 'Updated Vibe',
        content: 'Updated Content',
        mood: 'excited',
      }
      ;(prisma.vibe.update as jest.Mock).mockResolvedValueOnce({
        ...mockVibe,
        ...updateData,
      })

      const request = new NextRequest('http://localhost:3000/api/vibes/1', {
        method: 'PUT',
        body: JSON.stringify(updateData),
      })
      const response = await PUT(request, { params: { id: '1' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toMatchObject(updateData)
      expect(prisma.vibe.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateData,
      })
    })

    it('validates required fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/vibes/1', {
        method: 'PUT',
        body: JSON.stringify({}),
      })
      const response = await PUT(request, { params: { id: '1' } })

      expect(response.status).toBe(400)
      expect(await response.json()).toEqual({
        error: 'Title, content, and mood are required',
      })
    })

    it('handles non-existent vibe', async () => {
      ;(prisma.vibe.update as jest.Mock).mockRejectedValueOnce(new Error('Record not found'))

      const request = new NextRequest('http://localhost:3000/api/vibes/999', {
        method: 'PUT',
        body: JSON.stringify({
          title: 'Updated Vibe',
          content: 'Updated Content',
          mood: 'excited',
        }),
      })
      const response = await PUT(request, { params: { id: '999' } })

      expect(response.status).toBe(404)
      expect(await response.json()).toEqual({ error: 'Vibe not found' })
    })
  })

  describe('DELETE /api/vibes/[id]', () => {
    it('deletes a vibe', async () => {
      ;(prisma.vibe.delete as jest.Mock).mockResolvedValueOnce(mockVibe)

      const request = new NextRequest('http://localhost:3000/api/vibes/1', {
        method: 'DELETE',
      })
      const response = await DELETE(request, { params: { id: '1' } })

      expect(response.status).toBe(204)
      expect(prisma.vibe.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      })
    })

    it('handles non-existent vibe', async () => {
      ;(prisma.vibe.delete as jest.Mock).mockRejectedValueOnce(new Error('Record not found'))

      const request = new NextRequest('http://localhost:3000/api/vibes/999', {
        method: 'DELETE',
      })
      const response = await DELETE(request, { params: { id: '999' } })

      expect(response.status).toBe(404)
      expect(await response.json()).toEqual({ error: 'Vibe not found' })
    })

    it('handles database errors gracefully', async () => {
      ;(prisma.vibe.delete as jest.Mock).mockRejectedValueOnce(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/vibes/1', {
        method: 'DELETE',
      })
      const response = await DELETE(request, { params: { id: '1' } })

      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ error: 'Failed to delete vibe' })
    })
  })
}) 