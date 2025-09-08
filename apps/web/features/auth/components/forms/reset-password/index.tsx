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
import { setNewPasswordSchema } from "@app/zod/schema/auth"
import type { SetNewPasswordSchema } from "@app/zod/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { HeadingShortner } from "@/components/shared/heading-shortner"
import { useResetPassword } from "@/features/auth/hooks/reset-password/use-reset-password"

interface IResetPasswordForm {
  token: string
}

export const ResetPasswordForm = ({ token }: IResetPasswordForm) => {
  const { isPending, mutate } = useResetPassword()

  const form = useForm<SetNewPasswordSchema>({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: {
      token,
      newPassword: "",
      confirmPassword: "",
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
          title="Reset Password"
          description="Change your old password with the new one if you forgot it."
          className="mb-12 text-center"
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  variant="gray"
                  disabled={isPending}
                  placeholder="Enter your new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  variant="gray"
                  disabled={isPending}
                  placeholder="Enter your new password"
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
          Reset Password
        </Button>
      </form>
    </Form>
  )
}
