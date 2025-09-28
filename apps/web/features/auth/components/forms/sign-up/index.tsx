"use client"

import { Button } from "@app/ui/components/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/ui/components/form"
import { Input } from "@app/ui/components/input"
import { registerFormSchema } from "@app/zod/schema/auth"
import type { RegisterFormSchema } from "@app/zod/types"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { RenderMessage } from "@/features/auth/components/forms/sign-up/render-username-message"
import {
  AuthDescription,
  AuthHeader,
  AuthTitle,
} from "@/features/auth/components/ui/auth-header"
import { AuthRedirect } from "@/features/auth/components/ui/auth-redirect"
import { useRegister } from "@/features/auth/hooks/sign-up/use-register"
import {
  useAccountFormContext,
  useUsernameError,
} from "@/features/auth/hooks/sign-up/use-username-check"

interface ISignupForm {
  callbackUrl: string
}

export const SignupForm = ({ callbackUrl }: ISignupForm) => {
  const { mutate, isPending } = useRegister()

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
      callbackUrl,
    },
  })

  const {
    error,
    isValid,
    isError,
    setError,
    isLoading,
    usernameError,
    isUserNameTaken,
    clearErrors,
  } = useAccountFormContext(form)

  useUsernameError({
    error,
    setError,
    isLoading,
    clearErrors,
    isUserNameTaken,
    usernameErrorType: usernameError?.type,
  })

  const isSubmissionDisabled = [
    isError,
    !isValid,
    isLoading,
    isPending,
    isUserNameTaken,
  ].some(Boolean)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="w-full max-w-md space-y-6"
      >
        <AuthHeader className="mb-12 text-center">
          <AuthTitle>Create Your Account</AuthTitle>
          <AuthDescription>
            Unlock Leaper CRM with a paid plan, your first 7 days are free!
          </AuthDescription>
        </AuthHeader>

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-black">
                Username
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center border-r px-3 text-sm font-normal text-muted-foreground">
                    myleaper.com
                  </span>
                  <Input
                    variant="gray"
                    className="pl-32"
                    placeholder="Enter your username"
                    disabled={isPending}
                    {...field}
                  />
                </div>
              </FormControl>

              <RenderMessage
                queryError={error}
                isLoading={isLoading}
                exists={isUserNameTaken}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  variant="gray"
                  placeholder="Enter your full name"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  variant="gray"
                  type="email"
                  placeholder="Enter your email address"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  variant="gray"
                  placeholder="Enter your password"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-center text-xs text-muted-foreground">
          By creating an account, you agree to our&nbsp;
          <Link
            tabIndex={-1}
            href="/terms-and-condition"
            className="underline hover:text-primary"
          >
            Terms of Service
          </Link>
          &nbsp;and&nbsp;
          <Link
            tabIndex={-1}
            href="/privacy-policy"
            className="underline hover:text-primary"
          >
            Privacy Policy
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            type="submit"
            className="w-full"
            disabled={isSubmissionDisabled}
          >
            Create Account
          </Button>

          <AuthRedirect
            linkHref="/login"
            linkMessage="Log In"
            message="Already have an account?"
          />
        </div>
      </form>
    </Form>
  )
}
