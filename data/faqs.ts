export interface FAQ {
  question: string
  answer: string
}

// Exactly 5 FAQs written in Sarwagya's brutalist-editorial voice as specified in PRD 4.7.
// TODO: Owner must confirm the refund claim in FAQ 3 and the handover promise in FAQ 2 before public launch.
export const faqs: FAQ[] = [
  {
    question: "Why is your price so low? Is something wrong with it?",
    answer: "Nothing is wrong. We keep the team small, skip the account managers and the fancy office, and put the budget into the build. ₹50,000 once, and the site is yours. No hostage fees.",
  },
  {
    question: "What happens if you disappear in six months?",
    answer: "You keep everything: code, domain, hosting access, design files. We hand over a plain-language document so any developer can take over in a day. We are building a business, not a trap.",
  },
  {
    question: "Will my site look like every other template out there?",
    answer: "Not a chance. We start from a blank canvas, not a theme store. If you can find your site on a template marketplace, you get a refund on the design.",
  },
  {
    question: "I don't know what I want. Is that a problem?",
    answer: "It is the most common starting point. Bring your business, your customers and your mess. We ask the awkward questions, show you rough directions in days, and you react. Reacting is easier than imagining.",
  },
  {
    question: "One-time ₹50,000 or ₹1,200 a month. Which one is for me?",
    answer: "Pay once if you have someone to maintain the site. Pay monthly if you want us to keep it fast, safe and updated while you run your business. You can switch later.",
  },
]

