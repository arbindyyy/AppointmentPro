import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  text: string;
  rating: number;
  avatarUrl?: string;
}

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  // Default testimonials if API call fails
  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Marketing Agency",
      text: "This booking system has completely transformed how we manage appointments. Our clients love the ease of booking, and we've seen a significant reduction in no-shows.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Financial Services",
      text: "The automated reminders have reduced our no-show rate by 60%. The booking interface is intuitive for our clients and has saved us countless hours on the phone.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "Wellness Center",
      text: "Since implementing this booking system, we've seen a 40% increase in appointments. The SEO features have also helped new clients find us more easily online.",
      rating: 5,
    }
  ];

  const testimonialsData = testimonials || defaultTestimonials;

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Here's what businesses think about our booking system.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="bg-light">
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-1 text-gray-300">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                  <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            testimonialsData.map(testimonial => (
              <Card key={testimonial.id} className="bg-light">
                <CardContent className="p-6">
                  <div className="text-accent mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current' : 'stroke-current fill-none'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      {testimonial.avatarUrl && (
                        <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                      )}
                      <AvatarFallback className="bg-gray-300">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-dark">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
