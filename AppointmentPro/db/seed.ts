import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    console.log("Starting database seed...");

    // Check if services already exist to avoid duplicates
    const existingServices = await db.query.services.findMany();
    if (existingServices.length === 0) {
      console.log("Seeding services...");
      
      // Create services
      await db.insert(schema.services).values([
        {
          name: "Business Consultation",
          description: "One-on-one consultation to help grow your business and develop effective strategies.",
          duration: 60,
          imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Team Training Session",
          description: "Group training sessions designed to improve team performance and collaboration.",
          duration: 90,
          imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Financial Advisory",
          description: "Professional financial advice to help you manage your resources more effectively.",
          duration: 45,
          imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
      ]);
      
      console.log("Services seeded successfully!");
    } else {
      console.log("Services already exist, skipping service seed.");
    }

    // Check if testimonials already exist
    const existingTestimonials = await db.query.testimonials.findMany();
    if (existingTestimonials.length === 0) {
      console.log("Seeding testimonials...");
      
      // Create testimonials
      await db.insert(schema.testimonials).values([
        {
          name: "Sarah Johnson",
          company: "Marketing Agency",
          text: "This booking system has completely transformed how we manage appointments. Our clients love the ease of booking, and we've seen a significant reduction in no-shows.",
          rating: 5
        },
        {
          name: "Michael Chen",
          company: "Financial Services",
          text: "The automated reminders have reduced our no-show rate by 60%. The booking interface is intuitive for our clients and has saved us countless hours on the phone.",
          rating: 5
        },
        {
          name: "Emily Rodriguez",
          company: "Wellness Center",
          text: "Since implementing this booking system, we've seen a 40% increase in appointments. The SEO features have also helped new clients find us more easily online.",
          rating: 5
        }
      ]);
      
      console.log("Testimonials seeded successfully!");
    } else {
      console.log("Testimonials already exist, skipping testimonial seed.");
    }

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
