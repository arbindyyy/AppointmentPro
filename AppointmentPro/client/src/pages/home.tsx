import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import HowItWorks from "@/components/sections/how-it-works";
import Services from "@/components/sections/services";
import BookingWidget from "@/components/sections/booking-widget";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";
import { SEOHead } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <SEOHead 
        title="AppointEase | Effortless Online Booking System"
        description="Book appointments online without phone calls or emails. Our efficient booking system helps you schedule services with just a few clicks."
        keywords="appointment booking, online scheduling, business appointments, service booking"
      />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Features />
          <HowItWorks />
          <Services />
          <BookingWidget />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
