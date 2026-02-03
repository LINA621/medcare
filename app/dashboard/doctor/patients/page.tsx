'use client'

import { useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Patient {
  id: string
  name: string
  age: number
  bloodGroup: string
  chronicDiseases: string
  avatar: string
}

export default function DoctorPatients() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])

  // Mock patient data - patients with appointments to this doctor
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Fatima Zahra Rahmouni',
      age: 45,
      bloodGroup: 'B+ve',
      chronicDiseases: 'Diabetes - High blood pressure',
      avatar: '/placeholder-user.jpg',
    },
    {
      id: '2',
      name: 'Fouad Raissouni',
      age: 62,
      bloodGroup: 'B+ve',
      chronicDiseases: 'High Cholesterol',
      avatar: '/placeholder-user.jpg',
    },
    {
      id: '3',
      name: 'Krishtav Rajan',
      age: 33,
      bloodGroup: 'B+ve',
      chronicDiseases: 'Heart disease',
      avatar: '/placeholder-user.jpg',
    },
    {
      id: '4',
      name: 'Sumanth Tinson',
      age: 26,
      bloodGroup: 'AB+ve',
      chronicDiseases: 'Diabetes',
      avatar: '/placeholder-user.jpg',
    },
    {
      id: '5',
      name: 'EG Subramani',
      age: 42,
      bloodGroup: 'AB-ve',
      chronicDiseases: 'Cancer - Heart disease',
      avatar: '/placeholder-user.jpg',
    },
    {
      id: '6',
      name: 'Ranjan Maari',
      age: 23,
      bloodGroup: 'AB-ve',
      chronicDiseases: 'High blood pressure',
      avatar: '/placeholder-user.jpg',
    },
    {
      id: '7',
      name: 'Philliplie Gopal',
      age: 14,
      bloodGroup: 'AB+ve',
      chronicDiseases: 'High Cholesterol - High blood pressure',
      avatar: '/placeholder-user.jpg',
    },
  ])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.trim() === '') {
      setFilteredPatients([])
    } else {
      const filtered = patients.filter((patient) =>
        patient.name.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredPatients(filtered)
    }
  }

  const displayedPatients = searchTerm ? filteredPatients : patients

  return (
    <DashboardLayout userRole="doctor" pageTitle="Patients">
      <div className="space-y-6">
        {/* Patient Info Tabs */}
        <div className="border-b border-gray-200">
          <button className="py-3 px-0 font-semibold text-[#0066FF] border-b-2 border-[#0066FF] text-sm">
            Patient Info
          </button>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full max-w-xs"
          />
        </div>

        {/* Patients Table */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Patient Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Age</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Blood Group</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Chronic Diseases</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-800 text-sm">User Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedPatients.length === 0 && searchTerm ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-gray-500">
                        No patients found matching your search.
                      </td>
                    </tr>
                  ) : displayedPatients.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-gray-500">
                        No patients found.
                      </td>
                    </tr>
                  ) : (
                    displayedPatients.map((patient) => (
                      <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={patient.avatar}
                              alt={patient.name}
                              className="w-10 h-10 rounded-full object-cover border border-gray-300"
                            />
                            <span className="font-medium text-[#0A1F44]">{patient.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{patient.age}</td>
                        <td className="py-4 px-6 text-gray-700">{patient.bloodGroup}</td>
                        <td className="py-4 px-6 text-gray-700">{patient.chronicDiseases}</td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-3">
                            {/* Profile Icon */}
                            <Link href={`/dashboard/doctor/patients/${patient.id}`}>
                              <button className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-700">
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
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </button>
                            </Link>

                            {/* Consultation History Icon */}
                            <Link href={`/dashboard/doctor/patients/${patient.id}/consultations`}>
                              <button className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-700">
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
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {displayedPatients.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Showing 1 to {displayedPatients.length} of {patients.length} patients</span>
            <div className="flex gap-2">
              <Button variant="outline" disabled className="text-gray-400">
                Previous
              </Button>
              <Button className="bg-[#0066FF] text-white hover:bg-[#0052CC] w-10 h-10 p-0">
                1
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0">
                2
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0">
                3
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0">
                4
              </Button>
              <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
