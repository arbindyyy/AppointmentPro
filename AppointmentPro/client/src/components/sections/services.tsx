import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Services() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['/api/services'],
  });

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-xl mx-auto">We offer a variety of services to meet your needs.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-2/3"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
                    <div className="h-9 bg-gray-200 rounded animate-pulse w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : services?.map((service) => (
              <Card key={service.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-semibold mb-2">{service.name}</CardTitle>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">{service.duration} min</span>
                    <Button variant="secondary" asChild>
                      <Link href="#book-now">Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )) || (
              // Fallback services if data doesn't load
              [
                {
                  id: 1,
                  name: "Business Consultation",
                  description: "One-on-one consultation to help grow your business and develop effective strategies.",
                  duration: 60,
                  imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  id: 2,
                  name: "Team Training Session",
                  description: "Group training sessions designed to improve team performance and collaboration.",
                  duration: 90,
                  imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  id: 3,
                  name: "Financial Advisory",
                  description: "Professional financial advice to help you manage your resources more effectively.",
                  duration: 45,
                  imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                }
              ].map(service => (
                <Card key={service.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src={service.imageUrl} 
                    alt={service.name} 
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold mb-2">{service.name}</CardTitle>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold">{service.duration} min</span>
                      <Button variant="secondary" asChild>
                        <Link href="#book-now">Book Now</Link>
                      </Button>
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