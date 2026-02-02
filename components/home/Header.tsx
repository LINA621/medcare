"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-[#0066FF]">Med</span>
              <span className={isScrolled ? "text-[#0A1F44]" : "text-white"}>Care</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about-us")}
              className={`text-sm font-medium transition-colors hover:text-[#0066FF] ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              About us
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`text-sm font-medium transition-colors hover:text-[#0066FF] ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("specialties")}
              className={`text-sm font-medium transition-colors hover:text-[#0066FF] ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Specialties
            </button>
            <button
              onClick={() => scrollToSection("doctors")}
              className={`text-sm font-medium transition-colors hover:text-[#0066FF] ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Doctors
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-sm font-medium transition-colors hover:text-[#0066FF] ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Contact us
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button
                variant="outline"
                className={`border-2 ${
                  isScrolled
                    ? "border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white"
                    : "border-white text-[#0A1F44] hover:bg-white hover:text-[#0A1F44]"
                }`}
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
  )
}
