'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface NewAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: AppointmentFormData) => void
}

interface AppointmentFormData {
  doctorName: string
  patientName: string
  date: string
  time: string
  reason: string
}

export default function NewAppointmentModal({ isOpen, onClose, onConfirm }: NewAppointmentModalProps) {
  const [formData, setFormData] = useState<AppointmentFormData>({
    doctorName: '',
    patientName: '',
    date: '',
    time: '',
    reason: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm(formData)
    setFormData({ doctorName: '', patientName: '', date: '', time: '', reason: '' })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A1F44] to-[#1e3a8a] px-8 py-6 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold">
              <span className="text-[#0066FF]">Med</span>
              <span className="text-white">Care</span>
            </h1>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-[#0A1F44] mb-8">Appointment</h2>

          {/* Doctor Name and Patient Name */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">Doctor Name</label>
              <select
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-gray-700"
                required
              >
                <option value="">Select Doctor</option>
                <option value="Dr. Fatima Marouon">Dr. Fatima Marouon</option>
                <option value="Dr. Ahmed Hassan">Dr. Ahmed Hassan</option>
                <option value="Dr. Leila Bennani">Dr. Leila Bennani</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">Patient Name</label>
              <select
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-gray-700"
                required
              >
                <option value="">Select Patient</option>
                <option value="Fatima Zahra Rahmouni">Fatima Zahra Rahmouni</option>
                <option value="Fouad Raissouni">Fouad Raissouni</option>
                <option value="Krishtav Rajan">Krishtav Rajan</option>
                <option value="Sumanth Tinson">Sumanth Tinson</option>
                <option value="EG Subramani">EG Subramani</option>
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">Date</label>
              <div className="relative">
                <svg className="w-5 h-5 absolute right-3 top-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-gray-700"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">Time</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-gray-700"
                required
              >
                <option value="">Select Time</option>
                <option value="09:00">09:00 AM</option>
                <option value="09:30">09:30 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="14:30">02:30 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="15:30">03:30 PM</option>
              </select>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))}
              placeholder="Enter reason for appointment"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] resize-none text-gray-700"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#0A1F44] text-white hover:bg-[#051733] font-semibold"
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
