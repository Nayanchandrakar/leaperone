import { cn } from "@myleaper/ui/lib/utils"

export const AuthLayout = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <section
      className={cn("grid min-h-screen lg:grid-cols-2", className)}
      {...props}
    >
      {children}
    </section>
  )
}

export const AuthWrapper = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("p-6 sm:sm:p-7 md:p-8 relative", className)} {...props}>
      {children}
    </div>
  )
}

export const AuthForm = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex size-full items-center justify-center", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export const AuthContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "bg-[linear-gradient(190.37deg,#16A50B_3.55%,#0D9815_54.67%,#0B701D_100%)] relative hidden lg:block",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
