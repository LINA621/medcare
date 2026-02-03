'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Appointment {
  id: number
  patientName: string
  doctorName: string
  specialty: string
  date: string
  time: string
  reason: string
  status: 'planned' | 'reschedule' | 'completed'
}

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      patientName: 'Douae Rateb Boulaich',
      doctorName: 'Dr. Fatima Marouon',
      specialty: 'Dr. Fatima Marouon',
      date: '05/12/2025',
      time: '9:30 AM',
      reason: 'Check Up',
      status: 'reschedule',
    },
    {
      id: 2,
      patientName: 'Douae Rateb Boulaich',
      doctorName: 'Dr. Fatima Marouon',
      specialty: 'Dr. Fatima Marouon',
      date: '05/12/2025',
      time: '9:30 AM',
      reason: 'Follow up',
      status: 'planned',
    },
    {
      id: 3,
      patientName: 'Douae Rateb Boulaich',
      doctorName: 'Dr. Fatima Marouon',
      specialty: 'Dr. Fatima Marouon',
      date: '05/12/2025',
      time: '9:30 AM',
      reason: 'Follow up',
      status: 'reschedule',
    },
    {
      id: 4,
      patientName: 'Douae Rateb Boulaich',
      doctorName: 'Dr. Fatima Marouon',
      specialty: 'Dr. Fatima Marouon',
      date: '05/12/2025',
      time: '9:30 AM',
      reason: 'Check Up',
      status: 'planned',
    },
    {
      id: 5,
      patientName: 'Douae Rateb Boulaich',
      doctorName: 'Dr. Fatima Marouon',
      specialty: 'Dr. Fatima Marouon',
      date: '05/12/2025',
      time: '9:30 AM',
      reason: 'Check Up',
      status: 'planned',
    },
    {
      id: 6,
      patientName: 'Douae Rateb Boulaich',
      doctorName: 'Dr. Fatima Marouon',
      specialty: 'Dr. Fatima Marouon',
      date: '05/12/2025',
      time: '9:30 AM',
      reason: 'Check Up',
      status: 'planned',
    },
    {
      id: 7,
      patientName: 'Douae Rateb Boulaich',
      doctorName: 'Dr. Fatima Marouon',
      specialty: 'Dr. Fatima Marouon',
      date: '05/12/2025',
      time: '9:30 AM',
      reason: 'Check Up',
      status: 'reschedule',
    },
  ])

  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new')
  const [newSearchTerm, setNewSearchTerm] = useState('')
  const [newDateFilter, setNewDateFilter] = useState('')
  const [historySearchTerm, setHistorySearchTerm] = useState('')
  const [historyDateFilter, setHistoryDateFilter] = useState('')

  const getStatusBadge = (status: string) => {
    if (status === 'planned') {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          Planned
        </span>
      )
    } else if (status === 'reschedule') {
      return (
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
          Reschedule
        </span>
      )
    } else {
      return (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
          Completed
        </span>
      )
    }
  }

  const handleCancelAppointment = (appointmentId: number) => {
    console.log('[v0] Cancelling appointment:', appointmentId)
    setAppointments(appointments.filter((apt) => apt.id !== appointmentId))
    // API call to delete from database would go here
  }

  const handleRescheduleAppointment = (appointment: Appointment) => {
    console.log('[v0] Rescheduling appointment:', appointment)
    // Navigate to book appointment page with pre-filled data
    // window.location.href = `/dashboard/patient/appointments/reschedule/${appointment.id}`
  }

  const filteredAppointments = appointments
    .filter((apt) => {
      if (activeTab === 'new') {
        return apt.status !== 'completed'
      } else {
        return apt.status === 'completed'
      }
    })
    .filter((apt) => {
      const searchTerm = activeTab === 'new' ? newSearchTerm : historySearchTerm
      return !searchTerm || apt.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .filter((apt) => {
      const dateFilter = activeTab === 'new' ? newDateFilter : historyDateFilter
      return !dateFilter || apt.date === dateFilter
    })

  return (
    <DashboardLayout userRole="patient" pageTitle="Appointments">
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#0A1F44]">Appointments</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('new')}
              className={`py-3 font-semibold text-sm transition ${
                activeTab === 'new'
                  ? 'text-[#0A1F44] border-b-2 border-[#0066FF]'
                  : 'text-gray-600 border-b-2 border-transparent'
              }`}
            >
              NEW APPOINTMENTS
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-3 font-semibold text-sm transition ${
                activeTab === 'history'
                  ? 'text-[#0A1F44] border-b-2 border-[#0066FF]'
                  : 'text-gray-600 border-b-2 border-transparent'
              }`}
            >
              APPOINTMENTS HISTORY
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-center flex-wrap">
          <Input
            type="text"
            placeholder="Search"
            value={activeTab === 'new' ? newSearchTerm : historySearchTerm}
            onChange={(e) => activeTab === 'new' ? setNewSearchTerm(e.target.value) : setHistorySearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <div className="flex gap-2 items-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              type="date"
              value={activeTab === 'new' ? newDateFilter : historyDateFilter}
              onChange={(e) => activeTab === 'new' ? setNewDateFilter(e.target.value) : setHistoryDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => activeTab === 'new' ? setNewDateFilter('') : setHistoryDateFilter('')}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Appointments Table */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Time</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Doctor Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Specialty</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Reason</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-800 text-sm">State</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-gray-500">
                        No appointments found.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-4 px-6 font-medium text-gray-900">{appointment.date}</td>
                        <td className="py-4 px-6 text-gray-700">{appointment.time}</td>
                        <td className="py-4 px-6 text-gray-700">{appointment.doctorName}</td>
                        <td className="py-4 px-6 text-gray-700">{appointment.specialty}</td>
                        <td className="py-4 px-6 text-gray-700">{appointment.reason}</td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {getStatusBadge(appointment.status)}
                            {appointment.status !== 'completed' && (
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleRescheduleAppointment(appointment)}
                                  className="p-1 hover:bg-gray-200 rounded text-gray-600 transition"
                                  title="Reschedule"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleCancelAppointment(appointment.id)}
                                  className="p-1 hover:bg-red-100 rounded text-red-600 transition"
                                  title="Cancel"
                                >
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            )}
                            {appointment.status === 'completed' && (
                              <Link href={`/dashboard/patient/records/${appointment.id}`}>
                                <button className="p-1 hover:bg-blue-100 rounded text-blue-600 transition" title="View Report">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </button>
                              </Link>
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

        {/* Pagination */}
        {filteredAppointments.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Showing results</span>
            <div className="flex gap-2">
              <Button variant="outline" disabled className="text-gray-400">
                Previous
              </Button>
              <Button className="bg-[#0066FF] text-white hover:bg-[#0052CC] w-10 h-10 p-0">
                1
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0">
                2
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0">
                3
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0">
                4
              </Button>
              <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
