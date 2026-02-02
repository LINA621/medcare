"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const deleteUser = (id: number) => {
  // Placeholder function for deleteUser
  console.log(`Deleting user with id: ${id}`);
}

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showAssistantModal, setShowAssistantModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john@medcare.com",
      role: "Doctor",
      status: "Active",
      joinDate: "2023-03-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@medcare.com",
      role: "Patient",
      status: "Active",
      joinDate: "2023-06-20",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily@medcare.com",
      role: "Assistant",
      status: "Active",
      joinDate: "2023-08-10",
    },
    {
      id: 4,
      name: "Michael Lee",
      email: "michael@medcare.com",
      role: "Doctor",
      status: "Inactive",
      joinDate: "2023-01-05",
    },
  ])

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterRole || user.role === filterRole),
  )

  const toggleUserStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user
      )
    )
  }

  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  return (
    <DashboardLayout userRole="admin" pageTitle="Users">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#0A1F44]">Users Management</h1>
          <Button onClick={() => setShowModal(true)} className="bg-[#0066FF] text-white hover:bg-[#0052CC]">
            + Add New User
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
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
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
              >
                <option value="">All Roles</option>
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
                <option value="Assistant">Assistant</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Email</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Role</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Join Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-gray-700 font-medium">{user.name}</td>
                      <td className="py-4 px-6 text-gray-600">{user.email}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-[#0066FF]">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.status === "Active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm">{user.joinDate}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            user.status === "Active"
                              ? "bg-red-50 hover:bg-red-100 text-red-600"
                              : "bg-green-50 hover:bg-green-100 text-green-600"
                          }`}
                        >
                          {user.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
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

        {/* Add User Modal */}
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
                <h2 className="text-xl font-bold text-[#0A1F44] mb-4">Add New User</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <Input type="text" placeholder="Enter full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="Enter email address" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066FF]">
                      <option>Doctor</option>
                      <option>Patient</option>
                      <option>Assistant</option>
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
                      Create User
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
