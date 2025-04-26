import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  type QueryConstraint,
  type DocumentData,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function createDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: T
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, { ...data, createdAt: new Date(), updatedAt: new Date() });
}

export async function getDocument<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as T) : null;
}

export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, { ...data, updatedAt: new Date() });
}

export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

export async function queryDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[]
): Promise<T[]> {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
}

export function createQueryConstraints(options: {
  field?: string;
  operator?: string;
  value?: any;
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
  limitCount?: number;
}): QueryConstraint[] {
  const constraints: QueryConstraint[] = [];

  if (options.field && options.operator && options.value !== undefined) {
    constraints.push(where(options.field, options.operator as any, options.value));
  }

  if (options.orderByField) {
    constraints.push(orderBy(options.orderByField, options.orderDirection || 'desc'));
  }

  if (options.limitCount) {
    constraints.push(limit(options.limitCount));
  }

  return constraints;
} 