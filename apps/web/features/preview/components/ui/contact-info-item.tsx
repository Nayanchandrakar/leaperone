import type { ReactNode } from "react"

interface ContactInfoItemProps {
  label: string
  children: ReactNode
}

export const ContactInfoItem = ({ label, children }: ContactInfoItemProps) => {
  return (
    <div className="text-start font-normal text-base">
      <strong className="text-primary font-normal">{label}</strong>
      {children}
    </div>
  )
}

interface ContactInfoValueProps {
  children: ReactNode
}

export const ContactInfoValue = ({ children }: ContactInfoValueProps) => {
  return <p className="text-muted-foreground">{children}</p>
}
