"use client"

import React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AssistantAppointmentsPage() {
  const [activeTab, setActiveTab] = useState("NEW")
  const [appointments, setAppointments] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    doctorName: "",
    patientName: "",
    date: "",
    time: "",
    reason: "",
  })

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    // API_ENDPOINT: POST /api/assistant/appointments/create
    // Replace with actual API call
    console.log("[v0] Creating appointment:", formData)
    setShowModal(false)
    setFormData({
      doctorName: "",
      patientName: "",
      date: "",
      time: "",
      reason: "",
    })
  }

  return (
    <DashboardLayout userRole="assistant" pageTitle="Appointments">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("NEW")}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === "NEW"
                ? "text-[#0066FF] border-b-2 border-[#0066FF]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            NEW APPOINTMENTS
          </button>
          <button
            onClick={() => setActiveTab("HISTORY")}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === "HISTORY"
                ? "text-[#0066FF] border-b-2 border-[#0066FF]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            APPOINTMENTS HISTORY
          </button>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-xs">
            <Input placeholder="Search" className="w-full" />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Button variant="outline" className="bg-transparent">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3" />
                </svg>
                Filter by Date
              </Button>
            </div>
            <div className="relative">
              <Button variant="outline" className="bg-transparent">
                Filter by Doctor Name
              </Button>
            </div>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-[#0066FF] text-white hover:bg-[#0052CC]"
            >
              + New Appointment
            </Button>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Time</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Patient Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Doctor Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Reason</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">User Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">
                        No appointments to display. Create a new appointment to get started.
                      </td>
                    </tr>
                  ) : (
                    appointments.map((appointment, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-4 px-6 text-sm text-gray-700">{appointment.date}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{appointment.time}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{appointment.patientName}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{appointment.doctorName}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{appointment.reason}</td>
                        <td className="py-4 px-6">
                          <button className="text-red-500 hover:bg-red-50 p-2 rounded transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Previous</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-lg font-medium transition ${
                  page === 1
                    ? "bg-[#0066FF] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <p className="text-sm text-[#0066FF] cursor-pointer hover:underline">Next</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg overflow-hidden w-full max-w-2xl">
            {/* Modal Header */}
            <div className="bg-[#1e3a8a] px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                <span className="text-[#0066FF]">Med</span>
                <span className="text-white">Care</span>
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white text-2xl hover:opacity-80 transition"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleAddAppointment} className="p-6">
              <h3 className="text-2xl font-bold text-[#0A1F44] mb-6">Appointment</h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name</label>
                  <select
                    value={formData.doctorName}
                    onChange={(e) =>
                      setFormData({ ...formData, doctorName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  >
                    <option value="">Select a doctor</option>
                    {/* API_ENDPOINT: GET /api/doctors */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                  <select
                    value={formData.patientName}
                    onChange={(e) =>
                      setFormData({ ...formData, patientName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  >
                    <option value="">Select a patient</option>
                    {/* API_ENDPOINT: GET /api/patients */}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  >
                    <option value="">Select a time</option>
                    {/* API_ENDPOINT: GET /api/available-times */}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Describe the reason for appointment..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 bg-[#0066FF] text-white rounded-lg font-medium hover:bg-[#0052CC] transition"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
