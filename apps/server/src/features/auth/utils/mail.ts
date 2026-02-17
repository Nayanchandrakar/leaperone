import { ENV } from "@app/env/server"
import { logger } from "@app/logger"
import { isDevelopment } from "@/config/env"
import { resend } from "@/config/resend"

type SendMailProps = {
  to: string
  subject: string
  html: string
}

export async function sendMail({ to, subject, html }: SendMailProps) {
  if (isDevelopment) {
    logger.info(html)
  } else {
    await resend.emails.send({
      to,
      html,
      subject,
      from: ENV.RESEND_MAIL,
    })
  }
}
