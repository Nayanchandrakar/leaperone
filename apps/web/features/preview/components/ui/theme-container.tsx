import type { DesignEditor } from "@app/core/types"
import type React from "react"

type ThemeContainerProps = React.ComponentProps<"main"> & {
  design: DesignEditor
}

export const ThemeContainer = ({ design, ...props }: ThemeContainerProps) => {
  const { color, sectionBackground } = design

  return (
    <main
      data-section={design?.sectionBackground?.enabled}
      className="group/section font-Lobster relative overflow-y-scroll data-[mode=preview]:no-scrollbar data-[mode=preview]:h-screen"
      style={
        {
          "--bg-color": color?.background,
          "--text-color": color?.mainText,
          "--highlight-color": color?.highlight,
          "--section-bg-color": sectionBackground?.color,
          "--supporting-text-color": color?.supportingText,
          "--section-radius": `${sectionBackground?.borderRadius}px`,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
