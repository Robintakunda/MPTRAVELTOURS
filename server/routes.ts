import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import { Resend } from 'resend';
import { storage } from "./storage";
import { insertInquirySchema, insertTestimonialSchema, updateInquiryStatusSchema } from "@shared/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // Public Routes
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);

      // Email notification using Resend
      if (process.env.RESEND_API_KEY) {
        try {
          await resend.emails.send({
            from: 'M&P Travel & Tours <onboarding@resend.dev>',
            to: 'm.mukombero@gmail.com',
            subject: `New Inquiry: ${validatedData.service}`,
            html: `
              <h1>New Booking Inquiry</h1>
              <p><strong>Name:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              <p><strong>Phone:</strong> ${validatedData.phone || 'N/A'}</p>
              <p><strong>Service:</strong> ${validatedData.service}</p>
              <p><strong>Preferred Date:</strong> ${validatedData.preferredDate || 'Not specified'}</p>
              <p><strong>Message:</strong></p>
              <p>${validatedData.message}</p>
            `
          });
          console.log(`Email notification sent for inquiry from ${validatedData.email}`);
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
        }
      } else {
        console.log(`New inquiry from ${validatedData.name} (${validatedData.email}) regarding ${validatedData.service} (Email not sent: RESEND_API_KEY missing)`);
      }

      res.json(inquiry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json(testimonial);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      await storage.deleteTestimonial(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
