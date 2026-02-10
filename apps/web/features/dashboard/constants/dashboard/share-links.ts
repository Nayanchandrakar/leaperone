import { SocialLightIcons } from "@/features/dashboard/components/shared/social-light-icons"
import {
  createEmailShareLink,
  createFacebookShareLink,
  createLinkedInShareLink,
  createWhatsAppShareLink,
  createXShareLink,
} from "@/features/dashboard/utils"

export const SHARE_LINKS = [
  {
    name: "Facebook",
    Icon: SocialLightIcons.facebook,
    href: createFacebookShareLink,
  },
  {
    name: "(Twitter)",
    Icon: SocialLightIcons.x,
    href: createXShareLink,
  },
  {
    name: "LinkedIn",
    Icon: SocialLightIcons.linkedin,
    href: createLinkedInShareLink,
  },
  {
    name: "WhatsApp",
    Icon: SocialLightIcons.whatsapp,
    href: createWhatsAppShareLink,
  },
  {
    name: "Email",
    Icon: SocialLightIcons.email,
    href: createEmailShareLink,
  },
]
