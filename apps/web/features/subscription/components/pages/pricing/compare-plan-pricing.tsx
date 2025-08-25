import { Button } from "@myleaper/ui/components/button"
import { Container } from "@/components/shared/container"
import { ListComponent } from "@/components/shared/list-component"
import { MarkerText } from "@/features/bussiness/components/ui/marker-text"
import { COMPARISION_PLANS } from "@/features/subscription/constants/pricing/plan-compare"

export const ComparePlanPricing = () => {
  return (
    <Container className="mt-32">
      <h2 className="font-bold md:font-semibold text-3xl text-center  leading-tight ">
        <MarkerText
          alt="underline"
          style={{ top: "80%" }}
          className="inline-flex"
          src="/assets/markers/dash.svg"
        >
          Compare plans with all features
        </MarkerText>
      </h2>

      <div className="relative mx-auto max-w-2xl lg:max-w-5xl  border-zinc-300 px-4 sm:px-6 md:px-8 mt-16">
        <div className="absolute top-4 left-0 -z-0 h-px w-full bg-zinc-400 sm:top-6 md:top-8" />
        <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 sm:bottom-6 md:bottom-8" />

        <div className="relative w-full border-x border-zinc-400 ">
          <div className="absolute z-0 grid size-full items-center">
            <section className="absolute z-0 grid size-full grid-cols-2 place-content-between">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`card-${index}`}
                  className="bg-primary my-4 size-1.5 odd:-translate-x-[2.5px] even:translate-x-[2.5px] even:place-self-end rounded-full  outline-8 outline-gray-50 sm:my-6 md:my-8 "
                />
              ))}
            </section>
          </div>

          <ListComponent
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
          />
        </div>
      </div>
    </Container>
  )
}
