import { db } from "@db";
import * as schema from "@shared/schema";
import { eq, desc, and, gte } from "drizzle-orm";
import { format } from "date-fns";

export const storage = {
  // Service methods
  async getAllServices() {
    return await db.query.services.findMany({
      orderBy: [schema.services.name],
    });
  },

  async getServiceById(id: number) {
    return await db.query.services.findFirst({
      where: eq(schema.services.id, id),
    });
  },

  async insertService(service: schema.InsertService) {
    const result = await db.insert(schema.services).values(service).returning();
    return result[0];
  },

  // Booking methods
  async getAllBookings() {
    return await db.query.bookings.findMany({
      orderBy: [desc(schema.bookings.date), schema.bookings.time],
      with: {
        service: true,
      },
    });
  },

  async getBookingById(id: number) {
    return await db.query.bookings.findFirst({
      where: eq(schema.bookings.id, id),
      with: {
        service: true,
      },
    });
  },

  async getBookingsByDate(date: Date) {
    const formattedDate = format(date, "yyyy-MM-dd");
    
    return await db.query.bookings.findMany({
      where: eq(schema.bookings.date, formattedDate),
      orderBy: [schema.bookings.time],
      with: {
        service: true,
      },
    });
  },

  async getAvailableTimeSlots(date: Date, serviceId: number) {
    // Get all bookings for this date
    const bookings = await this.getBookingsByDate(date);
    
    // Get the service to find its duration
    const service = await this.getServiceById(serviceId);
    if (!service) {
      throw new Error("Service not found");
    }
    
    // Define all possible time slots
    const allTimeSlots = [
      "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
    ];
    
    // Filter out booked slots
    const bookedTimes = bookings.map(booking => booking.time);
    return allTimeSlots.filter(time => !bookedTimes.includes(time));
  },

  async insertBooking(booking: schema.InsertBooking) {
    const result = await db.insert(schema.bookings).values(booking).returning();
    return result[0];
  },

  // Testimonial methods
  async getAllTestimonials() {
    return await db.query.testimonials.findMany({
      orderBy: [desc(schema.testimonials.rating)],
    });
  },

  async insertTestimonial(testimonial: schema.InsertTestimonial) {
    const result = await db.insert(schema.testimonials).values(testimonial).returning();
    return result[0];
  },

  // Contact message methods
  async getAllContactMessages() {
    return await db.query.contactMessages.findMany({
      orderBy: [desc(schema.contactMessages.createdAt)],
    });
  },

  async insertContactMessage(message: schema.InsertContactMessage) {
    const result = await db.insert(schema.contactMessages).values(message).returning();
    return result[0];
  }
};
