import { 
  Calendar, 
  Clock, 
  Info
} from "lucide-react";

const features = [
  {
    title: "24/7 Availability",
    description: "Allow clients to book appointments anytime, even outside business hours.",
    icon: <Calendar className="w-10 h-10" />
  },
  {
    title: "Time-Saving",
    description: "Reduce administrative work and eliminate back-and-forth communications.",
    icon: <Clock className="w-10 h-10" />
  },
  {
    title: "Automated Reminders",
    description: "Reduce no-shows with automatic email and SMS appointment reminders.",
    icon: <Info className="w-10 h-10" />
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark mb-4">Why Choose Our Booking System?</h2>
          <p className="text-gray-600 max-w-xl mx-auto">We've designed our platform to make booking appointments seamless for both businesses and clients.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-light p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
