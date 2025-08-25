import { Container } from "@/components/shared/container"
import { MarkerText } from "@/features/bussiness/components/ui/marker-text"

export const PricingFaqSection = () => {
  return (
    <Container className="mt-28">
      <h2 className="font-bold md:font-semibold text-3xl text-center  leading-tight ">
        <MarkerText
          alt="underline"
          style={{ top: "80%" }}
          className="inline-flex"
          src="/assets/markers/dash.svg"
        >
          FAQs About Plans & Pricing
        </MarkerText>
      </h2>

      {/* <ListComponent
        items={COMPARISION_PLANS}
        className="relative z-20 py-8 grid lg:grid-cols-3 gap-4 divide-y lg:divide-x divide-zinc-400"
        renderItem={({ buttonTexts, title, variants }) => {
          const variant = "inactive"
          return (
            <div
              key={title}
              className="p-6 flex flex-col gap-3 items-center justify-center"
            >
              <span className="font-medium text-lg">{title}</span>
              <Button variant={variants[variant] as any}>
                {buttonTexts[variant]}
              </Button>
            </div>
          )
        }}
      /> */}
    </Container>
  )
}
