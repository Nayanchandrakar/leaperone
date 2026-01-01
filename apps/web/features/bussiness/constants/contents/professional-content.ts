import type { ContentSection } from "@app/core/types"

export const PROFESSIONAL_TEMPLATE: ContentSection[] = [
  {
    id: "f560863c-749e-4124-aab9-73a48ac07631",
    enabled: true,
    type: "card-profile",
    details: {
      profile: {
        imageSrc: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/70.jpg",
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
          value: "https://www.google.com/maps/place/1600+Amphitheatre+Parkway,+Mountain+View,+CA",
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
    type: "video-section",
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
      youtubeUrl: "https://www.youtube-nocookie.com/embed/mfv0V1SxbNA?si=TFysOtlLt1XiFrFs",
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
    link: "https://www.yourwebsite.com",
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
        href: "https://www.facebook.com/yourusername",
      },
      {
        id: "e60e25f8-749e-4124-aab9-73a48ac07637",
        type: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/yourusername",
      },
      {
        id: "e60e25f8-749e-4124-aab9-73a48ac07638",
        type: "twitter",
        label: "Twitter",
        href: "https://www.twitter.com/yourusername",
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
        phoneNumber: "+1234567890",
        id: "1ab4dbed-4e0c-4983-a907-e0a2468cdb5b",
      },
      {
        type: "email",
        label: "Email",
        email: "john@gmail.com",
        id: "8b3a1e87-5047-44ca-8b57-30274c11954a",
      },
      {
        id: "19fef407-7817-45f6-8e9c-940284656008",
        type: "address",
        label: "Address",
        streetAddress1: "123 Main St",
        streetAddress2: "Apartment 123",
        cityName: "New York",
        stateName: "New York",
        zipCode: 10001,
        countryName: "USA",
        location: {
          enabled: true,
          label: "Get Directions",
          url: "https://www.google.com/maps/place/1600+Amphitheatre+Parkway,+Mountain+View,+CA",
        },
      },
    ],
    background: true,
  },
  {
    enabled: true,
    id: "fcefac54-7a0c-4f5b-b41b-e5b83933b64b",
    type: "image-text-links",
    heading: {
      enabled: true,
      text: "Our EV Collection",
    },
    description: {
      enabled: true,
      text: "Discover our latest collection of electric vehicles from leading EV brands.",
    },
    imageView: "list",
    images: [
      {
        id: "f6219519-d245-4e1e-a775-49d1dc1a1eef",
        imageSrc: "https://images.pexels.com/photos/11127232/pexels-photo-11127232.jpeg",
      },
      {
        id: "ed570440-fcea-4b7c-8421-da23259bdd7e",
        imageSrc: "https://images.pexels.com/photos/7676343/pexels-photo-7676343.jpeg",
      },
      {
        id: "b47b661e-03c2-45fc-af53-1656fb34437d",
        imageSrc: "https://images.pexels.com/photos/29647834/pexels-photo-29647834.jpeg",
      },
    ],
    background: true,
  },
  {
    enabled: true,
    id: "5106d066-fcb3-4ec0-8fc9-0f369d2e6715",
    type: "teams-section",
    heading: {
      enabled: true,
      text: "Meet the Team",
    },
    description: {
      enabled: true,
      text: "Add a description or click on eye icon to hide this.",
    },
    background: true,
    members: [
      {
        id: "c11b6a36-a04a-41d2-aae5-40d8f723edb4",
        memberName: "Ema Mark",
        memberDesignation: "Designation",
        memberProfile: {
          imageSrc: "https://images.pexels.com/photos/4016579/pexels-photo-4016579.jpeg",
          enabled: true,
        },
        memberDescription: {
          text: "",
          enabled: true,
        },
      },
      {
        id: "671e0c08-83fc-4d33-9e50-c158d4c8f1f7",
        memberName: "Ben T.",
        memberDesignation: "Designation",
        memberProfile: {
          imageSrc: "https://images.pexels.com/photos/29647834/pexels-photo-29647834.jpeg",
          enabled: true,
        },
        memberDescription: {
          text: "",
          enabled: true,
        },
      },
    ],
  },

  {
    enabled: true,
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    type: "testimonials-section",
    heading: {
      enabled: true,
      text: "Testimonials",
    },
    description: {
      enabled: true,
      text: "Have a look at what our valuable customers are saying about us.",
    },
    background: true,
    testimonials: [
      {
        id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        authorName: "Jim Cook",
        authorDesignation: "Designation, Company",
        authorProfile: {
          imageSrc: "https://images.pexels.com/photos/5514828/pexels-photo-5514828.jpeg",
          enabled: true,
        },
        testimonialText: {
          text: "Amazing Experience. Kudos to the great customer support team.",
          enabled: true,
        },
      },
      {
        id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
        authorName: "Mary Lee",
        authorDesignation: "Designation, Company",
        authorProfile: {
          imageSrc: "https://images.pexels.com/photos/15577996/pexels-photo-15577996.png",
          enabled: true,
        },
        testimonialText: {
          text: "Nice work! Highly recommended.",
          enabled: true,
        },
      },
    ],
  },
]
