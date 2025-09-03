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
import { forgotPasswordFormSchema } from "@app/zod/schema/auth"
import type { ForgotPasswordFormSchema } from "@app/zod/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { HeadingShortner } from "@/components/shared/heading-shortner"
import { useForgotPassword } from "@/features/auth/hooks/forgot-password/use-forgot-password"

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const { onSubmit } = useForgotPassword()
  const isSubmitting = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6"
      >
        <HeadingShortner
          title="Reset Password"
          description="Enter the email you used to create your account, and we’ll send you a link to reset it."
          className="mb-12 text-center"
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

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
