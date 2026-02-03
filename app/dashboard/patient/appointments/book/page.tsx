'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DoctorInfo {
  id: number
  name: string
  specialty: string
}

const doctorsList: { [key: string]: DoctorInfo } = {
  '1': { id: 1, name: 'Dr. John Smith', specialty: 'Cardiologist' },
  '2': { id: 2, name: 'Dr. Sarah Johnson', specialty: 'Orthopedic Surgeon' },
  '3': { id: 3, name: 'Dr. Michael Lee', specialty: 'Pediatrician' },
  '4': { id: 4, name: 'Dr. Emily Davis', specialty: 'Gynecologist' },
  '5': { id: 5, name: 'Dr. Fatima Marouon', specialty: 'General Practitioner' },
  '6': { id: 6, name: 'Dr. Ahmed Hassan', specialty: 'Dermatologist' },
}

// Mock patient data (pre-filled from patient profile)
const patientData = {
  name: 'Douae Rateb Boulaich',
  number: 'P-2024-001',
  bloodType: 'O+',
  email: 'douae@example.com',
  phone: '+212 612345678',
}

// Generate available time slots (8 AM to 6 PM, 30-minute intervals)
const generateTimeSlots = (): string[] => {
  const slots: string[] = []
  for (let hour = 8; hour < 18; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`)
    if (hour < 17) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
  }
  return slots
}

// Mock booked appointments for this doctor (would come from database)
const bookedSlots: { [key: string]: string[] } = {
  '2026-02-05': ['09:00', '10:30', '14:00', '16:30'],
  '2026-02-06': ['08:00', '11:00', '13:30', '17:30'],
  '2026-02-07': ['09:30', '12:00', '15:00'],
}

export default function BookAppointmentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const doctorId = searchParams.get('doctorId')

  const [selectedDoctor, setSelectedDoctor] = useState<DoctorInfo | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (doctorId && doctorsList[doctorId]) {
      setSelectedDoctor(doctorsList[doctorId])
    }
  }, [doctorId])

  useEffect(() => {
    if (selectedDate) {
      console.log('[v0] Fetching available slots for date:', selectedDate)
      
      // Get all available time slots (8 AM to 6 PM, 30-min intervals)
      const allSlots = generateTimeSlots()
      
      // Get booked slots for this date from database
      const booked = bookedSlots[selectedDate] || []
      
      // Filter out booked slots to get available slots
      const available = allSlots.filter((slot) => !booked.includes(slot))
      
      setAvailableSlots(available)
      setSelectedTime('') // Reset selected time when date changes
      
      console.log('[v0] Available slots for', selectedDate, ':', available)
    }
  }, [selectedDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log('[v0] Booking appointment:', {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      reason: reason,
      patientInfo: patientData,
    })

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard/patient/appointments')
      }, 2000)
    }, 1000)
  }

  if (!selectedDoctor) {
    return (
      <DashboardLayout userRole="patient" pageTitle="Book Appointment">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 mb-6">No doctor selected. Please select a doctor first.</p>
              <Link href="/dashboard/patient/doctors">
                <Button className="bg-[#0066FF] text-white hover:bg-[#0052CC]">Back to Doctors</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="patient" pageTitle="Book Appointment">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back Button */}
        <Link href="/dashboard/patient/doctors">
          <Button variant="outline" className="bg-transparent">
            ← Back to Doctors
          </Button>
        </Link>

        {success ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0A1F44] mb-2">Appointment Booked Successfully!</h3>
              <p className="text-gray-600">
                Your appointment with {selectedDoctor.name} on {selectedDate} at {selectedTime} has been confirmed.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Selected Doctor (Pre-filled, Read-only) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Selected Doctor</label>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A1F44]">{selectedDoctor.name}</h3>
                      <p className="text-sm text-[#0066FF]">{selectedDoctor.specialty}</p>
                    </div>
                  </div>
                </div>

                {/* Patient Information (Pre-filled, Read-only) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Patient Information</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Patient Name</label>
                      <Input type="text" value={patientData.name} disabled className="bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Patient Number</label>
                      <Input type="text" value={patientData.number} disabled className="bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Blood Type</label>
                      <Input type="text" value={patientData.bloodType} disabled className="bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Email</label>
                      <Input type="email" value={patientData.email} disabled className="bg-gray-100" />
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Appointment Details</label>

                  {/* Date */}
                  <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="focus:ring-[#0066FF] focus:border-[#0066FF]"
                    />
                  </div>

                  {/* Time */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Available Time Slots *
                    </label>
                    {selectedDate ? (
                      availableSlots.length > 0 ? (
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`p-3 rounded-lg font-medium text-sm transition-all border-2 ${
                                selectedTime === slot
                                  ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]'
                                  : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                          No available slots for this date. Please select another date.
                        </div>
                      )
                    ) : (
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
                        Please select a date first
                      </div>
                    )}
                  </div>

                  {/* Reason */}
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Visit *
                    </label>
                    <textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                      placeholder="Describe the reason for your appointment"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <Link href="/dashboard/patient/doctors" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !selectedDate || !selectedTime || !reason}
                    className="flex-1 bg-[#0066FF] text-white hover:bg-[#0052CC] disabled:bg-gray-300"
                  >
                    {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
