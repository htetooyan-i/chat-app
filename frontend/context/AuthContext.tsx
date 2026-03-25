"use client";
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {api, getErrorMessage} from '../lib/api';
import {GetUserResponse, User} from '../types/User';
import {ApiResponse} from "@/types/ApiResponse";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  register: (data: { username: string; email: string; password: string; confirmPassword: string }) => Promise<ApiResponse<void>>;
  login: (data: { email: string; password: string }) => Promise<ApiResponse<void>>;

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
      const res: GetUserResponse = await api.get('/auth/me').then(r => r.data);
      console.log("Fetched user data:", res.data);
      setUser(res.data);
      console.log("Fetched user data:", res.data);
    } catch (error) {
      setUser(null);
      throw getErrorMessage(error, "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const register = useCallback(async (data: { username: string; email: string; password: string; confirmPassword: string }) => {
    try {
      const res: ApiResponse<void> = await api.post('/auth/register', data, { withCredentials: true }).then(r => r.data);
      return res;
    } catch (error) {
      throw getErrorMessage(error, "Failed to register")
    }
  }, []);

  const login = useCallback(async (data: { email: string; password: string }) => {
    try {
      const res: ApiResponse<void> = await api.post('/auth/login', data, { withCredentials: true }).then(r => r.data);
      return res;
    } catch (error) {
      throw getErrorMessage(error, "Failed to login")
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      router.replace('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      throw getErrorMessage(error, "Failed to logout")
    }
  }, [router]);

  const deleteAccount = useCallback(async () => {
    try {
      await api.delete('/auth/delete');
      setUser(null);
      router.replace('/auth');
    } catch (error) {
      console.error('Account deletion error:', error);
      throw getErrorMessage(error, "Failed to delete account")
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
        register,
        login,
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

