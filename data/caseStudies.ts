export interface CaseStudy {
  slug: string
  client: string
  industry: string
  year: string
  summary: string
  problem: string
  solution: string
  results: string[]
  services: string[]
  techStack: string[]
  heroImage: string
  gallery?: string[]
  liveUrl?: string
  testimonial?: {
    quote: string
    author: string
    role: string
  }
}

// Case studies array. Empty until owner provides genuine real client work data.
// Rule 3: Never fabricate metrics or client case studies.
export const caseStudies: CaseStudy[] = [
  // TODO: Add real case studies provided by owner.
]

