"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AssignAssistantsPage() {
  const [assignments, setAssignments] = useState([
    { id: 1, doctorName: "Dr. John Smith", assistantName: "Sarah Johnson", assignDate: "2024-01-10" },
    { id: 2, doctorName: "Dr. Emily Davis", assistantName: "Michael Lee", assignDate: "2024-01-15" },
  ])

  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedAssistant, setSelectedAssistant] = useState("")

  const doctors = [
    { id: 1, name: "Dr. John Smith" },
    { id: 2, name: "Dr. Emily Davis" },
    { id: 3, name: "Dr. Sarah Johnson" },
  ]

  const assistants = [
    { id: 1, name: "Sarah Johnson" },
    { id: 2, name: "Michael Lee" },
    { id: 3, name: "Jennifer Brown" },
  ]

  const handleAssign = () => {
    if (selectedDoctor && selectedAssistant) {
      // API_ENDPOINT: POST /api/admin/assignments
      // Request: { doctor_id, assistant_id }
      const newAssignment = {
        id: assignments.length + 1,
        doctorName: doctors.find((d) => d.id === Number.parseInt(selectedDoctor))?.name || "",
        assistantName: assistants.find((a) => a.id === Number.parseInt(selectedAssistant))?.name || "",
        assignDate: new Date().toISOString().split("T")[0],
      }
      setAssignments([...assignments, newAssignment])
      setSelectedDoctor("")
      setSelectedAssistant("")
    }
  }

  const removeAssignment = (id: number) => {
    // API_ENDPOINT: DELETE /api/admin/assignments/{id}
    setAssignments(assignments.filter((a) => a.id !== id))
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44] mb-2">Assign Assistants to Doctors</h1>
          <p className="text-gray-600">Manage doctor-assistant assignments</p>
        </div>

        {/* Assignment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Doctor
                  </label>
                  <select
                    id="doctor"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066FF]"
                  >
                    <option value="">Choose a doctor...</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="assistant" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Assistant
                  </label>
                  <select
                    id="assistant"
                    value={selectedAssistant}
                    onChange={(e) => setSelectedAssistant(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066FF]"
                  >
                    <option value="">Choose an assistant...</option>
                    {assistants.map((assistant) => (
                      <option key={assistant.id} value={assistant.id}>
                        {assistant.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                onClick={handleAssign}
                disabled={!selectedDoctor || !selectedAssistant}
                className="w-full bg-[#0066FF] text-white hover:bg-[#0052CC]"
              >
                Assign Assistant
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Current Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-[#0A1F44]">{assignment.doctorName}</p>
                    <p className="text-sm text-gray-600">Assistant: {assignment.assistantName}</p>
                    <p className="text-xs text-gray-500">Assigned: {assignment.assignDate}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAssignment(assignment.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
