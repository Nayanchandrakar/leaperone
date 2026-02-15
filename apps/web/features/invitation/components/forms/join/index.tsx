"use client"

import { Button } from "@app/ui/components/button"
import { Field, FieldError, FieldLabel, FieldSet } from "@app/ui/components/field"
import { passwordSetupSchema } from "@app/zod/schema/invitation"
import { useAppForm } from "@/components/ui/app-form"
import { PasswordInput } from "@/components/ui/password-input"
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
    <form.AppForm>
      <AuthWrapper className="flex-center min-h-[calc(100vh-64px)]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="w-full max-w-110"
        >
          <AuthHeader className="mb-12">
            <AuthTitle>Set Up Your Password</AuthTitle>
            <AuthDescription>
              Create a secure password to complete your account setup and access your dashboard.
            </AuthDescription>
          </AuthHeader>

          <FieldSet>
            <form.AppField
              name="password"
              children={({ state, name, handleBlur, handleChange }) => {
                const isInvalid = state.meta.isTouched && !state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={name}>Password</FieldLabel>
                    <PasswordInput
                      id={name}
                      name={name}
                      variant="gray"
                      onBlur={handleBlur}
                      value={state.value}
                      disabled={isPending}
                      aria-invalid={isInvalid}
                      autoComplete="new-password"
                      placeholder="Enter your password"
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    {isInvalid && <FieldError errors={state.meta.errors} />}
                  </Field>
                )
              }}
            />

            <form.AppField
              name="confirmPassword"
              children={({ state, name, handleBlur, handleChange }) => {
                const isInvalid = state.meta.isTouched && !state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={name}>Confirm Password</FieldLabel>
                    <PasswordInput
                      id={name}
                      name={name}
                      variant="gray"
                      onBlur={handleBlur}
                      value={state.value}
                      disabled={isPending}
                      aria-invalid={isInvalid}
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    {isInvalid && <FieldError errors={state.meta.errors} />}
                  </Field>
                )
              }}
            />

            <form.Subscribe
              selector={({ canSubmit, isPristine }) => !canSubmit || isPristine}
              children={(isDisabled) => (
                <Button type="submit" disabled={isDisabled} className="w-full" size="lg">
                  Set password
                </Button>
              )}
            />
          </FieldSet>
        </form>
      </AuthWrapper>
    </form.AppForm>
  )
}
