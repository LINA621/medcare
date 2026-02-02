"use client"

import { Button } from "@/components/ui/button"

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0A1F44] via-[#152D54] to-[#1F3A64] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: "url('/grid-pattern.svg')" }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-orange-400 text-sm">👋</span>
              <span className="text-sm font-medium">WELCOME TO MEDCARE</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
              We Are Here To Hear And Heal Your Health Problems
            </h1>

            <p className="text-lg text-gray-300 mb-4">MedCare – Your Trusted Partner in Healthcare</p>

            <p className="text-base text-gray-400 mb-8 max-w-xl">
              Comprehensive medical care with expert doctors, advanced technology, and compassionate service. Your
              health, our priority.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="bg-[#0066FF] text-white hover:bg-[#0052CC] px-8">
                Book Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-2 border-white bg-white text-black hover:bg-gray-100 hover:text-black"
              >
                Contact Us
              </Button>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="lg:flex lg:flex-col lg:items-end space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 max-w-sm">
              <div className="text-6xl font-bold text-white mb-2">25+</div>
              <div className="text-gray-300 text-lg">Years of Experience</div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 max-w-sm">
              <div className="text-6xl font-bold text-white mb-2">140+</div>
              <div className="text-gray-300 text-lg">Specialist Doctors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Banner at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-[#0066FF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A1F44] mb-1">Expert Doctors</h3>
                <p className="text-sm text-gray-600">Skilled professionals delivering top-quality care.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#0066FF] text-white rounded-xl px-6 py-4 -my-2">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Emergency Care</h3>
                <p className="text-sm text-white/90">Fast, reliable treatment when you need it most.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-[#0066FF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A1F44] mb-1">24/7 Full Support</h3>
                <p className="text-sm text-gray-600">Always here for appointments and emergencies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
