"use client"

import { cn } from "@app/ui/lib/utils"

interface CircularProgressProps {
  size?: number
  progress: number
  className?: string
  showLabel?: boolean
  strokeWidth?: number
  labelClassName?: string
  baseStrokeWidth?: number
  progressClassName?: string
  progressStrokeWidth?: number
  strokeCap?: "square" | "round"
  renderLabel?: (progress: number) => number | string
}

export function CircularProgress({
  progress,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel = false,
  strokeCap = "round",
  size = 100,
  strokeWidth,
  baseStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) {
  const radius = size / 2 - 10
  const circumference = Math.ceil(2 * Math.PI * radius)
  const strokeOffset = Math.ceil(circumference * ((100 - progress) / 100))

  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${size * 1.25}`

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="none"
          strokeWidth={strokeWidth ?? baseStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className={cn("stroke-primary/25", className)}
        />

        {/* Progress Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="none"
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap={strokeCap}
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          className={cn("stroke-primary", progressClassName)}
        />
      </svg>

      {showLabel && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-md",
            labelClassName,
          )}
        >
          {renderLabel ? renderLabel(progress) : progress}
        </div>
      )}
    </div>
  )
}
