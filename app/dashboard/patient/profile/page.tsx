'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'Fatima Zahra Raiss',
    email: 'fatima.raiss@email.com',
    phone: '+212 612345678',
    dateOfBirth: '1990-05-15',
    gender: 'Female',
    bloodGroup: 'B+',
    emergencyContact: '+212 612345679',
    allergies: 'Penicillin',
    chronicDiseases: 'Diabetes, High Blood Pressure',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    console.log('[v0] Saving patient profile:', formData)
    setIsEditing(false)
  }

  return (
    <DashboardLayout userRole="patient" pageTitle="Profile">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0A1F44]">My Profile</h1>
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
                <p className="text-gray-600 mt-1">Patient Member</p>
                <p className="text-sm text-gray-500 mt-2">Blood Group: {formData.bloodGroup}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
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

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact</label>
                <Input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Allergies</label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
              />
            </div>

            {/* Chronic Diseases */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Chronic Diseases</label>
              <textarea
                name="chronicDiseases"
                value={formData.chronicDiseases}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
              />
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button onClick={handleSave} className="bg-[#0066FF] text-white hover:bg-[#0052CC]">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Discard Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
