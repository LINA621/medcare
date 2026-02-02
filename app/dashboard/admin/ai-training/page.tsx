"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AITrainingPage() {
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [trainingLogs, setTrainingLogs] = useState([
    "Model training completed - 2024-01-15 14:30",
    "Accuracy improved from 92% to 94%",
    "Processed 10,000 medical records",
  ])
  const [newTrainingData, setNewTrainingData] = useState("")

  const startTraining = () => {
    setIsTraining(true)
    setTrainingProgress(0)

    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          setTrainingLogs([
            `Training completed - ${new Date().toLocaleString()}`,
            "Model accuracy: 94%",
            ...trainingLogs,
          ])
          return 100
        }
        return prev + 10
      })
    }, 1000)
  }

  return (
    <DashboardLayout userRole="admin" pageTitle="AI Training">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#0A1F44]">AI Model Training</h1>
          <Button onClick={() => setShowModal(true)} className="bg-[#0066FF] text-white hover:bg-[#0052CC]">
            + Train Model
          </Button>
        </div>

        {/* Model Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600 mb-2">Model Accuracy</p>
              <p className="text-4xl font-bold text-[#0066FF]">94%</p>
              <p className="text-xs text-green-600 mt-2">↑ 2% improved</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600 mb-2">Training Samples</p>
              <p className="text-4xl font-bold text-[#0066FF]">50K+</p>
              <p className="text-xs text-gray-600 mt-2">Records processed</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600 mb-2">Last Training</p>
              <p className="text-xl font-bold text-[#0A1F44]">2024-01-15</p>
              <p className="text-xs text-gray-600 mt-2">14:30 UTC</p>
            </CardContent>
          </Card>
        </div>

        {/* Training Progress Card */}
        {isTraining && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Training in Progress</h3>
                <span className="text-sm font-bold text-[#0066FF]">{trainingProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#0066FF] h-3 rounded-full transition-all"
                  style={{ width: `${trainingProgress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Training Logs Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Log Entry</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingLogs.map((log, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-gray-700 text-sm">{log}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <div className="bg-[#1e3a8a] p-6 flex items-center justify-between rounded-t-lg">
                <div>
                  <span className="text-xl font-bold text-white">
                    <span className="text-[#0066FF]">Med</span>
                    <span className="text-white">Care</span>
                  </span>
                </div>
                <button onClick={() => setShowModal(false)} className="text-white hover:bg-[#0052CC] p-1 rounded">
                  ✕
                </button>
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[#0A1F44] mb-4">Train AI Model</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Training Data Source</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066FF]">
                      <option>Medical Records Database</option>
                      <option>External Dataset</option>
                      <option>Custom Upload</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Epochs</label>
                    <Input type="number" placeholder="e.g., 10" defaultValue="10" />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        startTraining()
                        setShowModal(false)
                      }}
                      className="flex-1 bg-[#0066FF] text-white hover:bg-[#0052CC]"
                    >
                      Start Training
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
