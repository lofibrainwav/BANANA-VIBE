import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile, createUserProfile, updateUserProfile, type UserProfile } from '@/lib/db/user';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        let userProfile = await getUserProfile(user.uid);
        
        if (!userProfile) {
          // Create new profile if it doesn't exist
          const newProfile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'> = {
            email: user.email || '',
            displayName: user.displayName,
            photoURL: user.photoURL,
            bio: null,
            preferences: {
              theme: 'light',
              notifications: true,
            },
          };
          
          await createUserProfile(user.uid, newProfile);
          userProfile = await getUserProfile(user.uid);
        }
        
        setProfile(userProfile);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  async function updateProfile(data: Partial<Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>>) {
    if (!user || !profile) return;

    try {
      await updateUserProfile(user.uid, data);
      const updatedProfile = await getUserProfile(user.uid);
      setProfile(updatedProfile);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  }

  return { profile, loading, error, updateProfile };
} 