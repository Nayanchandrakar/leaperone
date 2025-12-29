import type { TemplateKey } from "@app/core/types"
import dynamic from "next/dynamic"
import { useMemo } from "react"
import { TemplateLoading } from "@/features/preview/components/skeletons/template-loading"
import { TEMPLATE_REGISTRY } from "@/features/preview/constants/template-registry"
import type { TemplateProps } from "@/features/preview/types"

type Props = TemplateProps & {
  template: TemplateKey
}

export const TemplateRenderer = ({ template, ...props }: Props) => {
  const Template = useMemo(() => {
    return dynamic(TEMPLATE_REGISTRY[template], {
      ssr: false,
      loading: TemplateLoading,
    })
  }, [template])

  return <Template {...props} />
}
