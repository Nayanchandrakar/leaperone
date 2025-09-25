import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        priority
        width={80}
        height={80}
        alt="logo"
        src="/assets/svg/green-logo.svg"
      />
    </Link>
  )
}
