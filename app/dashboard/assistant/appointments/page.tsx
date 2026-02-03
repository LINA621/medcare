'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import NewAppointmentModal from '@/components/modals/NewAppointmentModal'

interface Appointment {
  id: string
  date: string
  time: string
  patientName: string
  doctorName: string
  reason: string
  status: 'upcoming' | 'completed'
}

interface AppointmentFormData {
  doctorName: string
  patientName: string
  date: string
  time: string
  reason: string
}

export default function AssistantAppointments() {
  const [activeTab, setActiveTab] = useState('new')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [doctorFilter, setDoctorFilter] = useState('')
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false)

  // New Appointments filters
  const [newAptSearch, setNewAptSearch] = useState('')
  const [newAptDate, setNewAptDate] = useState('')
  const [newAptDoctor, setNewAptDoctor] = useState('')

  // History Appointments filters
  const [historyAptSearch, setHistoryAptSearch] = useState('')
  const [historyAptDate, setHistoryAptDate] = useState('')
  const [historyAptDoctor, setHistoryAptDoctor] = useState('')

  // Mock appointments data
  const [allAppointments] = useState<Appointment[]>([
    {
      id: '1',
      date: '05/12/2025',
      time: '9:30 AM',
      patientName: 'Fatima Zahra Raiss',
      doctorName: 'Dr. Fatima Marouon',
      reason: 'Check Up',
      status: 'upcoming',
    },
    {
      id: '2',
      date: '05/12/2025',
      time: '9:30 AM',
      patientName: 'Fouad Raissouni',
      doctorName: 'Dr. Fatima Marouon',
      reason: 'Follow up',
      status: 'upcoming',
    },
    {
      id: '3',
      date: '05/12/2025',
      time: '9:30 AM',
      patientName: 'Krishtav Rajan',
      doctorName: 'Dr. Fatima Marouon',
      reason: 'Follow up',
      status: 'upcoming',
    },
    {
      id: '4',
      date: '05/12/2025',
      time: '9:30 AM',
      patientName: 'Sumanth Tinson',
      doctorName: 'Dr. Fatima Marouon',
      reason: 'Check Up',
      status: 'upcoming',
    },
    {
      id: '5',
      date: '05/12/2025',
      time: '9:30 AM',
      patientName: 'EG Subramani',
      doctorName: 'Dr. Fatima Marouon',
      reason: 'Check Up',
      status: 'upcoming',
    },
    {
      id: '6',
      date: '05/12/2025',
      time: '9:30 AM',
      patientName: 'Ranjan Maari',
      doctorName: 'Dr. Fatima Marouon',
      reason: 'Check Up',
      status: 'upcoming',
    },
    {
      id: '7',
      date: '05/12/2025',
      time: '9:30 AM',
      patientName: 'Philliplie Gopal',
      doctorName: 'Dr. Fatima Marouon',
      reason: 'Check Up',
      status: 'upcoming',
    },
  ])

  const filteredAppointments = allAppointments
    .filter((apt) => apt.status === (activeTab === 'new' ? 'upcoming' : 'completed'))
    .filter((apt) => {
      const currentSearch = activeTab === 'new' ? newAptSearch : historyAptSearch
      return !currentSearch || apt.patientName.toLowerCase().includes(currentSearch.toLowerCase())
    })
    .filter((apt) => {
      const currentDate = activeTab === 'new' ? newAptDate : historyAptDate
      return !currentDate || apt.date === currentDate
    })
    .filter((apt) => {
      const currentDoctor = activeTab === 'new' ? newAptDoctor : historyAptDoctor
      return !currentDoctor || apt.doctorName === currentDoctor
    })

  const handleCancelAppointment = (appointmentId: string) => {
    console.log('[v0] Cancel appointment:', appointmentId)
    // API call to cancel appointment would go here
  }

  const handleNewAppointmentConfirm = (data: AppointmentFormData) => {
    console.log('[v0] New appointment created:', data)
    // API call to create appointment would go here
    setShowNewAppointmentModal(false)
  }

  return (
    <DashboardLayout userRole="assistant" pageTitle="Appointments">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0A1F44]">Appointments</h1>
          </div>
          <Button 
            onClick={() => setShowNewAppointmentModal(true)}
            className="bg-[#0066FF] text-white hover:bg-[#0052CC] flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Appointment
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('new')}
              className={`py-3 font-semibold text-sm transition ${
                activeTab === 'new'
                  ? 'text-[#0A1F44] border-b-2 border-[#0A1F44]'
                  : 'text-gray-600 border-b-2 border-transparent'
              }`}
            >
              NEW APPOINTMENTS
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-3 font-semibold text-sm transition ${
                activeTab === 'history'
                  ? 'text-[#0A1F44] border-b-2 border-[#0A1F44]'
                  : 'text-gray-600 border-b-2 border-transparent'
              }`}
            >
              APPOINTMENTS HISTORY
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center flex-wrap">
          <Input
            type="text"
            placeholder="Search"
            value={activeTab === 'new' ? newAptSearch : historyAptSearch}
            onChange={(e) => activeTab === 'new' ? setNewAptSearch(e.target.value) : setHistoryAptSearch(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex gap-2 items-center">
            <div className="relative">
              <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="date"
                value={activeTab === 'new' ? newAptDate : historyAptDate}
                onChange={(e) => activeTab === 'new' ? setNewAptDate(e.target.value) : setHistoryAptDate(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-sm"
                placeholder="Filter by Date"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => activeTab === 'new' ? setNewAptDate('') : setHistoryAptDate('')}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
            <select
              value={activeTab === 'new' ? newAptDoctor : historyAptDoctor}
              onChange={(e) => activeTab === 'new' ? setNewAptDoctor(e.target.value) : setHistoryAptDoctor(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-sm"
            >
              <option value="">Filter by Doctor Name</option>
              <option value="Dr. Fatima Marouon">Dr. Fatima Marouon</option>
            </select>
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
                    <th className="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Patient Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Doctor Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Reason</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-800 text-sm">User Action</th>
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
                        <td className="py-4 px-6 text-gray-700">{appointment.patientName}</td>
                        <td className="py-4 px-6 text-gray-700">{appointment.doctorName}</td>
                        <td className="py-4 px-6 text-gray-700">{appointment.reason}</td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition inline-flex items-center justify-center"
                            title="Cancel appointment"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
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

      {/* New Appointment Modal */}
      <NewAppointmentModal 
        isOpen={showNewAppointmentModal}
        onClose={() => setShowNewAppointmentModal(false)}
        onConfirm={handleNewAppointmentConfirm}
      />
    </DashboardLayout>
  )
}
