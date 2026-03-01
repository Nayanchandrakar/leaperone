import type { DesignEditor } from "@app/types"
import type React from "react"

type ThemeContainerProps = React.ComponentProps<"main"> & {
  design: DesignEditor
}

export const ThemeContainer = ({ design, ...props }: ThemeContainerProps) => {
  const { color, sectionBackground, font } = design

  return (
    <main
      data-background={design?.sectionBackground?.enabled}
      className="
        group/section relative overflow-y-scroll
        data-[mode=preview]:no-scrollbar data-[mode=preview]:h-screen
        animate-in fade-in transition-opacity duration-400 will-change-[opacity]
        "
      style={
        {
          "--template-background": color?.background,
          "--template-foreground": color?.mainText,
          "--template-primary": color?.highlight,
          "--template-muted-foreground": color?.supportingText,
          "--template-card": sectionBackground?.color,
          "--font-body-weight": font?.bodyWeight,
          "--font-button-weight": font?.buttonWeight,
          "--font-heading-weight": font?.headingWeight,
          "--card-radius": `${sectionBackground?.borderRadius}px`,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
