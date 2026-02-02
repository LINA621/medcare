"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { apiService } from "@/lib/api"

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all")

  useEffect(() => {
    // API_ENDPOINT: GET /api/appointments/my-appointments
    // Response: [{ id, doctor, date, time, status, reason }]
    const fetchAppointments = async () => {
      const response = await apiService.getMyAppointments()
      if (response.success && response.data) {
        setAppointments(response.data as any[])
      } else {
        // Default appointments if API not connected
        setAppointments([
          {
            id: 1,
            doctor: "Dr. John Smith",
            specialty: "Cardiologist",
            date: "2025-01-20",
            time: "10:00 AM",
            status: "scheduled",
            reason: "Regular checkup",
          },
          {
            id: 2,
            doctor: "Dr. Sarah Johnson",
            specialty: "Orthopedic Surgeon",
            date: "2025-01-15",
            time: "02:00 PM",
            status: "pending",
            reason: "Knee pain consultation",
          },
          {
            id: 3,
            doctor: "Dr. Michael Lee",
            specialty: "Pediatrician",
            date: "2024-12-28",
            time: "11:00 AM",
            status: "completed",
            reason: "Follow-up visit",
          },
        ])
      }
      setIsLoading(false)
    }

    fetchAppointments()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "completed":
        return "bg-gray-100 text-gray-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true
    const aptDate = new Date(apt.date)
    const today = new Date()
    if (filter === "upcoming") return aptDate >= today
    if (filter === "past") return aptDate < today
    return true
  })

  return (
    <DashboardLayout userRole="patient">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#0A1F44] mb-2">My Appointments</h1>
          <p className="text-gray-600">View and manage your appointments</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "all" ? "border-b-2 border-[#0066FF] text-[#0066FF]" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "upcoming" ? "border-b-2 border-[#0066FF] text-[#0066FF]" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "past" ? "border-b-2 border-[#0066FF] text-[#0066FF]" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Past
          </button>
        </div>

        {/* Appointments List */}
        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">Loading appointments...</p>
            </CardContent>
          </Card>
        ) : filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg text-[#0A1F44]">{appointment.doctor}</h3>
                        <p className="text-sm text-gray-600 mb-1">{appointment.specialty}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(appointment.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          at {appointment.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(appointment.status)}`}
                      >
                        {appointment.status}
                      </span>

                      {appointment.status === "scheduled" && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}

                      {appointment.status === "completed" && (
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Reason:</span> {appointment.reason}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#0A1F44] mb-2">No appointments found</h3>
              <p className="text-gray-600 mb-6">You don't have any {filter !== "all" && filter} appointments yet.</p>
              <Button className="bg-[#0066FF] text-white hover:bg-[#0052CC]">Book an Appointment</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
