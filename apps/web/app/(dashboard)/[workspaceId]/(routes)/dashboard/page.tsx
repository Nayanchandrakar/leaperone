interface Props {
  params: Promise<{ workspaceId: string }>
}

export default async function DashboardPage({ params }: Props) {
  const { workspaceId } = await params

  return <div className="">Dashboard page {workspaceId}</div>
}
