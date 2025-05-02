import { Link } from "wouter";
import { SEOHead } from "@/lib/seo";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function BookingSuccess() {
  return (
    <>
      <SEOHead 
        title="Booking Confirmed | AppointEase"
        description="Your appointment has been successfully booked with AppointEase."
      />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center py-16 bg-gradient-hero">
          <Card className="w-full max-w-md mx-4 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-gray-600">
                Your appointment has been successfully scheduled. We've sent a confirmation
                email with all the details.
              </p>
              <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Appointment details:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500 text-left">Service:</div>
                  <div className="text-gray-700 text-right font-medium">Business Consultation</div>
                  <div className="text-gray-500 text-left">Date:</div>
                  <div className="text-gray-700 text-right font-medium">October 6, 2023</div>
                  <div className="text-gray-500 text-left">Time:</div>
                  <div className="text-gray-700 text-right font-medium">2:00 PM</div>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </>
  );
}
