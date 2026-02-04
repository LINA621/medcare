'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Consultation {
  id: number
  consultationId: number
  date: string
  time: string
  doctorName: string
  diagnosis: string
  notes: string
  documentId: number
}

export default function MedicalRecordsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([
    {
      id: 1,
      consultationId: 1,
      date: '2024-12-28',
      time: '10:30 AM',
      doctorName: 'Dr. Michael Lee',
      diagnosis: 'Seasonal Flu',
      notes: 'Patient showing improvement with rest and hydration',
      documentId: 1,
    },
    {
      id: 2,
      consultationId: 2,
      date: '2024-11-15',
      time: '02:00 PM',
      doctorName: 'Dr. Sarah Johnson',
      diagnosis: 'Annual Checkup',
      notes: 'All vitals normal, continue current lifestyle',
      documentId: 2,
    },
    {
      id: 3,
      consultationId: 3,
      date: '2024-10-20',
      time: '09:00 AM',
      doctorName: 'Dr. Ahmad Hassan',
      diagnosis: 'Hypertension Follow-up',
      notes: 'Blood pressure slightly elevated, adjust medication',
      documentId: 3,
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  // API_ENDPOINT: GET /api/medical-records/consultations
  // Response: Array of consultations from document_medical table
  // Database: SELECT * FROM consultations 
  //   JOIN document_medical ON consultations.document_id = document_medical.id
  //   WHERE patient_id = current_patient_id

  useEffect(() => {
    // Fetch consultations from document_medical + consultations tables
    const fetchConsultations = async () => {
      setIsLoading(true)
      try {
        // In production, this would be:
        // const response = await fetch('/api/medical-records/consultations')
        // const data = await response.json()
        // setConsultations(data)
        
        console.log('[v0] Fetched consultations from document_medical + consultations tables')
      } catch (error) {
        console.error('[v0] Failed to fetch consultations:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConsultations()
  }, [])

  return (
    <DashboardLayout userRole="patient" pageTitle="Medical Records">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0A1F44]">Medical Records</h1>
          <p className="text-gray-600 text-sm mt-1">View all your consultations and medical documents</p>
        </div>

        {/* Consultations List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                <p>Loading consultations...</p>
              </div>
            ) : consultations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No consultations available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {consultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex-1">
                      {/* Doctor Name and Date */}
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#0A1F44]">{consultation.doctorName}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(consultation.date).toLocaleDateString()} at {consultation.time}
                        </span>
                      </div>

                      {/* Diagnosis */}
                      <div className="mb-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Diagnosis:</span> {consultation.diagnosis}
                        </p>
                      </div>

                      {/* Notes Preview */}
                      <p className="text-sm text-gray-600 line-clamp-2">{consultation.notes}</p>
                    </div>

                    {/* More Info Button */}
                    <Link href={`/dashboard/patient/records/${consultation.consultationId}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4 bg-transparent hover:bg-blue-50 hover:text-[#0066FF] hover:border-[#0066FF]"
                      >
                        More Info
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
