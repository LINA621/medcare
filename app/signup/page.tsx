"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"

export default function SignUpPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    fullName: "",
    cin: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    // API_ENDPOINT: POST /api/auth/register
    // Request: { name, email, password, role, cin, phone }
    // Response: { success, message, user_id }
    const result = await register({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      cin: formData.cin,
      phone: formData.phoneNumber,
      role: "patient", // Default role
    })

    if (result.success) {
      router.push("/login?registered=true")
    } else {
      setError(result.error || "Registration failed. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1F44] via-[#152D54] to-[#1F3A64]">
      {/* Header */}
      <header className="bg-[#0A1F44]/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                <span className="text-[#0066FF]">Med</span>
                <span className="text-white">Care</span>
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#0A1F44] bg-transparent"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#0066FF] text-white hover:bg-[#0052CC]">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Branding */}
          <div className="hidden lg:block">
            <div className="bg-[#0066FF] rounded-3xl p-12 text-white h-full flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-12">
                <span className="text-white">Med</span>
                <span className="text-white">Care</span>
              </h2>

              {/* Doctor Images - Actual implementation */}
              <div className="mb-12 flex items-end justify-center gap-8">
                {/* Doctor 1 */}
                <div className="w-40 h-52 bg-white/10 rounded-t-full overflow-hidden">
                  <img src="/male-doctor-with-stethoscope-smiling-in-white-coat.jpg" alt="Male doctor" className="w-full h-full object-cover" />
                </div>

                {/* Doctor 2 */}
                <div className="w-40 h-52 bg-white/10 rounded-t-full overflow-hidden">
                  <img src="/female-doctor-with-stethoscope-in-white-coat-profe.jpg" alt="Female doctor" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Feature Cards - Rebuilt with proper structure */}
              <div className="grid grid-cols-3 gap-4 text-center">
                {/* Expert Doctors Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    Skilled professionals delivering top-quality care.
                  </p>
                </div>

                {/* Emergency Care Card - Highlighted */}
                <div className="bg-white rounded-2xl p-6 text-[#0066FF] shadow-lg">
                  <div className="w-14 h-14 rounded-full bg-[#0066FF] text-white flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">Fast, reliable treatment when you need it most.</p>
                </div>

                {/* 24/7 Support Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">Always here for appointments and emergencies.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Sign Up Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-[#0A1F44] mb-6">Sign up For Account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
              )}

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Your First Name and Last Name"
                  required
                  minLength={2}
                  className="w-full"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cin" className="block text-sm font-medium text-gray-700 mb-1">
                    CIN
                  </label>
                  <Input
                    id="cin"
                    type="text"
                    value={formData.cin}
                    onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                    placeholder="Enter Your Valid CIN"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="Enter Your Phone Number"
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter Your Email Address"
                  required
                  className="w-full"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Your Password"
                    required
                    minLength={8}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm Your Password"
                    required
                    minLength={8}
                    className="w-full"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0A1F44] text-white hover:bg-[#152D54] h-12 text-base"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-[#0066FF] font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
