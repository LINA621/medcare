"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { apiService, getAuthToken, setAuthToken, removeAuthToken } from "@/lib/api"

interface User {
  id: string
  name: string
  email: string
  role: "patient" | "doctor" | "assistant" | "admin" | "pharmacist" | "radiologist"
  profile?: any
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: any) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth token on mount
    const token = getAuthToken()
    if (token) {
      // In a real app, validate token and fetch user data
      // For now, we'll just set loading to false
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password)

      if (response.success && response.data) {
        const { token, user: userData } = response.data as any
        setAuthToken(token)
        setUser(userData)
        return { success: true }
      }

      return {
        success: false,
        error: response.error?.message || "Login failed",
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      }
    }
  }

  const register = async (userData: any) => {
    try {
      const response = await apiService.register(userData)

      if (response.success) {
        return { success: true }
      }

      return {
        success: false,
        error: response.error?.message || "Registration failed",
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      }
    }
  }

  const logout = async () => {
    await apiService.logout()
    removeAuthToken()
    setUser(null)
  }

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
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
