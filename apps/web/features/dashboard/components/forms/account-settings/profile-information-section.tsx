"use client"

import { useShallow } from "zustand/react/shallow"
import { ProfileField } from "@/features/dashboard/components/forms/account-settings/profile-field"
import { useAccountStore } from "@/features/dashboard/hooks/account-settings/use-account-store"

export function ProfileInformationSection() {
  const { setIsNameChangeOpen } = useAccountStore(
    useShallow((state) => ({
      setIsNameChangeOpen: state.setIsNameChangeOpen,
    })),
  )

  const handleChangeName = () => {
    setIsNameChangeOpen(true)
  }

  const handleChangeEmail = () => {
    // TODO: Implement change email functionality
    console.log("Change email")
  }

  const handleChangeUsername = () => {
    // TODO: Implement change username functionality
    console.log("Change username")
  }

  return (
    <section>
      <dl className="space-y-6">
        <ProfileField
          label="Full Name"
          value="John Doe"
          actionLabel="Change Name"
          onAction={handleChangeName}
        />
        <ProfileField
          label="Email"
          value="hello@example.com"
          actionLabel="Change Email"
          onAction={handleChangeEmail}
        />
        <ProfileField
          label="Username"
          value="hello_world"
          actionLabel="Change Username"
          onAction={handleChangeUsername}
        />
      </dl>
    </section>
  )
}
