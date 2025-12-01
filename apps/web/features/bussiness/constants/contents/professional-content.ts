import type { ContentEditorSchema } from "@app/zod/types"

export const PROFESSIONAL_TEMPLATE: ContentEditorSchema["sections"] = [
  {
    id: "f560863c-749e-4124-aab9-73a48ac07631",
    enabled: true,
    type: "profile",
    details: {
      profile: {
        imageSrc: "https://images.pexels.com/photos/29661144/pexels-photo-29661144.jpeg",
        enabled: true,
      },
      branding: {
        imageSrc: "https://images.pexels.com/photos/28288788/pexels-photo-28288788.jpeg",
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
  {
    enabled: true,
    id: "e60e25f8-749e-4124-aab9-73a48ac07632",
    type: "floating-button",
    label: {
      enabled: true,
      text: "Save to Contact",
    },
    showQrButton: true,
    showShareButton: true,
  },
  {
    enabled: true,
    id: "e60e25f8-749e-4124-aab9-73a48ac07633",
    type: "video",
    background: true,
    heading: {
      enabled: true,
      text: "Watch the video",
    },
    description: {
      enabled: true,
      text: "Add a description or click on eye icon to hide this.",
    },
    video: {
      type: "youtube",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  },
  {
    enabled: true,
    id: "e60e25f8-749e-4124-aab9-73a48ac07634",
    type: "cta-button",
    heading: {
      enabled: true,
      text: "Button",
    },
    description: {
      enabled: true,
      text: "Add a description or click on eye icon to hide this.",
    },
    background: true,
    label: "Visit Website",
    link: "www.yourwebsite.com",
  },
  {
    id: "e60e25f8-749e-4124-aab9-73a48ac07635",
    type: "social-links",
    enabled: true,
    heading: {
      enabled: true,
      text: "Connect with me",
    },
    description: {
      enabled: true,
      text: "Add a description or click on eye icon to hide this.",
    },
    links: [
      {
        id: "e60e25f8-749e-4124-aab9-73a48ac07636",
        type: "facebook",
        label: "Facebook",
        url: "https://www.facebook.com/yourusername",
      },
      {
        id: "e60e25f8-749e-4124-aab9-73a48ac07637",
        type: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com/yourusername",
      },
      {
        id: "e60e25f8-749e-4124-aab9-73a48ac07638",
        type: "twitter",
        label: "Twitter",
        url: "https://www.twitter.com/yourusername",
      },
    ],
    background: true,
  },
  {
    enabled: true,
    id: "e60e25f8-749e-4124-aab9-73a48ac07639",
    type: "contact-details",
    heading: {
      enabled: true,
      text: "Get in touch",
    },
    items: [
      {
        type: "phone",
        label: "Phone",
        url: "+1234567890",
        id: "e60e25f8-749e-4124-aab9-73a48ac07637",
      },
      {
        type: "email",
        label: "Email",
        url: "youremail@domain.com ",
        id: "e60e25f8-749e-4124-aab9-73a48ac07636",
      },
      {
        id: "e60e25f8-749e-4124-aab9-73a48ac07638",
        type: "address",
        label: "Address",
        streetAddress1: "123 Main St",
        streetAddress2: "Apartment 123",
        cityName: "New York",
        stateName: "New York",
        zipCode: 10001,
        countryName: "USA",
        mapButtonLabel: "Get Directions",
        mapLocationUrl: "https://www.google.com/maps?q=123+Main+St,+Anytown,+USA",
      },
    ],
    background: true,
  },
]
