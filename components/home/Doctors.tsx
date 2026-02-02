"use client"

import { useEffect, useState } from "react"
import { apiService } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Doctors() {
  const [doctors, setDoctors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // API_ENDPOINT: GET /api/doctors
    // Expected response: [{ id, name, specialty, image_url, experience_years }]
    const fetchDoctors = async () => {
      const response = await apiService.getDoctors()
      if (response.success && response.data) {
        setDoctors(response.data as any[])
      }
      setIsLoading(false)
    }

    fetchDoctors()
  }, [])

  // Default doctors if API is not connected
  const defaultDoctors = [
    { id: 1, name: "Dr. John Smith", specialty: "Cardiologist", image_url: "" },
    { id: 2, name: "Dr. Sarah Johnson", specialty: "Orthopedic Surgeon", image_url: "" },
    { id: 3, name: "Dr. Michael Lee", specialty: "Pediatrician", image_url: "" },
    { id: 4, name: "Dr. Emily Davis", specialty: "Gynecologist", image_url: "" },
  ]

  const displayDoctors = doctors.length > 0 ? doctors : defaultDoctors

  return (
    <section id="doctors" className="py-20 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#0066FF] mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-sm font-semibold uppercase">OUR DOCTORS</span>
          </div>
          <h2 className="text-4xl font-bold text-[#0A1F44] mb-4 text-balance">Meet Our Specialist Doctors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team of specialist doctors is dedicated to providing expert care across a wide range of medical fields.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayDoctors.map((doctor) => (
            <Card key={doctor.id} className="bg-white overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                {/* IMAGE: Replace with actual doctor image */}
                <img
                  src={doctor.image_url || `/placeholder.svg?height=400&width=300&query=professional doctor portrait`}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-[#0A1F44] text-lg mb-1">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <a href="/signup">
            <Button className="bg-[#0066FF] text-white hover:bg-[#0052CC] px-8">View More</Button>
          </a>
        </div>
      </div>
    </section>
  )
}
