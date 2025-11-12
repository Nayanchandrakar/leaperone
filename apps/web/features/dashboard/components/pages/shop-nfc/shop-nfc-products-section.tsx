import { Button } from "@app/ui/components/button"
import { ShopNfcProductCard } from "@/features/dashboard/components/cards/shop-nfc/shop-nfc-product-card"
import { PRODUCTS } from "@/features/dashboard/constants/shop-nfc/products"

export const ShopNfcProductsSection = () => {
  return (
    <section className="mt-12 sm:mt-16 max-w-sm lg:max-w-3xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative before:content-[''] before:absolute before:bg-[url('/assets/svg/open-mark.svg')] before:bg-contain before:size-14 before:bg-center before:bg-no-repeat before:-top-12 before:-left-20 after:content-[''] after:bg-[url('/assets/svg/open-mark.svg')] after:bg-contain sm:after:scale-x-[-1] after:rotate-60 after:size-14 after:bg-no-repeat after:bg-center after:absolute after:-right-18 after:-bottom-16 min-[1200px]:after:inline-block min-[1200px]:before:inline-block after:hidden before:hidden">
        {PRODUCTS.map(({ alt, src, className }) => (
          <ShopNfcProductCard key={src} alt={alt} src={src} className={className} />
        ))}
      </div>

      <div className="max-w-sm mx-auto mt-16 md:mt-24">
        <Button size="xl" className="w-full">
          Shop NFC Bundle now
        </Button>
      </div>
    </section>
  )
}
