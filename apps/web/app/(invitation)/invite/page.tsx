import { Fragment } from "react"
import { Navbar } from "@/components/navbar"
import { InviteMemberForm } from "@/features/invitation/components/forms/invite"

export default function InviteMemberPage() {
  return (
    <Fragment>
      <Navbar />
      <InviteMemberForm />
    </Fragment>
  )
}
