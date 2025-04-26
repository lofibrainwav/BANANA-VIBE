import { prisma } from './prisma';
import type { Mood } from '@/types';
import { generateId } from '@/lib/utils';
import {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  queryDocuments,
  createQueryConstraints,
} from './utils';

export interface Vibe {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'calm';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION_NAME = 'vibes';

export interface CreateVibeData {
  userId: string;
  title: string;
  content: string;
  mood: Mood;
}

export async function createVibe(data: CreateVibeData) {
  return prisma.vibe.create({
    data: {
      userId: data.userId,
      title: data.title,
      content: data.content,
      mood: data.mood,
    },
  });
}

export async function getVibesByUserId(userId: string) {
  return prisma.vibe.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getVibeById(id: string) {
  return prisma.vibe.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteVibe(id: string) {
  return prisma.vibe.delete({
    where: {
      id,
    },
  });
}

export async function getUserVibes(userId: string, limit = 10): Promise<Vibe[]> {
  const constraints = createQueryConstraints({
    field: 'userId',
    operator: '==',
    value: userId,
    orderByField: 'createdAt',
    orderDirection: 'desc',
    limitCount: limit,
  });
  
  return queryDocuments<Vibe>(COLLECTION_NAME, constraints);
}

export async function getVibesByMood(mood: Vibe['mood'], limit = 10): Promise<Vibe[]> {
  const constraints = createQueryConstraints({
    field: 'mood',
    operator: '==',
    value: mood,
    orderByField: 'createdAt',
    orderDirection: 'desc',
    limitCount: limit,
  });
  
  return queryDocuments<Vibe>(COLLECTION_NAME, constraints);
} 