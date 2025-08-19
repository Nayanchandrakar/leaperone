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
import { createAccountSchema } from "@myleaper/zod/client/auth-schema"
import Link from "next/link"
import { useMemo } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useDebounceValue } from "usehooks-ts"
import { UsernameStatus } from "@/components/pages/create-account/elements/username-status"
import { HeadingShortner } from "@/components/shared/heading-shortner"
import {
  useCreateAccount,
  useUsernameCheck,
  useUsernameError,
} from "@/hooks/trpc/users/check-username"
import type { FormSchema } from "@/types/create-account"

export const CreateAccountForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(createAccountSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
    },
  })

  const { control, setError, clearErrors, formState } = form
  const { isValid, errors, isSubmitting } = formState

  const { onSubmit } = useCreateAccount()
  const username = useWatch({ control, name: "username" })
  const [debouncedUsername] = useDebounceValue(username, 400)
  const usernameError = useMemo(() => errors.username, [errors.username])
  const isUsernameCheckEnabled = Boolean(
    debouncedUsername.length && !usernameError,
  )

  const { data, isError, isPending, error } = useUsernameCheck({
    username: debouncedUsername,
    enabled: isUsernameCheckEnabled,
  })
  const isUsernameTaken = useMemo(() => Boolean(data?.exists), [data])

  useUsernameError({
    error,
    setError,
    isPending,
    clearErrors,
    exists: isUsernameTaken,
    userNameErrorType: usernameError?.type,
  })

  const isSubmissionDisabled = [
    isError,
    !isValid,
    isPending,
    isSubmitting,
    isUsernameTaken,
  ].some(Boolean)

  return (
    <div className="flex size-full items-center justify-center">
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
            control={control}
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

                <UsernameStatus
                  error={error}
                  username={username}
                  isPending={isPending}
                  exists={isUsernameTaken}
                  fieldError={usernameError}
                />
              </FormItem>
            )}
          />

          <FormField
            control={control}
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
            control={control}
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
            control={control}
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
            <Link href="/" className="underline hover:text-primary">
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link href="/" className="underline hover:text-primary">
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

            <p className="text-center text-sm">
              Already have an account?&nbsp;
              <Link href="/login" className="underline text-primary">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
