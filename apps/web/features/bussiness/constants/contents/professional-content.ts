import type { ContentEditorSchema } from "@app/zod/types"

export const PROFESSIONAL_TEMPLATE: ContentEditorSchema["sections"] = [
  {
    id: "f560863c-749e-4124-aab9-73a48ac07631",
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
    name: {
      enabled: true,
      name: "Michael Smith",
    },
    info: {
      primary: {
        enabled: true,
        text: "Sales Representative",
      },
      secondary: {
        enabled: true,
        text: "Electrica  Automobiles",
      },
    },
    contacts: {
      enabled: true,
      list: [
        {
          id: "610e25f8-749e-4124-aab9-73a48ac07631",
          type: "email",
          value: "michael.smith@example.com",
        },
        {
          id: "610e25f8-749e-4124-aab9-73a48ac07632",
          type: "phone",
          value: "+1234567890",
        },
        {
          id: "610e25f8-749e-4124-aab9-73a48ac07633",
          type: "location",
          value: "https://www.google.com",
        },
        {
          id: "610e25f8-749e-4124-aab9-73a48ac07634",
          type: "website",
          value: "https://www.yourwebsite.com",
        },
      ],
    },
  },
  {
    enabled: true,
    id: "e60e25f8-749e-4124-aab9-73a48ac07631",
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
