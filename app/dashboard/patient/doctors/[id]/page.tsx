'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DoctorDetail {
  id: number
  name: string
  specialty: string
  image_url: string
  experience_years: number
  bio: string
  rating: number
  qualifications: string[]
  availableTimes: string[]
}

const doctorDetails: { [key: string]: DoctorDetail } = {
  '1': {
    id: 1,
    name: 'Dr. John Smith',
    specialty: 'Cardiologist',
    image_url: '',
    experience_years: 15,
    bio: 'Experienced cardiologist with a focus on preventive heart care and cardiac interventions.',
    rating: 4.8,
    qualifications: [
      'MD in Cardiology from Harvard Medical School',
      'Board Certified Cardiologist',
      'Fellowship in Interventional Cardiology',
      'Published researcher in cardiac imaging'
    ],
    availableTimes: ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM']
  },
  '2': {
    id: 2,
    name: 'Dr. Sarah Johnson',
    specialty: 'Orthopedic Surgeon',
    image_url: '',
    experience_years: 12,
    bio: 'Specialized in joint replacement and sports medicine with excellent patient outcomes.',
    rating: 4.7,
    qualifications: [
      'MD in Orthopedic Surgery',
      'Board Certified Orthopedic Surgeon',
      'Sports Medicine Specialist',
      'Minimally Invasive Surgery Certified'
    ],
    availableTimes: ['8:30 AM', '11:00 AM', '1:30 PM', '4:00 PM']
  },
  '3': {
    id: 3,
    name: 'Dr. Michael Lee',
    specialty: 'Pediatrician',
    image_url: '',
    experience_years: 10,
    bio: 'Compassionate pediatrician dedicated to child health and developmental care.',
    rating: 4.9,
    qualifications: [
      'MD in Pediatrics',
      'Board Certified Pediatrician',
      'Neonatal Care Specialist',
      'Child Development Expert'
    ],
    availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM']
  },
  '4': {
    id: 4,
    name: 'Dr. Emily Davis',
    specialty: 'Gynecologist',
    image_url: '',
    experience_years: 14,
    bio: 'Expert in women\'s health and reproductive medicine with compassionate care approach.',
    rating: 4.8,
    qualifications: [
      'MD in Obstetrics and Gynecology',
      'Board Certified OB/GYN',
      'Reproductive Endocrinology Specialist',
      'Minimally Invasive Surgery Expert'
    ],
    availableTimes: ['9:30 AM', '11:00 AM', '1:00 PM', '3:00 PM']
  },
  '5': {
    id: 5,
    name: 'Dr. Fatima Marouon',
    specialty: 'General Practitioner',
    image_url: '',
    experience_years: 18,
    bio: 'Veteran general practitioner with comprehensive medical knowledge and patient care expertise.',
    rating: 4.9,
    qualifications: [
      'MD in General Medicine',
      'Board Certified General Practitioner',
      'Family Medicine Specialist',
      'Emergency Medicine Certified'
    ],
    availableTimes: ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM']
  },
  '6': {
    id: 6,
    name: 'Dr. Ahmed Hassan',
    specialty: 'Dermatologist',
    image_url: '',
    experience_years: 11,
    bio: 'Specialized dermatologist offering advanced skin treatments and cosmetic procedures.',
    rating: 4.6,
    qualifications: [
      'MD in Dermatology',
      'Board Certified Dermatologist',
      'Cosmetic Surgery Specialist',
      'Laser Therapy Expert'
    ],
    availableTimes: ['9:00 AM', '11:00 AM', '1:30 PM', '3:30 PM']
  }
}

export default function DoctorProfilePage() {
  const params = useParams()
  const doctorId = params.id as string
  const doctor = doctorDetails[doctorId]

  if (!doctor) {
    return (
      <DashboardLayout userRole="patient" pageTitle="Doctor Profile">
        <div className="text-center py-12">
          <p className="text-gray-600">Doctor not found</p>
          <Link href="/dashboard/patient/doctors">
            <Button className="mt-4 bg-[#0066FF] text-white hover:bg-[#0052CC]">
              Back to Doctors
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="patient" pageTitle="Doctor Profile">
      <div className="space-y-6">
        {/* Back Button */}
        <Link href="/dashboard/patient/doctors">
          <Button variant="outline" className="bg-transparent">
            ← Back to Doctors
          </Button>
        </Link>

        {/* Doctor Profile Header */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-lg bg-gray-200 overflow-hidden">
                  <img
                    src={doctor.image_url || `/placeholder.svg?height=300&width=300&query=professional doctor portrait`}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Doctor Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-[#0A1F44]">{doctor.name}</h1>
                  <p className="text-lg text-[#0066FF] font-semibold mt-1">{doctor.specialty}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">{doctor.rating.toFixed(1)}</span>
                </div>

                {/* Experience */}
                <div className="text-gray-600">
                  <p className="font-semibold text-gray-700">{doctor.experience_years} years of experience</p>
                </div>

                {/* Bio */}
                <p className="text-gray-600">{doctor.bio}</p>

                {/* Book Button */}
                <Link href={`/dashboard/patient/appointments/book?doctorId=${doctor.id}`}>
                  <Button className="bg-[#0066FF] text-white hover:bg-[#0052CC] px-8">
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Qualifications */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Qualifications & Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {doctor.qualifications.map((qualification, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{qualification}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Available Times */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Available Appointment Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {doctor.availableTimes.map((time, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg text-center text-sm font-medium text-gray-700">
                  {time}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
