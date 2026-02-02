"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "Admin User",
    email: "admin@medcare.com",
    phone: "+1 234 567 8900",
    department: "System Administration",
    joinDate: "2023-01-15",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    // API_ENDPOINT: PUT /api/admin/profile
    // Request: { fullName, email, phone, department }
    console.log("Saving profile:", formData)
    setIsEditing(false)
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44] mb-2">Admin Profile</h1>
          <p className="text-gray-600">View and manage your profile information</p>
        </div>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Profile Information</CardTitle>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? "bg-gray-400" : "bg-[#0066FF] text-white"}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0A1F44] flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <Input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full" />
                ) : (
                  <p className="text-lg font-semibold text-[#0A1F44]">{formData.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full" />
                ) : (
                  <p className="text-lg font-semibold text-[#0A1F44]">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <Input name="phone" value={formData.phone} onChange={handleChange} className="w-full" />
                ) : (
                  <p className="text-lg font-semibold text-[#0A1F44]">{formData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                {isEditing ? (
                  <Input name="department" value={formData.department} onChange={handleChange} className="w-full" />
                ) : (
                  <p className="text-lg font-semibold text-[#0A1F44]">{formData.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                <p className="text-lg font-semibold text-[#0A1F44]">{formData.joinDate}</p>
              </div>
            </div>

            {isEditing && (
              <Button onClick={handleSave} className="w-full bg-[#0066FF] text-white hover:bg-[#0052CC]">
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
