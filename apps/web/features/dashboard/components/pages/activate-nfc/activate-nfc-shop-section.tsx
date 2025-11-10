import { Button } from "@app/ui/components/button"

export const ActivateNfcShopSection = () => {
  return (
    <div className="max-w-sm mx-auto text-center space-y-[14px] mt-8">
      <p className="font-normal text-base text-muted-foreground">Don't have your NFC Bundle yet?</p>

      <Button size="xl" className="w-full">
        Shop NFC Bundle now
      </Button>
    </div>
  )
}
