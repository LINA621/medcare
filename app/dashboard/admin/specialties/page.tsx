"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SpecialtiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [specialties, setSpecialties] = useState([
    { id: 1, name: "Cardiology", description: "Heart and cardiovascular system", doctorCount: 8 },
    { id: 2, name: "Neurology", description: "Nervous system disorders", doctorCount: 5 },
    { id: 3, name: "Orthopedics", description: "Bones and joints", doctorCount: 6 },
    { id: 4, name: "Pediatrics", description: "Children's healthcare", doctorCount: 7 },
  ])

  const filteredSpecialties = specialties.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    setSpecialties(specialties.filter((s) => s.id !== id))
  }

  return (
    <DashboardLayout userRole="admin" pageTitle="Specialties">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#0A1F44]">Medical Specialties</h1>
          <Button onClick={() => setShowModal(true)} className="bg-[#0066FF] text-white hover:bg-[#0052CC]">
            + Add Specialty
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                type="text"
                placeholder="Search specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Specialties Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Specialty Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Description</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Doctors</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpecialties.map((specialty) => (
                    <tr key={specialty.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-gray-700 font-medium">{specialty.name}</td>
                      <td className="py-4 px-6 text-gray-600 text-sm">{specialty.description}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-[#0066FF]">
                          {specialty.doctorCount} Doctors
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleDelete(specialty.id)}
                          className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md m-0">
              <div className="bg-[#1e3a8a] p-6 flex items-center justify-between">
                <span className="text-xl font-bold text-white">
                  <span className="text-[#0066FF]">Med</span>
                  <span className="text-white">Care</span>
                </span>
                <button onClick={() => setShowModal(false)} className="text-white hover:bg-[#0052CC] p-1">
                  ✕
                </button>
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[#0A1F44] mb-4">Add Specialty</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialty Name</label>
                    <Input type="text" placeholder="e.g., Cardiology" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      placeholder="Describe this specialty..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-[#0066FF] text-white hover:bg-[#0052CC]"
                    >
                      Add Specialty
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
