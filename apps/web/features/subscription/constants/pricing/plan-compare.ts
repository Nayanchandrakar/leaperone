import type { ComparisonPlans } from "@/features/subscription/types"

export const COMPARISON_PLANS: ComparisonPlans[] = [
  {
    title: "Features",
    type: undefined,
  },

  {
    title: "Solo Plan",
    type: "individual",
  },

  {
    title: "Team Plan",
    type: "team",
  },
]

export const PLAN_COMPARISON_DATA = [
  {
    section: "Digital business card, NFC & QR code features",
    features: [
      {
        name: "1 highly customizable digital business card",
        solo: true,
        team: true,
      },
      {
        name: "Add multiple social media, other platforms links to your card",
        solo: true,
        team: true,
      },
      {
        name: "NFC and QR code support for easy sharing of card",
        solo: true,
        team: true,
      },
      {
        name: "Quick integration of NFC items with digital business card",
        solo: true,
        team: true,
      },
      {
        name: "Unlimited scans of digital card's QR Code",
        solo: true,
        team: true,
      },
      {
        name: "Unlimited sharing of the card via WhatsApp, email, social media, QR Code, NFC etc.",
        solo: true,
        team: true,
      },
      {
        name: "Custom designed QR code for the digital card",
        solo: true,
        team: true,
      },
    ],
  },
  {
    section: "AI & CRM features",
    features: [
      {
        name: "Centralized client and lead database",
        solo: true,
        team: true,
      },
      {
        name: "Easy import/export of leads & client's contact data",
        solo: true,
        team: true,
      },
      {
        name: "AI-powered scanner to collect and save contacts from paper cards",
        solo: false,
        team: true,
      },
      {
        name: "Save contacts of all leads and contacts at 1 place for convenient follow ups",
        solo: true,
        team: true,
      },
      {
        name: "Custom tags, filters, and contact segments",
        solo: true,
        team: true,
      },
      {
        name: "Add private notes, tasks, and follow-up reminders",
        solo: true,
        team: true,
      },
    ],
  },
  {
    section: "Team features",
    features: [
      { name: "Add multiple team members", solo: false, team: true },
      {
        name: "Each team member gets 1 digital business card with QR code & NFC features",
        solo: false,
        team: true,
      },
      {
        name: "All team members get advanced analytics for their own digital business cards",
        solo: false,
        team: true,
      },
      {
        name: "Control access & permissions of team users accounts",
        solo: false,
        team: true,
      },
      {
        name: "Easy to use admin dashboard to manage team members",
        solo: false,
        team: true,
      },
      {
        name: "Assign leads and tasks across the team",
        solo: false,
        team: true,
      },
      {
        name: "Team users can use the CRM features & account manager can track their CRM activities",
        solo: false,
        team: true,
      },
      {
        name: "Track team performance through advanced analytics",
        solo: false,
        team: true,
      },
    ],
  },
  {
    section: "Forms & Lead Capture features",
    features: [
      {
        name: "Built-in forms to capture leads from digital cards",
        solo: true,
        team: true,
      },
      {
        name: "Create custom forms or use popular form templates",
        solo: true,
        team: true,
      },
      {
        name: "View your forms responses and export them in CSV",
        solo: true,
        team: true,
      },
      {
        name: "Access forms responses of all team members at 1 place and can also export them in CSV",
        solo: false,
        team: true,
      },
      {
        name: "Instant email notifications upon lead capture through forms",
        solo: true,
        team: true,
      },
      {
        name: "Tag each lead with pre made as well as custom tags",
        solo: true,
        team: true,
      },
    ],
  },
  {
    section: "Analytics features",
    features: [
      {
        name: "Advanced analytics of digital business card scans",
        solo: true,
        team: true,
      },
      {
        name: "Track scan locations of your digital card",
        solo: true,
        team: true,
      },
      {
        name: "Detailed analytics of team users digital cards",
        solo: false,
        team: true,
      },
      {
        name: "Insights on top performing team members",
        solo: false,
        team: true,
      },
    ],
  },
  {
    section: "Other features",
    features: [
      { name: "Dedicated customer support", solo: true, team: true },
      {
        name: "Access to our exclusive NFC accessories store",
        solo: true,
        team: true,
      },
    ],
  },
]
