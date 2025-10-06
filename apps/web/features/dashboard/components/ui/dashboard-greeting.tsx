type Props = {
  name: string
}

export const DashboardGreeting = ({ name }: Props) => {
  return <h3 className="font-semibold text-xl">👋Hello {name}</h3>
}
