"use client"

import { useState } from "react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ActivityStats {
  newPatients: number
  appointmentsToday: number
  diagnosticsMade: number
}

interface Assistant {
  id: string
  name: string
  phone: string
  email: string
  avatar: string
}

interface Appointment {
  time: string
  patientName: string
  reason: string
}

export default function DoctorDashboard() {
  // Mock data - replace with API calls
  const [activityStats] = useState<ActivityStats>({
    newPatients: 30,
    appointmentsToday: 8,
    diagnosticsMade: 66,
  })

  const [assignedAssistant] = useState<Assistant>({
    id: "1",
    name: "Souhaila Roumadi",
    phone: "+212 652095519",
    email: "roumadisouhaila@gmail.com",
    avatar: "/placeholder-user.jpg",
  })

  const [todayAppointments] = useState<Appointment[]>([
    { time: "9:30 AM", patientName: "Fatima Zahra Rahmouni", reason: "Follow Up" },
    { time: "9:30 AM", patientName: "Douae Rateb Boulaich", reason: "Follow Up" },
    { time: "10:30 AM", patientName: "Krishtav Rajan", reason: "Follow Up" },
    { time: "11:00 AM", patientName: "Sumanth Tinson", reason: "Follow Up" },
    { time: "11:30 AM", patientName: "EG Subramani", reason: "Follow Up" },
    { time: "12:00 PM", patientName: "Fatima Zahra Rahmouni", reason: "Check Up" },
    { time: "12:30 PM", patientName: "Douae Rateb Boulaich", reason: "Follow Up" },
    { time: "2:30 AM", patientName: "Krishtav Rajan", reason: "Follow Up" },
    { time: "3:00 PM", patientName: "Sumanth Tinson", reason: "Check Up" },
    { time: "3:30 PM", patientName: "EG Subramani", reason: "Check Up" },
  ])

  return (
    <DashboardLayout userRole="doctor" pageTitle="Dashboard">
      <div className="space-y-6">
        {/* Activity Overview Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#0A1F44]">Activity Overview</h2>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0066FF] bg-white cursor-pointer">
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* New Patients */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">New Patients</p>
                    <p className="text-4xl font-bold text-[#0A1F44]">{activityStats.newPatients}</p>
                  </div>
                  <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointments Today */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Appointments Today</p>
                    <p className="text-4xl font-bold text-[#0A1F44]">{activityStats.appointmentsToday}</p>
                  </div>
                  <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Diagnostics */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Diagnostic AI</p>
                    <p className="text-4xl font-bold text-[#0A1F44]">{activityStats.diagnosticsMade}</p>
                  </div>
                  <div className="w-16 h-16 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Grid: Assigned Assistant + Today's Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assigned Assistant Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm h-full">
              <CardHeader>
                <CardTitle className="text-lg">Assigned Assistant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={assignedAssistant.avatar}
                    alt={assignedAssistant.name}
                    className="w-14 h-14 rounded-full object-cover border border-gray-300"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#0A1F44]">{assignedAssistant.name}</h3>
                    <p className="text-sm text-gray-600">{assignedAssistant.phone}</p>
                    <p className="text-sm text-gray-600">{assignedAssistant.email}</p>
                  </div>
                </div>

                <Link href="/dashboard/doctor/consultations/new">
                  <Button className="w-full bg-[#0066FF] text-white hover:bg-[#0052CC] font-semibold">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Consultation Report
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Today's Appointments Card */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">TODAY APPOINTMENTS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todayAppointments.slice(0, 6).map((appointment, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="py-3 px-4 text-gray-600">{appointment.time}</td>
                          <td className="py-3 px-4 font-medium text-[#0A1F44]">{appointment.patientName}</td>
                          <td className="py-3 px-4 text-gray-600">{appointment.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" disabled className="text-gray-600">
            Previous
          </Button>
          <Button className="bg-[#0066FF] text-white hover:bg-[#0052CC] w-10 h-10">
            1
          </Button>
          <Button variant="outline" className="w-10 h-10">
            2
          </Button>
          <Button variant="outline" className="w-10 h-10">
            3
          </Button>
          <Button variant="outline" className="w-10 h-10">
            4
          </Button>
          <Button variant="outline" className="text-blue-600 hover:text-blue-700">
            Next
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
