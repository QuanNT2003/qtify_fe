"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, LoginCredentials, RegisterData } from "@/app/api/auth-types";
import { authService } from "@/app/api/services/auth.service";
import { useRouter } from "next/navigation";
import { cookies, AUTH_KEYS } from "@/lib/cookies";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const token = cookies.get(AUTH_KEYS.ACCESS_TOKEN);
      if (token) {
        try {
          const profile = await authService.getProfile();
          setUser(profile);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          cookies.remove(AUTH_KEYS.ACCESS_TOKEN);
          cookies.remove(AUTH_KEYS.REFRESH_TOKEN);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const { accessToken, refreshToken } =
        await authService.login(credentials);
      cookies.set(AUTH_KEYS.ACCESS_TOKEN, accessToken);
      cookies.set(AUTH_KEYS.REFRESH_TOKEN, refreshToken);

      // Fetch profile immediately after login to get user data
      const profile = await authService.getProfile();
      setUser(profile);

      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await authService.register(data);
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      cookies.remove(AUTH_KEYS.ACCESS_TOKEN);
      cookies.remove(AUTH_KEYS.REFRESH_TOKEN);
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
