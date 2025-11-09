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
import { useForm } from "react-hook-form"
import { PrivacySection } from "./privacy-section"
import { TermsSection } from "./terms-section"

interface TermsAndPrivacyFormData {
  supportEmail: string
  termsUrl: string
  termsCustomText: string
  privacyUrl: string
  privacyCustomText: string
  useCustomTerms: boolean
  useCustomPrivacy: boolean
}

export const TermsAndPrivacyForm = () => {
  const form = useForm<TermsAndPrivacyFormData>({
    mode: "onChange",
    defaultValues: {
      supportEmail: "",
      termsUrl: "",
      termsCustomText: "",
      privacyUrl: "",
      privacyCustomText: "",
      useCustomTerms: false,
      useCustomPrivacy: false,
    },
  })

  const useCustomTerms = form.watch("useCustomTerms")
  const useCustomPrivacy = form.watch("useCustomPrivacy")

  const onSubmit = (data: TermsAndPrivacyFormData) => {
    console.log("Form data:", data)
    // TODO: Implement API call to save settings
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 max-w-3xl space-y-8">
        {/* Support Email Section */}
        <FormField
          control={form.control}
          name="supportEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Support Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  variant="gray"
                  placeholder="Enter support email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Terms & Conditions Section */}
        <TermsSection
          useCustom={useCustomTerms}
          onUseCustomChange={(value) => form.setValue("useCustomTerms", value)}
          urlField={
            <FormField
              control={form.control}
              name="termsUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terms & Conditions URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      variant="gray"
                      placeholder="https://example.com/terms"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          }
          customTextField={
            <FormField
              control={form.control}
              name="termsCustomText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Terms & Conditions Text</FormLabel>
                  <FormControl>
                    <Textarea
                      variant="gray"
                      rows={6}
                      placeholder="Enter your custom terms and conditions..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          }
        />

        {/* Privacy Policy Section */}
        <PrivacySection
          useCustom={useCustomPrivacy}
          onUseCustomChange={(value) => form.setValue("useCustomPrivacy", value)}
          urlField={
            <FormField
              control={form.control}
              name="privacyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Privacy Policy URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      variant="gray"
                      placeholder="https://example.com/privacy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          }
          customTextField={
            <FormField
              control={form.control}
              name="privacyCustomText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Privacy Policy Text</FormLabel>
                  <FormControl>
                    <Textarea
                      variant="gray"
                      rows={6}
                      placeholder="Enter your custom privacy policy..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          }
        />

        {/* Submit Button */}
        <div className="flex justify-start pt-4">
          <Button type="submit" size="lg">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}
