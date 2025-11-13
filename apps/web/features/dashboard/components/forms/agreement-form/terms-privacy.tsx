"use client"

import { Button } from "@app/ui/components/button"
import { Checkbox } from "@app/ui/components/checkbox"
import { Field, FieldDescription, FieldError, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { RadioGroup } from "@app/ui/components/radio-group"
import { Separator } from "@app/ui/components/separator"
import { Textarea } from "@app/ui/components/textarea"
import { agreementFormSchema } from "@app/zod/schema/bussiness"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { AgreementContentChoice } from "@/features/dashboard/components/pages/agreement-form/agreement-content-choice"
import {
  AgreementDescription,
  AgreementHeading,
} from "@/features/dashboard/components/pages/agreement-form/agreement-heading"
import {
  POLICY_OPTIONS,
  TERMS_OPTIONS,
} from "@/features/dashboard/constants/agreement-form/agreement-options"

export const TermsPrivacyForm = () => {
  const form = useForm({
    defaultValues: {
      policyHeading: "Privacy Policy",
      termsHeading: "Terms and Conditions",
      terms: {
        type: "url",
        content: "https://leaperone.com/terms-and-conditions",
      },
      policy: {
        type: "url",
        content: "https://leaperone.com/privacy-policy",
      },
      supportEmail: "support@leaperone.com",
      agreeToTerms: false,
    },

    validators: {
      onChange: agreementFormSchema,
    },

    onSubmit: () => {
      toast.success("Your changes have been saved.")
    },
  })

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault()
        form.handleSubmit()
      }}
    >
      <div className="space-y-2">
        <AgreementHeading>Terms & Conditions</AgreementHeading>
        <AgreementDescription>
          Share the heading that appears above your Terms & Conditions and choose whether to link to
          an existing page or paste the content directly.
        </AgreementDescription>
      </div>

      <form.Field
        name="termsHeading"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Heading</FieldLabel>
              <Input
                type="text"
                variant="gray"
                id={field.name}
                name={field.name}
                aria-invalid={isInvalid}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Enter your terms and conditions heading"
                onChange={(event) => field.handleChange(event.target.value)}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />

      <form.Field
        name="terms.type"
        listeners={{
          onChange: () => {
            form.setFieldValue("terms.content", "")
          },
        }}
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Content</FieldLabel>
              <RadioGroup value={field.state.value} onValueChange={field.handleChange}>
                {TERMS_OPTIONS.map(({ description, title, value }) => (
                  <AgreementContentChoice
                    key={value}
                    value={value}
                    title={title}
                    description={description}
                  />
                ))}
              </RadioGroup>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />

      <form.Subscribe
        selector={(state) => state.values.terms.type}
        children={(type) => (
          <form.Field
            name="terms.content"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  {type === "url" ? (
                    <Input
                      type="text"
                      variant="gray"
                      id={field.name}
                      name={field.name}
                      aria-invalid={isInvalid}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Enter the URL to your Terms & Conditions page"
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  ) : (
                    <Textarea
                      rows={10}
                      variant="gray"
                      id={field.name}
                      name={field.name}
                      aria-invalid={isInvalid}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Enter your Terms & Conditions content"
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  )}
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
        )}
      />

      <Separator className="my-8" />

      <div className="space-y-2">
        <AgreementHeading>Privacy Policy</AgreementHeading>
        <AgreementDescription>
          Share the heading that appears above your Privacy Policy and choose whether to link to an
          existing page or paste the content directly.
        </AgreementDescription>
      </div>

      <form.Field
        name="policyHeading"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Heading</FieldLabel>
              <Input
                type="text"
                variant="gray"
                id={field.name}
                name={field.name}
                aria-invalid={isInvalid}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Enter your Privacy Policy heading"
                onChange={(event) => field.handleChange(event.target.value)}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />

      <form.Field
        name="policy.type"
        listeners={{
          onChange: () => {
            form.setFieldValue("policy.content", "")
          },
        }}
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Content</FieldLabel>
              <RadioGroup value={field.state.value} onValueChange={field.handleChange}>
                {POLICY_OPTIONS.map(({ description, title, value }) => (
                  <AgreementContentChoice
                    key={value}
                    value={value}
                    title={title}
                    description={description}
                  />
                ))}
              </RadioGroup>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />

      <form.Subscribe
        selector={(state) => state.values.policy.type}
        children={(type) => (
          <form.Field
            name="policy.content"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  {type === "url" ? (
                    <Input
                      type="text"
                      variant="gray"
                      id={field.name}
                      name={field.name}
                      aria-invalid={isInvalid}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Enter the URL to your Privacy Policy page"
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  ) : (
                    <Textarea
                      rows={10}
                      variant="gray"
                      id={field.name}
                      name={field.name}
                      aria-invalid={isInvalid}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Enter your Privacy Policy content"
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  )}
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
        )}
      />

      <form.Field
        name="supportEmail"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Support Email</FieldLabel>
              <Input
                type="email"
                variant="gray"
                id={field.name}
                name={field.name}
                aria-invalid={isInvalid}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Enter your support email address"
                onChange={(event) => field.handleChange(event.target.value)}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />

      <Separator className="my-8" />

      <form.Field
        name="agreeToTerms"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <div className="flex gap-3 items-start">
                <Checkbox
                  id={field.name}
                  name={field.name}
                  aria-invalid={isInvalid}
                  onBlur={field.handleBlur}
                  checked={field.state.value}
                  className="mt-1"
                  onCheckedChange={(checked) => field.handleChange(checked === true)}
                />
                <FieldDescription>
                  I agree to the Forms Terms of Use and Privacy Policy. As the form owner, I’m
                  responsible for all collected data. I’ve reviewed Leaper One’s terms and
                  acknowledge that they are not responsible for any legal claims or losses related
                  to the processing of personal data through their service, I accept full
                  responsibility.
                </FieldDescription>
              </div>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />

      <form.Subscribe
        selector={(state) => state.isDirty}
        children={(isDirty) => (
          <Button type="submit" className="mt-1 px-10" disabled={!isDirty}>
            Save
          </Button>
        )}
      />
    </form>
  )
}
