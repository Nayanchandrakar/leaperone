import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        priority
        width={55}
        height={55}
        alt="logo"
        src="/assets/svg/white-logo.svg"
      />
    </Link>
  )
}
