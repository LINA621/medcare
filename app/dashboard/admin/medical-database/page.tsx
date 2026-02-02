"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function MedicalDatabasePage() {
  const [selectedCategory, setSelectedCategory] = useState("prescriptions")
  const [updateData, setUpdateData] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateLogs, setUpdateLogs] = useState<string[]>([
    "Database backup completed - 2024-01-15 10:00",
    "Prescription data updated - 1,234 records",
    "Lab results synchronized - 892 records",
  ])

  const categories = [
    { id: "prescriptions", name: "Prescriptions", records: 125672 },
    { id: "lab-results", name: "Lab Results", records: 89456 },
    { id: "diagnostic", name: "Diagnostic Records", records: 45892 },
    { id: "patient-history", name: "Patient History", records: 50234 },
  ]

  const handleUpdate = () => {
    // API_ENDPOINT: PUT /api/admin/medical-database
    // Request: { category, data }
    if (updateData.trim()) {
      setIsUpdating(true)
      setTimeout(() => {
        setUpdateLogs([
          `${categories.find((c) => c.id === selectedCategory)?.name} updated - ${new Date().toLocaleString()}`,
          `Records processed: ${updateData.split("\n").length}`,
          ...updateLogs,
        ])
        setUpdateData("")
        setIsUpdating(false)
      }, 1000)
    }
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44] mb-2">Medical Database Management</h1>
          <p className="text-gray-600">Update and manage the medical database</p>
        </div>

        {/* Database Overview */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-1">{category.name}</p>
                <p className="text-3xl font-bold text-[#0A1F44]">{(category.records / 1000).toFixed(1)}K</p>
                <p className="text-xs text-gray-500 mt-2">Records stored</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Update Interface */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-[#0066FF] text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Update Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={updateData}
                onChange={(e) => setUpdateData(e.target.value)}
                placeholder={`Paste ${categories.find((c) => c.id === selectedCategory)?.name.toLowerCase()} data here...`}
                rows={8}
                className="w-full font-mono text-sm"
              />

              <Button
                onClick={handleUpdate}
                disabled={!updateData.trim() || isUpdating}
                className="w-full bg-[#0066FF] text-white hover:bg-[#0052CC]"
              >
                {isUpdating ? "Updating..." : "Update Database"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Update Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Update History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {updateLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-[#0066FF] mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{log}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Database Operations */}
        <Card>
          <CardHeader>
            <CardTitle>Database Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="bg-[#0066FF] text-white hover:bg-[#0052CC]">Create Backup</Button>
              <Button variant="outline">Restore Backup</Button>
              <Button variant="outline" className="text-orange-600 bg-transparent">
                Run Maintenance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
