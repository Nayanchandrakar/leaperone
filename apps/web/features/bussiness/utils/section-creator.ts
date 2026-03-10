import type {
  BussinessHourSection,
  ContactDetailsSection,
  ContentSection,
  ContentSectionType,
  CtaButtonSection,
  FloatingButtonSection,
  HeadingTextSection,
  ImagesTextLinksSection,
  LinkSection,
  PdfFileSection,
  ProfileCardSection,
  TeamSection,
  TestimonialsSection,
  VideoSection,
} from "@app/types"
import { generateUUID } from "@/utils"

// Factory functions that create new sections with fresh IDs
export function createCardProfileSection(): ProfileCardSection {
  return {
    id: generateUUID(),
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
          id: generateUUID(),
          type: "email",
          value: "michael.smith@example.com",
        },
        {
          id: generateUUID(),
          type: "phone",
          value: "+1234567890",
        },
        {
          id: generateUUID(),
          type: "location",
          value: "https://www.google.com/maps/place/1600+Amphitheatre+Parkway,+Mountain+View,+CA",
        },
        {
          id: generateUUID(),
          type: "website",
          value: "https://www.yourwebsite.com",
        },
      ],
    },
  }
}

export function createHeadingTextSection(): HeadingTextSection {
  return {
    enabled: true,
    id: generateUUID(),
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
  }
}

export function createFloatingButtonSection(): FloatingButtonSection {
  return {
    enabled: true,
    id: generateUUID(),
    type: "floating-button",
    label: {
      enabled: true,
      text: "Save to Contact",
    },
    showQrButton: true,
    showShareButton: true,
  }
}

export function createVideoSection(): VideoSection {
  return {
    enabled: true,
    id: generateUUID(),
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
  }
}

export function createCtaButtonSection(): CtaButtonSection {
  return {
    enabled: true,
    id: generateUUID(),
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
  }
}

export function createSocialLinksSection(): LinkSection {
  return {
    id: generateUUID(),
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
        id: generateUUID(),
        type: "facebook",
        label: "Facebook",
        href: "https://www.facebook.com/yourusername",
      },
      {
        id: generateUUID(),
        type: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/yourusername",
      },
      {
        id: generateUUID(),
        type: "twitter",
        label: "Twitter",
        href: "https://www.twitter.com/yourusername",
      },
    ],
    background: true,
  }
}

export function createContactDetailsSection(): ContactDetailsSection {
  return {
    enabled: true,
    id: generateUUID(),
    type: "contact-details",
    heading: {
      enabled: true,
      text: "Get in touch",
    },
    items: [
      {
        type: "phone",
        label: "Phone",
        id: generateUUID(),
        phoneNumber: "+1234567890",
      },
      {
        type: "email",
        label: "Email",
        email: "john@gmail.com",
        id: generateUUID(),
      },
      {
        id: generateUUID(),
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
  }
}

export function createImageTextLinksSection(): ImagesTextLinksSection {
  return {
    enabled: true,
    id: generateUUID(),
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
        id: generateUUID(),
        imageSrc: "https://images.pexels.com/photos/11127232/pexels-photo-11127232.jpeg",
      },
      {
        id: generateUUID(),
        imageSrc: "https://images.pexels.com/photos/7676343/pexels-photo-7676343.jpeg",
      },
      {
        id: generateUUID(),
        imageSrc: "https://images.pexels.com/photos/29647834/pexels-photo-29647834.jpeg",
      },
    ],
    background: true,
  }
}

export function createTeamsSection(): TeamSection {
  return {
    enabled: true,
    id: generateUUID(),
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
        id: generateUUID(),
        name: "Ema Mark",
        designation: "Designation",
        profile: {
          imageSrc: "https://images.pexels.com/photos/4016579/pexels-photo-4016579.jpeg",
          enabled: true,
        },
        description: {
          text: "",
          enabled: true,
        },
      },
      {
        id: generateUUID(),
        name: "Ben T.",
        designation: "Designation",
        profile: {
          imageSrc: "https://images.pexels.com/photos/29647834/pexels-photo-29647834.jpeg",
          enabled: true,
        },
        description: {
          text: "",
          enabled: true,
        },
      },
    ],
  }
}

