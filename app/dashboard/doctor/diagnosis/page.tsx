"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"

export default function DiagnosticAIPage() {
  const [activeTab, setActiveTab] = useState("diagnostic")
  const [symptoms, setSymptoms] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return

    setIsAnalyzing(true)

    // API_ENDPOINT: POST /api/doctor/diagnosis/predict
    // Request: { symptoms: string, doctor_id: string }
    // Response: { diagnosis_id: string, diseases: [{ name, confidence_score }], recommendations: string }
    
    // Simulating API delay - replace with actual fetch when API is available
    setTimeout(() => {
      setResults(null)
      setIsAnalyzing(false)
    }, 1000)
  }

  return (
    <DashboardLayout userRole="doctor">
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#0A1F44]">Diagnostic AI</h1>
          <Button className="bg-[#0066FF] text-white hover:bg-[#0052CC] flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Diagnostic
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("diagnostic")}
              className={`py-4 font-semibold text-sm transition-all ${
                activeTab === "diagnostic"
                  ? "text-[#0066FF] border-b-2 border-[#0066FF]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              DIAGNOSTIC
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-4 font-semibold text-sm transition-all ${
                activeTab === "history"
                  ? "text-[#0066FF] border-b-2 border-[#0066FF]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              DIAGNOSTIC HISTORY
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-12">
          {activeTab === "diagnostic" ? (
            <div className="flex flex-col items-center justify-center min-h-96">
              {/* MedCare AI Welcome */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#0066FF] to-[#0052CC] rounded-full mb-6">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-[#0A1F44] mb-2">MedCare AI</h2>
                <p className="text-gray-600">Welcome to Medcare AI</p>
              </div>

              {/* Input Area */}
              <div className="w-full max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Type symptoms"
                    className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent text-gray-700"
                  />
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !symptoms.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#0066FF] hover:text-[#0052CC] disabled:text-gray-300 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.9429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.05757238 C3.34915502,0.9004749 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.19218622,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376904 C16.6915026,11.5376904 17.1624089,11.5376904 17.1624089,12.0089825 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No diagnostic history yet</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
