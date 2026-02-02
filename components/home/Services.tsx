"use client"

import { useEffect, useState } from "react"
import { apiService } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"

export default function Services() {
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // API_ENDPOINT: GET /api/services
    // Expected response: [{ id, title, description, icon_name }]
    const fetchServices = async () => {
      const response = await apiService.getServices()
      if (response.success && response.data) {
        setServices(response.data as any[])
      }
      setIsLoading(false)
    }

    fetchServices()
  }, [])

  // Default services to display if API is not connected
  const defaultServices = [
    {
      id: 1,
      title: "Pharmacy Service",
      description: "Convenient access to prescription medications & expert pharmaceutical advice, all in one place.",
      icon: "pill",
    },
    {
      id: 2,
      title: "Medical Specialist",
      description: "Consult experienced specialists for accurate diagnoses & personalized treatment plans.",
      icon: "stethoscope",
    },
    {
      id: 3,
      title: "Medical Checkup",
      description: "Regular health checkups to monitor your well-being and detect potential issues early.",
      icon: "clipboard",
    },
    {
      id: 4,
      title: "Health Consultation",
      description: "Professional guidance on maintaining a healthy lifestyle, managing chronic conditions, and more.",
      icon: "message",
    },
    {
      id: 5,
      title: "Health Assurance",
      description: "Comprehensive health insurance plans offering financial protection for medical treatments.",
      icon: "shield",
    },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "pill":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        )
      case "stethoscope":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )
      case "clipboard":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        )
      case "message":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )
      case "shield":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )
    }
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#0066FF] mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span className="text-sm font-semibold uppercase">OUR SERVICES</span>
          </div>
          <h2 className="text-4xl font-bold text-[#0A1F44] mb-4 text-balance">Comprehensive Healthcare Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At CareLife, we offer a wide range of medical services tailored to your needs, from routine check-ups to
            specialized treatments.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.slice(0, 5).map((service, index) => (
            <Card
              key={service.id || index}
              className={`hover:shadow-lg transition-shadow ${
                index === 4 ? "bg-[#0066FF] text-white border-[#0066FF]" : "bg-white"
              }`}
            >
              <CardContent className="p-6">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                    index === 4 ? "bg-white/20 text-white" : "bg-blue-50 text-[#0066FF]"
                  }`}
                >
                  {getIcon(service.icon || service.icon_name)}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${index === 4 ? "text-white" : "text-[#0A1F44]"}`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed ${index === 4 ? "text-white/90" : "text-gray-600"}`}>
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Emergency Call Card */}
          <Card className="bg-[#0066FF] text-white border-[#0066FF] hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold mb-3">Emergency Call</h3>
                <p className="text-sm text-white/90 mb-6">
                  Quick access to emergency services, ensuring immediate care when you need it the most.
                </p>
              </div>
              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="bg-white text-[#0066FF] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2 self-start"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
