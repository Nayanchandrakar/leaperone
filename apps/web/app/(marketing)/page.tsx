import { Fragment } from "react"
import { BusinessEditorLayout } from "@/features/bussiness/components/layouts/home/bussiness-editor-layout"
import { HeroSection } from "@/features/bussiness/components/pages/home/hero-section"

export default function HomePage() {
  return (
    <Fragment>
      <HeroSection />
      <BusinessEditorLayout />

      {/* Checks that parent contains a slot or state or anythign attribute */}
      {/* */}
      {/* <div data-slot="group" className="flex flex-col gap-2 group">
        <div className="">
          <span className="group-data-[slot=group]:text-red-400">hello world</span>
        </div>
        <span data-slot="group">New Testing</span>
      </div> */}

      {/*  Only applies for the top level child not the innner childs */}
      {/* <div className="flex flex-col gap-2 group has-[>[data-state=checked]]:text-red-400">
        <div data-state="checked" className="">
          <span>hello world</span>
        </div>
        <span data-slot="group">New Testing</span>
      </div> */}

      {/* Checks nested slots from the child elements */}
      {/* <div className="flex flex-col gap-2 group has-data-[state=checked]:text-red-400">
        <div className="">
          <span data-state="checked">hello world</span>
        </div>
        <span data-slot="group">New Testing</span>
      </div> */}

      {/*  <div className="flex flex-col items-center gap-2 *:data-[slot=group]:text-red-400">
        <span>Hello world </span>
        <span>Testing</span>

        <div data-slot="group" className="flex flex-col gap-2">
          <span>New Compoete </span>
          <span>New Component Testing</span>
        </div>
      </div> */}
    </Fragment>
  )
}
