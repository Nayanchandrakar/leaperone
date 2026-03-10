"use client"

import { Button } from "@app/ui/components/button"
import { FieldSet } from "@app/ui/components/field"
import { emailSchema } from "@app/zod/schema/auth"
import { useAppForm } from "@/components/ui/app-form"
import { AuthDescription, AuthHeader, AuthTitle } from "@/features/auth/components/ui/auth-header"
import { useRequestPasswordReset } from "@/features/auth/hooks/forgot-password/use-forgot-password"

export function ForgotPasswordForm() {
  const { mutateAsync, isPending } = useRequestPasswordReset()

  const form = useAppForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: emailSchema,
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)
    },
  })

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="w-full max-w-md"
      >
        <AuthHeader className="mb-12 text-center">
          <AuthTitle>Forgot Password</AuthTitle>
          <AuthDescription>
            Enter the email you used to create your account, and we’ll send you a link to reset it.
          </AuthDescription>
        </AuthHeader>

        <FieldSet>
          <form.AppField
            name="email"
            children={({ TextField }) => (
              <TextField
                type="email"
                label="Email"
                variant="gray"
                disabled={isPending}
                autoComplete="new-password"
                placeholder="Enter your email address"
              />
            )}
          />

          <form.Subscribe
            selector={({ canSubmit, isPristine }) => !canSubmit || isPristine}
            children={(isDisabled) => (
              <Button size="lg" type="submit" className="w-full" disabled={isDisabled}>
                Submit
              </Button>
            )}
          />
        </FieldSet>
      </form>
    </form.AppForm>
  )
}
