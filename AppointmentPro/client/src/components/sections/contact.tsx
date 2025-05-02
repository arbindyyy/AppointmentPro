import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Twitter,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await apiRequest('POST', '/api/contact', data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Send",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(formData);
  };

  return (
    <section id="contact" className="py-16 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark mb-4">Get In Touch</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Have questions about our booking system? We're here to help.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-dark mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-primary mr-3">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-dark">Address</h4>
                      <p className="text-gray-600">123 Booking Street, San Francisco, CA 94103</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-primary mr-3">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-dark">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-primary mr-3">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-dark">Email</h4>
                      <p className="text-gray-600">info@appointease.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-primary mr-3">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-dark">Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 9AM - 5PM</p>
                      <p className="text-gray-600">Weekend: Closed</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium text-dark mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-primary">
                      <Twitter className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
