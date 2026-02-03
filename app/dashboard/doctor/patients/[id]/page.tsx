'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PatientDetails {
  id: string
  name: string
  age: number
  email: string
  phone: string
  bloodType: string
  allergies: string
  chronicDiseases: string
  medicalHistory: string
  lastVisit: string
  avatar: string
}

export default function PatientProfilePage() {
  const router = useRouter()
  const params = useParams()
  const patientId = params.id as string

  // Mock patient data - in real app, fetch by ID
  const [patient] = useState<PatientDetails>({
    id: patientId,
    name: 'Fatima Zahra Rahmouni',
    age: 45,
    email: 'fatima.rahmouni@email.com',
    phone: '+212 612345678',
    bloodType: 'B+ve',
    allergies: 'Penicillin, Shellfish',
    chronicDiseases: 'Diabetes, High blood pressure',
    medicalHistory: 'Previous surgeries: Appendectomy (2010), Knee arthroscopy (2015). Medications: Metformin, Lisinopril',
    lastVisit: 'January 15, 2025',
    avatar: '/placeholder-user.jpg',
  })

  return (
    <DashboardLayout userRole="doctor" pageTitle="Patient Profile">
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
          Back to Patients
        </button>

        {/* Patient Header Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <img
                src={patient.avatar}
                alt={patient.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#0066FF]"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-[#0A1F44] mb-2">{patient.name}</h1>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">Age</p>
                    <p className="text-lg font-semibold text-[#0A1F44]">{patient.age} years</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">Blood Type</p>
                    <p className="text-lg font-semibold text-[#0A1F44]">{patient.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">Last Visit</p>
                    <p className="text-lg font-semibold text-[#0A1F44]">{patient.lastVisit}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-1">Email</p>
              <p className="text-gray-900">{patient.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-1">Phone</p>
              <p className="text-gray-900">{patient.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-2">Chronic Diseases</p>
              <div className="flex flex-wrap gap-2">
                {patient.chronicDiseases.split(',').map((disease, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                  >
                    {disease.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-600 font-semibold mb-2">Allergies</p>
              <div className="flex flex-wrap gap-2">
                {patient.allergies.split(',').map((allergy, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium"
                  >
                    {allergy.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-600 font-semibold mb-2">Medical History</p>
              <p className="text-gray-700 leading-relaxed">{patient.medicalHistory}</p>
            </div>
          </CardContent>
        </Card>

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
            onClick={() => router.push(`/dashboard/doctor/patients/${patient.id}/consultations`)}
          >
            View Consultations
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
