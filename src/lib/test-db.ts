import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export async function clearDatabase() {
  const tables = ['Vibe', 'Session', 'Account', 'User']
  
  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`)
  }
}

export async function seedTestData() {
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      vibes: {
        create: [
          {
            title: 'Test Vibe 1',
            content: 'This is a test vibe',
            mood: 'happy',
          },
          {
            title: 'Test Vibe 2',
            content: 'This is another test vibe',
            mood: 'calm',
          },
        ],
      },
    },
  })

  return { user }
} 