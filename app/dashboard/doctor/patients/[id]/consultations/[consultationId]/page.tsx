'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ConsultationDetail {
  id: string
  title: string
  doctor: string
  date: string
  disease: string
  observations: string
  medications: string
  uploadedDocuments: { name: string; type: string; date: string }[]
}

export default function ConsultationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const patientId = params.id as string
  const consultationId = params.consultationId as string

  // Mock consultation detail data
  const [consultation] = useState<ConsultationDetail>({
    id: consultationId,
    title: 'Blood Pressure Check',
    doctor: 'Dr. Fatima Marouon',
    date: 'January 15, 2025',
    disease: 'Hypertension (Stage 1)',
    observations:
      'Patient presents with elevated blood pressure readings over the past two weeks. Physical examination reveals no acute distress. Patient reports occasional headaches and mild fatigue. Family history of hypertension is significant.',
    medications:
      'Lisinopril 10mg once daily, Amlodipine 5mg once daily, Metformin 500mg twice daily for diabetes management.',
    uploadedDocuments: [
      { name: 'Blood_Pressure_Reading.pdf', type: 'PDF', date: 'January 15, 2025' },
      { name: 'ECG_Report.pdf', type: 'PDF', date: 'January 15, 2025' },
      { name: 'Lab_Results.jpg', type: 'Image', date: 'January 10, 2025' },
    ],
  })

  return (
    <DashboardLayout userRole="doctor" pageTitle="Consultation Details">
      <div className="space-y-6 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#0066FF] hover:text-[#0052CC] font-medium text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Consultations
        </button>

        {/* Consultation Header */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-[#0A1F44] mb-6">{consultation.title}</h1>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-2">Doctor</p>
                <p className="text-lg font-semibold text-[#0A1F44]">{consultation.doctor}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-2">Consultation Date</p>
                <p className="text-lg font-semibold text-[#0A1F44]">{consultation.date}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disease/Diagnosis */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Disease/Diagnosis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-900 font-semibold">{consultation.disease}</p>
            </div>
          </CardContent>
        </Card>

        {/* Doctor's Observations */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Doctor's Observations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {consultation.observations}
            </p>
          </CardContent>
        </Card>

        {/* Medications Prescribed */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Medications Prescribed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-line">{consultation.medications}</p>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Documents */}
        {consultation.uploadedDocuments.length > 0 && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {consultation.uploadedDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-600">
                          {doc.type} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition text-[#0066FF]">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
          <Button
            className="flex-1 bg-[#0066FF] text-white hover:bg-[#0052CC]"
            onClick={() => router.push(`/dashboard/doctor/consultations/new`)}
          >
            Create New Consultation
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
