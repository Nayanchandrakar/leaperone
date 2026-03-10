"use client"

import { Button, buttonVariants } from "@app/ui/components/button"
import { FieldSet } from "@app/ui/components/field"
import { inviteMemberSchema } from "@app/zod/schema/invitation"
import Link from "next/link"
import { useAppForm } from "@/components/ui/app-form"
import { UserNameField } from "@/features/auth/components/forms/sign-up/username-field"
import { AuthWrapper } from "@/features/auth/components/layouts/auth-layout"
import { AuthDescription, AuthHeader, AuthTitle } from "@/features/auth/components/ui/auth-header"
import { useInviteMember } from "@/features/invitation/hooks/invite/use-invite-member"

export function InviteMemberForm() {
  const { mutateAsync, isPending } = useInviteMember()

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      jobRole: "",
      username: "",
    },
    validators: {
      onChange: inviteMemberSchema,
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)
    },
  })

  return (
    <form.AppForm>
      <AuthWrapper className="flex-center h-[calc(100vh-64px)]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="w-full max-w-116"
        >
          <AuthHeader className="mb-12">
            <AuthTitle>Invite a New Member</AuthTitle>
            <AuthDescription>
              Invite a new member to be part of your exceptional team!
              <br />
              Note: All below fields required to fill.
            </AuthDescription>
          </AuthHeader>

          <FieldSet>
            <UserNameField form={form} fields={{ username: "username" }} disabled={isPending} />

            <form.AppField
              name="name"
              children={(field) => (
                <field.TextField
                  variant="gray"
                  label="Full Name"
                  disabled={isPending}
                  placeholder="Enter your full name"
                />
              )}
            />

            <form.AppField
              name="jobRole"
              children={(field) => (
                <field.TextField
                  variant="gray"
                  label="Job Role"
                  disabled={isPending}
                  placeholder="Enter your job role"
                />
              )}
            />

            <form.AppField
              name="email"
              children={(field) => (
                <field.TextField
                  type="email"
                  variant="gray"
                  label="Email"
                  disabled={isPending}
                  placeholder="Enter your email address"
                />
              )}
            />

            <div className="space-y-3.5">
              <form.Subscribe
                selector={({ canSubmit, isPristine }) => !canSubmit || isPristine}
                children={(isDisabled) => (
                  <Button
                    size="lg"
                    type="submit"
                    disabled={isDisabled}
                    className="w-full font-semibold"
                  >
                    Send Invitation
                  </Button>
                )}
              />

              <Link
                href="/dashboard/teams"
                className={buttonVariants({
                  size: "lg",
                  className: "w-full",
                  variant: "green-outline",
                })}
              >
                Go back to Teams
              </Link>
            </div>
          </FieldSet>
        </form>
      </AuthWrapper>
    </form.AppForm>
  )
}
