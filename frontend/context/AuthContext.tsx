"use client";
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { api } from '../lib/api';
import { User } from '../types/User';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  refreshUser: () => Promise<void>;

  updateUserInfo: (data: Partial<User>, password: string) => Promise<void>;
  updateAvatar: (avatarUrl: string) => Promise<void>;
  updateEmail: (newEmail: string, password: string) => Promise<void>;
  updatePassword: (newPassword: string, currentPassword: string) => Promise<void>;
};


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/auth/me');
      setUser(res.data.data);

    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      router.replace('/auth');
    }
  }, [router]);

  const deleteAccount = useCallback(async () => {
    try {
      await api.delete('/auth/delete');
    } catch (error) {
      console.error('Account deletion error:', error);
    } finally {
      setUser(null);
      router.replace('/auth');
    }
    
  }, [router]);


  // Refresh user data
  const refreshUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  const updateUserInfo = async (data: Partial<User>, password: string) => {
    setUser(user => user ? { ...user, username: data.username ?? user.username, bio: data.bio ?? user.bio } : null);
    try {
      await api.patch('/users/me', { username: data.username, password });
    } catch (error) {
      await refreshUser();
      console.error('Failed to update user info:', error);
      throw error;
    }
  };

  const updateAvatar = async (avatarUrl: string) => {
    setUser(user => user ? { ...user, avatarUrl } : null);
    try {
      await api.patch('/users/me/avatar', { avatarUrl });
    } catch (error) {
      await refreshUser();
      console.error('Failed to update user avatar:', error);
    }
  }

  const updateEmail = async (newEmail: string, password: string) => {
    setUser(user => user ? { ...user, email: newEmail } : null);
    try {
      await api.patch('/users/me/email', { newEmail, password });
    } catch (error) {
      await refreshUser();
      console.error('Failed to update user email:', error);
      throw error;
    }
  }

  const updatePassword = async (newPassword: string, currentPassword: string) => {
    try {
      await api.patch('/auth/change-password', { newPassword, currentPassword });
    } catch (error) {
      await refreshUser();
      console.error('Failed to update user password:', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        logout,
        deleteAccount,
        refreshUser,
        updateUserInfo,
        updateAvatar,
        updateEmail,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

