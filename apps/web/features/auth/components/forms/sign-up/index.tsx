"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@myleaper/ui/components/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@myleaper/ui/components/form"
import { Input } from "@myleaper/ui/components/input"
import { signupSchema } from "@myleaper/zod/client/auth-schema"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { HeadingShortner } from "@/components/shared/heading-shortner"
import { RenderMessage } from "@/features/auth/components/forms/sign-up/render-username-message"
import { AuthRedirect } from "@/features/auth/components/ui/auth-redirect"
import {
  useAccountFormContext,
  useCreateAccount,
  useUsernameError,
} from "@/features/auth/hooks/create-account"
import type { ISignupFormSchema } from "@/types/zod-types"

interface ISignupForm {
  callbackURL: string | undefined
}

export const SignupForm = ({ callbackURL }: ISignupForm) => {
  const form = useForm<ISignupFormSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
    },
  })

  const {
    error,
    isValid,
    isError,
    setError,
    isPending,
    isSubmitting,
    usernameError,
    isUserNameTaken,
    clearErrors,
  } = useAccountFormContext(form)

  useUsernameError({
    error,
    setError,
    isPending,
    clearErrors,
    isUserNameTaken,
    usernameErrorType: usernameError?.type,
  })

  const isSubmissionDisabled = [
    isError,
    !isValid,
    isPending,
    isSubmitting,
    isUserNameTaken,
  ].some(Boolean)

  const { onSubmit } = useCreateAccount(callbackURL)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6"
      >
        <HeadingShortner
          title="Create Your Account"
          description="Unlock Leaper CRM with a paid plan, your first 7 days are free!"
          className="mb-12 text-center"
        />

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
                    disabled={isSubmitting}
                    {...field}
                  />
                </div>
              </FormControl>

              <RenderMessage
                queryError={error}
                isPending={isPending}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-center text-xs text-muted-foreground">
          By creating an account, you agree to our&nbsp;
          <Link tabIndex={-1} href="/" className="underline hover:text-primary">
            Terms of Service
          </Link>
          &nbsp;and&nbsp;
          <Link tabIndex={-1} href="/" className="underline hover:text-primary">
            Privacy Policy
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            type="submit"
            className="w-full"
            size="lg"
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
