import type { ReactNode } from "react"

interface ContactInfoItemProps {
  label: string
  children: ReactNode
}

export const ContactInfoItem = ({ label, children }: ContactInfoItemProps) => {
  return (
    <div className="text-start font-template-body text-sm xs:text-base">
      {label && <strong className="text-template-foreground font-normal">{label}</strong>}
      {children}
    </div>
  )
}

interface ContactInfoValueProps {
  children: ReactNode
}

export const ContactInfoValue = ({ children }: ContactInfoValueProps) => {
  return <p className="text-template-muted-foreground">{children}</p>
}
