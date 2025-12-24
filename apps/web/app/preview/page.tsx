import { Avatar, AvatarImage } from "@app/ui/components/avatar"
import { Button } from "@app/ui/components/button"
import { faker } from "@faker-js/faker"
import { ArrowUpRight, Facebook, MapPin } from "lucide-react"
import Image from "next/image"

export default function PreviewPage() {
  return (
    <section className="max-w-[430px] mx-auto my-24 bg-muted p-4 space-y-5">
      {/* about me section */}
      <section className="flex-center flex-col gap-2 bg-white p-7 rounded-3xl">
        <h3 className="text-[28px] font-semibold text-primary">About Me</h3>
        <p className="text-base font-normal text-muted-foreground text-center">
          At Electrica, I help people find the right EV cars for their lifestyle. I’m here to make
          the process of owning your dream EV hassle-free, transparent, and genuinely enjoyable.
        </p>
      </section>

      {/* Our EV collection section */}
      <section className="flex-center flex-col gap-2 bg-white p-5 rounded-3xl">
        <h3 className="text-[28px] font-semibold text-primary">Our EV Collection</h3>
        <p className="text-base font-normal text-muted-foreground text-center">
          Discover our latest collection of electric vehicles from leading EV brands.
        </p>
        <div className="flex flex-col gap-4 mt-3">
          <Image
            width={1000}
            height={1000}
            sizes="100vw"
            alt="pexels-image"
            className="aspect-square object-cover rounded-2xl"
            src="https://images.pexels.com/photos/29661144/pexels-photo-29661144.jpeg"
          />

          <Image
            width={1000}
            height={1000}
            sizes="100vw"
            alt="pexels-image"
            className="aspect-square object-cover rounded-2xl"
            src="https://images.pexels.com/photos/28288788/pexels-photo-28288788.jpeg"
          />

          <Image
            width={1000}
            height={1000}
            sizes="100vw"
            alt="pexels-image"
            className="aspect-square object-cover rounded-2xl"
            src="https://images.pexels.com/photos/7676343/pexels-photo-7676343.jpeg"
          />
        </div>
      </section>

      {/* Our EV collection section */}
      <section className="flex-center flex-col gap-2 bg-white p-5 rounded-3xl">
        <h3 className="text-[28px] font-semibold text-primary">Our EV Collection</h3>
        <p className="text-base font-normal text-muted-foreground text-center">
          Discover our latest collection of electric vehicles from leading EV brands.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <Image
            width={1000}
            height={1000}
            sizes="100vw"
            alt="pexels-image"
            className="aspect-square object-cover rounded-2xl"
            src="https://images.pexels.com/photos/29661144/pexels-photo-29661144.jpeg"
          />
          <Image
            width={1000}
            height={1000}
            sizes="100vw"
            alt="pexels-image"
            className="aspect-square object-cover rounded-2xl"
            src="https://images.pexels.com/photos/28288788/pexels-photo-28288788.jpeg"
          />
          <Image
            width={1000}
            height={1000}
            sizes="100vw"
            alt="pexels-image"
            className="aspect-square object-cover rounded-2xl"
            src="https://images.pexels.com/photos/7676343/pexels-photo-7676343.jpeg"
          />

          <Image
            width={1000}
            height={1000}
            sizes="100vw"
            alt="pexels-image"
            className="aspect-square object-cover rounded-2xl"
            src="https://images.pexels.com/photos/29647834/pexels-photo-29647834.jpeg"
          />
        </div>
      </section>

      {/* Our EV collection section */}
      <section className="flex-center flex-col gap-2 bg-white p-5 rounded-3xl">
        <h3 className="text-[28px] font-semibold text-primary">Our EV Collection</h3>
        <p className="text-base font-normal text-muted-foreground text-center">
          Discover our latest collection of electric vehicles from leading EV brands.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <Image
            width={1000}
            height={1000}
            sizes="100vw"
            alt="pexels-image"
            className="aspect-square object-cover col-span-2 rounded-2xl"
            src="https://images.pexels.com/photos/29661144/pexels-photo-29661144.jpeg"
          />
          <Image
            width={1000}
            height={1000}
            sizes="100vw"
            alt="pexels-image"
            className="aspect-square object-cover rounded-2xl"
            src="https://images.pexels.com/photos/28288788/pexels-photo-28288788.jpeg"
          />
          <Image
            width={1000}
            height={1000}
            sizes="100vw"
            alt="pexels-image"
            className="aspect-square object-cover rounded-2xl"
            src="https://images.pexels.com/photos/7676343/pexels-photo-7676343.jpeg"
          />
        </div>
      </section>

      {/* Get in touch section */}
      <section className="flex-center flex-col gap-4 bg-white p-5 rounded-3xl">
        <h3 className="text-[28px] font-semibold text-primary">Get in touch</h3>

        <div className="w-full space-y-3">
          <div className="text-start font-normal text-base">
            <span className="text-primary">Contact number</span>
            <p className="text-muted-foreground">+91 1234567890</p>
          </div>

          <div className="text-start font-normal text-base">
            <span className="text-primary">Email</span>
            <p className="text-muted-foreground">youremail@domain.com</p>
          </div>

          <div className="text-start font-normal text-base">
            <span className="text-primary">Address</span>
            <p className="text-muted-foreground">Street name</p>
            <p className="text-muted-foreground">City name</p>
            <p className="text-muted-foreground">State name</p>
            <p className="text-muted-foreground">Pin code</p>
          </div>
        </div>

        <div className="flex-center">
          <Button>
            <MapPin />
            Check Location
          </Button>
        </div>
      </section>

      {/* Connect with me section */}
      <section className="flex-center flex-col gap-4 bg-white p-5 rounded-3xl">
        <h3 className="text-[28px] font-semibold text-primary">Connect with me</h3>

        <div className="w-full">
          <div className="flex items-center justify-between gap-2 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="bg-primary size-8 flex-center rounded-full">
                <Facebook className="stroke-none size-4 fill-white" />
              </span>
              <p className="font-normal text-base text-muted-foreground">Facebook</p>
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between gap-2 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="bg-primary size-8 flex-center rounded-full">
                <Facebook className="stroke-none size-4 fill-white" />
              </span>
              <p className="font-normal text-base text-muted-foreground">Facebook</p>
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between gap-2 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="bg-primary size-8 flex-center rounded-full">
                <Facebook className="stroke-none size-4 fill-white" />
              </span>
              <p className="font-normal text-base text-muted-foreground">Facebook</p>
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Button section */}
      <section className="flex-center flex-col gap-4 bg-white p-5 rounded-3xl">
        <h3 className="text-[28px] font-semibold text-primary">Button section</h3>
        <p className="text-base text-center font-normal text-muted-foreground">
          Add a description or click on eye icon to hide this.
        </p>
        <Button className="w-full">Visit Website</Button>
      </section>

      {/* Button section */}
      <section className="flex-center flex-col gap-4 bg-white p-5 rounded-3xl">
        <h3 className="text-[28px] font-semibold text-primary">Meet the team</h3>
        <p className="text-base text-center font-normal text-muted-foreground">
          Add a description or click on eye icon to hide this.
        </p>
      </section>

      {/*  Testimonial card section */}
      <div className="p-5 rounded-3xl bg-white flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src={faker.image.avatar()} />
        </Avatar>

        <div>
          <span className="font-semibold text-sm text-muted-foreground">Portia M.</span>
          <p className="font-normal text-xs text-muted-foreground">Designation, Company</p>
        </div>
      </div>

      <div className="p-5 rounded-3xl bg-white flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src={faker.image.avatar()} />
        </Avatar>

        <div>
          <span className="font-semibold text-sm text-muted-foreground">David Ortiz</span>
          <p className="font-normal text-xs text-muted-foreground">Designation, Company</p>
        </div>
      </div>
    </section>
  )
}
