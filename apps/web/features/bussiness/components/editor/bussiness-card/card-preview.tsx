import { BizCardPreview } from "@/features/bussiness/components/editor/bussiness-card/biz-card-preview"
// import { QrCodePreview } from "@/features/bussiness/components/editor/bussiness-card/qr-code-preview"

export const CardPreview = () => {
  return (
    <section className="p-8 border border-gray-300 rounded-4xl h-fit">
      <BizCardPreview />
      {/* <QrCodePreview /> */}
    </section>
  )
}
