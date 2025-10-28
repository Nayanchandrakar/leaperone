import Image from "next/image"

export const AssetCardImage = ({ src }: any) => {
  return (
    <Image
      src={src}
      alt="image"
      className="size-full object-contain"
      height={1000}
      width={1000}
      sizes="100vw"
    />
  )
}
