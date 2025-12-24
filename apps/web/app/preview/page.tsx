import { Avatar, AvatarImage } from "@app/ui/components/avatar"
import { Button } from "@app/ui/components/button"
import { faker } from "@faker-js/faker"
import { ArrowUpRight, Facebook, MapPin } from "lucide-react"
import Image from "next/image"

export default function PreviewPage() {
  return (
    <section className="max-w-[430px] mx-auto my-24 bg-muted p-4 space-y-5">
      {/* about me section complete */}
      <section className="space-y-3 bg-white p-8 pt-7 rounded-3xl">
        <h3 className="text-[28px] text-center font-semibold text-primary">About Me</h3>
        <p className="text-base font-normal text-muted-foreground text-center">
          At Electrica, I help people find the right EV cars for their lifestyle. I’m here to make
          the process of owning your dream EV hassle-free, transparent, and genuinely enjoyable.
        </p>
      </section>

      {/* Our EV collection section complete */}
      <section className="space-y-6 bg-white pt-7 px-4 pb-4 rounded-3xl">
        <div className="space-y-3">
          <h3 className="text-[28px] text-center font-semibold text-primary">Our EV Collection</h3>
          <p className="text-base font-normal text-muted-foreground text-center">
            Discover our latest collection of electric vehicles from leading EV brands.
          </p>
        </div>

        <div className="grid gap-4">
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

      {/* Our EV collection section complete */}
      <section className="space-y-6 bg-white pt-7 px-4 pb-4 rounded-3xl">
        <div className="space-y-3">
          <h3 className="text-[28px] text-center font-semibold text-primary">Our EV Collection</h3>
          <p className="text-base font-normal text-muted-foreground text-center">
            Discover our latest collection of electric vehicles from leading EV brands.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
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

      {/* Our EV collection section complete */}
      <section className="space-y-6 bg-white pt-7 px-4 pb-4 rounded-3xl">
        <div className="space-y-3">
          <h3 className="text-[28px] text-center font-semibold text-primary">Our EV Collection</h3>
          <p className="text-base font-normal text-muted-foreground text-center">
            Discover our latest collection of electric vehicles from leading EV brands.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
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

      {/* Get in touch section complete */}
      <section className="space-y-4 bg-white p-8 rounded-3xl">
        <h3 className="text-[28px] font-semibold text-center text-primary">Get in touch</h3>

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

      {/* Connect with me section complete */}
      <section className="space-y-6 bg-white py-9 px-10 rounded-3xl">
        <h3 className="text-[28px] text-center font-semibold text-primary">Connect with me</h3>

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

      {/* Button section complete */}
      <section className="space-y-6 bg-white p-8 pt-7 rounded-3xl">
        <div className="space-y-3">
          <h3 className="text-[28px] text-center font-semibold text-primary">Button section</h3>
          <p className="text-base text-center font-normal text-muted-foreground">
            Add a description or click on eye icon to hide this.
          </p>
        </div>
        <Button size="lg" className="w-full">
          Visit Website
        </Button>
      </section>

      {/* Testimonial section complete */}
      <section className="space-y-2">
        <div className="space-y-3 bg-white py-7 px-8 rounded-3xl">
          <h3 className="text-[28px] text-center font-semibold text-primary">Meet the team</h3>
          <p className="text-base text-center font-normal text-muted-foreground">
            Add a description or click on eye icon to hide this.
          </p>
        </div>

        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="py-6 px-8 rounded-3xl bg-white flex items-center gap-4">
            <Avatar className="size-12">
              <AvatarImage src={faker.image.avatar()} />
            </Avatar>

            <div className="-space-y-0.5">
              <span className="font-semibold text-sm text-muted-foreground">
                {faker.person.firstName()}
              </span>
              <p className="font-normal text-xs text-muted-foreground">{faker.person.jobTitle()}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Youtube video section complete */}
      <section className="bg-white rounded-3xl overflow-hidden">
        <div className="space-y-3 py-7 px-8">
          <h3 className="text-[28px] text-center font-semibold text-primary">Video</h3>
          <p className="text-base text-center font-normal text-muted-foreground">
            Add a description or click on eye icon to hide this.
          </p>
        </div>

        <iframe
          allowFullScreen
          title="YouTube video player"
          className="w-full rounded-b-3xl aspect-video"
          allow="accelerometer; autoplay; encrypted-media;"
          src="https://www.youtube-nocookie.com/embed/mfv0V1SxbNA?si=TFysOtlLt1XiFrFs"
        />
      </section>
    </section>
  )
}
