"use client"

import { Button } from "@app/ui/components/button"
import { FieldGroup } from "@app/ui/components/field"
import { passwordSetupSchema } from "@app/zod/schema/invitation"
import { useAppForm } from "@/components/ui/app-form"
import { AuthWrapper } from "@/features/auth/components/layouts/auth-layout"
import { AuthDescription, AuthHeader, AuthTitle } from "@/features/auth/components/ui/auth-header"
import { usePasswordSetup } from "@/features/invitation/hooks/password-setup/use-password-setup"

type PasswordSetupFormProps = {
  token: string
}

export const PasswordSetupForm = ({ token }: PasswordSetupFormProps) => {
  const { mutateAsync, isPending } = usePasswordSetup()

  const form = useAppForm({
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: passwordSetupSchema,
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)
    },
  })

  return (
    <AuthWrapper className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="w-full max-w-120 space-y-7"
      >
        <AuthHeader className="text-center">
          <AuthTitle>Set Up Your Password</AuthTitle>
          <AuthDescription>
            Create a secure password to complete your account setup and access your dashboard.
          </AuthDescription>
        </AuthHeader>

        <FieldGroup className="gap-5">
          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField label="New Password" variant="gray" disabled={isPending} />
            )}
          />

          <form.AppField
            name="confirmPassword"
            children={(field) => (
              <field.TextField label="Confirm Password" variant="gray" disabled={isPending} />
            )}
          />
        </FieldGroup>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="w-full" size="lg">
              {isSubmitting ? "Setting password..." : "Set password"}
            </Button>
          )}
        />
      </form>
    </AuthWrapper>
  )
}
