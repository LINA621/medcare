/**
 * API Configuration File
 *
 * IMPORTANT: Replace "PLACE_YOUR_BASE_API_URL_HERE" with your actual API base URL
 * Example: https://api.emedcare.com or http://localhost:3000/api
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "PLACE_YOUR_BASE_API_URL_HERE"

/**
 * Centralized API Endpoints
 * All API calls should use these endpoint definitions
 */
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
    resetPassword: `${API_BASE_URL}/auth/reset-password`,
  },

  // About & General Info
  about: `${API_BASE_URL}/about`,

  // Services
  services: `${API_BASE_URL}/services`,

  // Specialties
  specialties: `${API_BASE_URL}/specialties`,

  // Doctors
  doctors: {
    list: `${API_BASE_URL}/doctors`,
    available: `${API_BASE_URL}/doctors/available`,
    profile: (id: string) => `${API_BASE_URL}/doctors/${id}`,
  },

  // Features/Why Choose Us
  features: `${API_BASE_URL}/features`,

  // Contact
  contact: `${API_BASE_URL}/contact`,

  // Appointments
  appointments: {
    list: `${API_BASE_URL}/appointments`,
    book: `${API_BASE_URL}/appointments/book`,
    availableSlots: `${API_BASE_URL}/appointments/available-slots`,
    myAppointments: `${API_BASE_URL}/appointments/my-appointments`,
    updateStatus: (id: string) => `${API_BASE_URL}/appointments/${id}/status`,
  },

  // Patient Dashboard
  patient: {
    profile: `${API_BASE_URL}/patient/profile`,
    appointments: `${API_BASE_URL}/patient/appointments`,
    medicalRecords: `${API_BASE_URL}/patient/medical-records`,
    documents: `${API_BASE_URL}/patient/documents`,
  },

  // Doctor Dashboard
  doctor: {
    profile: `${API_BASE_URL}/doctor/profile`,
    patients: `${API_BASE_URL}/doctor/patients`,
    appointments: `${API_BASE_URL}/doctor/appointments`,
    medicalReports: `${API_BASE_URL}/doctor/medical-reports`,
    diagnosis: `${API_BASE_URL}/doctor/diagnosis`,
  },

  // Assistant Dashboard
  assistant: {
    appointments: `${API_BASE_URL}/assistant/appointments`,
    patients: `${API_BASE_URL}/assistant/patients`,
    consultationHistory: `${API_BASE_URL}/assistant/consultation-history`,
  },

  // Admin Dashboard
  admin: {
    users: `${API_BASE_URL}/admin/users`,
    specialties: `${API_BASE_URL}/admin/specialties`,
    aiTrain: `${API_BASE_URL}/admin/ai/train`,
    knowledgeBase: `${API_BASE_URL}/admin/knowledge-base`,
  },

  // Medical Records
  medicalRecords: {
    get: (patientId: string) => `${API_BASE_URL}/medical-records/${patientId}`,
    create: `${API_BASE_URL}/medical-reports/create`,
  },

  // Documents
  documents: {
    download: (documentId: string) => `${API_BASE_URL}/documents/download/${documentId}`,
  },

  // AI Diagnosis
  diagnosis: {
    predict: `${API_BASE_URL}/diagnosis/predict`,
    updateKnowledgeBase: `${API_BASE_URL}/admin/ai/update-knowledge-base`,
    trainModel: `${API_BASE_URL}/admin/ai/train-model`,
  },

  // Pharmacist/Radiologist
  pharmacist: {
    prescriptions: `${API_BASE_URL}/pharmacist/prescriptions`,
    profile: `${API_BASE_URL}/pharmacist/profile`,
  },
  radiologist: {
    requests: `${API_BASE_URL}/radiologist/requests`,
    profile: `${API_BASE_URL}/radiologist/profile`,
  },
}

/**
 * API Request Headers
 */
export const getAuthHeaders = (token?: string) => ({
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
})
