import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBookingSchema,
  insertContactMessageSchema,
  insertServiceSchema,
  insertTestimonialSchema
} from "@shared/schema";
import { parse } from "date-fns";

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix
  const apiPrefix = "/api";

  // Get all services
  app.get(`${apiPrefix}/services`, async (req: Request, res: Response) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error getting services:", error);
      res.status(500).json({ message: "Failed to get services" });
    }
  });

  // Get service by ID
  app.get(`${apiPrefix}/services/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getServiceById(id);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      console.error("Error getting service:", error);
      res.status(500).json({ message: "Failed to get service" });
    }
  });

  // Create a new service
  app.post(`${apiPrefix}/services`, async (req: Request, res: Response) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const newService = await storage.insertService(validatedData);
      res.status(201).json(newService);
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(400).json({ message: "Failed to create service", error });
    }
  });

  // Get available time slots for a date and service
  app.get(`${apiPrefix}/times`, async (req: Request, res: Response) => {
    try {
      const { date, serviceId } = req.query;
      
      if (!date || !serviceId) {
        return res.status(400).json({ message: "Date and serviceId are required" });
      }
      
      // Parse the date from ISO string
      const parsedDate = new Date(date as string);
      const parsedServiceId = parseInt(serviceId as string);
      
      const availableSlots = await storage.getAvailableTimeSlots(parsedDate, parsedServiceId);
      res.json(availableSlots);
    } catch (error) {
      console.error("Error getting available times:", error);
      res.status(500).json({ message: "Failed to get available times" });
    }
  });

  // Create a new booking
  app.post(`${apiPrefix}/bookings`, async (req: Request, res: Response) => {
    try {
      // Extract and prepare the data
      const { serviceId, date, time, name, email, phone } = req.body;
      
      if (!serviceId || !date || !time || !name || !email || !phone) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      // Parse date string to Date object
      const parsedDate = new Date(date);
      
      // Get service to validate it exists
      const service = await storage.getServiceById(parseInt(serviceId));
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      // Validate data
      const bookingData = insertBookingSchema.parse({
        serviceId: parseInt(serviceId),
        date: parsedDate,
        time,
        name,
        email,
        phone,
        status: "confirmed"
      });
      
      // Insert booking
      const newBooking = await storage.insertBooking(bookingData);
      res.status(201).json(newBooking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(400).json({ message: "Failed to create booking", error });
    }
  });

  // Get all testimonials
  app.get(`${apiPrefix}/testimonials`, async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error getting testimonials:", error);
      res.status(500).json({ message: "Failed to get testimonials" });
    }
  });

  // Submit a contact message
  app.post(`${apiPrefix}/contact`, async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.insertContactMessage(validatedData);
      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Error submitting contact message:", error);
      res.status(400).json({ message: "Failed to submit contact message", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
