/**
 * Centralized API Service
 * Handles all API calls with axios, error handling and loading states
 */

import axios, { AxiosError, AxiosInstance } from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, logout user
      removeAuthToken()
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

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
 * API Service Methods using Axios
 */
export const apiService = {
  // ============ AUTH ============
  login: async (email: string, password: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post("/auth/login", { email, password })
      if (response.data.token) {
        setAuthToken(response.data.token)
      }
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  register: async (userData: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post("/auth/register", userData)
      if (response.data.token) {
        setAuthToken(response.data.token)
      }
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  logout: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post("/auth/logout")
      removeAuthToken()
      return { success: true, data: response.data }
    } catch (error) {
      removeAuthToken() // Logout anyway
      return handleAxiosError(error)
    }
  },

  forgotPassword: async (email: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post("/auth/forgot-password", { email })
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  resetPassword: async (token: string, password: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post("/auth/reset-password", { token, password })
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  // ============ PATIENT ============
  getPatient: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get(`/patient/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getPatients: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get("/patient")
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  updatePatient: async (id: string, userData: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.put(`/patient/update/${id}`, userData)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  deletePatient: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.delete(`/patient/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getMedicalRecords: async (patientId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get(`/patient/${patientId}/dossier-medical`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getPatientStats: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get("/patient/stats")
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  // ============ DOCTOR ============
  getDoctor: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get(`/medecin/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getDoctors: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get("/medecin")
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  updateDoctor: async (id: string, doctorData: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.put(`/medecin/update/${id}`, doctorData)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getDoctorAppointments: async (doctorId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get(`/medecin/${doctorId}/rendezvous`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getDoctorPatients: async (doctorId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get(`/medecin/${doctorId}/patients`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getDoctorConsultations: async (doctorId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get(`/medecin/${doctorId}/consultations`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  // ============ APPOINTMENTS ============
  bookAppointment: async (appointmentData: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post("/rendezvous/create", appointmentData)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getMyAppointments: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get("/rendezvous")
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getAppointment: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get(`/rendezvous/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  updateAppointment: async (id: string, data: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.put(`/rendezvous/update/${id}`, data)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  cancelAppointment: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.put(`/rendezvous/${id}/annuler`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  confirmAppointment: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.put(`/rendezvous/${id}/confirmer`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getAvailableSlots: async (doctorId: string, date: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get("/rendezvous/available-slots", {
        params: { doctor_id: doctorId, date },
      })
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  // ============ CONSULTATIONS ============
  createConsultation: async (consultationData: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post("/consultation/create", consultationData)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getConsultations: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get("/consultation")
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getConsultation: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get(`/consultation/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getPatientConsultations: async (patientId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get(`/consultation/patient/${patientId}`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  updateConsultation: async (id: string, data: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.put(`/consultation/update/${id}`, data)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  deleteConsultation: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.delete(`/consultation/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  // ============ DOCUMENTS ============
  uploadDocument: async (consultationId: string, formData: FormData): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post(`/document/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getDocument: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get(`/document/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getConsultationDocuments: async (consultationId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get(`/document/consultation/${consultationId}`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  // ============ SPECIALTIES ============
  getSpecialties: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get("/specialite")
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getSpecialty: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get(`/specialite/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  // ============ ABOUT/SERVICES ============
  getAbout: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get("/about")
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  getServices: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.get("/services")
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },

  // ============ CONTACT ============
  submitContact: async (contactData: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post("/contact", contactData)
      return { success: true, data: response.data }
    } catch (error) {
      return handleAxiosError(error)
    }
  },
}

/**
 * Helper function to handle axios errors
 */
/**
 * Helper function to handle axios errors
 */
function handleAxiosError(error: any): ApiResponse<any> {
  console.error("[v0] API Error:", error)

  if (error.response) {
    return {
      success: false,
      error: {
        message: error.response.data?.message || error.message || "An error occurred",
        code: String(error.response.status),
        field: error.response.data?.field,
      },
    }
  } else if (error.request) {
    return {
      success: false,
      error: {
        message: "No response from server",
        code: "NO_RESPONSE",
      },
    }
  } else {
    return {
      success: false,
      error: {
        message: error.message || "Network error",
        code: "NETWORK_ERROR",
      },
    }
  }
}
