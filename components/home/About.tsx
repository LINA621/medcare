"use client"

import { useEffect, useState } from "react"
import { apiService } from "@/lib/api"

export default function About() {
  const [aboutData, setAboutData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // API_ENDPOINT: GET /api/about
    // Expected response: { title, description, vision, mission, features: [] }
    const fetchAbout = async () => {
      const response = await apiService.getAbout()
      if (response.success) {
        setAboutData(response.data)
      }
      setIsLoading(false)
    }

    fetchAbout()
  }, [])

  if (isLoading) {
    return (
      <section id="about-us" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="about-us" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden">
                  {/* IMAGE: Replace with actual about section image */}
                  <img
                    src="/medical-team-consultation.jpg"
                    alt="Medical consultation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden">
                  {/* IMAGE: Replace with actual about section image */}
                  <img
                    src="/modern-hospital.png"
                    alt="Hospital facility"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-[#0066FF] mb-4">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold uppercase">ABOUT US</span>
            </div>

            <h2 className="text-4xl font-bold text-[#0A1F44] mb-6 text-balance">
              MedCare – Creating Safety, Your Health Is Our Priority
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              MedCare provides top-quality healthcare with experienced doctors, emergency services, and round-the-clock
              support. Your trusted partner for a healthier life.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0066FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0A1F44] mb-2">Our Vision</h3>
                  <p className="text-sm text-gray-600">
                    To be a trusted leader in quality, accessible, and compassionate healthcare.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0066FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0A1F44] mb-2">Our Vision</h3>
                  <p className="text-sm text-gray-600">
                    MedCare delivers expert, patient-focused care with 24/7, advanced technology, and a focus on
                    wellness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
