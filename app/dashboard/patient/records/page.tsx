"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { API_ENDPOINTS, getAuthHeaders } from "@/config/api"
import { getAuthToken } from "@/lib/api"

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // API_ENDPOINT: GET /api/medical-records/{patient_id}
    // Response: { personal_info, medical_history, consultations, prescriptions, lab_reports }
    const fetchRecords = async () => {
      const token = getAuthToken()
      try {
        const response = await fetch(API_ENDPOINTS.medicalRecords.get("current_patient_id"), {
          headers: getAuthHeaders(token || undefined),
        })

        if (response.ok) {
          const data = await response.json()
          setRecords(data)
        } else {
          // Default data if API not connected
          setRecords({
            consultations: [
              {
                id: 1,
                date: "2024-12-28",
                doctor: "Dr. Michael Lee",
                diagnosis: "Seasonal Flu",
                notes: "Patient showing improvement",
              },
              {
                id: 2,
                date: "2024-11-15",
                doctor: "Dr. Sarah Johnson",
                diagnosis: "Annual Checkup",
                notes: "All vitals normal",
              },
            ],
            prescriptions: [
              { id: 1, medication: "Amoxicillin 500mg", dosage: "3 times daily", duration: "7 days" },
              { id: 2, medication: "Ibuprofen 400mg", dosage: "As needed", duration: "14 days" },
            ],
            lab_reports: [
              { id: 1, test: "Complete Blood Count", date: "2024-12-20", status: "Normal" },
              { id: 2, test: "Chest X-Ray", date: "2024-11-10", status: "Clear" },
            ],
          })
        }
      } catch (error) {
        console.error("[v0] Failed to fetch medical records:", error)
      }

      setIsLoading(false)
    }

    fetchRecords()
  }, [])

  return (
    <DashboardLayout userRole="patient">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#0A1F44] mb-2">Medical Records</h1>
          <p className="text-gray-600">Your complete medical history and documents</p>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">Loading medical records...</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Consultations */}
            <Card>
              <CardHeader>
                <CardTitle>Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {records?.consultations?.map((consultation: any) => (
                    <div
                      key={consultation.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-[#0A1F44]">{consultation.doctor}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(consultation.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Diagnosis:</span> {consultation.diagnosis}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-4 bg-transparent hover:bg-blue-50 hover:text-[#0066FF] hover:border-[#0066FF]"
                      >
                        View More
                      </Button>
                    </div>
                  ))}
                  {!records?.consultations || records.consultations.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No consultations available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Prescriptions */}
            <Card>
              <CardHeader>
                <CardTitle>Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {records?.prescriptions?.map((prescription: any) => (
                    <div key={prescription.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-[#0A1F44] mb-1">{prescription.medication}</h4>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Dosage:</span> {prescription.dosage}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Duration:</span> {prescription.duration}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lab Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Lab Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {records?.lab_reports?.map((report: any) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#0066FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0A1F44]">{report.test}</h4>
                          <p className="text-sm text-gray-600">{new Date(report.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {report.status}
                        </span>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
