import Image from "next/image"

export function ActivateNfcCardImage() {
  return (
    <div className="relative max-w-md mx-auto sm:after:content-[''] sm:after:bg-[url('/assets/svg/open-mark.svg')] sm:after:bg-contain sm:after:scale-x-[-1] sm:after:rotate-60 sm:after:size-14 sm:after:bg-no-repeat sm:after:absolute sm:after:-right-8 sm:after:-bottom-14 sm:before:content-[''] sm:before:bg-[url('/assets/svg/open-mark.svg')] sm:before:size-14 sm:before:bg-contain sm:before:absolute before:bg-no-repeat sm:before:-left-18 sm:before:-top-9 mt-12 sm:mt-18">
      <Image
        width={1000}
        height={1000}
        sizes="100vw"
        alt="phone-gudiance"
        className="h-110 w-fit"
        src="/assets/image/activate-nfc.png"
      />
    </div>
  )
}
