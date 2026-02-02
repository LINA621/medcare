"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AssistantConsultationsPage() {
  const [consultations, setConsultations] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // API_ENDPOINT: GET /api/assistant/consultations
  // API_ENDPOINT: GET /api/assistant/consultation/:id/details

  return (
    <DashboardLayout userRole="assistant" pageTitle="Consultations">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Search and Filter */}
        <div className="flex items-center gap-4 justify-between">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search consultations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            >
              <option value="all">All Consultations</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </div>

        {/* Consultations List */}
        <div className="space-y-4">
          {consultations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500 mb-4">No consultations available</p>
                <p className="text-sm text-gray-600">Consultations will appear here once scheduled</p>
              </CardContent>
            </Card>
          ) : (
            consultations.map((consultation, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#0A1F44] mb-2">{consultation.title}</h3>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Doctor</p>
                          <p className="text-sm font-medium text-gray-700">{consultation.doctor}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Patient</p>
                          <p className="text-sm font-medium text-gray-700">{consultation.patient}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Date & Time</p>
                          <p className="text-sm font-medium text-gray-700">{consultation.dateTime}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{consultation.notes}</p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        consultation.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : consultation.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}>
                        {consultation.status || "Pending"}
                      </span>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

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
