"use client"

import { useIntersectionObserver } from "usehooks-ts"

interface InfiniteScrollContainerProps extends React.ComponentProps<"div"> {
  threshold?: number
  rootMargin?: string
  onIntersect: () => void
}

export function InfiniteScrollContainer({
  hidden,
  children,
  onIntersect,
  threshold = 0,
  rootMargin = "100%",
  ...props
}: InfiniteScrollContainerProps) {
  const { ref } = useIntersectionObserver({
    threshold,
    rootMargin,
    onChange: (isIntersecting) => isIntersecting && onIntersect(),
  })

  return (
    <div {...props}>
      {children}
      <div hidden={hidden} ref={ref} />
    </div>
  )
}
