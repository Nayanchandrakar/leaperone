import { TrpcNextProvider } from "@/lib/trpc/client"

type ProviderType = {
  children: React.ReactNode
}

export function Provider({ children }: ProviderType) {
  return <TrpcNextProvider>{children}</TrpcNextProvider>
}
