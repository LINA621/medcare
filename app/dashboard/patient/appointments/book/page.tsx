"use client"

import type React from "react"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { apiService } from "@/lib/api"

export default function BookAppointmentPage() {
  const [doctors, setDoctors] = useState<any[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    reason: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // API_ENDPOINT: GET /api/doctors/available
    // Response: [{ id, name, specialty, available_slots: [] }]
    const fetchDoctors = async () => {
      const response = await apiService.getAvailableDoctors()
      if (response.success && response.data) {
        setDoctors(response.data as any[])
      }
    }

    fetchDoctors()
  }, [])

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      // API_ENDPOINT: GET /api/appointments/available-slots
      // Query params: { doctor_id, date }
      // Response: { available_times: ["09:00", "10:00", ...] }
      const fetchSlots = async () => {
        setIsLoadingSlots(true)
        const response = await apiService.getAvailableSlots(selectedDoctor, selectedDate)
        if (response.success && response.data) {
          setAvailableSlots((response.data as any).available_times || [])
        } else {
          // Default slots if API not connected
          setAvailableSlots(["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"])
        }
        setIsLoadingSlots(false)
      }

      fetchSlots()
    }
  }, [selectedDoctor, selectedDate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!selectedDoctor || !selectedDate || !selectedTime) {
      setError("Please select doctor, date, and time")
      setIsLoading(false)
      return
    }

    // API_ENDPOINT: POST /api/appointments/book
    // Request: { patient_id, doctor_id, date, time, reason, patient_name, patient_phone }
    const response = await apiService.bookAppointment({
      doctor_id: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      reason: formData.reason,
      patient_name: formData.patientName,
      patient_phone: formData.patientPhone,
    })

    if (response.success) {
      setSuccess(true)
      // Reset form
      setSelectedDoctor("")
      setSelectedDate("")
      setSelectedTime("")
      setFormData({ patientName: "", patientPhone: "", reason: "" })
    } else {
      setError(response.error?.message || "Failed to book appointment")
    }

    setIsLoading(false)
  }

  return (
    <DashboardLayout userRole="patient">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#0A1F44] mb-2">Book an Appointment</h1>
          <p className="text-gray-600">Schedule your visit with our expert doctors</p>
        </div>

        {success ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0A1F44] mb-2">Appointment Booked!</h3>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => setSuccess(false)} className="bg-[#0066FF] text-white hover:bg-[#0052CC]">
                  Book Another
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = "/dashboard/patient/appointments")}>
                  View Appointments
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Select Doctor */}
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
                  <button
                    type="button"
                    onClick={() => (window.location.href = "/#specialties")}
                    className="text-[#0066FF] hover:text-[#0052CC] text-sm font-medium underline"
                  >
                    View all doctors
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                      <button
                        key={doctor.id}
                        type="button"
                        onClick={() => setSelectedDoctor(doctor.id)}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          selectedDoctor === doctor.id
                            ? "border-[#0066FF] bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gray-200" />
                          <div>
                            <p className="font-semibold text-[#0A1F44]">{doctor.name}</p>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-2">
                      <p className="text-gray-500">Loading doctors...</p>
                    </div>
                  )}
                </div>

                {/* Select Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full"
                  />
                </div>

                {/* Select Time Slot */}
                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
                    {isLoadingSlots ? (
                      <p className="text-gray-500">Loading available slots...</p>
                    ) : availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`p-3 border-2 rounded-lg text-center font-medium transition-all ${
                              selectedTime === slot
                                ? "border-[#0066FF] bg-blue-50 text-[#0066FF]"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No available slots for this date</p>
                    )}
                  </div>
                )}

                {/* Patient Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Name
                    </label>
                    <Input
                      id="patientName"
                      type="text"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      placeholder="Your full name"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="patientPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="patientPhone"
                      type="tel"
                      value={formData.patientPhone}
                      onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                      placeholder="Your phone number"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Reason for Visit */}
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Consultation
                  </label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Describe your symptoms or reason for visit..."
                    required
                    minLength={10}
                    rows={4}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0066FF] text-white hover:bg-[#0052CC] h-12"
                >
                  {isLoading ? "Booking..." : "Book Appointment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
