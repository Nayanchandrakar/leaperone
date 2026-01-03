import type { ContactType } from "@app/core/types"

export function getEmailUrl(email: string) {
  return `mailto:${email}`
}

export function getPhoneUrl(phoneNumber: string) {
  return `tel:${phoneNumber}`
}

export function getSmsUrl(phoneNumber: string) {
  return `sms:${phoneNumber}`
}

export function getWhatsAppUrl(phoneNumber: string) {
  // Remove all non-digit characters except +
  const cleaned = phoneNumber.replace(/[^\d+]/g, "")
  // Remove + if present for wa.me format (it expects numbers only)
  const normalizedNumber = cleaned.replace(/^\+/, "")
  return `https://wa.me/${normalizedNumber}`
}

export function getTelegramUrl(username: string) {
  // Remove @ if present
  const normalizedUsername = username.replace(/^@/, "")
  return `https://t.me/${normalizedUsername}`
}

export function getWeChatUrl(wechatId: string) {
  // WeChat uses weixin:// protocol or web link
  // For simplicity, using web link format
  return `https://weixin.qq.com/${wechatId}`
}

export const contactLinkFormatter: Partial<Record<ContactType, (value: string) => string>> = {
  sms: getSmsUrl,
  email: getEmailUrl,
  phone: getPhoneUrl,
  wechat: getWeChatUrl,
  whatsapp: getWhatsAppUrl,
  telegram: getTelegramUrl,
}
