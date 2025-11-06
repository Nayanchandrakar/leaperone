export const members = [
  {
    id: "1",
    name: "Crystal Williams",
    role: "Lead Graphic Designer",
    status: "online",
    avatarUrl: "/avatars/crystal.png",
  },
  {
    id: "2",
    name: "Gizell Brown",
    role: "Graphic Designer",
    status: "offline",
    avatarUrl: "/avatars/gizell.png",
  },
  {
    id: "3",
    name: "Robert Doe",
    role: "Head of Sales",
    status: "online",
    avatarUrl: "/avatars/robert.png",
  },
  {
    id: "4",
    name: "Rosi Lee",
    role: "Production Associate",
    status: "away",
    avatarUrl: "/avatars/rosi.png",
  },
]

export const getTeamInvitations = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return members
}
