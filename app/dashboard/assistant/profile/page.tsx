'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AssistantProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'Samira Fadel',
    email: 'samira.fadel@medcare.com',
    phone: '+212 612345678',
    department: 'Medical Administration',
    employeeId: 'ASS-2024-001',
    dateJoined: '2024-01-15',
    about: 'Experienced medical assistant with a focus on patient care coordination and administrative support.',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    console.log('[v0] Saving profile:', formData)
    // API call to update profile would go here
    setIsEditing(false)
  }

  return (
    <DashboardLayout userRole="assistant" pageTitle="Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0A1F44]">Profile</h1>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={isEditing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-[#0066FF] hover:bg-[#0052CC] text-white'}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        {/* Profile Avatar Section */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0A1F44]">{formData.fullName}</h2>
                <p className="text-gray-600 mt-1">{formData.department}</p>
                <p className="text-sm text-gray-500 mt-2">ID: {formData.employeeId}</p>
                <p className="text-sm text-gray-500">Joined: {new Date(formData.dateJoined).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                <Input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Employee ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Employee ID</label>
                <Input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  disabled={true}
                  className="disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Date Joined */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date Joined</label>
                <Input
                  type="date"
                  name="dateJoined"
                  value={formData.dateJoined}
                  onChange={handleInputChange}
                  disabled={true}
                  className="disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
              />
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={handleSave}
                  className="bg-[#0066FF] text-white hover:bg-[#0052CC]"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Discard Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Status */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 px-4 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-semibold text-green-900">Account Status</p>
                  <p className="text-sm text-green-700">Your account is active</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              <div className="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <p className="font-semibold text-blue-900">Account Type</p>
                  <p className="text-sm text-blue-700">Medical Assistant</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
