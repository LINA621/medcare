export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Consult Our Experts",
      description:
        "Meet with our highly skilled doctors and medical specialists who will listen to your concerns, provide an accurate diagnosis, and recommend the effective treatment options.",
    },
    {
      number: "02",
      title: "Book An Appointment",
      description:
        "Schedule your visit through our easy-to-use online platform or by calling our friendly support team. Choose the time that works best for you.",
    },
    {
      number: "03",
      title: "Receive Care",
      description:
        "Once a treatment plan is established, our team ensures you receive the necessary medical services, whether it's a prescription from our pharmacy, specialized care.",
    },
    {
      number: "04",
      title: "Follow-Up",
      description:
        "After your treatment, we stay connected for follow-up consultations, ensuring your recovery is progressing smoothly and addressing any further questions you may have.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#0066FF] mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold uppercase">HOW IT WORKS</span>
          </div>
          <h2 className="text-4xl font-bold text-[#0A1F44] mb-4 text-balance">
            Trusted Healthcare With A Focus On Your Well-Being
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At MedCare, we've streamlined the healthcare process to ensure you receive the best care with ease and
            convenience. Here's how our system works to keep you healthy and support your every step.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4 bg-blue-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#0A1F44] mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
