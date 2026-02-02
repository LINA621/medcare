"use client"

import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <DashboardLayout userRole="admin" pageTitle="">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0A1F44] mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-[#0A1F44] mt-2">1,234</p>
                </div>
                <div className="text-5xl text-[#0066FF] opacity-60">👥</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Doctors</p>
                  <p className="text-3xl font-bold text-[#0A1F44] mt-2">142</p>
                </div>
                <div className="text-5xl text-green-500 opacity-60">👨‍⚕️</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Specialties</p>
                  <p className="text-3xl font-bold text-[#0A1F44] mt-2">28</p>
                </div>
                <div className="text-5xl text-blue-500 opacity-60">🏥</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Assistants</p>
                  <p className="text-3xl font-bold text-[#0A1F44] mt-2">35</p>
                </div>
                <div className="text-5xl text-purple-500 opacity-60">👤</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/dashboard/admin/users">
                <Button className="w-full bg-[#0066FF] text-white hover:bg-[#0052CC]">Manage Users</Button>
              </Link>
              <Link href="/dashboard/admin/specialties">
                <Button className="w-full bg-[#0066FF] text-white hover:bg-[#0052CC]">Manage Specialties</Button>
              </Link>
              <Link href="/dashboard/admin/assistants">
                <Button className="w-full bg-[#0066FF] text-white hover:bg-[#0052CC]">Manage Assistants</Button>
              </Link>
              <Link href="/dashboard/admin/statistics">
                <Button className="w-full bg-[#0066FF] text-white hover:bg-[#0052CC]">View Statistics</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
