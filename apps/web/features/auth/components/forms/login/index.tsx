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
import { loginFormSchema } from "@myleaper/zod/client/auth-schema"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { HeadingShortner } from "@/components/shared/heading-shortner"
import { AuthRedirect } from "@/features/auth/components/ui/auth-redirect"
import { useLoginUser } from "@/features/auth/hooks/login-user"
import type { ILoginFormSchema } from "@/types/zod-types"

interface ILoginForm {
  callbackURL: string | undefined
}

export const LoginForm = ({ callbackURL }: ILoginForm) => {
  const form = useForm<ILoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { onSubmit } = useLoginUser(callbackURL)
  const isSubmitting = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col items-center gap-4">
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
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
