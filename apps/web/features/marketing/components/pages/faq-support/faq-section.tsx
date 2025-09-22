import { Fragment } from "react"
import { RenderFaqs } from "@/features/marketing/components/pages/faq-support/render-faqs"
import { PLAN_FAQS } from "@/features/subscription/constants/pricing/plan-faqs"

export const FaqSection = () => {
  return (
    <Fragment>
      <RenderFaqs title="General Questions" data={PLAN_FAQS} />
      <RenderFaqs title="Digital Business Card" data={PLAN_FAQS} />
      <RenderFaqs title="Digital Business Card" data={PLAN_FAQS} />
      <RenderFaqs title="Plans & Billing" data={PLAN_FAQS} />
      <RenderFaqs title="Support & Contact" data={PLAN_FAQS} />
    </Fragment>
  )
}
