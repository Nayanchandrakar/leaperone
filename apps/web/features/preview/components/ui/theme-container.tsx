import type { DesignEditor } from "@app/types"
import type React from "react"

type ThemeContainerProps = React.ComponentProps<"main"> & {
  design: DesignEditor
}

export function ThemeContainer({ design, ...props }: ThemeContainerProps) {
  const { color, sectionBackground, font } = design

  return (
    <main
      data-background={design?.sectionBackground?.enabled}
      className="group/section relative animate-in fade-in transition-opacity duration-400 will-change-[opacity] overflow-y-scroll data-[mode=preview]:no-scrollbar data-[mode=preview]:h-screen"
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
          fontFamily: `${font?.family}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
