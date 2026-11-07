// Single source of truth for business details.
// Do not fabricate real details; placeholders marked with TODO until owner confirms.
export const site = {
  name: "Sarwagya",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sarwagya.in",
  tagline: "We build. You grow.",
  email: "hello@sarwagya.in",
  phone: "+91 99999 99999", // TODO: Owner to confirm phone number
  whatsapp: "919999999999", // TODO: Owner to confirm WhatsApp number
  address: {
    street: "",
    city: "",
    region: "",
    postalCode: "",
    country: "IN",
  }, // Empty indicates remote-first studio
  geo: {
    lat: null as number | null,
    lng: null as number | null,
  },
  hours: "Mon-Sat 10:00-19:00 IST", // TODO: Owner to confirm working hours
  responseTime: "within 2 hours on business days", // TODO: Owner to confirm response time commitment
  social: {
    linkedin: "https://www.linkedin.com/company/sarwagya", // TODO: Owner to confirm
    instagram: "https://www.instagram.com/sarwagyastudio", // TODO: Owner to confirm
    x: "https://x.com/sarwagyastudio", // TODO: Owner to confirm
  },
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  pricing: {
    oneTime: "₹50,000",
    managed: "₹1,200/month",
  },
}

