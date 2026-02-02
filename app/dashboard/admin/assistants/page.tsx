"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AssistantsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [assistants, setAssistants] = useState([
    {
      id: 1,
      name: "Emily Davis",
      email: "emily@medcare.com",
      assignedDoctor: "Dr. John Smith",
      status: "Active",
      joinDate: "2023-08-10",
    },
    {
      id: 2,
      name: "Jessica Wilson",
      email: "jessica@medcare.com",
      assignedDoctor: "Dr. Sarah Johnson",
      status: "Active",
      joinDate: "2023-09-15",
    },
    {
      id: 3,
      name: "Lisa Anderson",
      email: "lisa@medcare.com",
      assignedDoctor: "Dr. Michael Lee",
      status: "Active",
      joinDate: "2023-07-20",
    },
    {
      id: 4,
      name: "Sarah Martin",
      email: "sarah.m@medcare.com",
      assignedDoctor: "Unassigned",
      status: "Inactive",
      joinDate: "2023-06-05",
    },
    {
      id: 5,
      name: "Jennifer Brown",
      email: "jennifer@medcare.com",
      assignedDoctor: "Dr. Emily Davis",
      status: "Active",
      joinDate: "2023-10-01",
    },
  ])

  const filteredAssistants = assistants.filter(
    (assistant) =>
      assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assistant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assistant.assignedDoctor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredAssistants.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAssistants = filteredAssistants.slice(startIndex, startIndex + itemsPerPage)

  const assignAssistant = (assistantId: number, doctorName: string) => {
    setAssistants(
      assistants.map((a) => (a.id === assistantId ? { ...a, assignedDoctor: doctorName } : a))
    )
    setShowModal(false)
  }

  return (
    <DashboardLayout userRole="admin" pageTitle="Assistants">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#0A1F44]">Assistants Management</h1>
          <Button onClick={() => setShowModal(true)} className="bg-[#0066FF] text-white hover:bg-[#0052CC]">
            + Assign Assistant to Doctor
          </Button>
        </div>

        {/* Search and Filter Bar */}
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
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Assistants Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Email</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Assigned Doctor</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Join Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAssistants.map((assistant) => (
                    <tr key={assistant.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-gray-700 font-medium">{assistant.name}</td>
                      <td className="py-4 px-6 text-gray-600">{assistant.email}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            assistant.assignedDoctor === "Unassigned"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-blue-50 text-[#0066FF]"
                          }`}
                        >
                          {assistant.assignedDoctor}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            assistant.status === "Active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                          }`}
                        >
                          {assistant.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm">{assistant.joinDate}</td>
                      <td className="py-4 px-6">
                        <Button
                          onClick={() => setShowModal(true)}
                          className="text-xs bg-[#0066FF] text-white hover:bg-[#0052CC] h-8 px-3"
                        >
                          Assign
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg font-medium text-sm transition ${
                  page === currentPage
                    ? "bg-[#0066FF] text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-[#0066FF]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="text-[#0066FF] hover:text-[#0052CC] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        {/* Assign Assistant Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md m-0">
              <div className="bg-[#1e3a8a] p-6 flex items-center justify-between">
                <span className="text-xl font-bold text-white">
                  <span className="text-[#0066FF]">Med</span>
                  <span className="text-white">Care</span>
                </span>
                <button onClick={() => setShowModal(false)} className="text-white hover:bg-[#0052CC] p-1 rounded">
                  ✕
                </button>
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[#0A1F44] mb-4">Assign Assistant to Doctor</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Assistant</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066FF]">
                      {paginatedAssistants.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066FF]">
                      <option>Dr. John Smith</option>
                      <option>Dr. Sarah Johnson</option>
                      <option>Dr. Michael Lee</option>
                      <option>Dr. Emily Davis</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-[#0066FF] text-white hover:bg-[#0052CC]"
                    >
                      Assign
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
