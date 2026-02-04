'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apiService } from '@/lib/api'

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
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // API_ENDPOINT: GET /consultation/patient/{patientId}
  // Response: Array of consultations from document_medical table
  // Database: SELECT * FROM consultations 
  //   JOIN document_medical ON consultations.document_id = document_medical.id
  //   WHERE patient_id = current_patient_id

  useEffect(() => {
    // Fetch consultations for current patient from document_medical + consultations tables
    const fetchConsultations = async () => {
      try {
        setIsLoading(true)
        
        // Get current patient ID from auth context or localStorage
        const patientId = localStorage.getItem('patient_id') || '1' // Default to 1 if not found
        
        const response = await apiService.getPatientConsultations(patientId)
        
        if (response.success && response.data) {
          // Transform API data to match our interface
          const transformedData = Array.isArray(response.data)
            ? response.data.map((consultation: any) => ({
                id: consultation.id,
                consultationId: consultation.id,
                date: consultation.date || '',
                time: consultation.time || '',
                doctorName: consultation.doctor?.name || consultation.doctorName || 'N/A',
                diagnosis: consultation.diagnosis || '',
                notes: consultation.notes || '',
                documentId: consultation.document_id || consultation.id,
              }))
            : []
          
          setConsultations(transformedData)
          console.log('[v0] Consultations fetched:', transformedData)
        } else {
          console.error('[v0] Failed to fetch consultations:', response.error?.message)
        }
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
