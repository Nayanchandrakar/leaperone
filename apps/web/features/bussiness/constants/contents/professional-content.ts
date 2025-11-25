import type { ContentEditorSchema } from "@app/zod/types"

export const PROFESSIONAL_TEMPLATE: ContentEditorSchema["sections"] = [
  {
    id: "profile-card",
    enabled: true,
    type: "profile",
    details: {
      profile: {
        imageSrc: "",
        enabled: true,
      },
      branding: {
        imageSrc: "",
        enabled: true,
      },
    },
    nameSection: {
      enabled: true,
      name: "Michael Smith",
    },
    infoSection: {
      primaryInfo: {
        enabled: true,
        text: "Sales Representative",
      },
      secondaryInfo: {
        enabled: true,
        text: "Electrica  Automobiles",
      },
    },
    quickContact: {
      enabled: true,
      contacts: [
        {
          id: "email",
          type: "email",
          value: "michael.smith@example.com",
        },
        {
          id: "phone",
          type: "phone",
          value: "+1234567890",
        },
      ],
    },
  },
  {
    enabled: true,
    id: "heading-text",
    type: "heading-text",
    heading: {
      enabled: true,
      text: "About Me",
    },
    description: {
      enabled: true,
      text: "At Electrica, I help people find the right electric vehicle to fit their lifestyle. My goal is to make the process straightforward, transparent, and truly enjoyable.",
    },
    background: true,
  },
]
