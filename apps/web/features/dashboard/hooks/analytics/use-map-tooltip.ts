import { useCallback, useRef, useState } from "react"

export type GeoTooltipContent = {
  x: number
  y: number
  text: string
}

export const useMapTooltip = () => {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState<GeoTooltipContent | null>(null)

  const handleMouseEnter = useCallback((e: React.MouseEvent<SVGElement>) => {
    const count = Number(e.currentTarget.getAttribute("data-count") || 0)
    const name = e.currentTarget.getAttribute("data-name") || ""

    if (count > 0) {
      setContent({
        text: `${name}: ${count} scan${count !== 1 ? "s" : ""}`,
        x: e.clientX,
        y: e.clientY - 20,
      })
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGElement>) => {
    const count = Number(e.currentTarget.getAttribute("data-count") || 0)
    if (count > 0 && tooltipRef.current) {
      tooltipRef.current.style.left = `${e.clientX}px`
      tooltipRef.current.style.top = `${e.clientY - 20}px`
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setContent(null)
  }, [])

  return {
    content,
    tooltipRef,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  }
}
