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
import { emailSchema } from "@app/zod/schema/auth"
import type { EmailSchema } from "@app/zod/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { HeadingShortner } from "@/components/shared/heading-shortner"
import { useRequestPasswordReset } from "@/features/auth/hooks/forgot-password/use-forgot-password"

export const ForgotPasswordForm = () => {
  const { mutate, isPending } = useRequestPasswordReset()

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
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
        <HeadingShortner
          title="Forgot Password"
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
                  type="email"
                  variant="gray"
                  disabled={isPending}
                  placeholder="Enter your email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          size="lg"
          type="submit"
          className="w-full"
          disabled={isSubmissionDisabled}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
