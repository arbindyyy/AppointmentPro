import { pgTable, text, serial, timestamp, integer, date, time } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// Users table (exists from template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  duration: integer("duration").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").references(() => services.id).notNull(),
  date: date("date").notNull(),
  time: time("time").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  status: text("status").default("confirmed").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  text: text("text").notNull(),
  rating: integer("rating").notNull(),
  avatarUrl: text("avatar_url"),
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define relations
export const bookingsRelations = relations(bookings, ({ one }) => ({
  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id],
  }),
}));

// Schema validation with zod
export const insertUserSchema = createInsertSchema(users, {
  username: (schema) => schema.min(3, "Username must be at least 3 characters"),
  password: (schema) => schema.min(6, "Password must be at least 6 characters"),
});

export const insertServiceSchema = createInsertSchema(services, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  description: (schema) => schema.min(10, "Description must be at least 10 characters"),
  duration: (schema) => schema.positive("Duration must be positive"),
});

export const insertBookingSchema = createInsertSchema(bookings, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  email: (schema) => schema.email("Must be a valid email"),
  phone: (schema) => schema.min(7, "Phone must be at least 7 characters"),
});

export const insertTestimonialSchema = createInsertSchema(testimonials, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  text: (schema) => schema.min(10, "Text must be at least 10 characters"),
  rating: (schema) => schema.min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  email: (schema) => schema.email("Must be a valid email"),
  subject: (schema) => schema.min(3, "Subject must be at least 3 characters"),
  message: (schema) => schema.min(10, "Message must be at least 10 characters"),
});

// Create select schemas first
export const userSelectSchema = createSelectSchema(users);
export const serviceSelectSchema = createSelectSchema(services);
export const bookingSelectSchema = createSelectSchema(bookings);
export const testimonialSelectSchema = createSelectSchema(testimonials);
export const contactMessageSelectSchema = createSelectSchema(contactMessages);

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof userSelectSchema>;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = z.infer<typeof serviceSelectSchema>;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = z.infer<typeof bookingSelectSchema>;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = z.infer<typeof testimonialSelectSchema>;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = z.infer<typeof contactMessageSelectSchema>;
