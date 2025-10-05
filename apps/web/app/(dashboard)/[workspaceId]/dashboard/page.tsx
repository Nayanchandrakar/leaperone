import { Plus, WifiPen } from "lucide-react"
import { DashboardPipeline } from "@/features/dashboard/actions/dashboard-pipeline"

interface Props {
  params: Promise<{ workspaceId: string }>
}

export default async function DashboardPage({ params }: Props) {
  const pipeline = await DashboardPipeline.init(params)
  await pipeline.checkMembership()
  await pipeline.checkSubscription()

  const context = pipeline.context
  const user = context.session.user

  return (
    <section className="container my-10">
      <h3 className="font-semibold text-xl">👋Hello {user.name}</h3>

      <div className="flex items-start gap-3 mt-8 flex-col">
        <p className="text-base font-medium text-muted-foreground">Overview</p>

        <div className="grid grid-cols-4 gap-4 w-full">
          {Array.from({ length: 4 }).map((data) => (
            <div
              key={data}
              className="space-y-4 bg-zinc-100 p-6 rounded-xl border border-zinc-400"
            >
              <p className="font-normal text-sm text-muted-foreground">
                Total scans of your card
              </p>
              <strong className="font-normal text-2xl text-primary">
                5689
              </strong>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-start flex-col gap-4 mt-8">
        <p className="text-muted-foreground font-medium text-base">
          My Business Card
        </p>

        <div className="flex items-center justify-center flex-col gap-3  w-full">
          <p className="text-muted-foreground font-normal text-sm text-center max-w-lg">
            No digital business card created yet. Start your smart networking
            journey by creating one now!
          </p>

          <div className="flex items-center justify-center p-7 border-2 border-dashed w-full rounded-lg mt-8">
            <p className="text-primary flex items-center gap-2 text-sm">
              <Plus className="size-5" />
              Create Digital Business Card
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start flex-col gap-4 mt-8">
        <p className="text-muted-foreground font-medium text-base">
          Quick Actions
        </p>

        <div className="grid grid-cols-4 gap-4  w-full">
          {Array.from({ length: 4 }).map((key) => (
            <div
              key={key}
              className="border border-zinc-400 rounded-xl p-7 flex flex-col gap-3 items-center"
            >
              <WifiPen className="size-6 text-primary" />
              <p className="text-muted-foreground font-normal text-sm">
                Buy NFC Items
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
