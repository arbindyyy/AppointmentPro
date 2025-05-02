import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gradient-hero py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-tight mb-4">
              Book Appointments<br />
              <span className="text-primary">Without The Hassle</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Skip the phone calls and emails. Our streamlined booking system makes scheduling appointments quick and easy for both you and your clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="#book-now">Book An Appointment</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
              alt="Person using tablet for online appointment booking" 
              className="rounded-lg shadow-xl w-full" 
              width="700" 
              height="500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
