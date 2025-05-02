import { ChevronRight } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Choose a Service",
    description: "Browse through our available services and select the one you need."
  },
  {
    number: 2,
    title: "Select a Time Slot",
    description: "View our available time slots and pick the one that works best for your schedule."
  },
  {
    number: 3,
    title: "Confirm Your Booking",
    description: "Fill in your details, receive instant confirmation, and you're all set!"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Three simple steps to book your next appointment online.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                <div className="text-white bg-primary w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ChevronRight className="w-8 h-8 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
