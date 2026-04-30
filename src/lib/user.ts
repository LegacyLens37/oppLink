export type UserProfile = {
  id: string;
  name: string;
  createdAt: string;
  preferences: {
    types: string[];
    support: string;
    location: string;
    interests: string[];
  };
};

const USER_STORAGE_KEY = 'opplink.user';

export function getCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function createUserProfile(
  profile: Omit<UserProfile, 'id' | 'createdAt'>
): UserProfile {
  const user: UserProfile = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...profile
  };

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  return user;
}
