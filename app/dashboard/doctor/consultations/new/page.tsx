'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Patient {
  id: string
  name: string
}

export default function NewConsultationReport() {
  const router = useRouter()
  const [selectedPatient, setSelectedPatient] = useState<string>('')
  const [consultationNotes, setConsultationNotes] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock patient data
  const [patients] = useState<Patient[]>([
    { id: '1', name: 'Fatima Zahra Rahmouni' },
    { id: '2', name: 'Fouad Raissouni' },
    { id: '3', name: 'Krishtav Rajan' },
    { id: '4', name: 'Sumanth Tinson' },
    { id: '5', name: 'EG Subramani' },
    { id: '6', name: 'Ranjan Maari' },
    { id: '7', name: 'Philliplie Gopal' },
  ])

  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const handlePatientSearch = (value: string) => {
    setSearchInput(value)
    if (value.trim() === '') {
      setFilteredPatients([])
      setShowDropdown(false)
    } else {
      const filtered = patients.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredPatients(filtered)
      setShowDropdown(true)
    }
  }

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient.id)
    setSearchInput(patient.name)
    setShowDropdown(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(files)])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    if (!selectedPatient || !consultationNotes.trim()) {
      alert('Please select a patient and add consultation notes')
      return
    }

    setIsLoading(true)
    // API_ENDPOINT: POST /api/doctor/consultations
    // Request: {
    //   patient_id: string,
    //   notes: string,
    //   files: File[]
    // }
    // Response: { consultation_id: string, created_at: string }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('[v0] Consultation saved:', {
        patientId: selectedPatient,
        notes: consultationNotes,
        filesCount: uploadedFiles.length,
      })
      router.push('/dashboard/doctor/consultations')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout userRole="doctor" pageTitle="New Consultation Report">
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0A1F44]">New Consultation Report</h1>
          <p className="text-gray-600 mt-2">Create a new consultation report for a patient</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 space-y-6">
            {/* Patient Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Select Patient
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search patient by name..."
                  value={searchInput}
                  onChange={(e) => handlePatientSearch(e.target.value)}
                  onFocus={() => searchInput && setShowDropdown(true)}
                  className="w-full"
                />

                {/* Dropdown */}
                {showDropdown && filteredPatients.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {filteredPatients.map((patient) => (
                      <button
                        key={patient.id}
                        onClick={() => handleSelectPatient(patient)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 transition border-b border-gray-100 last:border-0"
                      >
                        <p className="font-medium text-gray-900">{patient.name}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedPatient && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Selected: <span className="font-semibold">{searchInput}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Consultation Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Consultation Details
              </label>
              <p className="text-xs text-gray-600 mb-3">
                Include disease, observations, predictions, medications, and any other relevant notes
              </p>
              <textarea
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
                placeholder="Enter consultation details... (disease, observations, medications, etc.)"
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] resize-none"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Upload Documents
              </label>
              <p className="text-xs text-gray-600 mb-3">
                Upload images, PDFs, or other documents related to this consultation
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#0066FF] transition cursor-pointer relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB each</p>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
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
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-red-50 rounded text-red-500 transition"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading || !selectedPatient || !consultationNotes.trim()}
                className="flex-1 bg-[#0066FF] text-white hover:bg-[#0052CC] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Consultation'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
