"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AssistantDashboard() {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    pendingPatients: 0,
  })
  const [recentActivities, setRecentActivities] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // API_ENDPOINT: GET /api/assistant/statistics
    // API_ENDPOINT: GET /api/assistant/recent-activities
    const fetchData = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/assistant/statistics')
        // const data = await response.json()
        // setStats(data)
        setIsLoading(false)
      } catch (error) {
        console.error("[v0] Failed to fetch assistant data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <DashboardLayout userRole="assistant" pageTitle="Assistant Dashboard">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44] mb-2">Welcome back, Secretary!</h1>
          <p className="text-gray-600">Manage appointments and patient inquiries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Appointments</p>
                  <p className="text-3xl font-bold text-[#0A1F44]">0</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center opacity-60">
                  <svg className="w-6 h-6 text-[#0066FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Today's Appointments</p>
                  <p className="text-3xl font-bold text-[#0A1F44]">0</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center opacity-60">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>


        </div>



        {/* Assigned Doctors */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <p>No doctors assigned yet</p>
                <p className="text-sm mt-2">Your assigned doctors will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
