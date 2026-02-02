import Header from "@/components/home/Header"
import Hero from "@/components/home/Hero"
import About from "@/components/home/About"
import Services from "@/components/home/Services"
import Specialties from "@/components/home/Specialties"
import Doctors from "@/components/home/Doctors"
import Process from "@/components/home/Process"
import Contact from "@/components/home/Contact"
import Footer from "@/components/home/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Specialties />
      <Doctors />
      <Process />
      <Contact />
      <Footer />
    </main>
  )
}
