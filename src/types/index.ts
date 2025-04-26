export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
}

export interface Vibe {
  id: string;
  userId: string;
  title: string;
  description: string;
  mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'calm';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: 'success' | 'error';
}

export type Mood = 'happy' | 'sad' | 'neutral' | 'excited' | 'calm'; 