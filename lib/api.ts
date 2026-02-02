/**
 * Centralized API Service
 * Handles all API calls with error handling and loading states
 */

import { API_ENDPOINTS, getAuthHeaders } from "@/config/api"

export interface ApiError {
  message: string
  code?: string
  field?: string
}

export interface ApiResponse<T> {
  data?: T
  error?: ApiError
  success: boolean
}

/**
 * Generic API fetch wrapper with error handling
 */
async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: {
          message: data.error?.message || "An error occurred",
          code: data.error?.code || String(response.status),
          field: data.error?.field,
        },
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Network error",
        code: "NETWORK_ERROR",
      },
    }
  }
}

/**
 * Get authentication token from storage
 */
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

/**
 * Set authentication token
 */
export const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("auth_token", token)
}

/**
 * Remove authentication token
 */
export const removeAuthToken = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("auth_token")
}

/**
 * API Service Methods
 */
export const apiService = {
  // Auth
  login: async (email: string, password: string) => {
    return apiFetch(API_ENDPOINTS.auth.login, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  register: async (userData: any) => {
    return apiFetch(API_ENDPOINTS.auth.register, {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  logout: async () => {
    const token = getAuthToken()
    return apiFetch(API_ENDPOINTS.auth.logout, {
      method: "POST",
      headers: getAuthHeaders(token || undefined),
    })
  },

  // About
  getAbout: async () => {
    return apiFetch(API_ENDPOINTS.about)
  },

  // Services
  getServices: async () => {
    return apiFetch(API_ENDPOINTS.services)
  },

  // Specialties
  getSpecialties: async () => {
    return apiFetch(API_ENDPOINTS.specialties)
  },

  // Doctors
  getDoctors: async () => {
    return apiFetch(API_ENDPOINTS.doctors.list)
  },

  getAvailableDoctors: async () => {
    return apiFetch(API_ENDPOINTS.doctors.available)
  },

  // Features
  getFeatures: async () => {
    return apiFetch(API_ENDPOINTS.features)
  },

  // Contact
  submitContact: async (contactData: any) => {
    return apiFetch(API_ENDPOINTS.contact, {
      method: "POST",
      body: JSON.stringify(contactData),
    })
  },

  // Appointments
  bookAppointment: async (appointmentData: any) => {
    const token = getAuthToken()
    return apiFetch(API_ENDPOINTS.appointments.book, {
      method: "POST",
      headers: getAuthHeaders(token || undefined),
      body: JSON.stringify(appointmentData),
    })
  },

  getMyAppointments: async () => {
    const token = getAuthToken()
    return apiFetch(API_ENDPOINTS.appointments.myAppointments, {
      headers: getAuthHeaders(token || undefined),
    })
  },

  getAvailableSlots: async (doctorId: string, date: string) => {
    return apiFetch(`${API_ENDPOINTS.appointments.availableSlots}?doctor_id=${doctorId}&date=${date}`)
  },
}
