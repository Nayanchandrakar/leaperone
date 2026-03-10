"use client"

import { Button } from "@app/ui/components/button"
import { Field, FieldError, FieldLabel, FieldSet } from "@app/ui/components/field"
import { setNewPasswordSchema } from "@app/zod/schema/auth"
import { useAppForm } from "@/components/ui/app-form"
import { PasswordInput } from "@/components/ui/password-input"
import { AuthDescription, AuthHeader, AuthTitle } from "@/features/auth/components/ui/auth-header"
import { useResetPassword } from "@/features/auth/hooks/reset-password/use-reset-password"

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { isPending, mutateAsync } = useResetPassword()

  const form = useAppForm({
    defaultValues: {
      token,
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onChange: setNewPasswordSchema,
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
        <AuthHeader className="mb-12">
          <AuthTitle>Reset Password</AuthTitle>
          <AuthDescription>
            Change your old password with the new one if you forgot it.
          </AuthDescription>
        </AuthHeader>

        <FieldSet>
          <form.AppField
            name="newPassword"
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
                    placeholder="Enter your new password"
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
                    placeholder="Enter your new password"
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={state.meta.errors} />}
                </Field>
              )
            }}
          />
        </FieldSet>

        <form.Subscribe
          selector={({ canSubmit, isPristine }) => !canSubmit || isPristine}
          children={(isDisabled) => (
            <Button size="lg" type="submit" className="w-full" disabled={isDisabled}>
              Reset Password
            </Button>
          )}
        />
      </form>
    </form.AppForm>
  )
}