export function createTestimonialsSection(): TestimonialsSection {
  return {
    enabled: true,
    id: generateUUID(),
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
        id: generateUUID(),
        name: "Jim Cook",
        designation: {
          enabled: true,
          text: "Designation, Company",
        },
        profile: {
          enabled: true,
          imageSrc: "https://images.pexels.com/photos/5514828/pexels-photo-5514828.jpeg",
        },
        testimonialText: "Amazing Experience. Kudos to the great customer support team.",
      },
      {
        id: generateUUID(),
        name: "Mary Lee",
        designation: {
          text: "Designation, Company",
          enabled: true,
        },
        profile: {
          imageSrc: "https://images.pexels.com/photos/15577996/pexels-photo-15577996.png",
          enabled: true,
        },
        testimonialText: "Nice work! Highly recommended.",
      },
    ],
  }
}

export function createBussinessHoursSection(): BussinessHourSection {
  return {
    enabled: true,
    background: true,
    id: generateUUID(),
    type: "bussiness-hour",
    heading: {
      enabled: true,
      text: "Our Business Hours",
    },
    description: {
      enabled: true,
      text: "We are open all days except Saturday and Sunday. Checkout our timings for each day as given below. ",
    },
    timing: {
      enabled: true,
      periods: [
        {
          label: "Monday",
          active: true,
          id: generateUUID(),
          start: new Date("1970-01-01T10:00:00"),
          end: new Date("1970-01-01T19:30:00"),
        },
        {
          label: "Tuesday",
          active: true,
          id: generateUUID(),
          start: new Date("1970-01-01T09:00:00"),
          end: new Date("1970-01-01T19:30:00"),
        },
        {
          label: "Wednesday",
          active: true,
          id: generateUUID(),
          start: new Date("1970-01-01T09:00:00"),
          end: new Date("1970-01-01T19:30:00"),
        },
        {
          label: "Thursday",
          active: true,
          id: generateUUID(),
          start: new Date("1970-01-01T09:00:00"),
          end: new Date("1970-01-01T19:30:00"),
        },
        {
          label: "Friday",
          active: true,
          id: generateUUID(),
          start: new Date("1970-01-01T09:00:00"),
          end: new Date("1970-01-01T19:30:00"),
        },
        {
          label: "Saturday",
          active: false,
          id: generateUUID(),
          start: new Date("1970-01-01T09:00:00"),
          end: new Date("1970-01-01T19:30:00"),
        },
        {
          label: "Sunday",
          active: false,
          id: generateUUID(),
          start: new Date("1970-01-01T09:00:00"),
          end: new Date("1970-01-01T19:30:00"),
        },
      ],
    },
  }
}

export function createPdfSection(): PdfFileSection {
  return {
    enabled: true,
    id: generateUUID(),
    type: "pdf-file-section",
    background: true,
    heading: {
      enabled: true,
      text: "PDF Files",
    },
    description: {
      enabled: true,
      text: "Have a look at our PDF files.",
    },
    files: [
      {
        id: generateUUID(),
        title: {
          enabled: true,
          text: "PDF File 1",
        },
        subTitle: {
          enabled: true,
          text: "PDF File 1",
        },
        fileSrc: "https://images.pexels.com/photos/11127232/pexels-photo-11127232.jpeg",
        thumbnail: "https://images.pexels.com/photos/11127232/pexels-photo-11127232.jpeg",
      },
    ],
  }
}

// Map section types to their factory functions
export const SECTION_CREATOR: Record<ContentSectionType, () => ContentSection> = {
  "teams-section": createTeamsSection,
  "video-section": createVideoSection,
  "pdf-file-section": createPdfSection,
  "cta-button": createCtaButtonSection,
  "social-links": createSocialLinksSection,
  "card-profile": createCardProfileSection,
  "heading-text": createHeadingTextSection,
  "bussiness-hour": createBussinessHoursSection,
  "floating-button": createFloatingButtonSection,
  "contact-details": createContactDetailsSection,
  "image-text-links": createImageTextLinksSection,
  "testimonials-section": createTestimonialsSection,
}
