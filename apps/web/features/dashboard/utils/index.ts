export function createBusinessCardPageLink(id: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}/card/${id}`
}

export function createBusinessCardLink(identifier: string) {
  return `${process.env.NEXT_PUBLIC_PROXY_URL}/${identifier}`
}

export function createFacebookShareLink(link: string) {
  const message =
    "I'd like to share my professional digital business card with you. Let's connect and explore potential collaboration opportunities."
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&quote=${encodeURIComponent(message)}`
}

export function createXShareLink(link: string) {
  const message =
    "Streamlining professional connections with my digital business card. Let's connect and explore opportunities together."
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(message)}`
}

export function createLinkedInShareLink(link: string) {
  const message =
    "I'm sharing my digital business card to make it easier for us to connect professionally. I'd welcome the opportunity to discuss potential collaborations and mutual business growth."
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}&summary=${encodeURIComponent(message)}`
}

export function createWhatsAppShareLink(link: string) {
  const message =
    "Hello! I'd like to share my professional digital business card with you. I believe there may be valuable opportunities for us to collaborate."
  return `https://wa.me/?text=${encodeURIComponent(`${message}\n\n${link}`)}`
}

export function createEmailShareLink(link: string) {
  const title = "Professional Introduction - Digital Business Card"
  const message =
    "I hope this message finds you well. I'm sharing my digital business card to facilitate our professional connection and provide you with easy access to my contact information and credentials.\n\nI'd welcome the opportunity to discuss how we might work together or explore mutually beneficial business opportunities."
  return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${message}\n\nAccess my digital business card here: ${link}\n\nI look forward to connecting with you.\n\nBest regards`)}`
}

export function createEmbedCode(link: string) {
  return `<iframe src="${link}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`
}
