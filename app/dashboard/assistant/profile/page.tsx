"use client"

import React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AssistantProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    assignedDoctors: "",
  })

  // API_ENDPOINT: GET /api/assistant/profile
  // API_ENDPOINT: PUT /api/assistant/profile/update

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Replace with actual API call
    console.log("[v0] Updating profile:", formData)
    setIsEditing(false)
  }

  return (
    <DashboardLayout userRole="assistant" pageTitle="Profile">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>My Profile</CardTitle>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className={isEditing ? "bg-red-500 hover:bg-red-600" : "bg-[#0066FF] hover:bg-[#0052CC]"}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white text-3xl font-bold">
                  A
                </div>
                {isEditing && (
                  <div>
                    <Button variant="outline" type="button" className="bg-transparent">
                      Change Photo
                    </Button>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <Input
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Enter full name"
                    />
                  ) : (
                    <p className="text-gray-700 py-2">{formData.fullName || "-"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter email"
                    />
                  ) : (
                    <p className="text-gray-700 py-2">{formData.email || "-"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <Input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="text-gray-700 py-2">{formData.phone || "-"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  {isEditing ? (
                    <Input
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      placeholder="Enter department"
                    />
                  ) : (
                    <p className="text-gray-700 py-2">{formData.department || "-"}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Doctors</label>
                  {isEditing ? (
                    <textarea
                      value={formData.assignedDoctors}
                      onChange={(e) =>
                        setFormData({ ...formData, assignedDoctors: e.target.value })
                      }
                      placeholder="Enter assigned doctors"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-700 py-2 whitespace-pre-wrap">{formData.assignedDoctors || "-"}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#0066FF] text-white hover:bg-[#0052CC]">
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
