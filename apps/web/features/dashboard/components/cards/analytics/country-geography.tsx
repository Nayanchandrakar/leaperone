import { Geography } from "@vnedyalk0v/react19-simple-maps"
import type { GeoTooltipContent } from "@/features/dashboard/hooks/analytics/use-map-tooltip"

interface CountryGeographyProps {
  geo: any
  maxCount: number
  count: number | undefined
  handleMouseMove: (e: React.MouseEvent<SVGElement>) => void
  handleMouseEnter: (e: React.MouseEvent<SVGElement>) => void
  handleMouseLeave: (e: React.MouseEvent<SVGElement>) => void
}

const STROKE_COLOR = "#E3E3E3"
const ACTIVE_FILL_COLOR = "#0A9521"

export function CountryGeography({
  geo,
  maxCount,
  count = 0,
  handleMouseMove,
  handleMouseEnter,
  handleMouseLeave,
}: CountryGeographyProps) {
  const opacity = count > 0 ? 0.2 + 0.8 * (count / maxCount) : 1
  const fillColor = count > 0 ? ACTIVE_FILL_COLOR : "#FFFFFF"

  return (
    <Geography
      geography={geo}
      data-count={count}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-name={geo?.properties?.name}
      style={{
        default: {
          outline: "none",
          fill: fillColor,
          stroke: STROKE_COLOR,
          fillOpacity: opacity,
        },
        pressed: {
          outline: "none",
          fill: fillColor,
          stroke: STROKE_COLOR,
          fillOpacity: opacity,
        },
        hover: {
          outline: "none",
          stroke: STROKE_COLOR,
          fillOpacity: Math.min(opacity + 0.2, 1),
          fill: count > 0 ? ACTIVE_FILL_COLOR : "#F3F4F6",
        },
      }}
    />
  )
}

interface CountryGeographyTooltipProps {
  content: GeoTooltipContent
  ref: React.RefObject<HTMLDivElement | null>
}

export const CountryGeographyTooltip = ({ content, ref }: CountryGeographyTooltipProps) => {
  return (
    <div
      ref={ref}
      role="tooltip"
      aria-live="polite"
      className="pointer-events-none fixed z-50 rounded-md bg-white px-3 py-1.5 text-xs text-black shadow-md border border-border whitespace-nowrap animate-in fade-in zoom-in-95 after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:h-2 after:w-2 after:-translate-x-1/2 after:rotate-45 after:bg-white"
      style={{ top: content.y, left: content.x, transform: "translate(-50%, -100%)" }}
    >
      {content.text}
    </div>
  )
}
