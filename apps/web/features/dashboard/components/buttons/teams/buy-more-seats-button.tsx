import Link from "next/link"

export const BuyMoreSeatsButton = () => {
  return (
    <p className="text-center text-sm font-normal text-muted-foreground transition-colors">
      All seats are full?&nbsp;
      <Link href="/pricing" className="text-primary underline hover:text-primary/80">
        Click here
      </Link>
      &nbsp;to buy more
    </p>
  )
}
