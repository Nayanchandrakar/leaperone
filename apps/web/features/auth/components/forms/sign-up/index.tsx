"use client"

import { Button } from "@app/ui/components/button"
import { Field, FieldDescription, FieldError, FieldLabel, FieldSet } from "@app/ui/components/field"
import { registerFormSchema } from "@app/zod/schema/auth"
import Link from "next/link"
import { useAppForm } from "@/components/ui/app-form"
import { PasswordInput } from "@/components/ui/password-input"
import { UserNameField } from "@/features/auth/components/forms/sign-up/username-field"
import { AuthDescription, AuthHeader, AuthTitle } from "@/features/auth/components/ui/auth-header"
import { AuthRedirect } from "@/features/auth/components/ui/auth-redirect"
import { useRegister } from "@/features/auth/hooks/sign-up/use-register"

interface SignupFormProps {
  callbackUrl: string
}

export const SignupForm = ({ callbackUrl = "/" }: SignupFormProps) => {
  const { mutateAsync, isPending } = useRegister()

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      callbackUrl,
    },
    validators: {
      onChange: registerFormSchema,
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
          <AuthTitle>Create Your Account</AuthTitle>
          <AuthDescription>
            Unlock Leaper One with a paid plan, your first 7 days are free!
          </AuthDescription>
        </AuthHeader>

        <FieldSet>
          <UserNameField form={form} fields={{ username: "username" }} disabled={isPending} />

          <form.AppField
            name="name"
            children={({ TextField }) => (
              <TextField
                type="text"
                variant="gray"
                label="Full Name"
                disabled={isPending}
                autoComplete="new-password"
                placeholder="Enter your full name"
              />
            )}
          />

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

          <form.AppField
            name="password"
            children={({ state, name, handleBlur, handleChange }) => {
              const isInvalid = state.meta.isTouched && !state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={name}>Password</FieldLabel>
                  <PasswordInput
                    variant="gray"
                    id={name}
                    name={name}
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

          <FieldDescription className="text-xs text-center">
            By clicking continue, you agree to our&nbsp;
            <Link href="/terms-of-service">Terms of Service</Link> and&nbsp;
            <Link href="/privacy-policy">Privacy Policy</Link>
          </FieldDescription>

          <div className="space-y-4">
            <form.Subscribe
              selector={({ canSubmit, isPristine }) => !canSubmit || isPristine}
              children={(isDisabled) => (
                <Button size="lg" type="submit" className="w-full" disabled={isDisabled}>
                  Create Account
                </Button>
              )}
            />
            <AuthRedirect href="/login" linkText="Log In" text="Already have an account?" />
          </div>
        </FieldSet>
      </form>
    </form.AppForm>
  )
}
