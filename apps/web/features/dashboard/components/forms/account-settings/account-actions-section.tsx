"use client"

import { Button } from "@app/ui/components/button"

export const AccountActionsSection = () => {
  const handleChangePassword = () => {
    // TODO: Implement change password functionality
    console.log("Change password")
  }

  const handleDeleteAccount = () => {
    // TODO: Implement delete account functionality
    console.log("Delete account")
  }

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-2">
        <Button variant="green-outline" onClick={handleChangePassword}>
          Change Password
        </Button>
        <Button variant="destructive" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </div>
    </section>
  )
}
