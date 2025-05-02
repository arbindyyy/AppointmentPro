import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, addDays } from "date-fns";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";

export default function BookingWidget() {
  const [, navigate] = useLocation();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // Fetch services
  const { data: services, isLoading: isLoadingServices } = useQuery({
    queryKey: ['/api/services'],
  });

  // Fetch available times for selected date
  const { data: availableTimes, isLoading: isLoadingTimes } = useQuery({
    queryKey: ['/api/times', selectedDate?.toISOString()],
    enabled: !!selectedDate,
  });

  // Create booking mutation
  const { mutate: createBooking, isPending } = useMutation({
    mutationFn: async (bookingData: any) => {
      const res = await apiRequest('POST', '/api/bookings', bookingData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      navigate('/booking-success');
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Handle month navigation
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    if (step === 1) setStep(2);
  };

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && step === 2) setStep(3);
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please complete all booking details before proceeding.",
        variant: "destructive"
      });
      return;
    }

    createBooking({
      serviceId: selectedService,
      date: selectedDate.toISOString(),
      time: selectedTime,
      ...formData
    });
  };

  // Generate time slots
  const timeSlots = availableTimes || [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"
  ];

  // Default services if API call fails
  const defaultServices = [
    { id: "1", name: "Business Consultation", duration: 60 },
    { id: "2", name: "Team Training Session", duration: 90 },
    { id: "3", name: "Financial Advisory", duration: 45 }
  ];

  const servicesData = services || defaultServices;

  // Continue button handler
  const handleContinue = () => {
    if (step === 3 && selectedTime) {
      setStep(4);
    }
  };

  return (
    <section id="book-now" className="py-16 bg-gradient-booking">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Book Your Appointment</h2>
          <p className="max-w-xl mx-auto opacity-90">Choose from our available time slots and schedule your appointment in minutes.</p>
        </div>
        
        <Card className="rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Service Selection */}
            <CardContent className="p-6 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
              <h3 className="text-dark text-xl font-semibold mb-4">Select a Service</h3>
              
              <RadioGroup 
                value={selectedService || ""} 
                onValueChange={handleServiceSelect}
                className="space-y-3"
              >
                {isLoadingServices ? (
                  // Loading skeleton
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="p-3 border border-gray-200 rounded-md">
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    </div>
                  ))
                ) : (
                  servicesData.map((service) => (
                    <Label
                      key={service.id}
                      htmlFor={`service-${service.id}`}
                      className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100"
                    >
                      <RadioGroupItem 
                        value={service.id} 
                        id={`service-${service.id}`} 
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <span className="ml-3">
                        <span className="block text-dark font-medium">{service.name}</span>
                        <span className="block text-sm text-gray-500">{service.duration} min</span>
                      </span>
                    </Label>
                  ))
                )}
              </RadioGroup>
            </CardContent>
            
            {/* Calendar View */}
            <CardContent className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
              <h3 className="text-dark text-xl font-semibold mb-4">Select a Date</h3>
              
              <div className="calendar-container">
                <div className="flex justify-between items-center mb-4">
                  <button 
                    className="text-gray-600 hover:text-primary"
                    onClick={goToPreviousMonth}
                    disabled={currentMonth <= new Date()}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <h4 className="text-dark font-medium">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h4>
                  <button 
                    className="text-gray-600 hover:text-primary"
                    onClick={goToNextMonth}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={currentMonth}
                  className="rounded-md"
                  disabled={(date) => date < addDays(new Date(), 1) || date.getDay() === 0}
                />
              </div>
            </CardContent>
            
            {/* Time Slots or Booking Form */}
            <CardContent className="p-6">
              {step < 4 ? (
                <>
                  <h3 className="text-dark text-xl font-semibold mb-4">Select a Time</h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {isLoadingTimes ? (
                      // Loading skeleton for time slots
                      Array(6).fill(0).map((_, i) => (
                        <div 
                          key={i} 
                          className="p-2 border border-gray-200 rounded-md h-10 bg-gray-100 animate-pulse"
                        ></div>
                      ))
                    ) : (
                      timeSlots.map((time, index) => (
                        <button 
                          key={index}
                          onClick={() => handleTimeSelect(time)}
                          className={`p-2 text-center border rounded-md ${
                            selectedTime === time 
                              ? 'border-primary bg-primary bg-opacity-10 text-primary font-medium' 
                              : 'border-gray-200 hover:border-primary hover:bg-primary hover:bg-opacity-10 text-dark'
                          }`}
                        >
                          {time}
                        </button>
                      ))
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      className="w-full"
                      onClick={handleContinue}
                      disabled={!selectedTime || !selectedDate || !selectedService}
                    >
                      Continue to Details
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-dark text-xl font-semibold mb-4">Your Details</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isPending}
                      >
                        {isPending ? "Booking..." : "Confirm Booking"}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
