import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@app/ui/components/table"
import { DashboardSubtitle } from "@/features/dashboard/components/ui/dashboard-heading"

export const members = [
  {
    id: "1",
    name: "Crystal Williams",
    role: "Lead Graphic Designer",
    status: "online",
    avatarUrl: "/avatars/crystal.png",
    actions: {
      canAccess: true,
      canDisable: true,
      canEnable: false,
      canDelete: true,
    },
  },
  {
    id: "2",
    name: "Gizell Brown",
    role: "Graphic Designer",
    status: "offline",
    avatarUrl: "/avatars/gizell.png",
    actions: {
      canAccess: true,
      canDisable: false,
      canEnable: true,
      canDelete: true,
    },
  },
  {
    id: "3",
    name: "Robert Doe",
    role: "Head of Sales",
    status: "online",
    avatarUrl: "/avatars/robert.png",
    actions: {
      canAccess: true,
      canDisable: true,
      canEnable: false,
      canDelete: true,
    },
  },
  {
    id: "4",
    name: "Rosi Lee",
    role: "Production Associate",
    status: "away",
    avatarUrl: "/avatars/rosi.png",
    actions: {
      canAccess: true,
      canDisable: true,
      canEnable: false,
      canDelete: true,
    },
  },
]

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export const TeamMemberInvitations = () => {
  return (
    <section className="mt-8">
      <DashboardSubtitle>Your Team Members</DashboardSubtitle>
      {/* <PromptMessage>
        Take full advantage of Leaper One by adding multiple members for your team!
      </PromptMessage>
      <PromptAction>
        <Plus className="size-4" />
        <span>Add Team Member</span>
      </PromptAction>
       */}

      <div className="w-full border rounded-xl overflow-hidden mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-80">Invoice</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice} className="">
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
