import { Button } from "@myleaper/ui/components/button"
import { Container } from "@/components/shared/container"
import { ListComponent } from "@/components/shared/list-component"
import { MarkerText } from "@/features/bussiness/components/ui/marker-text"
import { COMPARISION_PLANS } from "@/features/subscription/constants/pricing/plan-compare"

export const ComparePlanPricing = () => {
  return (
    <Container className="mt-32">
      <h2 className="font-bold md:font-semibold text-3xl text-center leading-tight">
        <MarkerText
          alt="underline"
          style={{ top: "80%" }}
          className="inline-flex"
          src="/assets/markers/dash.svg"
        >
          Compare plans with all features
        </MarkerText>
      </h2>

      <ListComponent
        className="grid lg:grid-cols-3 mt-20 border border-border max-w-xl sm:max-w-2xl lg:max-w-5xl mx-auto rounded-3xl bg-background divide-y lg:divide-y-0 divide-x divide-border"
        items={COMPARISION_PLANS}
        renderItem={({ buttonTexts, title, variants }) => {
          const variant = "inactive"
          return (
            <div
              key={title}
              className="py-14 flex flex-col gap-3 items-center justify-center"
            >
              <span className="font-medium text-lg">{title}</span>
              <Button variant={variants[variant] as any} size="lg">
                {buttonTexts[variant]}
              </Button>
            </div>
          )
        }}
      />
    </Container>
  )
}
