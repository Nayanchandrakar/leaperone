import type { DesignEditor } from "@app/core/types"
import { cn } from "@app/ui/lib/utils"

type ThemeContainerProps = React.ComponentProps<"main"> & {
  design: DesignEditor
}

export const ThemeContainer = ({ className, design, ...props }: ThemeContainerProps) => {
  const { color, sectionBackground } = design

  return (
    <main
      data-section={design?.sectionBackground?.enabled}
      className={cn(
        "group/section relative overflow-y-scroll data-[preview=true]:no-scrollbar data-[preview=true]:h-screen",
        className,
      )}
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
