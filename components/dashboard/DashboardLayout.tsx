"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "patient" | "doctor" | "assistant" | "admin" | "pharmacist" | "radiologist"
  pageTitle?: string
}

export default function DashboardLayout({ children, userRole, pageTitle }: DashboardLayoutProps) {
  const router = useRouter()
  const { logout, user } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  const getNavigationItems = () => {
    switch (userRole) {
      case "patient":
        return [
          { name: "Dashboard", href: "/dashboard/patient", icon: "dashboard" },
          { name: "Book Appointment", href: "/dashboard/patient/appointments/book", icon: "calendar" },
          { name: "My Appointments", href: "/dashboard/patient/appointments", icon: "list" },
          { name: "Medical Records", href: "/dashboard/patient/records", icon: "document" },
          { name: "Profile", href: "/dashboard/patient/profile", icon: "user" },
        ]
      case "doctor":
        return [
          { name: "Dashboard", href: "/dashboard/doctor", icon: "dashboard" },
          { name: "Patients", href: "/dashboard/doctor/patients", icon: "users" },
          { name: "Appointments", href: "/dashboard/doctor/appointments", icon: "calendar" },
          { name: "Consultations", href: "/dashboard/doctor/consultations", icon: "document" },
          { name: "Diagnostic AI", href: "/dashboard/doctor/diagnosis", icon: "brain" },
          { name: "Profile", href: "/dashboard/doctor/profile", icon: "user" },
        ]
      case "assistant":
        return [
          { name: "Dashboard", href: "/dashboard/assistant", icon: "dashboard" },
          { name: "Appointments", href: "/dashboard/assistant/appointments", icon: "calendar" },
          { name: "Patients", href: "/dashboard/assistant/patients", icon: "users" },
          { name: "Consultations", href: "/dashboard/assistant/consultations", icon: "document" },
          { name: "Profile", href: "/dashboard/assistant/profile", icon: "user" },
        ]
      case "admin":
        return [
          { name: "Dashboard", href: "/dashboard/admin", icon: "dashboard" },
          { name: "Users", href: "/dashboard/admin/users", icon: "users" },
          { name: "Assistants", href: "/dashboard/admin/assistants", icon: "users" },
          { name: "Specialties", href: "/dashboard/admin/specialties", icon: "list" },
          { name: "View Statistics", href: "/dashboard/admin/statistics", icon: "chart" },
        ]
      default:
        return [
          { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
          { name: "Profile", href: "/dashboard/profile", icon: "user" },
        ]
    }
  }

  const navigationItems = getNavigationItems()

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "dashboard":
        return (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        )
      case "calendar":
        return (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )
      case "users":
        return (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )
      case "document":
        return (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
      case "user":
        return (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )
      case "list":
        return (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )
      case "brain":
        return (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )
      case "chart":
        return (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        )
      default:
        return null
    }
  }

  const getRoleLabel = (role?: string): string => {
    switch (role?.toLowerCase()) {
      case "doctor":
        return "Doctor"
      case "patient":
        return "Patient"
      case "assistant":
        return "Assistant"
      case "admin":
        return "Administrator"
      case "pharmacist":
        return "Pharmacist"
      case "radiologist":
        return "Radiologist"
      default:
        return "User"
    }
  }

  const userProfile = {
    name: user?.name || "User",
    role: getRoleLabel(user?.role),
    avatar: user?.avatar || "/placeholder.svg",
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#1e3a8a] flex flex-col transform transition-transform duration-300 lg:translate-x-0 h-screen ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo section - at top of sidebar */}
        <div className="p-6 border-b border-[#0052CC] flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl font-bold">
              <span className="text-[#0066FF]">Med</span>
              <span className="text-white">Care</span>
            </span>
          </Link>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-[#0052CC] transition-colors"
            >
              {getIcon(item.icon)}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout button at bottom */}
        <div className="p-4 border-t border-[#0052CC] flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-[#0052CC] transition-colors w-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header with user profile and notifications - inside main content */}
        <header className="bg-white border-b border-gray-200 flex-shrink-0 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-[#0A1F44]">{pageTitle || "Dashboard"}</h2>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                console.log("[v0] Notifications clicked")
                // Add notification handling logic here
              }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative group"
              title="View notifications"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                View notifications
              </span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-[#0A1F44]">{userProfile.name}</p>
                <p className="text-xs text-gray-600">{userProfile.role}</p>
              </div>
              <Link href={`/dashboard/${userRole}/profile`}>
                <img
                  src={userProfile.avatar || "/placeholder.svg"}
                  alt={userProfile.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300 cursor-pointer hover:opacity-80 transition"
                />
              </Link>
            </div>
          </div>
        </header>

        {/* Content area - scrollable */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  )
}
