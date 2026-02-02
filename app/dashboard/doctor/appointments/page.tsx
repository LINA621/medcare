'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DoctorAppointments() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [searchTerm, setSearchTerm] = useState('')
  const [appointments, setAppointments] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)

  // API_ENDPOINT: GET /api/doctor/appointments
  // Response: Array of appointment objects with: id, patientName, date, time, reason, status
  
  // API_ENDPOINT: PUT /api/doctor/appointments/:id
  // Request: { status: 'completed' | 'cancelled' | 'rescheduled' }
  // Response: Updated appointment

  const handleCompleteAppointment = (appointmentId: string) => {
    // API call to mark appointment as completed
    console.log('[v0] Complete appointment:', appointmentId)
  }

  const handleCancelAppointment = (appointmentId: string) => {
    // API call to cancel appointment
    console.log('[v0] Cancel appointment:', appointmentId)
  }

  return (
    <DashboardLayout userRole="doctor">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0A1F44]">Appointments</h1>
            <p className="text-gray-600 mt-2">Manage your patient appointments</p>
          </div>
          <Button onClick={() => setShowModal(true)} className="bg-[#0066FF] text-white hover:bg-[#0052CC]">
            + New Appointment
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 font-semibold text-sm transition ${
                activeTab === 'upcoming'
                  ? 'text-[#0066FF] border-b-2 border-[#0066FF]'
                  : 'text-gray-600 border-b-2 border-transparent'
              }`}
            >
              UPCOMING APPOINTMENTS
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 font-semibold text-sm transition ${
                activeTab === 'completed'
                  ? 'text-[#0066FF] border-b-2 border-[#0066FF]'
                  : 'text-gray-600 border-b-2 border-transparent'
              }`}
            >
              COMPLETED APPOINTMENTS
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg" />
        </div>

        {/* Appointments Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Time</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Patient Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Reason</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-gray-500">
                        No appointments found. Data will appear here when connected to API.
                      </td>
                    </tr>
                  ) : (
                    appointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-4 px-6 font-medium text-gray-900">{appointment.date}</td>
                        <td className="py-4 px-6 text-gray-600">{appointment.time}</td>
                        <td className="py-4 px-6 text-gray-600">{appointment.patientName}</td>
                        <td className="py-4 px-6 text-gray-600">{appointment.reason}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              appointment.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex gap-2 justify-center">
                            {activeTab === 'upcoming' && (
                              <>
                                <Button
                                  onClick={() => handleCompleteAppointment(appointment.id)}
                                  className="bg-green-500 text-white hover:bg-green-600"
                                  size="sm"
                                >
                                  Complete
                                </Button>
                                <Button
                                  onClick={() => handleCancelAppointment(appointment.id)}
                                  className="bg-red-500 text-white hover:bg-red-600"
                                  size="sm"
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* New Appointment Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-auto">
              <div className="bg-[#0A1F44] text-white p-6 flex items-center justify-between rounded-t-lg">
                <h2 className="text-xl font-bold">
                  <span className="text-[#0066FF]">Med</span>
                  Care
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-300 text-2xl"
                >
                  ✕
                </button>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-6">New Appointment</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setShowModal(false)
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Patient Name</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]">
                        <option>Select a patient</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Date</label>
                      <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Time</label>
                      <input type="time" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Duration</label>
                      <input type="text" placeholder="30 mins" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Reason</label>
                    <textarea
                      rows={3}
                      placeholder="Reason for appointment..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={() => setShowModal(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-[#0066FF] text-white hover:bg-[#0052CC]">
                      Create Appointment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
