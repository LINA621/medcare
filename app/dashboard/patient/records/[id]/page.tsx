'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ConsultationDetail {
  id: number
  doctorName: string
  doctorDescription: string
  date: string
  time: string
  diagnosis: string
  notes: string
  prescription: string
  documents: Array<{
    id: number
    name: string
    type: string
    url: string
    uploadedDate: string
  }>
}

// Mock consultation data (would come from database)
const consultationData: { [key: string]: ConsultationDetail } = {
  '1': {
    id: 1,
    doctorName: 'Dr. Michael Lee',
    doctorDescription: 'Dr. Michael Lee is a skilled general practitioner with over 10 years of experience in diagnosing and treating common illnesses.',
    date: '2024-12-28',
    time: '10:30 AM',
    diagnosis: 'Seasonal Flu',
    notes: 'Patient presented with fever, cough, and body aches. After thorough examination and vital sign assessment, confirmed seasonal flu diagnosis. Patient was advised rest, hydration, and prescribed appropriate medications.',
    prescription: 'Tamiflu 75mg - twice daily for 5 days; Paracetamol 500mg - as needed for fever',
    documents: [
      {
        id: 1,
        name: 'Consultation Report',
        type: 'PDF',
        url: '#',
        uploadedDate: '2024-12-28',
      },
      {
        id: 2,
        name: 'Blood Test Results',
        type: 'PDF',
        url: '#',
        uploadedDate: '2024-12-28',
      },
    ],
  },
  '2': {
    id: 2,
    doctorName: 'Dr. Sarah Johnson',
    doctorDescription: 'Dr. Sarah Johnson is an experienced physician specializing in preventive care and annual health assessments with a patient-focused approach.',
    date: '2024-11-15',
    time: '02:00 PM',
    diagnosis: 'Annual Checkup',
    notes: 'Comprehensive annual health examination completed. All vital signs normal, weight stable, BMI in healthy range. Patient is maintaining excellent health with regular exercise and balanced diet.',
    prescription: 'Continue current diet and exercise routine. Vitamin D supplement recommended during winter months.',
    documents: [
      {
        id: 3,
        name: 'Annual Checkup Report',
        type: 'PDF',
        url: '#',
        uploadedDate: '2024-11-15',
      },
      {
        id: 4,
        name: 'Lab Work Summary',
        type: 'PDF',
        url: '#',
        uploadedDate: '2024-11-15',
      },
    ],
  },
  '3': {
    id: 3,
    doctorName: 'Dr. Ahmad Hassan',
    doctorDescription: 'Dr. Ahmad Hassan specializes in cardiovascular health management with extensive experience in hypertension treatment and monitoring.',
    date: '2024-10-20',
    time: '09:00 AM',
    diagnosis: 'Hypertension Follow-up',
    notes: 'Follow-up consultation for hypertension management. Blood pressure reading: 145/92 mmHg - slightly elevated. Current medication reviewed and adjusted. Patient counseled on dietary modifications and stress reduction.',
    prescription: 'Lisinopril 10mg - once daily (increased from 5mg); Lifestyle modifications: reduce salt intake, regular exercise 30 minutes daily',
    documents: [
      {
        id: 5,
        name: 'Hypertension Assessment',
        type: 'PDF',
        url: '#',
        uploadedDate: '2024-10-20',
      },
      {
        id: 6,
        name: 'Blood Pressure Log',
        type: 'PDF',
        url: '#',
        uploadedDate: '2024-10-20',
      },
      {
        id: 7,
        name: 'Diet Recommendations',
        type: 'PDF',
        url: '#',
        uploadedDate: '2024-10-20',
      },
    ],
  },
}

export default function ConsultationDetailPage() {
  const params = useParams()
  const consultationId = params.id as string

  const [consultation, setConsultation] = useState<ConsultationDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // API_ENDPOINT: GET /api/medical-records/consultations/{consultation_id}
    // Response: consultation details from consultations + document_medical tables
    const fetchConsultation = async () => {
      setIsLoading(true)
      try {
        // In production:
        // const response = await fetch(`/api/medical-records/consultations/${consultationId}`)
        // const data = await response.json()
        // setConsultation(data)

        if (consultationData[consultationId]) {
          setConsultation(consultationData[consultationId])
        }

        console.log('[v0] Fetched consultation details:', consultationId)
      } catch (error) {
        console.error('[v0] Failed to fetch consultation details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConsultation()
  }, [consultationId])

  if (isLoading) {
    return (
      <DashboardLayout userRole="patient" pageTitle="Consultation Details">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Loading consultation details...</p>
          </CardContent>
        </Card>
      </DashboardLayout>
    )
  }

  if (!consultation) {
    return (
      <DashboardLayout userRole="patient" pageTitle="Consultation Details">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">Consultation not found</p>
            <Link href="/dashboard/patient/records">
              <Button className="bg-[#0066FF] text-white hover:bg-[#0052CC]">Back to Medical Records</Button>
            </Link>
          </CardContent>
        </Card>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="patient" pageTitle="Consultation Details">
      <div className="space-y-6">
        {/* Back Button */}
        <Link href="/dashboard/patient/records">
          <Button variant="outline" className="bg-transparent">
            ← Back to Medical Records
          </Button>
        </Link>

        {/* Consultation Header */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#0A1F44] mb-2">{consultation.doctorName}</h1>
                <p className="text-gray-600">
                  {new Date(consultation.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  at {consultation.time}
                </p>
              </div>
              <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-[#0066FF]">Consultation ID: {consultation.id}</p>
              </div>
            </div>

            {/* Doctor Description */}
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <p className="text-sm text-gray-700">{consultation.doctorDescription}</p>
            </div>
          </CardContent>
        </Card>

        {/* Consultation Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Diagnosis & Notes */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Diagnosis & Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Diagnosis</label>
                <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">{consultation.diagnosis}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Notes</label>
                <p className="text-gray-700 p-3 bg-gray-50 rounded-lg leading-relaxed">{consultation.notes}</p>
              </div>
            </CardContent>
          </Card>

          {/* Prescription */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Prescription & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 p-3 bg-gray-50 rounded-lg leading-relaxed whitespace-pre-wrap">
                {consultation.prescription}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Documents Section */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Medical Documents & Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {consultation.documents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No documents available for this consultation</p>
              </div>
            ) : (
              <div className="space-y-3">
                {consultation.documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">
                      {/* Document Icon */}
                      <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5z" />
                          <path d="M6 7a1 1 0 011 1v3a1 1 0 11-2 0V8a1 1 0 011-1zm4 0a1 1 0 011 1v3a1 1 0 11-2 0V8a1 1 0 011-1zm4 0a1 1 0 011 1v3a1 1 0 11-2 0V8a1 1 0 011-1z" />
                        </svg>
                      </div>

                      {/* Document Info */}
                      <div>
                        <h4 className="font-semibold text-gray-900">{document.name}</h4>
                        <div className="flex gap-4 mt-1">
                          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {document.type}
                          </span>
                          <span className="text-xs text-gray-600">
                            {new Date(document.uploadedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Download Button */}
                    <a href={document.url} download>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent hover:bg-blue-50 hover:text-[#0066FF] hover:border-[#0066FF]"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Consultation Date</label>
                <p className="text-gray-900 font-medium">
                  {new Date(consultation.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Consultation Time</label>
                <p className="text-gray-900 font-medium">{consultation.time}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Doctor</label>
                <p className="text-gray-900 font-medium">{consultation.doctorName}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Document Type</label>
                <p className="text-gray-900 font-medium">Consultation Report</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
