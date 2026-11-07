export interface Review {
  name: string
  role: string
  company: string
  text: string
  rating?: number
  date?: string
  source: string
  sourceUrl?: string
}

// Client reviews array.
// Rule 3: Only include reviews supplied by the owner from real clients. Empty if none yet.
export const reviews: Review[] = [
  // TODO: Add genuine client reviews once provided by owner.
]

