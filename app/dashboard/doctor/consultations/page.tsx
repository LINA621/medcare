"use client"

import React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DoctorConsultationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showNewConsultationModal, setShowNewConsultationModal] = useState(false)
  const [formData, setFormData] = useState({
    patientName: "",
    consultationType: "General",
    date: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // API_ENDPOINT: POST /api/doctor/consultations
    // Request: { patient_name: string, consultation_type: string, date: string, notes: string }
    // Response: { consultation_id: string, created_at: string }
    
    setShowNewConsultationModal(false)
    setFormData({ patientName: "", consultationType: "General", date: "", notes: "" })
  }

  return (
    <DashboardLayout userRole="doctor">
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#0A1F44]">Consultations</h1>
          <Button 
            onClick={() => setShowNewConsultationModal(true)}
            className="bg-[#0066FF] text-white hover:bg-[#0052CC] flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Consultation
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="border-b border-gray-200 px-8 py-4 flex gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search consultations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Consultations Table */}
        <div className="px-8 py-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Patient Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Type</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* API_ENDPOINT: GET /api/doctor/consultations */}
                {/* Response: Array of consultation objects with patient_name, type, date, status */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td colSpan={5} className="py-12 px-4 text-center text-gray-500">
                    No consultations yet. Create one to get started.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Consultation Modal */}
      {showNewConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="bg-[#0A1F44] rounded-t-lg px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">MedCare</h2>
              <button
                onClick={() => setShowNewConsultationModal(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-[#0A1F44]">New Consultation</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  placeholder="Enter patient name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
                <select
                  value={formData.consultationType}
                  onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                >
                  <option>General</option>
                  <option>Follow-up</option>
                  <option>Emergency</option>
                  <option>Checkup</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add consultation notes..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewConsultationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#0066FF] text-white rounded-lg font-medium hover:bg-[#0052CC] transition-colors"
                >
                  Create Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
