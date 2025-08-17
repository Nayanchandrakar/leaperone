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
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { HeadingShortner } from "@/components/shared/heading-shortner"

type FormSchema = z.infer<typeof createAccountSchema>

export const CreateAccountForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
    },
  })

  const onSubmit = (values: FormSchema) => {
    console.log(values)
  }

  return (
    <div className="flex items-center justify-center size-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 sm:mx-auto w-full sm:max-w-[28rem]"
        >
          <HeadingShortner
            title="Create Your Account"
            description="Unlock Leaper CRM with a paid plan, your first 7 days are free!"
            className="mb-12"
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="data-[error=true]:text-black">
                  Username
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="text-muted-foreground text-sm font-normal absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none border-r">
                      myleaper.com
                    </span>
                    <Input
                      variant="gray"
                      className="peer ps-32"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-muted-foreground transition-colors duration-500" />
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs *:[a]:underline *:[a]:underline-offset-4 mb-3.5">
            By creating an account you agree to our{" "}
            <Link href="#">Terms of Service</Link> and{" "}
            <Link href="#">Privacy Policy</Link>.
          </div>

          <div className="flex items-center justify-center flex-col gap-4">
            <Button type="submit" className="w-full" size="lg">
              Create Account
            </Button>

            <span className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 text-primary"
              >
                log in
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  )
}
