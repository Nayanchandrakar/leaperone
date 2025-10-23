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
import { Textarea } from "@app/ui/components/textarea"
import { contactUsFormSchema } from "@app/zod/schema/marketing"
import type { ContactUsFormSchema } from "@app/zod/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useContactUs } from "@/features/marketing/hooks/contact-us/use-contact-us"

export const ContactUsForm = () => {
  const { mutate, isPending } = useContactUs()

  const form = useForm<ContactUsFormSchema>({
    resolver: zodResolver(contactUsFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      message: "",
      lastName: "",
      firstName: "",
      phoneNumber: "",
    },
  })

  const formState = form.formState
  const isSubmissionDisabled = [isPending, !formState.isValid].some(Boolean)

  return (
    <div className="container !max-w-xl my-12 md:my-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            mutate(data)
            form.reset()
          })}
          className="w-full space-y-6 bg-background backdrop-blur-md rounded-2xl border border-border p-5 sm:p-6"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    variant="gray"
                    disabled={isPending}
                    placeholder="Enter your first name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    variant="gray"
                    disabled={isPending}
                    placeholder="Enter your last name"
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

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    variant="gray"
                    disabled={isPending}
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    variant="gray"
                    disabled={isPending}
                    placeholder="Type your message here."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button size="lg" type="submit" className="w-full" disabled={isSubmissionDisabled}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
