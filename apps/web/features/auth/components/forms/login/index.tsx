"use client"

import { Button } from "@app/ui/components/button"
import { Field, FieldError, FieldLabel, FieldSet } from "@app/ui/components/field"
import { loginFormSchema } from "@app/zod/schema/auth"
import Link from "next/link"
import { useAppForm } from "@/components/ui/app-form"
import { PasswordInput } from "@/components/ui/password-input"
import { AuthHeader, AuthTitle } from "@/features/auth/components/ui/auth-header"
import { AuthRedirect } from "@/features/auth/components/ui/auth-redirect"
import { useLogin } from "@/features/auth/hooks/login/use-login"

interface LoginFormProps {
  callbackUrl: string
}

export function LoginForm({ callbackUrl = "/" }: LoginFormProps) {
  const { mutateAsync, isPending } = useLogin()

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      callbackUrl,
    },
    validators: {
      onChange: loginFormSchema,
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
          <AuthTitle>Welcome Back</AuthTitle>
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

          <form.AppField
            name="password"
            children={({ state, name, handleBlur, handleChange }) => {
              const isInvalid = state.meta.isTouched && !state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={name}>
                    Password
                    <Link
                      tabIndex={-1}
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-accent-foreground"
                    >
                      Forgot your password?
                    </Link>
                  </FieldLabel>
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

          <div className="space-y-4">
            <form.Subscribe
              selector={({ canSubmit, isPristine }) => !canSubmit || isPristine}
              children={(isDisabled) => (
                <Button size="lg" type="submit" className="w-full" disabled={isDisabled}>
                  Log In
                </Button>
              )}
            />
            <AuthRedirect href="/sign-up" linkText="Sign up" text="Don't have an account?" />
          </div>
        </FieldSet>
      </form>
    </form.AppForm>
  )
}
