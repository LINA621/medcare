'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DoctorPatients() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [patients, setPatients] = useState<any[]>([])

  // API_ENDPOINT: GET /api/doctor/patients
  // Response: Array of patient objects with: id, name, email, phone, age, gender, lastVisit, status
  
  // API_ENDPOINT: GET /api/doctor/patient/:id
  // Response: Detailed patient information

  const handleViewDetails = (patientId: string) => {
    // Navigate to patient details
    console.log('[v0] View patient details:', patientId)
  }

  return (
    <DashboardLayout userRole="doctor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44]">Patients</h1>
          <p className="text-gray-600 mt-2">Manage and view your patient list</p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search patients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          >
            <option value="all">All Patients</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Patients Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Patient Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Email</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Age</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Last Visit</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-gray-500">
                        No patients found. Patient data will appear here when connected to API.
                      </td>
                    </tr>
                  ) : (
                    patients.map((patient) => (
                      <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-4 px-6 font-medium text-gray-900">{patient.name}</td>
                        <td className="py-4 px-6 text-gray-600">{patient.email}</td>
                        <td className="py-4 px-6 text-gray-600">{patient.age} years</td>
                        <td className="py-4 px-6 text-gray-600">{patient.lastVisit}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              patient.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {patient.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Button
                            onClick={() => handleViewDetails(patient.id)}
                            className="bg-[#0066FF] text-white hover:bg-[#0052CC]"
                            size="sm"
                          >
                            View Details
                          </Button>
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
        {patients.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Showing 1 to 10 of {patients.length} patients</span>
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button className="bg-[#0066FF] text-white">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
