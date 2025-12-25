import { Avatar, AvatarImage } from "@app/ui/components/avatar"
import { Button } from "@app/ui/components/button"
import { faker } from "@faker-js/faker"
import { ArrowUpRight, Facebook, MapPin, Plus, QrCode, Share2 } from "lucide-react"
import Image from "next/image"
import { Icons } from "@/components/shared/icons"

export const ClassicTemplate = () => {
  return (
    <section className="relative">
      <div className="max-w-107.5 mx-auto my-24 bg-muted p-4 space-y-5">
        {/* profile image section complete */}
        <figure className="relative aspect-square">
          <Image
            fill
            alt="profile-image"
            src="https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/48.jpg"
          />
          <Icons.bussinesCard className="w-full absolute -bottom-2" />
        </figure>

        {/*   profile information section complete */}
        <article className="-mt-32 relative bg-white p-6 rounded-2xl space-y-4 w-fit max-w-75.5 mx-auto">
          <header className="space-y-3 text-center">
            <h1 className="font-semibold text-[28px] text-primary">Michael Anderson</h1>
            <div className="divide-y divide-border text-sm font-normal text-muted-foreground [&_p]:p-1.5 px-3">
              <p>Sales Representative</p>
              <p>Electrica Automobiles</p>
            </div>
          </header>
        </article>

        <nav className="flex justify-center items-center gap-6 my-7" aria-label="Quick actions">
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              className="size-15 shrink-0 flex-center rounded-full bg-primary text-white"
            >
              <MapPin className="size-6" />
            </span>
          ))}
        </nav>

        {/* about me section complete */}
        <article className="space-y-3 bg-white p-8 pt-7 rounded-3xl text-center">
          <h2 className="text-[28px] font-semibold text-primary">About Me</h2>
          <p className="text-base font-normal text-muted-foreground ">
            At Electrica, I help people find the right EV cars for their lifestyle. I'm here to make
            the process of owning your dream EV hassle-free, transparent, and genuinely enjoyable.
          </p>
        </article>

        {/* Our EV collection section list version complete */}
        <article className="space-y-6 bg-white pt-7 px-4 pb-4 rounded-3xl">
          <header className="space-y-3 text-center">
            <h2 className="text-[28px] font-semibold text-primary">Our EV Collection</h2>
            <p className="text-base font-normal text-muted-foreground ">
              Discover our latest collection of electric vehicles from leading EV brands.
            </p>
          </header>

          <div className="grid gap-4">
            <figure>
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/29661144/pexels-photo-29661144.jpeg"
              />
            </figure>

            <figure>
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/28288788/pexels-photo-28288788.jpeg"
              />
            </figure>

            <figure>
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/7676343/pexels-photo-7676343.jpeg"
              />
            </figure>
          </div>
        </article>

        {/* Our EV collection section grid one version complete */}
        <article className="space-y-6 bg-white pt-7 px-4 pb-4 rounded-3xl">
          <header className="space-y-3 text-center">
            <h2 className="text-[28px] font-semibold text-primary">Our EV Collection</h2>
            <p className="text-base font-normal text-muted-foreground ">
              Discover our latest collection of electric vehicles from leading EV brands.
            </p>
          </header>

          <div className="grid grid-cols-2 gap-4">
            <figure>
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/29661144/pexels-photo-29661144.jpeg"
              />
            </figure>
            <figure>
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/28288788/pexels-photo-28288788.jpeg"
              />
            </figure>
            <figure>
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/7676343/pexels-photo-7676343.jpeg"
              />
            </figure>

            <figure>
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/29647834/pexels-photo-29647834.jpeg"
              />
            </figure>
          </div>
        </article>

        {/* Our EV collection section grid two version complete */}
        <article className="space-y-6 bg-white pt-7 px-4 pb-4 rounded-3xl">
          <header className="space-y-3 text-center">
            <h2 className="text-[28px] font-semibold text-primary">Our EV Collection</h2>
            <p className="text-base font-normal text-muted-foreground ">
              Discover our latest collection of electric vehicles from leading EV brands.
            </p>
          </header>

          <div className="grid grid-cols-2 gap-4">
            <figure className="col-span-2">
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/29661144/pexels-photo-29661144.jpeg"
              />
            </figure>
            <figure>
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/28288788/pexels-photo-28288788.jpeg"
              />
            </figure>
            <figure>
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/7676343/pexels-photo-7676343.jpeg"
              />
            </figure>
          </div>
        </article>

        {/* Our EV collection section carousel version complete */}
        <article className="space-y-6 bg-white pt-7 px-4 pb-4 rounded-3xl">
          <header className="space-y-3 text-center">
            <h2 className="text-[28px] font-semibold text-primary">Our EV Collection</h2>
            <p className="text-base font-normal text-muted-foreground ">
              Discover our latest collection of electric vehicles from leading EV brands.
            </p>
          </header>

          <div className="flex gap-4 overflow-x-scroll no-scrollbar">
            <figure>
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/29661144/pexels-photo-29661144.jpeg"
              />
            </figure>
            <figure>
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/28288788/pexels-photo-28288788.jpeg"
              />
            </figure>
            <figure>
              <Image
                width={1000}
                height={1000}
                sizes="100vw"
                alt="pexels-image"
                className="aspect-square object-cover rounded-2xl"
                src="https://images.pexels.com/photos/7676343/pexels-photo-7676343.jpeg"
              />
            </figure>
          </div>
        </article>

        {/* Get in touch section complete */}
        <article className="space-y-4 bg-white p-8 rounded-3xl">
          <h2 className="text-[28px] font-semibold text-center text-primary">Get in touch</h2>

          <address className="w-full space-y-3 not-italic">
            <div className="text-start font-normal text-base">
              <strong className="text-primary font-normal">Contact number</strong>
              <p className="text-muted-foreground">+91 1234567890</p>
            </div>

            <div className="text-start font-normal text-base">
              <strong className="text-primary font-normal">Email</strong>
              <p className="text-muted-foreground">youremail@domain.com</p>
            </div>

            <div className="text-start font-normal text-base">
              <strong className="text-primary font-normal">Address</strong>
              <p className="text-muted-foreground">Street name</p>
              <p className="text-muted-foreground">City name</p>
              <p className="text-muted-foreground">State name</p>
              <p className="text-muted-foreground">Pin code</p>
            </div>
          </address>

          <div className="flex-center">
            <Button>
              <MapPin />
              Check Location
            </Button>
          </div>
        </article>

        {/* Connect with me section complete */}
        <article className="space-y-6 bg-white py-9 px-10 rounded-3xl">
          <h2 className="text-[28px] text-center font-semibold text-primary">Connect with me</h2>

          <nav aria-label="Social media links">
            <ul className="w-full">
              <li className="flex items-center justify-between gap-2 py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="bg-primary size-8 flex-center rounded-full">
                    <Facebook className="stroke-none size-4 fill-white" />
                  </span>
                  <span className="font-normal text-base text-muted-foreground">Facebook</span>
                </div>

                <ArrowUpRight className="size-5 text-muted-foreground" />
              </li>

              <li className="flex items-center justify-between gap-2 py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="bg-primary size-8 flex-center rounded-full">
                    <Facebook className="stroke-none size-4 fill-white" />
                  </span>
                  <span className="font-normal text-base text-muted-foreground">Facebook</span>
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground" />
              </li>

              <li className="flex items-center justify-between gap-2 py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="bg-primary size-8 flex-center rounded-full">
                    <Facebook className="stroke-none size-4 fill-white" />
                  </span>
                  <span className="font-normal text-base text-muted-foreground">Facebook</span>
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground" />
              </li>
            </ul>
          </nav>
        </article>

        {/* Button section complete */}
        <article className="space-y-6 bg-white p-8 pt-7 rounded-3xl">
          <header className="space-y-3 text-center">
            <h2 className="text-[28px] font-semibold text-primary">Button section</h2>
            <p className="text-base font-normal text-muted-foreground">
              Add a description or click on eye icon to hide this.
            </p>
          </header>
          <Button size="lg" className="w-full">
            Visit Website
          </Button>
        </article>

        {/* Testimonial section complete */}
        <article className="space-y-2">
          <header className="space-y-3 bg-white py-7 px-8 rounded-3xl text-center">
            <h2 className="text-[28px] font-semibold text-primary">Meet the team</h2>
            <p className="text-base font-normal text-muted-foreground">
              Add a description or click on eye icon to hide this.
            </p>
          </header>

          <ul>
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="py-6 px-8 rounded-3xl bg-white flex items-center gap-4">
                <Avatar className="size-12">
                  <AvatarImage src={faker.image.avatar()} />
                </Avatar>

                <div className="-space-y-0.5">
                  <strong className="font-semibold text-sm text-muted-foreground">
                    {faker.person.firstName()}
                  </strong>
                  <p className="font-normal text-xs text-muted-foreground">
                    {faker.person.jobTitle()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        {/* Youtube video section complete */}
        <article className="bg-white rounded-3xl overflow-hidden">
          <header className="space-y-3 py-7 px-8 text-center">
            <h2 className="text-[28px] font-semibold text-primary">Video</h2>
            <p className="text-base font-normal text-muted-foreground">
              Add a description or click on eye icon to hide this.
            </p>
          </header>

          <figure>
            <iframe
              allowFullScreen
              title="YouTube video player"
              className="w-full rounded-b-3xl aspect-video"
              allow="accelerometer; autoplay; encrypted-media;"
              src="https://www.youtube-nocookie.com/embed/mfv0V1SxbNA?si=TFysOtlLt1XiFrFs"
            />
          </figure>
        </article>
      </div>

      {/* Social media section complete */}
      <nav className="fixed bottom-4 left-4 flex gap-4" aria-label="Share actions">
        <Button size="icon-xl">
          <QrCode className="size-5" />
        </Button>

        <Button size="icon-xl">
          <Share2 className="size-5" />
        </Button>
      </nav>

      {/* Save contact section complete */}
      <aside className="fixed bottom-4 right-4">
        <Button className="px-5" size="lg">
          <Plus />
          Save Contact
        </Button>
      </aside>
    </section>
  )
}
