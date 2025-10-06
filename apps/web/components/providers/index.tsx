import { Toaster } from "@app/ui/components/sonner"
import { QueryProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"

type Props = {
  children: React.ReactNode
}

export const Provider = ({ children }: Props) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  )
}
