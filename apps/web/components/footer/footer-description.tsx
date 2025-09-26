import { Logo } from "@/components/footer/logo"

export const FooterDescription = () => (
  <div className="col-span-full flex flex-col gap-5 xl:col-span-2">
    <Logo />
    <p className="text-foreground text-sm sm:text-base">
      We offer easy-to-use CRM and digital business card tools that empower
      individuals and teams to make lasting connections and manage clients
      effortlessly.
    </p>
  </div>
)
