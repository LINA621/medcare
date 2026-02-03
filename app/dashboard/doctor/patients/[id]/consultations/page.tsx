'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Consultation {
  id: string
  title: string
  doctor: string
  date: string
  disease: string
  observations: string
}

export default function PatientConsultationsPage() {
  const router = useRouter()
  const params = useParams()
  const patientId = params.id as string

  // Mock consultation data for this patient
  const [consultations] = useState<Consultation[]>([
    {
      id: '1',
      title: 'Blood Pressure Check',
      doctor: 'Dr. Fatima Marouon',
      date: 'January 15, 2025',
      disease: 'Hypertension',
      observations: 'Patient shows signs of elevated blood pressure. Lifestyle changes recommended.',
    },
    {
      id: '2',
      title: 'Diabetes Followup',
      doctor: 'Dr. Ahmed Hassan',
      date: 'December 20, 2024',
      disease: 'Type 2 Diabetes',
      observations: 'Blood glucose levels improved with current medication. Continue monitoring.',
    },
    {
      id: '3',
      title: 'Annual Checkup',
      doctor: 'Dr. Leila Mansouri',
      date: 'November 10, 2024',
      disease: 'General Health Check',
      observations: 'Overall health status stable. Weight management recommended.',
    },
  ])

  return (
    <DashboardLayout userRole="doctor" pageTitle="Consultation History">
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
          Back to Patient Profile
        </button>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0A1F44]">Consultation History</h1>
            <p className="text-gray-600 mt-1">All consultations for this patient</p>
          </div>
        </div>

        {/* Consultations List */}
        <div className="space-y-4">
          {consultations.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No consultations found for this patient.</p>
              </CardContent>
            </Card>
          ) : (
            consultations.map((consultation) => (
              <Card key={consultation.id} className="border-0 shadow-sm hover:shadow-md transition">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#0A1F44] mb-2">
                        {consultation.title}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600 font-semibold mb-1">Doctor</p>
                          <p className="text-gray-900">{consultation.doctor}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold mb-1">Date</p>
                          <p className="text-gray-900">{consultation.date}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600 font-semibold mb-1">Disease/Diagnosis</p>
                          <p className="text-gray-900">{consultation.disease}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold mb-1">Observations</p>
                          <p className="text-gray-900 line-clamp-2">{consultation.observations}</p>
                        </div>
                      </div>
                    </div>

                    <Link href={`/dashboard/doctor/patients/${patientId}/consultations/${consultation.id}`}>
                      <Button className="bg-[#0066FF] text-white hover:bg-[#0052CC] whitespace-nowrap">
                        More Info
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="w-full"
        >
          Back to Patient Profile
        </Button>
      </div>
    </DashboardLayout>
  )
}
