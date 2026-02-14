"use client"

import { Button, buttonVariants } from "@app/ui/components/button"
import { FieldGroup } from "@app/ui/components/field"
import { inviteMemberSchema } from "@app/zod/schema/invitation"
import Link from "next/link"
import { useAppForm } from "@/components/ui/app-form"
import { AuthWrapper } from "@/features/auth/components/layouts/auth-layout"
import { AuthDescription, AuthHeader, AuthTitle } from "@/features/auth/components/ui/auth-header"
import { useInviteMember } from "@/features/invitation/hooks/invite/use-invite-member"

export const InviteMemberForm = () => {
  const { mutateAsync, isPending } = useInviteMember()

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      jobRole: "",
      username: "",
    },
    validators: {
      onSubmit: inviteMemberSchema,
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)
    },
  })

  return (
    <AuthWrapper className="flex-center h-[calc(100vh-64px)]">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="w-full max-w-116 space-y-7"
      >
        <AuthHeader>
          <AuthTitle>Invite a New Member</AuthTitle>
          <AuthDescription>
            Invite a new member to be part of your exceptional team!
            <br />
            Note: All below fields required to fill.
          </AuthDescription>
        </AuthHeader>

        <FieldGroup className="gap-6">
          <form.AppField
            name="username"
            children={(field) => (
              <field.TextField
                variant="gray"
                label="Username"
                disabled={isPending}
                placeholder="Enter your username"
              />
            )}
          />

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
        </FieldGroup>

        <div className="grid gap-3.5">
          <form.Subscribe
            selector={({ canSubmit }) => [canSubmit]}
            children={([canSubmit]) => (
              <Button
                size="lg"
                type="submit"
                disabled={!canSubmit}
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
      </form>
    </AuthWrapper>
  )
}
