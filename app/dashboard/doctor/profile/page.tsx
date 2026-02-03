'use client'

import React from "react"

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'Dr. Abderrahim Harouchi',
    email: 'abderrahim.harouchi@medcare.com',
    phone: '+212 612345678',
    specialization: 'General Medicine',
    licenseNumber: 'LIC-2024-001',
    yearsOfExperience: '8',
    clinic: 'MedCare Hospital',
    about: 'Experienced general practitioner with 8 years of clinical practice. Dedicated to providing high-quality patient care and continuing medical education.',
  })

  // API_ENDPOINT: GET /api/doctor/profile
  // Response: { id, fullName, email, phone, specialization, licenseNumber, yearsOfExperience, clinic, about, avatar }
  
  // API_ENDPOINT: PUT /api/doctor/profile
  // Request: Updated profile data
  // Response: Updated profile information

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // API call to update profile
    console.log('[v0] Save profile:', formData)
    setIsEditing(false)
  }

  return (
    <DashboardLayout userRole="doctor" pageTitle="Profile">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0A1F44]">Profile</h1>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="bg-[#0066FF] text-white hover:bg-[#0052CC]">
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Card */}
        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSaveProfile} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-semibold text-[#0A1F44] mb-6">Basic Information</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name</label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">License Number</label>
                    <Input
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      placeholder="Enter license number"
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h2 className="text-lg font-semibold text-[#0A1F44] mb-6">Professional Information</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Specialization</label>
                    <Input
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      placeholder="e.g., Cardiology"
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Years of Experience</label>
                    <Input
                      name="yearsOfExperience"
                      type="number"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      placeholder="e.g., 5"
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Clinic/Hospital</label>
                  <Input
                    name="clinic"
                    value={formData.clinic}
                    onChange={handleInputChange}
                    placeholder="Enter clinic or hospital name"
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>
              </div>

              {/* About */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">About</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  placeholder="Write a brief bio..."
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#0066FF] text-white hover:bg-[#0052CC]">
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[#0A1F44] mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since:</span>
                  <span className="font-semibold text-gray-900">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Login:</span>
                  <span className="font-semibold text-gray-900">Today at 9:30 AM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[#0A1F44] mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Patients:</span>
                  <span className="font-semibold text-gray-900">--</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Appointments:</span>
                  <span className="font-semibold text-gray-900">--</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Rating:</span>
                  <span className="font-semibold text-gray-900">--</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
