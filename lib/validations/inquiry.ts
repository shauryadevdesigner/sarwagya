import { z } from 'zod'

export const inquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters.')
    .max(100, 'Full name must be under 100 characters.'),
  businessName: z
    .string()
    .trim()
    .max(120, 'Business name must be under 120 characters.')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .min(7, 'Please provide a valid phone number.')
    .max(25, 'Phone number is too long.'),
  serviceType: z
    .string()
    .trim()
    .min(2, 'Please select a service type.')
    .max(80),
  budget: z
    .string()
    .trim()
    .max(80)
    .optional()
    .or(z.literal('')),
  pricingPreference: z
    .string()
    .trim()
    .max(80)
    .optional()
    .or(z.literal('')),
  projectDescription: z
    .string()
    .trim()
    .min(10, 'Project description must be at least 10 characters.')
    .max(4000, 'Project description cannot exceed 4000 characters.'),
  // Honeypot field: must be empty on valid submissions
  websiteUrlHoneypot: z
    .string()
    .optional()
    .or(z.literal('')),
})

export type InquiryInput = z.infer<typeof inquirySchema>

