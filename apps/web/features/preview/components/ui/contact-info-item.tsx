import type { ReactNode } from "react"

interface ContactInfoItemProps {
  label: string
  children: ReactNode
}

export const ContactInfoItem = ({ label, children }: ContactInfoItemProps) => {
  return (
    <div className="text-start font-(--font-body-weight) text-sm xs:text-base">
      {label && <strong className="text-(--text-color) font-normal">{label}</strong>}
      {children}
    </div>
  )
}

interface ContactInfoValueProps {
  children: ReactNode
}

export const ContactInfoValue = ({ children }: ContactInfoValueProps) => {
  return <p className="text-(--supporting-text-color)">{children}</p>
}
