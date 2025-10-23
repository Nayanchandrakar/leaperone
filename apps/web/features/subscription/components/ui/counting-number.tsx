"use client"

import { cn } from "@app/ui/lib/utils"
import { animate, motion, type UseInViewOptions, useInView, useMotionValue } from "motion/react"
import { useEffect, useRef, useState } from "react"

interface CountingNumberProps {
  from?: number
  to?: number
  duration?: number // seconds
  delay?: number // ms
  className?: string
  startOnView?: boolean
  once?: boolean
  inViewMargin?: UseInViewOptions["margin"]
  onComplete?: () => void
  format?: (value: number) => string
}

export function CountingNumber({
  from = 0,
  to = 100,
  duration = 2,
  delay = 0,
  className,
  startOnView = true,
  once = false,
  inViewMargin,
  onComplete,
  format,
  ...props
}: CountingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: inViewMargin! })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [display, setDisplay] = useState(from)
  const motionValue = useMotionValue(from)

  // Should start animation?
  const shouldStart = !startOnView || (isInView && (!once || !hasAnimated))

  // biome-ignore lint/correctness/useExhaustiveDependencies: unknown
  useEffect(() => {
    if (!shouldStart) return
    setHasAnimated(true)
    const timeout = setTimeout(() => {
      // @ts-expect-error
      const controls = animate(motionValue, to, {
        duration,
        // @ts-expect-error
        onUpdate: (v) => setDisplay(v),
        onComplete,
      })
      return () => controls.stop()
    }, delay)
    return () => clearTimeout(timeout)
  }, [shouldStart, from, to, duration, delay])

  return (
    <motion.span ref={ref} className={cn("inline-block", className)} {...props}>
      {format ? format(display) : Math.round(display)}
    </motion.span>
  )
}
