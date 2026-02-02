"use client"

import { useEffect, useState } from "react"
import { apiService } from "@/lib/api"

export default function Specialties() {
  const [specialties, setSpecialties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // API_ENDPOINT: GET /api/specialties
    // Expected response: [{ id, name, description, icon, doctor_count }]
    const fetchSpecialties = async () => {
      const response = await apiService.getSpecialties()
      if (response.success && response.data) {
        setSpecialties(response.data as any[])
      }
      setIsLoading(false)
    }

    fetchSpecialties()
  }, [])

  // Default specialties if API is not connected
  const defaultSpecialties = [
    { id: 1, name: "Neurology", icon: "brain" },
    { id: 2, name: "Bones", icon: "bone" },
    { id: 3, name: "Oncology", icon: "heart" },
    { id: 4, name: "Otorhinolaryngology", icon: "ear" },
    { id: 5, name: "Ophthalmology", icon: "eye" },
    { id: 6, name: "Cardiovascular", icon: "heart-pulse" },
    { id: 7, name: "Pulmonology", icon: "lungs" },
    { id: 8, name: "Renal Medicine", icon: "kidney" },
    { id: 9, name: "Gastroenterology", icon: "stomach" },
    { id: 10, name: "Urology", icon: "drop" },
    { id: 11, name: "Dermatology", icon: "hand" },
    { id: 12, name: "Gynecology", icon: "female" },
  ]

  const displaySpecialties = specialties.length > 0 ? specialties : defaultSpecialties

  const getSpecialtyIcon = () => {
    return (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    )
  }

  return (
    <section id="specialties" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#0066FF] mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold uppercase">OUR SPECIALTIES</span>
          </div>
          <h2 className="text-4xl font-bold text-[#0A1F44] mb-4 text-balance">Tailored Medical Expertise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At MedCare, we provide comprehensive care across various medical fields. Whether you need a general
            consultation or advanced specialized care, our qualified team is here to guide you every step of the way.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displaySpecialties.map((specialty) => (
            <div
              key={specialty.id}
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:border-[#0066FF] group"
            >
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0066FF] transition-colors">
                <div className="text-[#0066FF] group-hover:text-white transition-colors">{getSpecialtyIcon()}</div>
              </div>
              <h3 className="text-center text-sm font-semibold text-[#0A1F44]">{specialty.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
