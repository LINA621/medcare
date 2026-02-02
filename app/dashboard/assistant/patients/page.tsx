"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AssistantPatientsPage() {
  const [patients, setPatients] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // API_ENDPOINT: GET /api/assistant/patients
  // API_ENDPOINT: GET /api/assistant/patient/:id/details

  return (
    <DashboardLayout userRole="assistant" pageTitle="Patients">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Search and Filter */}
        <div className="flex items-center gap-4 justify-between">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search patients by name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="bg-transparent">
              Filter by Status
            </Button>
            <Button variant="outline" className="bg-transparent">
              Filter by Doctor
            </Button>
          </div>
        </div>

        {/* Patients Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Patient Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Patient ID</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Assigned Doctor</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Contact</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">
                        No patients to display
                      </td>
                    </tr>
                  ) : (
                    patients.map((patient, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-4 px-6 text-sm text-gray-700">{patient.name}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{patient.id}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{patient.doctor}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{patient.contact}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            patient.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}>
                            {patient.status || "Active"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            View Details
                          </Button>
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
    </DashboardLayout>
  )
}
