import {
  createDocument,
  getDocument,
  updateDocument,
  queryDocuments,
  createQueryConstraints,
} from './utils';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  bio: string | null;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION_NAME = 'users';

export async function createUserProfile(
  id: string,
  data: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>
): Promise<void> {
  await createDocument(COLLECTION_NAME, id, data);
}

export async function getUserProfile(id: string): Promise<UserProfile | null> {
  return getDocument<UserProfile>(COLLECTION_NAME, id);
}

export async function updateUserProfile(
  id: string,
  data: Partial<Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  await updateDocument<UserProfile>(COLLECTION_NAME, id, data);
}

export async function searchUsers(query: string, limit = 10): Promise<UserProfile[]> {
  const constraints = createQueryConstraints({
    field: 'displayName',
    operator: '>=',
    value: query,
    limitCount: limit,
  });
  
  return queryDocuments<UserProfile>(COLLECTION_NAME, constraints);
} 