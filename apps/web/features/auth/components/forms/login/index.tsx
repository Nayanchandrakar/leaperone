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
import { loginFormSchema } from "@app/zod/schema/auth"
import type { LoginFormSchema } from "@app/zod/types"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { HeadingShortner } from "@/components/shared/heading-shortner"
import { AuthRedirect } from "@/features/auth/components/ui/auth-redirect"
import { useLogin } from "@/features/auth/hooks/login/use-login"

interface ILoginForm {
  callbackUrl: string
}

export const LoginForm = ({ callbackUrl }: ILoginForm) => {
  const { mutate, isPending } = useLogin()

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      callbackUrl,
    },
  })

  const formState = form.formState
  const isSubmissionDisabled = [isPending, !formState.isValid].some(Boolean)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="w-full max-w-md space-y-6"
      >
        <HeadingShortner title="Welcome Back" className="mb-12 text-center" />

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
              <FormLabel>
                Password
                <Link
                  tabIndex={-1}
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </FormLabel>
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

        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            type="submit"
            className="w-full"
            disabled={isSubmissionDisabled}
          >
            Log In
          </Button>

          <AuthRedirect
            linkHref="/sign-up"
            linkMessage="Sign up"
            message="Don't have an account?"
          />
        </div>
      </form>
    </Form>
  )
}
