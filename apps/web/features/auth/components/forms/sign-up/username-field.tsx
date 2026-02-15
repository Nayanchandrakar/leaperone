import { Field, FieldLabel } from "@app/ui/components/field"
import { Spinner } from "@app/ui/components/spinner"
import { CircleCheck, CircleX } from "lucide-react"
import { withFieldGroup } from "@/components/ui/app-form"
import { getUserName } from "@/lib/api"

export const UserNameField = withFieldGroup({
  props: { disabled: false },
  defaultValues: { username: "" },
  render: ({ group, disabled }) => (
    <group.AppField
      name="username"
      validators={{
        onChangeAsyncDebounceMs: 200,
        onChangeAsync: async ({ value, signal }) => {
          try {
            const { data } = await getUserName({ username: value.trim() }, signal)
            return data?.exists ? { message: "Username already in use" } : undefined
          } catch (err) {
            return {
              message: err instanceof Error ? err.message : "Failed to check username.",
            }
          }
        },
      }}
    >
      {({ state, name, handleBlur, handleChange }) => {
        const { isTouched, isValid, isValidating } = state.meta
        const hasValue = !!state.value.trim()

        // Show CircleCheck if the field has been touched, has value, and is valid.
        const showCircleCheck = hasValue && isTouched && isValid
        // Show CircleX if field has been touched, is invalid, and not validating.
        const showCircleX = isTouched && !isValid && !isValidating
        // Show error style (aria-invalid) if touched and invalid (no need for value check, keep UX consistent)
        const isInvalid = isTouched && !isValid

        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={name}>Username</FieldLabel>
            <div
              role="group"
              data-slot="input-group"
              data-disabled={disabled}
              className="relative group/input-group border border-input rounded-md h-9 flex overflow-hidden transition-[color,box-shadow] has-[[data-slot=input-group-control]:focus-visible]:border-zinc-200 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive"
            >
              <span className="text-muted-foreground text-sm font-medium flex-center px-3 group-data-[disabled=true]/input-group:opacity-50">
                leaperone.com
              </span>
              <input
                id={name}
                name={name}
                type="search"
                onBlur={handleBlur}
                value={state.value}
                aria-invalid={isInvalid}
                autoComplete="new-password"
                data-slot="input-group-control"
                placeholder="Enter your username"
                onChange={(e) => handleChange(e.target.value)}
                className="w-full outline-none text-sm bg-muted pl-3 group-data-[disabled=true]/input-group:pointer-events-none group-data-[disabled=true]/input-group:opacity-50 group-data-[disabled=true]/input-group:cursor-not-allowed"
              />
              <span className="flex-center bg-muted px-3 [&>svg:not([class*='size-'])]:size-4">
                {isValidating ? (
                  <Spinner />
                ) : showCircleCheck ? (
                  <CircleCheck className="text-primary" />
                ) : showCircleX ? (
                  <CircleX className="text-destructive" />
                ) : null}
              </span>
            </div>
          </Field>
        )
      }}
    </group.AppField>
  ),
})
