"use client"

import { Lato } from "next/font/google"
import { useMemo } from "react"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { TemplateRenderer } from "@/features/preview/components/ui/template-renderer"
import { separateSections } from "@/features/preview/utils/seperate-sections"

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
})

export default function PreviewPage() {
  const design = useDesignEditorStore((state) => state.config)
  const content = useContentEditorStore((state) => state.sections)
  const { floatingButton } = useMemo(() => separateSections(content), [content])

  // const googleFontHref = useMemo(() => {
  //   if (!font || isSystemFont(font.family)) return null
  //   return getGoogleFontsUrl(font)
  // }, [font])

  console.log(content)

  return (
    <>
      <style jsx global>{`
      :root {
        --font-lato: ${lato.className};
      }
    `}</style>
      <TemplateRenderer
        design={design}
        template="classic"
        contents={[
          {
            id: "3e454339-6717-4ff7-a59f-bfce49d0dbc0",
            enabled: true,
            type: "card-profile",
            details: {
              profile: {
                imageSrc:
                  "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/48.jpg",
                enabled: true,
              },
              branding: {
                imageSrc: "/shellter.png",
                enabled: true,
              },
            },
            name: {
              enabled: true,
              name: "Katherine Thomas ",
            },
            info: {
              primary: {
                enabled: true,
                text: "Senior Real Estate Consultant  ",
              },
              secondary: {
                enabled: true,
                text: "Shellter Real Estates",
              },
            },
            contacts: {
              enabled: true,
              list: [
                {
                  id: "8810a580-67cc-4872-b591-030a92b2536e",
                  type: "email",
                  value: "michael.smith@example.com",
                },
                {
                  id: "c6976256-12f6-47bb-94ea-58879aaf6329",
                  type: "phone",
                  value: "+1234567890",
                },
                {
                  id: "cffe4891-641a-44d8-9edc-6ab8772a72bd",
                  type: "location",
                  value:
                    "https://www.google.com/maps/place/1600+Amphitheatre+Parkway,+Mountain+View,+CA",
                },
                {
                  id: "d9bae95b-a244-4309-a6d1-84c4fcf6dd7d",
                  type: "website",
                  value: "https://www.yourwebsite.com",
                },
              ],
            },
          },
          {
            enabled: true,
            id: "7efa23cc-39af-438c-8823-23770c6c8a55",
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
            id: "423dc2ec-8fcd-4a1e-81dd-988b88b73d0d",
            type: "image-text-links",
            heading: {
              enabled: true,
              text: "Our EV Collection",
            },
            description: {
              enabled: true,
              text: "Discover our latest collection of electric vehicles from leading EV brands.",
            },
            imageView: "slideshow",
            images: [
              {
                id: "4f0e506c-3320-42af-9fe8-195b8c7209fd",
                imageSrc: "https://images.pexels.com/photos/11127232/pexels-photo-11127232.jpeg",
              },
              {
                id: "77d68283-ce3e-49e1-96fb-fa6b5cb0a2df",
                imageSrc: "https://images.pexels.com/photos/7676343/pexels-photo-7676343.jpeg",
              },
              {
                id: "b9803b3a-2de5-41a0-9817-cc7a2fba71f3",
                imageSrc: "https://images.pexels.com/photos/29647834/pexels-photo-29647834.jpeg",
              },
            ],
            background: true,
          },
          {
            enabled: true,
            id: "d90816bd-fcc8-4cf6-9670-ef92562e2ed7",
            type: "contact-details",
            heading: {
              enabled: true,
              text: "Get in touch",
            },
            items: [
              {
                type: "phone",
                label: "Phone",
                id: "987d0686-f0a5-4ea8-a290-2199b6a2de97",
                phoneNumber: "+1234567890",
              },
              {
                type: "email",
                label: "Email",
                email: "john@gmail.com",
                id: "bafe91cb-0244-4f30-8c44-27ba7942be09",
              },
              {
                id: "02849985-6d64-42ec-9af7-d7c61584b21c",
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
            id: "55af3ac1-a130-4994-8763-478546fd4085",
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
                id: "0e81bcbf-4a8c-4366-9163-46430e36e633",
                type: "facebook",
                label: "Facebook",
                href: "https://www.facebook.com/yourusername",
              },
              {
                id: "202ec4db-97d2-42c9-9835-c554cfa69f11",
                type: "instagram",
                label: "Instagram",
                href: "https://www.instagram.com/yourusername",
              },
              {
                id: "4bdc2247-1b39-485d-b023-e199f7be4c92",
                type: "twitter",
                label: "Twitter",
                href: "https://www.twitter.com/yourusername",
              },
            ],
            background: true,
          },
        ]}
        floating={floatingButton}
      />
    </>
  )

  // <>
  //   Optimized font loading for Google Fonts
  //   {googleFontHref && (
  //     <>
  //       <link
  //         rel="preconnect"
  //         href="https://fonts.googleapis.com"
  //         crossOrigin="anonymous"
  //         key="preconnect-googleapis"
  //       />
  //       <link
  //         rel="preconnect"
  //         href="https://fonts.gstatic.com"
  //         crossOrigin="anonymous"
  //         key="preconnect-gstatic"
  //       />
  //       {/* Preload font stylesheet for faster loading */}
  //       <link rel="preload" as="style" href={googleFontHref} key="preload-google-font" />
  //       <link rel="stylesheet" href={googleFontHref} media="all" key="dynamic-google-font" />
  //     </>
  //   )}
  // </>
}
