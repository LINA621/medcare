"use client"

import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent } from "@/components/ui/card"

export default function StatisticsPage() {
  const statistics = [
    { label: "Total Patients", value: "5,234", change: "+12%" },
    { label: "Total Doctors", value: "142", change: "+5%" },
    { label: "Appointments", value: "1,829", change: "+18%" },
    { label: "AI Accuracy", value: "94%", change: "+2%" },
  ]

  const patientStats = [
    { category: "New Patients", count: 145, percentage: 15 },
    { category: "Returning Patients", count: 892, percentage: 75 },
    { category: "Inactive Patients", count: 99, percentage: 10 },
  ]

  const appointmentStats = [
    { status: "Completed", count: 1234, color: "bg-green-500" },
    { status: "Scheduled", count: 456, color: "bg-blue-500" },
    { status: "Cancelled", count: 89, color: "bg-red-500" },
  ]

  return (
    <DashboardLayout userRole="admin" pageTitle="Statistics">
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#0A1F44] mb-6">System Statistics</h1>

        {/* Key Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          {statistics.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-[#0A1F44] mt-2">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change} this month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Patient Statistics */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-[#0A1F44] mb-6">Patient Status Distribution</h2>
            <div className="space-y-4">
              {patientStats.map((stat, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-700">{stat.category}</p>
                    <p className="text-sm text-gray-600">
                      {stat.count} ({stat.percentage}%)
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#0066FF] h-2.5 rounded-full transition-all"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appointment Statistics */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-[#0A1F44] mb-6">Appointment Status</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {appointmentStats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 border border-gray-100 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-700 text-sm">{stat.status}</p>
                      <p className="text-xs text-gray-600">{stat.count} appointments</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-6 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">Completion Rate</p>
                  <div className="text-5xl font-bold text-[#0066FF]">73%</div>
                  <p className="text-xs text-gray-600 mt-2">Of all appointments</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>



        {/* Medical Database Overview */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-[#0A1F44] mb-6">Medical Database Overview</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "Total Records", value: "50,234" },
                { label: "Prescriptions", value: "125,672" },
                { label: "Lab Results", value: "89,456" },
                { label: "Diagnostics", value: "45,892" },
              ].map((item, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">{item.label}</p>
                  <p className="text-2xl font-bold text-[#0066FF]">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
