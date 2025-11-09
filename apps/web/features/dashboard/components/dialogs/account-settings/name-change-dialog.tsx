"use client"

import { Button } from "@app/ui/components/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@app/ui/components/dialog"
import { Field, FieldError, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Spinner } from "@app/ui/components/spinner"
import { nameChangeFormSchema } from "@app/zod/schema/account"
import { useForm } from "@tanstack/react-form"
import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { useAccountStore } from "@/features/dashboard/hooks/account-settings/use-account-store"
import { useNameChange } from "@/features/dashboard/hooks/account-settings/use-name-change"

export const NameChangeDialog = () => {
  // Account Store
  const { currentName, setCurrentName, setIsNameChangeOpen, isNameChangeOpen } = useAccountStore(
    useShallow((state) => ({
      currentName: state.currentName,
      setCurrentName: state.setCurrentName,
      isNameChangeOpen: state.isNameChangeOpen,
      setIsNameChangeOpen: state.setIsNameChangeOpen,
    })),
  )

  // Mutation to change the name
  const { mutate, isPending } = useNameChange({
    onSuccess: () => {
      form.reset()
      setCurrentName("")
      setIsNameChangeOpen(false)
    },
  })

  // Form
  const form = useForm({
    onSubmit: ({ value }) => mutate(value),
    defaultValues: { name: currentName ?? "" },
    validators: { onChange: nameChangeFormSchema },
  })

  // Handle close
  const handleClose = useCallback(() => {
    if (!isPending) {
      setCurrentName("")
      setIsNameChangeOpen(false)
    }
  }, [setCurrentName, setIsNameChangeOpen, isPending])

  return (
    <Dialog open={isNameChangeOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Full Name</DialogTitle>
        </DialogHeader>

        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel className="text-xs text-muted-foreground" htmlFor={field.name}>
                    Enter the new full name
                  </FieldLabel>
                  <Input
                    type="text"
                    variant="gray"
                    id={field.name}
                    name={field.name}
                    disabled={isPending}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <div className="flex items-center gap-4 justify-center mt-6">
            <form.Subscribe
              selector={(state) => state.isDirty}
              children={(isDirty) => (
                <Button type="submit" size="sm" className="px-8" disabled={isPending || !isDirty}>
                  {isPending && <Spinner />}
                  Save
                </Button>
              )}
            />

            <Button
              size="sm"
              type="button"
              disabled={isPending}
              variant="gray-outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
