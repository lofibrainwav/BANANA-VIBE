import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { auth } from './firebase';
import { cookies } from 'next/headers';
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './db/prisma';

export async function signUp(email: string, password: string) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await setAuthCookie();
    return { user, error: null };
  } catch (error) {
    return { user: null, error: (error as Error).message };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    await setAuthCookie();
    return { user, error: null };
  } catch (error) {
    return { user: null, error: (error as Error).message };
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
    removeAuthCookie();
    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      await setAuthCookie();
    } else {
      removeAuthCookie();
    }
    callback(user);
  });
}

async function setAuthCookie() {
  const token = await auth.currentUser?.getIdToken();
  if (token) {
    cookies().set('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  }
}

function removeAuthCookie() {
  cookies().delete('auth');
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
}; 