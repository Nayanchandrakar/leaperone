import Image from "next/image"

export const AssetCardImage = () => {
  return (
    <Image
      src={
        "https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1465869185982-5a1a7522cbcb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D300%26q%3D80&w=640&q=75"
      }
      alt="image"
      className="size-full object-contain"
      height={1000}
      width={1000}
      sizes="100vw"
    />
  )
}
